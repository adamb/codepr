import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { authenticate, callKw } from '$lib/odoo';

function odooAuth() {
	const cfHeaders: Record<string, string> = {};
	if (env.CF_ACCESS_CLIENT_ID) cfHeaders['CF-Access-Client-Id'] = env.CF_ACCESS_CLIENT_ID;
	if (env.CF_ACCESS_CLIENT_SECRET)
		cfHeaders['CF-Access-Client-Secret'] = env.CF_ACCESS_CLIENT_SECRET;
	return authenticate(
		env.ODOO_URL ?? 'https://odoo.code.pr',
		env.ODOO_DB ?? 'cpr',
		env.ODOO_USER ?? '',
		env.ODOO_API_KEY ?? '',
		cfHeaders
	);
}

// TikTok webhook verification handshake
export const GET: RequestHandler = ({ url }) => {
	const challenge = url.searchParams.get('hub.challenge') ?? url.searchParams.get('challenge');
	if (!challenge) return new Response('Missing challenge', { status: 400 });
	return new Response(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
};

// TikTok lead payload
interface TikTokLead {
	advertiser_id?: string;
	form_id?: string;
	lead_id?: string;
	create_time?: number;
	answers?: Array<{ field_name: string; field_value: string }>;
	// Some TikTok accounts send a flat structure instead
	first_name?: string;
	last_name?: string;
	email?: string;
	phone_number?: string;
}

function extractField(answers: Array<{ field_name: string; field_value: string }>, ...keys: string[]): string {
	for (const key of keys) {
		const match = answers.find(
			(a) => a.field_name.toUpperCase() === key.toUpperCase()
		);
		if (match?.field_value) return match.field_value.trim();
	}
	return '';
}

export const POST: RequestHandler = async ({ request }) => {
	// Verify the request is from TikTok using the shared secret
	const secret = env.TIKTOK_WEBHOOK_SECRET;
	if (secret) {
		const signature = request.headers.get('TikTok-Signature') ?? request.headers.get('X-TikTok-Signature');
		if (!signature) {
			console.error('TikTok webhook: missing signature');
			return json({ error: 'Unauthorized' }, { status: 401 });
		}
		// Verify HMAC-SHA256 signature
		const body = await request.clone().text();
		const key = await crypto.subtle.importKey(
			'raw',
			new TextEncoder().encode(secret),
			{ name: 'HMAC', hash: 'SHA-256' },
			false,
			['verify']
		);
		const sigBytes = new Uint8Array(
			signature.replace(/^sha256=/, '').match(/.{2}/g)!.map((b) => parseInt(b, 16))
		);
		const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(body));
		if (!valid) {
			console.error('TikTok webhook: invalid signature');
			return json({ error: 'Unauthorized' }, { status: 401 });
		}
	}

	let lead: TikTokLead;
	try {
		lead = await request.json();
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}

	// Extract fields from either nested answers array or flat structure
	const answers = lead.answers ?? [];
	const firstName =
		extractField(answers, 'FIRST_NAME', 'first_name') || lead.first_name || '';
	const lastName =
		extractField(answers, 'LAST_NAME', 'last_name') || lead.last_name || '';
	const email =
		extractField(answers, 'EMAIL', 'email_address') || lead.email || '';
	const phone =
		extractField(answers, 'PHONE_NUMBER', 'phone', 'mobile') || lead.phone_number || '';
	const name = [firstName, lastName].filter(Boolean).join(' ') || 'Unknown';

	if (!email && !phone) {
		console.error('TikTok webhook: lead has no email or phone', lead);
		return json({ error: 'No contact info' }, { status: 422 });
	}

	try {
		const auth = await odooAuth();

		// Create crm.lead record
		await callKw(auth, 'crm.lead', 'create', [
			{
				name: `TikTok Lead — ${name}`,
				contact_name: name,
				email_from: email || false,
				phone: phone || false,
				source_id: false, // TODO: set to TikTok UTM source ID once configured in Odoo
				description: `Lead from TikTok Instant Form.\nForm ID: ${lead.form_id ?? 'unknown'}\nLead ID: ${lead.lead_id ?? 'unknown'}`,
				tag_ids: [] // TODO: add a TikTok tag once created in Odoo
			}
		]);

		console.log(`TikTok lead created in Odoo: ${name} <${email}>`);
		return json({ ok: true });
	} catch (err) {
		console.error('TikTok webhook: failed to create Odoo lead', err);
		return json({ error: 'CRM error' }, { status: 500 });
	}
};
