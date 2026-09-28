import { buildContactMail, isEmail, odooRpcFromEnv, sendFormMail } from '$lib/server/odoo-mail';
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
		// Resend is no longer used (it was never configured in Pages); flag a stale key if one appears.
		if (resendKey) console.warn('Contact form: RESEND_API_KEY is set but unused; mail goes via Odoo');

		if (!isEmail(email)) {
			return fail(400, {
				message: 'Please enter a valid email address.',
				values: { name, phone, email, company, subject, question }
			});
		}

		// Notify info@code.pr through Odoo mail (Postfix → ImprovMX), Reply-To = the visitor.
		try {
			const rpc = await odooRpcFromEnv(env);
			await sendFormMail(rpc, buildContactMail({ name, email, phone, company, subject, question }));
		} catch (err) {
			console.error('Contact form: Odoo mail failed', err);
			return fail(502, {
				message: 'We could not send your message right now. Please try again or email info@code.pr directly.',
				values: { name, phone, email, company, subject, question }
			});
		}

		redirect(303, '/contactus-thank-you');
	}
};
