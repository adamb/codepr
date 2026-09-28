/**
 * Form notification emails via Odoo mail.mail (Postfix → ImprovMX, From info@code.pr).
 *
 * Same delivery path as the Notify Me form and the Stripe charge alerts, so the site
 * needs no separate email provider (Resend was never configured in Pages).
 * Recipient is always info@code.pr; the submitter goes in Reply-To.
 */

import { authenticate, callKw } from '$lib/odoo';

export const FORM_MAIL_TO = 'info@code.pr';
export const FORM_MAIL_FROM = 'Code Puerto Rico <info@code.pr>';

export type Rpc = (
	model: string,
	method: string,
	args: unknown[],
	kwargs?: Record<string, unknown>
) => Promise<unknown>;

export interface FormMail {
	subject: string;
	bodyHtml: string;
	replyTo?: string;
}

type OdooEnv = Record<string, string | undefined>;

/** XML-RPC client for Odoo using the same env/secrets as the other server routes. */
export async function odooRpcFromEnv(env: OdooEnv): Promise<Rpc> {
	const cfHeaders: Record<string, string> = {};
	if (env.CF_ACCESS_CLIENT_ID) cfHeaders['CF-Access-Client-Id'] = env.CF_ACCESS_CLIENT_ID;
	if (env.CF_ACCESS_CLIENT_SECRET) cfHeaders['CF-Access-Client-Secret'] = env.CF_ACCESS_CLIENT_SECRET;
	const auth = await authenticate(
		env.ODOO_URL ?? 'https://odoo.code.pr',
		env.ODOO_DB ?? 'cpr',
		env.ODOO_USER ?? '',
		env.ODOO_API_KEY ?? '',
		cfHeaders
	);
	return (model, method, args, kwargs) => callKw(auth, model, method, args, kwargs);
}

export function escapeHtml(s: unknown): string {
	return String(s ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

/** Single-line header value: strips CR/LF and angle brackets to prevent header injection. */
export function cleanHeader(s: string): string {
	return s.replace(/[\r\n<>]+/g, ' ').trim().slice(0, 200);
}

/** Loose email check, used both for form validation and to decide on Reply-To. */
export function isEmail(s: string): boolean {
	return /^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]+$/.test(s) && s.length <= 254;
}

function row(label: string, value: string): string {
	return value
		? `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`
		: '';
}

function wrap(heading: string, rows: string, extra = ''): string {
	return `<div style="font-family:sans-serif;max-width:560px;color:#1f2937;">
  <h2 style="margin:0 0 16px;font-size:18px;">${escapeHtml(heading)}</h2>
  <table style="border-collapse:collapse;font-size:14px;">${rows}</table>${extra}
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />
  <p style="font-size:12px;color:#9ca3af;">Sent from the code.pr website form. Reply to this email to answer the sender.</p>
</div>`;
}

export interface ContactValues {
	name: string;
	email: string;
	phone?: string;
	company?: string;
	subject: string;
	question: string;
}

export function buildContactMail(v: ContactValues): FormMail {
	const rows =
		row('Name', v.name) +
		row('Email', v.email) +
		row('Phone', v.phone ?? '') +
		row('Company', v.company ?? '') +
		row('Subject', v.subject);
	const message = `<div style="margin-top:16px;padding:12px 14px;background:#f9fafb;border-left:3px solid #1ba9ca;font-size:14px;white-space:normal;">${escapeHtml(
		v.question
	).replace(/\r?\n/g, '<br>')}</div>`;
	return {
		subject: cleanHeader(`[code.pr contact] ${v.subject} — ${v.name}`),
		bodyHtml: wrap('New message from the code.pr contact form', rows, message),
		replyTo: isEmail(v.email) ? cleanHeader(v.email) : undefined
	};
}

export interface WorkshopValues {
	name: string;
	email: string;
}

export function buildWorkshopMail(v: WorkshopValues): FormMail {
	const rows =
		row('Workshop', 'Defenestration Workshop: Installing Linux on Your PC') +
		row('Name', v.name) +
		row('Email', v.email);
	const note = `<p style="font-size:14px;">The registrant confirmed they will bring a working PC, have backed up their data, and understand Linux installation will erase existing data.</p>`;
	return {
		subject: cleanHeader(`[code.pr workshop] Linux Workshop Registration — ${v.name}`),
		bodyHtml: wrap('New Linux Workshop registration', rows, note),
		replyTo: isEmail(v.email) ? cleanHeader(v.email) : undefined
	};
}

/** Creates and sends one mail.mail to info@code.pr. Throws on any Odoo error. */
export async function sendFormMail(rpc: Rpc, mail: FormMail): Promise<number> {
	const vals: Record<string, unknown> = {
		subject: mail.subject,
		email_to: FORM_MAIL_TO,
		email_from: FORM_MAIL_FROM,
		body_html: mail.bodyHtml,
		auto_delete: true
	};
	if (mail.replyTo) vals.reply_to = mail.replyTo;
	const mailId = (await rpc('mail.mail', 'create', [vals])) as number;
	await rpc('mail.mail', 'send', [[mailId]]);
	return mailId;
}
