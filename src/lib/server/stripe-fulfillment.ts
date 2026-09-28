/**
 * Stripe → Odoo fulfillment for code.pr memberships and day passes.
 *
 * Port of the Odoo addon controller `cpr_membership/controllers/stripe_webhook.py`
 * (adamb/cprodoo). That addon was uninstalled on 2026-06-17 together with Odoo's
 * `website` module when code.pr moved to SvelteKit, so the Odoo-side route no longer
 * exists. This version runs on Cloudflare Pages and talks to Odoo over XML-RPC
 * (same service-token path as the other server routes).
 *
 * Differences from the original Python controller:
 *  - Portal user + invite email for new contacts is opt-in (STRIPE_PORTAL_INVITES=true), see FulfillmentOptions.
 *  - Idempotent: invoices are keyed by `ref` ("Stripe: <id>") and never duplicated on
 *    retries / manual resends. A half-finished invoice (draft or unpaid) is completed.
 *  - Checkout sessions that created a Stripe invoice (subscriptions) use that invoice id
 *    as the key, so `checkout.session.completed` + `invoice.paid` for the same first
 *    payment produce ONE Odoo invoice instead of two.
 *  - `invoice.paid` creates the contact if it doesn't exist yet (events can arrive out of order).
 *  - Unpaid checkout sessions (delayed payment methods) are skipped until
 *    `checkout.session.async_payment_succeeded`.
 *  - Invoice/payment date = the Stripe event date in Puerto Rico time, not "today",
 *    so replayed events land on the right day.
 *  - Odoo errors bubble up (→ HTTP 500) so Stripe retries, instead of being swallowed.
 */

export type Rpc = (
	model: string,
	method: string,
	args: unknown[],
	kwargs?: Record<string, unknown>
) => Promise<unknown>;

export interface StripeEvent {
	id: string;
	type: string;
	created: number;
	livemode?: boolean;
	data: { object: Record<string, any> };
}

export interface FulfillmentResult {
	handled: boolean;
	action: string;
	ref?: string;
	partnerId?: number;
	invoiceId?: number;
}

type Log = (...args: unknown[]) => void;

/** Event types that touch Odoo; everything else is acknowledged without an Odoo call. */
export const HANDLED_EVENT_TYPES = new Set([
	'checkout.session.completed',
	'checkout.session.async_payment_succeeded',
	'invoice.paid'
]);

/** Puerto Rico is UTC-4 year-round (no DST). */
export function prDate(unixSeconds: number): string {
	return new Date((unixSeconds - 4 * 3600) * 1000).toISOString().slice(0, 10);
}

async function portalGroupId(rpc: Rpc): Promise<number | null> {
	const rows = (await rpc('ir.model.data', 'search_read', [
		[
			['module', '=', 'base'],
			['name', '=', 'group_portal']
		]
	], { fields: ['res_id'], limit: 1 })) as Array<{ res_id: number }>;
	return rows[0]?.res_id ?? null;
}

async function findOrCreatePartner(
	rpc: Rpc,
	email: string,
	name: string | undefined,
	log: Log
): Promise<{ id: number; created: boolean }> {
	const ids = (await rpc('res.partner', 'search', [[['email', '=ilike', email]]], {
		limit: 1
	})) as number[];
	if (ids.length) return { id: ids[0], created: false };
	const id = (await rpc('res.partner', 'create', [{ name: name || email, email }])) as number;
	log(`Created Odoo contact ${id} for ${email}`);
	return { id, created: true };
}

/** Mirrors `_create_portal_user`: best effort, never fails the webhook. */
async function ensurePortalUser(rpc: Rpc, partnerId: number, email: string, log: Log) {
	try {
		const existing = (await rpc('res.users', 'search', [[['login', '=', email]]], {
			limit: 1,
			context: { active_test: false }
		})) as number[];
		if (existing.length) return;
		const groupId = await portalGroupId(rpc);
		if (!groupId) throw new Error('base.group_portal not found');
		const userId = (await rpc('res.users', 'create', [
			{ login: email, partner_id: partnerId, groups_id: [[6, 0, [groupId]]] }
		])) as number;
		await rpc('res.users', 'action_reset_password', [[userId]]);
		log(`Created portal user ${userId} for ${email} and sent invitation`);
	} catch (err) {
		log(`Failed to create portal user for ${email}:`, err);
	}
}

/** Mirrors `_create_invoice` + `_register_payment`, but idempotent on `ref`. */
async function ensurePaidInvoice(
	rpc: Rpc,
	partnerId: number,
	amount: number,
	description: string,
	ref: string,
	date: string,
	log: Log
): Promise<number> {
	const found = (await rpc(
		'account.move',
		'search_read',
		[
			[
				['ref', '=', ref],
				['move_type', '=', 'out_invoice'],
				['state', '!=', 'cancel']
			]
		],
		{ fields: ['id', 'name', 'state', 'payment_state'], limit: 1 }
	)) as Array<{ id: number; name: string; state: string; payment_state: string }>;

	let invoiceId: number;
	let state: string;
	let paymentState: string;
	if (found.length) {
		({ id: invoiceId, state, payment_state: paymentState } = found[0]);
		log(`Invoice for ${ref} already exists (id ${invoiceId}, ${state}/${paymentState})`);
	} else {
		invoiceId = (await rpc('account.move', 'create', [
			{
				move_type: 'out_invoice',
				partner_id: partnerId,
				invoice_date: date,
				ref,
				invoice_line_ids: [[0, 0, { name: description, quantity: 1, price_unit: amount }]]
			}
		])) as number;
		state = 'draft';
		paymentState = 'not_paid';
		log(`Created invoice ${invoiceId} for ${ref}`);
	}

	if (state === 'draft') {
		await rpc('account.move', 'action_post', [[invoiceId]]);
		state = 'posted';
	}
	if (state === 'posted' && !['paid', 'in_payment', 'reversed'].includes(paymentState)) {
		const ctx = { active_model: 'account.move', active_ids: [invoiceId] };
		const wizardId = (await rpc(
			'account.payment.register',
			'create',
			[{ amount, payment_date: date }],
			{ context: ctx }
		)) as number;
		await rpc('account.payment.register', 'action_create_payments', [[wizardId]], {
			context: ctx
		});
		log(`Registered payment for invoice ${invoiceId}`);
	}
	return invoiceId;
}

export interface FulfillmentOptions {
	/**
	 * Create an Odoo portal user + send the signup/invite email for new contacts (the old addon did).
	 * Off by default: since 2026-06-17 Odoo lives only at odoo.code.pr behind Cloudflare Access
	 * (code.pr emails only), so members can't open the invite link. Replaying months-old events
	 * would also email customers out of the blue.
	 */
	portalInvites?: boolean;
}

export async function fulfillStripeEvent(
	rpc: Rpc,
	event: StripeEvent,
	log: Log = console.log,
	opts: FulfillmentOptions = {}
): Promise<FulfillmentResult> {
	const obj = event.data?.object ?? {};
	const date = prDate(event.created);

	switch (event.type) {
		case 'checkout.session.completed':
		case 'checkout.session.async_payment_succeeded': {
			const email: string | undefined = obj.customer_details?.email ?? obj.customer_email;
			const name: string | undefined = obj.customer_details?.name;
			const amount = (obj.amount_total ?? 0) / 100;
			const description: string = obj.metadata?.product_name || 'Day Pass';
			// Subscriptions: key on the Stripe invoice so invoice.paid for the same payment dedupes.
			const ref = `Stripe: ${obj.invoice || obj.id}`;
			log(`Checkout ${obj.id} ${event.type}: ${name} <${email}> $${amount} (${obj.payment_status})`);
			if (!email) return { handled: false, action: 'no customer email' };

			const partner = await findOrCreatePartner(rpc, email, name, log);
			if (partner.created && opts.portalInvites) await ensurePortalUser(rpc, partner.id, email, log);

			if (obj.payment_status === 'unpaid') {
				return { handled: true, action: 'contact only; payment pending', partnerId: partner.id };
			}
			if (amount <= 0) return { handled: true, action: 'contact only; zero amount', partnerId: partner.id };

			const invoiceId = await ensurePaidInvoice(rpc, partner.id, amount, description, ref, date, log);
			return { handled: true, action: 'invoice', ref, partnerId: partner.id, invoiceId };
		}

		case 'invoice.paid': {
			const email: string | undefined = obj.customer_email;
			const name: string | undefined = obj.customer_name;
			const amount = (obj.amount_paid ?? 0) / 100;
			const subscription: string | undefined =
				obj.subscription ?? obj.parent?.subscription_details?.subscription;
			const description: string =
				obj.billing_reason === 'subscription_cycle'
					? 'Membership Renewal'
					: obj.lines?.data?.[0]?.description || 'Membership';
			const ref = `Stripe: ${obj.id}`;
			log(`Invoice paid ${obj.id} (${obj.billing_reason}, ${subscription}): <${email}> $${amount}`);
			if (!email) return { handled: false, action: 'no customer email' };
			if (amount <= 0) return { handled: true, action: 'zero amount' };

			const partner = await findOrCreatePartner(rpc, email, name, log);
			if (partner.created && opts.portalInvites) await ensurePortalUser(rpc, partner.id, email, log);
			const invoiceId = await ensurePaidInvoice(rpc, partner.id, amount, description, ref, date, log);
			return { handled: true, action: 'invoice', ref, partnerId: partner.id, invoiceId };
		}

		default:
			return { handled: false, action: `ignored ${event.type}` };
	}
}
