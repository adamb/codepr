import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

// Landing page for Instagram / ManyChat DM links, e.g.
//   https://code.pr/start?service=seminar&name=Ana&ig=ana_pr&lang=es
// Submissions are POSTed to an n8n webhook (CODEPR_START_WEBHOOK_URL) which dedups and
// creates a crm.lead in the "Code PR Services" team. See adamb/N8N_CodePR codepr-start/README.md.
const SERVICES = ['seminar', 'migration', 'web-seo', 'ai-content'] as const;
type Service = (typeof SERVICES)[number];
const asService = (v: string | null): Service =>
	(SERVICES as readonly string[]).includes(v ?? '') ? (v as Service) : 'seminar';
const p = (url: URL, k: string, n = 120) => (url.searchParams.get(k) ?? '').trim().slice(0, n);

export const load: PageServerLoad = ({ url }) => {
	return {
		prefill: {
			service: asService(url.searchParams.get('service')),
			lang: p(url, 'lang', 5) === 'es' ? 'es' : 'en',
			name: p(url, 'name'),
			email: p(url, 'email', 160),
			whatsapp: p(url, 'whatsapp', 40) || p(url, 'phone', 40),
			ig: p(url, 'ig', 60).replace(/^@/, ''),
			subscriber_id: p(url, 'sid', 80),
			source: p(url, 'utm_source', 60) || 'Instagram',
			medium: p(url, 'utm_medium', 60) || 'ManyChat',
			campaign: p(url, 'utm_campaign', 80)
		}
	};
};

export const actions: Actions = {
	default: async ({ request, url }) => {
		const d = await request.formData();
		const g = (k: string, n = 200) => String(d.get(k) ?? '').trim().slice(0, n);
		const values = {
			name: g('name', 120),
			email: g('email', 160),
			whatsapp: g('whatsapp', 40),
			note: g('note', 500)
		};
		const lang = g('lang', 5) === 'es' ? 'es' : 'en';
		const es = lang === 'es';

		// Honeypot: real people never fill the hidden "website" field. Pretend success.
		if (g('website')) return { success: true };

		if (!values.name || !values.email || !values.whatsapp) {
			return fail(400, { message: es ? 'Completa los campos requeridos.' : 'Please fill out all required fields.', values });
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
			return fail(400, { message: es ? 'Escribe un email válido.' : 'Please enter a valid email address.', values });
		}
		if (values.whatsapp.replace(/\D/g, '').length < 7) {
			return fail(400, { message: es ? 'Escribe un número de WhatsApp válido.' : 'Please enter a valid WhatsApp number.', values });
		}

		const hook = env.CODEPR_START_WEBHOOK_URL;
		const errMsg = es
			? 'No pudimos registrar tu información. Intenta de nuevo o escríbenos a info@code.pr.'
			: 'We could not save your signup right now. Please try again or email info@code.pr.';
		if (!hook) {
			console.error('/start: CODEPR_START_WEBHOOK_URL is not configured');
			return fail(503, { message: errMsg, values });
		}
		try {
			const res = await fetch(hook, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-codepr-start-secret': env.CODEPR_START_WEBHOOK_SECRET ?? ''
				},
				body: JSON.stringify({
					...values,
					service: asService(g('service', 30)),
					ig: g('ig', 60).replace(/^@/, ''),
					subscriber_id: g('subscriber_id', 80),
					source: g('source', 60) || 'Instagram',
					medium: g('medium', 60) || 'ManyChat',
					campaign: g('campaign', 80),
					lang,
					page: url.hostname + url.pathname
				})
			});
			if (!res.ok) {
				console.error('/start webhook error', res.status, await res.text());
				return fail(502, { message: errMsg, values });
			}
		} catch (e) {
			console.error('/start webhook exception', e);
			return fail(502, { message: errMsg, values });
		}
		return { success: true };
	}
};
