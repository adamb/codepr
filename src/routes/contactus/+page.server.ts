import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

export const actions: Actions = {
	contact: async ({ request }) => {
		const data = await request.formData();

		const name = String(data.get('name') ?? '').trim();
		const phone = String(data.get('phone') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const company = String(data.get('company') ?? '').trim();
		const subject = String(data.get('subject') ?? '').trim();
		const question = String(data.get('question') ?? '').trim();

		if (!name || !email || !subject || !question) {
			return fail(400, {
				message: 'Please fill out all required fields.',
				values: { name, phone, email, company, subject, question }
			});
		}

		const resendKey = env.RESEND_API_KEY;
		const toEmail = env.CONTACT_EMAIL ?? 'info@code.pr';
		const fromEmail = env.RESEND_FROM_EMAIL ?? 'Code PR <noreply@code.pr>';

		if (!resendKey) {
			console.error('RESEND_API_KEY is not configured');
			return fail(500, {
				message: 'Email service is not configured. Please contact us directly at info@code.pr.',
				values: { name, phone, email, company, subject, question }
			});
		}

		const textBody = [
			`Name: ${name}`,
			`Email: ${email}`,
			phone && `Phone: ${phone}`,
			company && `Company: ${company}`,
			`Subject: ${subject}`,
			'',
			question
		]
			.filter(Boolean)
			.join('\n');

		const htmlBody = `
			<p><strong>Name:</strong> ${escapeHtml(name)}</p>
			<p><strong>Email:</strong> ${escapeHtml(email)}</p>
			${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
			${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
			<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
			<hr />
			<p>${escapeHtml(question).replace(/\n/g, '<br>')}</p>
		`;

		try {
			const response = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${resendKey}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					from: fromEmail,
					to: [toEmail],
					subject: `[code.pr contact] ${subject}`,
					text: textBody,
					html: htmlBody,
					reply_to: email
				})
			});

			if (!response.ok) {
				const body = await response.text();
				console.error('Resend error:', response.status, body);
				return fail(502, {
					message: 'We could not send your message right now. Please try again or email info@code.pr directly.',
					values: { name, phone, email, company, subject, question }
				});
			}
		} catch (err) {
			console.error('Contact form exception:', err);
			return fail(502, {
				message: 'We could not send your message right now. Please try again or email info@code.pr directly.',
				values: { name, phone, email, company, subject, question }
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
