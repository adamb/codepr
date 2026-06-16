import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

export const actions: Actions = {
	register: async ({ request }) => {
		const data = await request.formData();

		const name = String(data.get('name') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const ack = data.get('acknowledgment') === 'on';

		if (!name || !email) {
			return fail(400, {
				message: 'Please provide your name and email.',
				values: { name, email }
			});
		}

		if (!ack) {
			return fail(400, {
				message: 'You must acknowledge the prerequisites to register.',
				values: { name, email }
			});
		}

		const resendKey = env.RESEND_API_KEY;
		const toEmail = env.CONTACT_EMAIL ?? 'info@code.pr';
		const fromEmail = env.RESEND_FROM_EMAIL ?? 'Code PR <noreply@code.pr>';

		if (resendKey) {
			const subject = '[code.pr workshop] Linux Workshop Registration';
			const textBody = [
				`New registration for the Defenestration Workshop: Installing Linux on Your PC.`,
				'',`Name: ${name}`,
				`Email: ${email}`,
				'',`The registrant confirmed they will bring a working PC, have backed up their data, and understand Linux installation will erase existing data.`
			].join('\n');

			const htmlBody = `
				<p>New registration for the <strong>Defenestration Workshop: Installing Linux on Your PC</strong>.</p>
				<p><strong>Name:</strong> ${escapeHtml(name)}<br /><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p>The registrant confirmed they will bring a working PC, have backed up their data, and understand Linux installation will erase existing data.</p>
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
						subject,
						text: textBody,
						html: htmlBody,
						reply_to: email
					})
				});

				if (!response.ok) {
					const body = await response.text();
					console.error('Resend error:', response.status, body);
				}
			} catch (err) {
				console.error('Workshop registration exception:', err);
			}
		}

		redirect(303, '/upcoming-events-thanks');
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
