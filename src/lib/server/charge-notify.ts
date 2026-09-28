/**
 * Email alert to info@code.pr for Stripe charge events (approved standing alert, Sep 2026).
 *
 * Sent through Odoo's outgoing mail (mail.mail → Postfix → ImprovMX, From info@code.pr),
 * the same path the Notify Me form uses, so no extra email provider or secret is needed.
 *
 * Covered events:
 *   charge.succeeded – "Stripe charge: $200.00 from Nancy Ortiz Ortega"
 *   charge.refunded  – "Stripe REFUND: …" (only arrives if the endpoint subscribes to it)
 *   charge.failed    – "Stripe FAILED charge: …" (only arrives if the endpoint subscribes to it)
 *
 * Dedup: every alert gets a deterministic Message-Id (<stripe-{event type}-{charge id}@code.pr>),
 * kept in Odoo (auto_delete off), and we look it up before sending. Stripe retries and manual
 * resends of the same event therefore don't send a second email. Events older than
 * MAX_AGE_HOURS are also skipped, so bulk replays of old events stay quiet.
 */

import type { Rpc, StripeEvent } from './stripe-fulfillment';

export const NOTIFY_TO = 'info@code.pr';
export const NOTIFY_FROM = 'Code Puerto Rico <info@code.pr>';
export const MAX_AGE_HOURS = 72;
export const CHARGE_NOTIFY_EVENT_TYPES = new Set(['charge.succeeded', 'charge.refunded', 'charge.failed']);

type Log = (...args: unknown[]) => void;

export interface ChargeEmail {
	subject: string;
	bodyHtml: string;
	bodyText: string;
	messageId: string;
}

export interface NotifyResult {
	sent: boolean;
	reason: string;
	mailId?: number;
}

const ZERO_DECIMAL = new Set([
	'bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga', 'pyg', 'rwf', 'ugx', 'vnd', 'vuv', 'xaf', 'xof', 'xpf'
]);

export function formatMoney(amountMinor: number, currency = 'usd'): string {
	const cur = (currency || 'usd').toLowerCase();
	const major = ZERO_DECIMAL.has(cur) ? amountMinor : amountMinor / 100;
	try {
		const s = new Intl.NumberFormat('en-US', { style: 'currency', currency: cur.toUpperCase() }).format(major);
		return cur === 'usd' ? s : `${s} ${cur.toUpperCase()}`;
	} catch {
		return `${major.toFixed(2)} ${cur.toUpperCase()}`;
	}
}

/** Puerto Rico is UTC-4 year-round (AST, no DST). */
export function formatPrTime(unixSeconds: number): string {
	const d = new Date((unixSeconds - 4 * 3600) * 1000);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let h = d.getUTCHours();
	const ampm = h >= 12 ? 'PM' : 'AM';
	h = h % 12 || 12;
	const mm = String(d.getUTCMinutes()).padStart(2, '0');
	return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}, ${h}:${mm} ${ampm} AST`;
}

function esc(s: unknown): string {
	return String(s ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function buildChargeEmail(event: StripeEvent): ChargeEmail {
	const c = event.data?.object ?? {};
	const name: string = c.billing_details?.name || c.shipping?.name || '';
	const email: string = c.billing_details?.email || c.receipt_email || '';
	const who = name || email || 'unknown customer';
	const amount = formatMoney(c.amount ?? 0, c.currency);
	const refunded = formatMoney(c.amount_refunded ?? 0, c.currency);
	// Payment Link charges usually carry no description/product; the Dashboard link has the line items.
	const description: string = c.description || c.metadata?.product_name || '';
	const pi: string | undefined = typeof c.payment_intent === 'string' ? c.payment_intent : c.payment_intent?.id;
	const live = event.livemode !== false && c.livemode !== false;
	const dashboard = `https://dashboard.stripe.com/${live ? '' : 'test/'}payments/${pi || c.id}`;
	const when = formatPrTime(event.type === 'charge.refunded' ? event.created : c.created ?? event.created);

	let subject: string;
	let heading: string;
	if (event.type === 'charge.refunded') {
		subject = `Stripe REFUND: ${refunded} to ${who}`;
		heading = `Refund of ${refunded} (charge was ${amount})`;
	} else if (event.type === 'charge.failed') {
		subject = `Stripe FAILED charge: ${amount} from ${who}`;
		heading = `Failed charge of ${amount}`;
	} else {
		subject = `Stripe charge: ${amount} from ${who}`;
		heading = `New charge of ${amount}`;
	}
	if (!live) subject = `[TEST] ${subject}`;

	const rows: Array<[string, string]> = [
		['Amount', event.type === 'charge.refunded' ? `${refunded} refunded of ${amount}` : amount],
		['Customer', name || '—'],
		['Email', email || '—'],
		['Description', description || '— (not on the charge; see Dashboard)'],
		['Date', when],
		['Charge ID', c.id ?? '—'],
		['Payment', pi ?? '—']
	];
	if (event.type === 'charge.failed') {
		rows.push(['Failure', [c.failure_code, c.failure_message].filter(Boolean).join(': ') || '—']);
	}
	if (c.receipt_url && event.type !== 'charge.failed') rows.push(['Receipt', c.receipt_url]);

	const bodyText = [
		heading,
		'',
		...rows.map(([k, v]) => `${k}: ${v}`),
		`Stripe Dashboard: ${dashboard}`,
		'',
		'—',
		'Written by Grok Bot'
	].join('\n');

	const bodyHtml = `<div style="font-family:sans-serif;max-width:560px;color:#1f2937;">
  <h2 style="margin:0 0 16px;font-size:18px;">${esc(heading)}</h2>
  <table style="border-collapse:collapse;font-size:14px;">
${rows
	.map(
		([k, v]) =>
			`    <tr><td style="padding:4px 16px 4px 0;color:#6b7280;vertical-align:top;">${esc(k)}</td><td style="padding:4px 0;">${
				/^https:\/\//.test(v) ? `<a href="${esc(v)}">${esc(v)}</a>` : esc(v)
			}</td></tr>`
	)
	.join('\n')}
  </table>
  <p style="margin:20px 0;"><a href="${esc(dashboard)}" style="display:inline-block;padding:10px 18px;background:#1ba9ca;color:#fff;text-decoration:none;border-radius:6px;">View in Stripe Dashboard →</a></p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
  <p style="font-size:12px;color:#9ca3af;">Written by Grok Bot</p>
</div>`;

	return {
		subject,
		bodyHtml,
		bodyText,
		messageId: `<stripe-${event.type.replace(/\./g, '-')}-${c.id ?? event.id}@code.pr>`
	};
}

/**
 * Best effort: never throws. The caller should always answer Stripe with a 2xx for charge events.
 */
export async function notifyCharge(
	rpc: Rpc,
	event: StripeEvent,
	log: Log = console.log,
	nowSeconds = Math.floor(Date.now() / 1000)
): Promise<NotifyResult> {
	try {
		if (!CHARGE_NOTIFY_EVENT_TYPES.has(event.type)) return { sent: false, reason: 'not a charge event' };
		const ageHours = (nowSeconds - (event.created ?? nowSeconds)) / 3600;
		if (ageHours > MAX_AGE_HOURS) {
			log(`Charge alert skipped for ${event.id}: event is ${ageHours.toFixed(1)}h old (> ${MAX_AGE_HOURS}h)`);
			return { sent: false, reason: 'event too old' };
		}
		const mail = buildChargeEmail(event);
		const dup = (await rpc('mail.message', 'search', [[['message_id', '=', mail.messageId]]], {
			limit: 1
		})) as number[];
		if (dup.length) {
			log(`Charge alert already sent for ${mail.messageId}`);
			return { sent: false, reason: 'duplicate' };
		}
		const mailId = (await rpc('mail.mail', 'create', [
			{
				subject: mail.subject,
				email_to: NOTIFY_TO,
				email_from: NOTIFY_FROM,
				body_html: mail.bodyHtml,
				message_id: mail.messageId,
				auto_delete: false // keep the record: it is the dedup key
			}
		])) as number;
		await rpc('mail.mail', 'send', [[mailId]]);
		log(`Charge alert sent to ${NOTIFY_TO}: ${mail.subject} (mail.mail ${mailId})`);
		return { sent: true, reason: 'sent', mailId };
	} catch (err) {
		log(`Charge alert FAILED for ${event.id} (${event.type}):`, err);
		return { sent: false, reason: 'error' };
	}
}
