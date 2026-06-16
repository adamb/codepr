<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import type { ActionData } from './$types';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();
</script>

<SEO
	title="Contact Us"
	description="Contact us about anything related to our company or services. We'll do our best to get back to you as soon as possible."
	canonical="https://code.pr/contactus"
/>

<section class="page-hero">
	<div class="container">
		<h1>Contact Us</h1>
		<p class="page-lead">Tell us about your project or ask us anything. We respond within one business day.</p>
	</div>
</section>

<div class="page-body">
	<div class="container contact-layout">
		<aside class="contact-aside">
			<div class="contact-card">
				<h3>Code Puerto Rico, LLC</h3>

				<div class="contact-item">
					<div class="contact-icon">
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
							<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
						</svg>
					</div>
					<div>
						<strong>Address</strong>
						<p>1550 PR-25, 2nd Floor<br />San Juan, PR 00909</p>
					</div>
				</div>

				<div class="contact-item">
					<div class="contact-icon">
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
							<path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
						</svg>
					</div>
					<div>
						<strong>Phone</strong>
						<p><a href="tel:+17872969300">+1 787-296-9300</a></p>
					</div>
				</div>

				<div class="contact-item">
					<div class="contact-icon">
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
							<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
						</svg>
					</div>
					<div>
						<strong>Email</strong>
						<p><a href="mailto:info@code.pr">info@code.pr</a></p>
					</div>
				</div>
			</div>

			<div class="map-wrap">
				<iframe
					title="Code Puerto Rico Location Map"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.123456789!2d-66.0635!3d18.4035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI0JzEyLjYiTiA2NsKwMDMnNDguNiJX!5e0!3m2!1sen!2sus!4v1234567890"
					width="100%"
					height="240"
					style="border:0; display:block;"
					allowfullscreen={true}
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				>
				</iframe>
			</div>
		</aside>

		<div class="form-section">
			<h2>Send us a message</h2>

			{#if form?.message}
				<div class="form-error" role="alert">
					<p>{form.message}</p>
				</div>
			{/if}

			<form class="contact-form" method="POST" action="?/contact">
				<div class="form-row">
					<div class="form-group">
						<label for="name">Name *</label>
						<input type="text" id="name" name="name" value={form?.values?.name ?? ''} required />
					</div>
					<div class="form-group">
						<label for="phone">Phone</label>
						<input type="tel" id="phone" name="phone" value={form?.values?.phone ?? ''} />
					</div>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="email">Email *</label>
						<input type="email" id="email" name="email" value={form?.values?.email ?? ''} required />
					</div>
					<div class="form-group">
						<label for="company">Company</label>
						<input type="text" id="company" name="company" value={form?.values?.company ?? ''} />
					</div>
				</div>

				<div class="form-group">
					<label for="subject">Subject *</label>
					<input type="text" id="subject" name="subject" value={form?.values?.subject ?? ''} required />
				</div>

				<div class="form-group">
					<label for="question">Message *</label>
					<textarea id="question" name="question" rows="6" required>{form?.values?.question ?? ''}</textarea>
				</div>

				<button type="submit" class="btn btn-lg">Send Message →</button>
			</form>
		</div>
	</div>
</div>

<style>
	.contact-layout {
		display: grid;
		grid-template-columns: 340px 1fr;
		gap: 3.5rem;
		align-items: start;
	}

	.contact-card {
		padding: 1.75rem;
		background: var(--color-dark);
		border-radius: var(--radius-lg);
		margin-bottom: 1rem;
	}

	.contact-card h3 {
		color: #fff;
		font-size: 1rem;
		margin-bottom: 1.5rem;
		font-family: var(--font-mono);
		font-weight: 600;
		letter-spacing: 0;
	}

	.contact-item {
		display: flex;
		gap: 0.875rem;
		margin-bottom: 1.25rem;
	}

	.contact-item:last-child {
		margin-bottom: 0;
	}

	.contact-icon {
		width: 34px;
		height: 34px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.07);
		color: var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.contact-item strong {
		display: block;
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: rgba(255, 255, 255, 0.4);
		margin-bottom: 0.25rem;
	}

	.contact-item p {
		margin: 0;
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.5;
	}

	.contact-item a {
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		transition: color 0.15s;
	}

	.contact-item a:hover {
		color: var(--color-primary);
	}

	.map-wrap {
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--color-border);
	}

	.form-section h2 {
		margin-bottom: 1.5rem;
	}

	.form-error {
		background: #fff5f5;
		border: 1px solid #fed7d7;
		border-radius: var(--radius);
		padding: 1rem 1.25rem;
		margin-bottom: 1.5rem;
		color: #c53030;
	}

	.form-error p {
		margin: 0;
		font-size: 0.9rem;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.form-group label {
		font-weight: 600;
		font-size: 0.85rem;
		color: var(--color-text);
		letter-spacing: -0.01em;
	}

	.form-group input,
	.form-group textarea {
		padding: 0.7rem 0.875rem;
		border: 1.5px solid var(--color-border);
		border-radius: var(--radius);
		font-size: 0.95rem;
		font-family: var(--font-body);
		color: var(--color-text);
		transition: border-color 0.15s, box-shadow 0.15s;
		background: #fff;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px rgba(27, 169, 202, 0.12);
	}

	@media (max-width: 900px) {
		.contact-layout {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
