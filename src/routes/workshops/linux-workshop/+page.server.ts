import { buildWorkshopMail, isEmail, odooRpcFromEnv, sendFormMail } from '$lib/server/odoo-mail';
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

		if (!isEmail(email)) {
			return fail(400, {
				message: 'Please enter a valid email address.',
				values: { name, email }
			});
		}

		// Notify info@code.pr through Odoo mail (Postfix → ImprovMX), Reply-To = the registrant.
		try {
			const rpc = await odooRpcFromEnv(env);
			await sendFormMail(rpc, buildWorkshopMail({ name, email }));
		} catch (err) {
			console.error('Workshop registration: Odoo mail failed', err);
			return fail(502, {
				message: 'We could not complete your registration right now. Please try again or email info@code.pr directly.',
				values: { name, email }
			});
		}

		redirect(303, '/upcoming-events-thanks');
	}
};
