import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';
import { authenticate, callKw } from '$lib/odoo';
import { createToken } from '$lib/token';

const EVENT_LABELS: Record<string, string> = {
	demo_day: 'Demo Day',
	demo_nights: 'Demo Nights & Lightning Talks',
	ai_coding: 'AI Coding Tools Introduction',
	pitch_prototype: 'Pitch and Prototype',
	cloudflare: 'Cloudflare Meetup',
	home_assistant: 'Home Assistant Meetup'
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

export const actions: Actions = {
	notify: async ({ request, url }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();

		if (!name || !email) {
			return fail(400, { error: 'Name and email are required.' });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Please enter a valid email address.' });
		}

		const interests = Object.keys(EVENT_LABELS).filter((k) => data.get(k) === '1');
		if (interests.length === 0) {
			return fail(400, { error: 'Please select at least one event.' });
		}

		const secret = env.NOTIFY_SECRET;
		if (!secret) throw new Error('NOTIFY_SECRET environment variable is not set');

		const token = await createToken({ email, name, interests }, secret);
		const verifyUrl = `${url.origin}/upcoming-events/verify?token=${encodeURIComponent(token)}`;

		const selectedLabels = interests.map((i) => EVENT_LABELS[i]).filter(Boolean);
		const bodyHtml = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:28px 24px;">
  <img src="https://code.pr/images/logo.webp" alt="Code Puerto Rico" style="height:60px;margin-bottom:24px;" />
  <h2 style="color:#0d1b2a;margin:0 0 12px;">Confirm your event notifications</h2>
  <p style="color:#374151;margin:0 0 8px;">Hi ${name},</p>
  <p style="color:#374151;margin:0 0 16px;">Click the button below to confirm you'd like to be notified when these events are scheduled at <strong>Code Puerto Rico</strong>:</p>
  <ul style="color:#374151;margin:0 0 24px;padding-left:20px;">
    ${selectedLabels.map((l) => `<li style="margin-bottom:6px;">${l}</li>`).join('')}
  </ul>
  <a href="${verifyUrl}"
     style="display:inline-block;padding:13px 28px;background:#f97316;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;font-size:16px;">
    Confirm Email →
  </a>
  <p style="margin-top:28px;font-size:13px;color:#6b7280;">
    This link expires in 24 hours. If you didn't request this, you can safely ignore it.
  </p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
  <p style="font-size:12px;color:#9ca3af;">
    Code Puerto Rico · San Juan, PR ·
    <a href="https://code.pr" style="color:#1ba9ca;">code.pr</a>
  </p>
</div>`;

		try {
			const auth = await authenticate(
				odooUrl(),
				env.ODOO_DB ?? 'cpr',
				env.ODOO_USER ?? '',
				env.ODOO_API_KEY ?? '',
				cfAccessHeaders(env)
			);

			const mailId = (await callKw(auth, 'mail.mail', 'create', [
				{
					subject: 'Confirm your Code Puerto Rico event notifications',
					email_to: email,
					email_from: 'Code Puerto Rico <info@code.pr>',
					body_html: bodyHtml,
					auto_delete: true
				}
			])) as number;

			await callKw(auth, 'mail.mail', 'send', [[mailId]]);
		} catch (err) {
			console.error('Odoo mail error:', err);
			return fail(503, {
				error: 'Could not send verification email. Please try again in a moment.'
			});
		}

		return { success: true, email };
	}
};
