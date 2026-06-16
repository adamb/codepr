<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import type { ActionData } from './$types';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();
</script>

<SEO
	title="Linux Workshop"
	description="Defenestration Workshop: Installing Linux on Your PC. A free, hands-on workshop at Code Puerto Rico."
	canonical="https://code.pr/workshops/linux-workshop"
/>

<section class="page-hero">
	<div class="container">
		<span class="eyebrow">Free Workshop · May 26, 2026</span>
		<h1>Defenestration Workshop</h1>
		<p class="page-lead">Installing Linux on Your PC — a free, hands-on 2-hour session at Code Puerto Rico.</p>
	</div>
</section>

<div class="page-body">
	<div class="container content-layout">

		<div class="main-content">
			<div class="detail-card">
				<div class="detail-row">
					<span class="detail-label">Date</span>
					<span>Tuesday, May 26, 2026 · 6:00 PM – 8:00 PM AST</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Location</span>
					<a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a>
				</div>
				<div class="detail-row">
					<span class="detail-label">Cost</span>
					<span>Free</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Instructor</span>
					<a href="https://reala.io/about-us" target="_blank" rel="noopener">Owen</a>
				</div>
			</div>

			<section class="about">
				<h2>About This Workshop</h2>
				<p>Join <a href="https://reala.io/about-us" target="_blank" rel="noopener">Owen</a> for this free, hands-on, 2-hour workshop designed to help you take control of your computer and explore a third option beyond Windows or Mac. Ideal for people who want to become more technical but are unsure where to start.</p>
				<p>We will guide you through the process of installing Linux on your PC — covering BIOS unlocking, booting from a flash drive, full installation, and a test drive. The focus is on physical PC installation, not a VM or macOS.</p>
			</section>

			<section class="what-youll-do">
				<h2>What You'll Do</h2>
				<ul class="steps-list">
					<li>Learn why Linux is a powerful, free alternative to Windows and Mac.</li>
					<li>Unlock your PC's BIOS and configure it to boot from a flash drive.</li>
					<li>Walk through a full Linux installation step by step.</li>
					<li>Take your new Linux setup for a test drive.</li>
				</ul>

				<div class="warning-box">
					<h3>Mandatory Prerequisites</h3>
					<ul>
						<li><strong>Bring Your Own Computer (BYOC):</strong> You must bring your own working condition PC/laptop. MacBooks are not supported.</li>
						<li><strong>Data Backup Required:</strong> Installing Linux will remove all existing data from the computer. Back up everything you need before attending.</li>
					</ul>
				</div>
			</section>
		</div>

		<aside class="register-aside">
			<div class="register-card">
				<h2>Register</h2>

				{#if form?.message}
					<div class="form-error" role="alert">
						<p>{form.message}</p>
					</div>
				{/if}

				<form class="registration-form" method="POST" action="?/register">
					<div class="form-group">
						<label for="name">Name *</label>
						<input type="text" id="name" name="name" value={form?.values?.name ?? ''} required />
					</div>
					<div class="form-group">
						<label for="email">Email *</label>
						<input type="email" id="email" name="email" value={form?.values?.email ?? ''} required />
					</div>

					<label class="checkbox">
						<input type="checkbox" name="acknowledgment" required />
						<span>I understand I must bring my own <strong>working condition</strong> PC (not a MacBook). Linux will be installed on it, which will <strong>remove all existing data</strong>. I have backed up everything I need.</span>
					</label>

					<button type="submit" class="btn btn-lg" style="width: 100%;">Register →</button>
				</form>
			</div>
		</aside>

	</div>
</div>

<style>
	.content-layout {
		display: grid;
		grid-template-columns: 1fr 360px;
		gap: 3rem;
		align-items: start;
	}

	.eyebrow {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-accent);
		letter-spacing: 0.06em;
		margin-bottom: 0.75rem;
	}

	.detail-card {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		margin-bottom: 2.5rem;
	}

	.detail-row {
		display: grid;
		grid-template-columns: 100px 1fr;
		gap: 1rem;
		padding: 0.875rem 1.25rem;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.9rem;
		align-items: center;
	}

	.detail-row:last-child {
		border-bottom: none;
	}

	.detail-label {
		font-weight: 700;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-text-muted);
	}

	section {
		margin-bottom: 2.5rem;
	}

	.about h2,
	.what-youll-do h2 {
		font-size: 1.35rem;
		margin-bottom: 0.875rem;
	}

	.about p {
		color: var(--color-text-muted);
		font-size: 0.95rem;
		line-height: 1.7;
	}

	.steps-list {
		color: var(--color-text-muted);
		font-size: 0.95rem;
		margin-bottom: 1.5rem;
	}

	.steps-list li {
		margin-bottom: 0.5rem;
	}

	.warning-box {
		background: #fffbf0;
		border: 1px solid #fde68a;
		border-left: 3px solid #f59e0b;
		border-radius: var(--radius);
		padding: 1.25rem 1.5rem;
	}

	.warning-box h3 {
		font-size: 0.9rem;
		margin-bottom: 0.75rem;
		color: #92400e;
	}

	.warning-box ul {
		font-size: 0.9rem;
		color: #78350f;
		margin: 0;
	}

	.warning-box li {
		margin-bottom: 0.625rem;
	}

	/* Register aside */
	.register-card {
		background: var(--color-dark);
		border-radius: var(--radius-lg);
		padding: 2rem;
		position: sticky;
		top: 96px;
	}

	.register-card h2 {
		color: #fff;
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.form-error {
		background: rgba(220, 38, 38, 0.1);
		border: 1px solid rgba(220, 38, 38, 0.3);
		border-radius: var(--radius);
		padding: 0.875rem 1rem;
		margin-bottom: 1.25rem;
		color: #fca5a5;
	}

	.form-error p {
		margin: 0;
		font-size: 0.875rem;
	}

	.registration-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.form-group label {
		font-weight: 600;
		font-size: 0.82rem;
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.form-group input {
		padding: 0.7rem 0.875rem;
		border: 1.5px solid rgba(255, 255, 255, 0.12);
		border-radius: var(--radius);
		font-size: 0.95rem;
		font-family: var(--font-body);
		color: #fff;
		background: rgba(255, 255, 255, 0.06);
		transition: border-color 0.15s;
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.checkbox {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		cursor: pointer;
	}

	.checkbox input {
		margin-top: 0.25rem;
		flex-shrink: 0;
	}

	.checkbox span {
		font-size: 0.82rem;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.55;
	}

	.checkbox strong {
		color: rgba(255, 255, 255, 0.85);
	}

	@media (max-width: 900px) {
		.content-layout {
			grid-template-columns: 1fr;
		}

		.register-card {
			position: static;
		}
	}
</style>
