import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';
import { authenticate, callKw } from '$lib/odoo';
import { inquiryLabel } from '$lib/content';

// Messages sent from any other host (staging.code.pr, *.pages.dev previews) are tagged
// so they are recognisable in the shared info@code.pr inbox.
const PRODUCTION_HOSTS = new Set(['code.pr', 'www.code.pr']);

function cfAccessHeaders(): Record<string, string> {
	const h: Record<string, string> = {};
	if (env.CF_ACCESS_CLIENT_ID) h['CF-Access-Client-Id'] = env.CF_ACCESS_CLIENT_ID;
	if (env.CF_ACCESS_CLIENT_SECRET) h['CF-Access-Client-Secret'] = env.CF_ACCESS_CLIENT_SECRET;
	return h;
}

export const actions: Actions = {
	contact: async ({ request, url }) => {
		const data = await request.formData();

		const name = String(data.get('name') ?? '').trim();
		const phone = String(data.get('phone') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const company = String(data.get('company') ?? '').trim();
		const inquiry = String(data.get('inquiry') ?? '').trim();
		const subjectInput = String(data.get('subject') ?? '').trim();
		const question = String(data.get('question') ?? '').trim();
		const values = { name, phone, email, company, inquiry, subject: subjectInput, question };

		const label = inquiryLabel(inquiry);

		if (!name || !email || !question || !label) {
			return fail(400, { message: 'Please fill out all required fields.', values });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { message: 'Please enter a valid email address.', values });
		}

		const isProduction = PRODUCTION_HOSTS.has(url.hostname);
		const subject = subjectInput || label;
		const emailSubject = `${isProduction ? '' : '[STAGING TEST] '}[code.pr contact] ${label}: ${subject}`;

		const toEmail = env.CONTACT_EMAIL ?? 'info@code.pr';
		const fromEmail = env.RESEND_FROM_EMAIL ?? 'Code PR <noreply@code.pr>';

		const textBody = [
			`Inquiry type: ${label}`,
			`Name: ${name}`,
			`Email: ${email}`,
			phone ? `Phone: ${phone}` : false,
			company ? `Company: ${company}` : false,
			`Subject: ${subject}`,
			isProduction ? false : `Sent from: ${url.hostname}`,
			'',
			question
		]
			.filter((line): line is string => typeof line === 'string')
			.join('\n');

		const htmlBody = `
			<p><strong>Inquiry type:</strong> ${escapeHtml(label)}</p>
			<p><strong>Name:</strong> ${escapeHtml(name)}</p>
			<p><strong>Email:</strong> ${escapeHtml(email)}</p>
			${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
			${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
			<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
			${isProduction ? '' : `<p><strong>Sent from:</strong> ${escapeHtml(url.hostname)}</p>`}
			<hr />
			<p>${escapeHtml(question).replace(/\n/g, '<br>')}</p>
		`;

		const sendFailed = fail(502, {
			message:
				'We could not send your message right now. Please try again or email info@code.pr directly.',
			values
		});

		if (env.RESEND_API_KEY) {
			try {
				const response = await fetch('https://api.resend.com/emails', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${env.RESEND_API_KEY}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						from: fromEmail,
						to: [toEmail],
						subject: emailSubject,
						text: textBody,
						html: htmlBody,
						reply_to: email
					})
				});

				if (!response.ok) {
					console.error('Resend error:', response.status, await response.text());
					return sendFailed;
				}
			} catch (err) {
				console.error('Contact form exception:', err);
				return sendFailed;
			}
		} else if (env.ODOO_API_KEY) {
			// No Resend key configured: send through Odoo's mail server (same path as the
			// event-notification emails) so project inquiries are never silently lost.
			try {
				const auth = await authenticate(
					env.ODOO_URL ?? 'https://odoo.code.pr',
					env.ODOO_DB ?? 'cpr',
					env.ODOO_USER ?? '',
					env.ODOO_API_KEY,
					cfAccessHeaders()
				);
				const mailId = (await callKw(auth, 'mail.mail', 'create', [
					{
						subject: emailSubject,
						email_to: toEmail,
						email_from: 'Code Puerto Rico <info@code.pr>',
						reply_to: email,
						body_html: htmlBody,
						auto_delete: false
					}
				])) as number;
				await callKw(auth, 'mail.mail', 'send', [[mailId]]);
			} catch (err) {
				console.error('Contact form Odoo mail error:', err);
				return sendFailed;
			}
		} else {
			console.error('Neither RESEND_API_KEY nor ODOO_API_KEY is configured');
			return fail(500, {
				message: 'Email service is not configured. Please contact us directly at info@code.pr.',
				values
			});
		}

		redirect(303, '/contactus-thank-you');
	}
};

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}
