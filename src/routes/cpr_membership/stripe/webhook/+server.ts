import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { authenticate, callKw } from '$lib/odoo';
import { verifyStripeSignature } from '$lib/server/stripe-signature';
import { fulfillStripeEvent, HANDLED_EVENT_TYPES, type StripeEvent } from '$lib/server/stripe-fulfillment';

/**
 * Stripe live-mode webhook endpoint: https://code.pr/cpr_membership/stripe/webhook
 *
 * The URL is kept identical to the old Odoo route so the Stripe endpoint config
 * (and its signing secret) doesn't change. Requires Pages secrets:
 *   STRIPE_WEBHOOK_SECRET  – the endpoint's "Signing secret" (whsec_...) from the Stripe Dashboard
 *   ODOO_API_KEY, CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET – already used by other routes
 * Optional:
 *   STRIPE_PORTAL_INVITES=true – also create Odoo portal users + send invite emails (old addon behaviour)
 */

function odooAuth() {
	const cfHeaders: Record<string, string> = {};
	if (env.CF_ACCESS_CLIENT_ID) cfHeaders['CF-Access-Client-Id'] = env.CF_ACCESS_CLIENT_ID;
	if (env.CF_ACCESS_CLIENT_SECRET) cfHeaders['CF-Access-Client-Secret'] = env.CF_ACCESS_CLIENT_SECRET;
	return authenticate(
		env.ODOO_URL ?? 'https://odoo.code.pr',
		env.ODOO_DB ?? 'cpr',
		env.ODOO_USER ?? '',
		env.ODOO_API_KEY ?? '',
		cfHeaders
	);
}

export const POST: RequestHandler = async ({ request }) => {
	const secret = env.STRIPE_WEBHOOK_SECRET?.trim().replace(/^["']|["']$/g, '');
	if (!secret) {
		// Fail closed: this endpoint creates contacts, portal users and paid invoices.
		// A 5xx makes Stripe keep retrying (up to 3 days) until the secret is configured.
		console.error('Stripe webhook: STRIPE_WEBHOOK_SECRET is not configured');
		return json({ error: 'Webhook not configured' }, { status: 500 });
	}

	const rawBody = await request.text();
	const check = await verifyStripeSignature(rawBody, request.headers.get('Stripe-Signature'), secret);
	if (!check.ok) {
		console.error(`Stripe webhook: rejected (${check.reason})`);
		return json({ error: 'Invalid signature' }, { status: 400 });
	}

	let event: StripeEvent;
	try {
		event = JSON.parse(rawBody);
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}

	if (!HANDLED_EVENT_TYPES.has(event.type)) {
		return json({ received: true, handled: false, action: `ignored ${event.type}` });
	}

	try {
		const auth = await odooAuth();
		const rpc = (model: string, method: string, args: unknown[], kwargs?: Record<string, unknown>) =>
			callKw(auth, model, method, args, kwargs);
		const result = await fulfillStripeEvent(rpc, event, (...a) => console.log('[stripe]', ...a), {
			portalInvites: env.STRIPE_PORTAL_INVITES === 'true'
		});
		console.log(`Stripe webhook ${event.id} ${event.type}: ${result.action}`);
		return json({ received: true, ...result });
	} catch (err) {
		console.error(`Stripe webhook ${event.id} ${event.type}: Odoo error`, err);
		return json({ error: 'Fulfillment failed' }, { status: 500 });
	}
};
