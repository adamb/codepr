/**
 * Forward a website contact submission to the n8n "Website Contact to Odoo (code.pr)" workflow,
 * which dedups by email and creates/updates a crm.lead in Odoo.
 *
 * Configuration (Cloudflare Pages env vars / secrets):
 *   N8N_CONTACT_WEBHOOK_URL     full n8n production webhook URL
 *   N8N_CONTACT_WEBHOOK_SECRET  shared secret, sent as the X-Codepr-Secret header
 *
 * Never throws: CRM forwarding is best-effort and must not affect the visitor's submission.
 */

export interface ContactPayload {
	name: string;
	email: string;
	phone: string;
	company: string;
	subject: string;
	message: string;
	website: string; // honeypot (should be empty for humans)
	page: string;
	submitted_at: string;
}

export const N8N_SECRET_HEADER = 'X-Codepr-Secret';

export async function forwardContactToN8n(
	payload: ContactPayload,
	config: { url?: string; secret?: string },
	timeoutMs = 5000
): Promise<boolean> {
	const { url, secret } = config;
	if (!url || !secret) {
		console.warn('n8n contact forwarding skipped: N8N_CONTACT_WEBHOOK_URL/SECRET not configured');
		return false;
	}

	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', [N8N_SECRET_HEADER]: secret },
			body: JSON.stringify(payload),
			signal: controller.signal
		});
		if (!res.ok) {
			console.error('n8n contact forwarding failed:', res.status);
			return false;
		}
		return true;
	} catch (err) {
		console.error('n8n contact forwarding error:', err instanceof Error ? err.message : err);
		return false;
	} finally {
		clearTimeout(timer);
	}
}
