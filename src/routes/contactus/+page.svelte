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

<h1>Contact us</h1>

<p class="lead">Contact us about anything related to our company or services.<br />We'll do our best to get back to you as soon as possible.</p>

<section class="contact-info">
	<div class="contact-card">
		<h2>Code Puerto Rico, LLC</h2>

		<div class="contact-item">
			<span class="icon">📍</span>
			<div>
				<strong>Address</strong>
				<p>1550 PR-25 2nd Floor<br />San Juan, PR 00909</p>
			</div>
		</div>

		<div class="contact-item">
			<span class="icon">📞</span>
			<div>
				<strong>Phone</strong>
				<p><a href="tel:+17872969300">+1 787-296-9300</a></p>
			</div>
		</div>

		<div class="contact-item">
			<span class="icon">✉️</span>
			<div>
				<strong>Email</strong>
				<p><a href="mailto:info@code.pr">info@code.pr</a></p>
			</div>
		</div>
	</div>

	<div class="map">
		<iframe
			title="Code Puerto Rico Location Map"
			src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.123456789!2d-66.0635!3d18.4035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI0JzEyLjYiTiA2NsKwMDMnNDguNiJX!5e0!3m2!1sen!2sus!4v1234567890"
			width="100%"
			height="400"
			style="border:0; border-radius: 12px;"
			allowfullscreen={true}
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		>
		</iframe>
	</div>
</section>

<section class="form-section">
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
				<label for="phone">Phone Number</label>
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
			<label for="question">Question *</label>
			<textarea id="question" name="question" rows="6" required>{form?.values?.question ?? ''}</textarea>
		</div>

		<button type="submit" class="btn primary">Send Message →</button>
	</form>
</section>

<style>
	.lead {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 3rem;
	}

	.contact-info {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.contact-card {
		padding: 2rem;
		background: #f8f9fa;
		border-radius: 12px;
	}

	.contact-card h2 {
		margin-top: 0;
		margin-bottom: 1.5rem;
	}

	.contact-item {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.contact-item:last-child {
		margin-bottom: 0;
	}

	.icon {
		font-size: 1.5rem;
	}

	.contact-item strong {
		display: block;
		margin-bottom: 0.25rem;
		color: var(--color-primary);
	}

	.contact-item p {
		margin: 0;
	}

	.contact-item a {
		color: #333;
		text-decoration: none;
	}

	.contact-item a:hover {
		color: var(--color-primary);
	}

	.map {
		border-radius: 12px;
		overflow: hidden;
	}

	.form-section {
		max-width: 700px;
	}

	.form-error {
		background: #fff5f5;
		border: 1px solid #feb2b2;
		border-radius: 8px;
		padding: 1rem 1.25rem;
		margin-bottom: 1.5rem;
		color: #c53030;
	}

	.form-error p {
		margin: 0;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-weight: 600;
		color: #333;
	}

	.form-group input,
	.form-group textarea {
		padding: 0.75rem;
		border: 1px solid #eaeaea;
		border-radius: 8px;
		font-size: 1rem;
		font-family: inherit;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(27, 169, 202, 0.1);
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		border: 2px solid var(--color-primary);
		background: var(--color-primary);
		color: white;
		cursor: pointer;
		font-size: 1rem;
		transition: background 0.2s, border-color 0.2s;
	}

	.btn:hover {
		background: var(--color-primary-dark);
		border-color: var(--color-primary-dark);
	}

	@media (max-width: 768px) {
		.contact-info,
		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
