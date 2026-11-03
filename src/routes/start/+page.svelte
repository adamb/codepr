<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	const f = $derived(data.prefill);
	const es = $derived(f.lang === 'es');

	const COPY = {
		seminar: {
			en: { h: 'Free seminar: turn Instagram comments into leads', s: 'Learn the exact setup we use at Code Puerto Rico: comment, DM, form, CRM. Free tools, no ad budget.', d: "Free · We'll send the date and details by email", b: 'Reserve my spot', ok: "You're in! We'll send the details to your email before the seminar." },
			es: { h: 'Seminario gratis: convierte comentarios de Instagram en clientes', s: 'Aprende el mismo sistema que usamos en Code Puerto Rico: comentario, DM, formulario, CRM. Herramientas gratis, sin presupuesto de anuncios.', d: 'Gratis · Te enviaremos la fecha y los detalles por email', b: 'Reservar mi espacio', ok: '¡Listo! Te enviaremos los detalles por email antes del seminario.' }
		},
		migration: {
			en: { h: 'Move your CRM without losing a lead', s: 'Tell us what you use today and we will map a clean move to Odoo.', d: 'Free first call', b: 'Get in touch', ok: "Thanks! We'll reach out within one business day." },
			es: { h: 'Muda tu CRM sin perder un cliente', s: 'Cuéntanos qué usas hoy y te preparamos una migración limpia a Odoo.', d: 'Primera llamada gratis', b: 'Contáctenme', ok: '¡Gracias! Te contactaremos en un día laborable.' }
		},
		'web-seo': {
			en: { h: 'A website that brings you customers', s: 'Fast, mobile-first sites with SEO built in.', d: 'Free first call', b: 'Get in touch', ok: "Thanks! We'll reach out within one business day." },
			es: { h: 'Una página web que te traiga clientes', s: 'Páginas rápidas, hechas para el celular y con SEO incluido.', d: 'Primera llamada gratis', b: 'Contáctenme', ok: '¡Gracias! Te contactaremos en un día laborable.' }
		},
		'ai-content': {
			en: { h: 'AI-powered social content, reviewed by humans', s: 'A steady calendar of posts and Reels without hiring an agency.', d: 'Free first call', b: 'Get in touch', ok: "Thanks! We'll reach out within one business day." },
			es: { h: 'Contenido para redes con IA, revisado por personas', s: 'Un calendario constante de posts y Reels sin contratar una agencia.', d: 'Primera llamada gratis', b: 'Contáctenme', ok: '¡Gracias! Te contactaremos en un día laborable.' }
		}
	} as const;
	const c = $derived(COPY[f.service][es ? 'es' : 'en']);
	const L = $derived(
		es
			? { name: 'Nombre', email: 'Email', wa: 'WhatsApp', note: '¿Qué te gustaría automatizar? (opcional)', small: 'Solo usaremos tu información para enviarte los detalles y darte seguimiento sobre los servicios de Code Puerto Rico. Nada de spam.', q: '¿Preguntas? Escríbenos a' }
			: { name: 'Name', email: 'Email', wa: 'WhatsApp', note: 'What would you like to automate? (optional)', small: "We'll only use your info to send details and follow up about Code Puerto Rico services. No spam.", q: 'Questions? Write to' }
	);
</script>

<SEO title={c.h} description={c.s} canonical="https://code.pr/start" />

<section class="start">
	<div class="card">
		{#if form?.success}
			<h1>{c.ok}</h1>
			<p class="lead">{L.q} <a href="mailto:info@code.pr">info@code.pr</a>.</p>
		{:else}
			<h1>{c.h}</h1>
			<p class="lead">{c.s}</p>
			<p class="details">{c.d}</p>

			{#if form?.message}<div class="err" role="alert">{form.message}</div>{/if}

			<form method="POST">
				<input type="hidden" name="service" value={f.service} />
				<input type="hidden" name="lang" value={f.lang} />
				<input type="hidden" name="ig" value={f.ig} />
				<input type="hidden" name="subscriber_id" value={f.subscriber_id} />
				<input type="hidden" name="source" value={f.source} />
				<input type="hidden" name="medium" value={f.medium} />
				<input type="hidden" name="campaign" value={f.campaign} />
				<div class="hp" aria-hidden="true">
					<label>Website <input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
				</div>

				<label>{L.name} *
					<input name="name" required autocomplete="name" value={form?.values?.name ?? f.name} />
				</label>
				<label>{L.email} *
					<input name="email" type="email" required autocomplete="email" inputmode="email" value={form?.values?.email ?? f.email} />
				</label>
				<label>{L.wa} *
					<input name="whatsapp" type="tel" required autocomplete="tel" inputmode="tel" placeholder="+1 787 555 1234" value={form?.values?.whatsapp ?? f.whatsapp} />
				</label>
				<label>{L.note}
					<input name="note" maxlength="300" value={form?.values?.note ?? ''} />
				</label>
				<button type="submit" class="btn btn-lg">{c.b} →</button>
				<p class="small">{L.small}</p>
			</form>
		{/if}
	</div>
</section>

<style>
	.start { padding: 1.25rem 1rem 3rem; display: flex; justify-content: center; }
	.card { width: 100%; max-width: 480px; }
	h1 { font-size: clamp(1.5rem, 6vw, 2rem); line-height: 1.2; margin-bottom: 0.75rem; }
	.lead { color: var(--color-text); margin-bottom: 0.5rem; }
	.details { font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-accent); margin-bottom: 1.5rem; }
	form { display: flex; flex-direction: column; gap: 1rem; }
	label { display: flex; flex-direction: column; gap: 0.35rem; font-weight: 600; font-size: 0.9rem; }
	input { padding: 0.8rem 0.9rem; font-size: 16px; border: 1.5px solid var(--color-border); border-radius: var(--radius); font-family: var(--font-body); }
	input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px rgba(27, 169, 202, 0.12); }
	button { width: 100%; }
	.small { font-size: 0.78rem; color: #666; margin: 0; }
	.err { background: #fff5f5; border: 1px solid #fed7d7; color: #c53030; padding: 0.8rem 1rem; border-radius: var(--radius); margin-bottom: 1rem; }
	.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
</style>
