import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import { authenticate, callKw } from '$lib/odoo';
import { verifyToken } from '$lib/token';

// res.partner.category IDs on code.pr Odoo instance
const CATEGORY_IDS: Record<string, number> = {
	demo_day: 6, // Interest: Demo Day
	demo_nights: 1, // Interest: Demo Nights & Lightning Talks
	ai_coding: 2, // Interest: AI Coding Tools
	pitch_prototype: 3, // Interest: Pitch and Prototype
	cloudflare: 4, // Interest: Cloudflare Meetup
	home_assistant: 5 // Interest: Home Assistant Meetup
};

function odooUrl() {
	return env.ODOO_URL ?? 'https://odoo.code.pr';
}

function cfAccessHeaders(e: typeof env): Record<string, string> {
	const h: Record<string, string> = {};
	if (e.CF_ACCESS_CLIENT_ID) h['CF-Access-Client-Id'] = e.CF_ACCESS_CLIENT_ID;
	if (e.CF_ACCESS_CLIENT_SECRET) h['CF-Access-Client-Secret'] = e.CF_ACCESS_CLIENT_SECRET;
	return h;
}

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token');
	if (!token) return { verified: false, message: 'No verification token provided.' };

	const secret = env.NOTIFY_SECRET;
	if (!secret) return { verified: false, message: 'Server configuration error.' };

	let email: string, name: string, interests: string[];
	try {
		({ email, name, interests } = await verifyToken(token, secret));
	} catch {
		return { verified: false, message: 'This link is invalid or has expired. Please sign up again.' };
	}

	const categoryIds = interests.map((i) => CATEGORY_IDS[i]).filter((id): id is number => id !== undefined);

	try {
		const auth = await authenticate(
			odooUrl(),
			env.ODOO_DB ?? 'cpr',
			env.ODOO_USER ?? '',
			env.ODOO_API_KEY ?? '',
			cfAccessHeaders(env)
		);

		// Find existing partner by email
		const existing = (await callKw(
			auth,
			'res.partner',
			'search_read',
			[[['email', '=', email]]],
			{ fields: ['id', 'category_id'], limit: 1 }
		)) as Array<{ id: number; category_id: number[] }>;

		if (existing.length) {
			// Merge new category IDs with existing ones
			const merged = [...new Set([...(existing[0].category_id ?? []), ...categoryIds])];
			await callKw(auth, 'res.partner', 'write', [
				[existing[0].id],
				{ category_id: [[6, 0, merged]] }
			]);
		} else {
			// Create new partner
			await callKw(auth, 'res.partner', 'create', [
				{
					name,
					email,
					category_id: [[6, 0, categoryIds]],
					type: 'contact'
				}
			]);
		}
	} catch (err) {
		console.error('Odoo partner error:', err);
		return { verified: false, message: 'Could not save your preferences. Please try again.' };
	}

	return { verified: true, name };
};
