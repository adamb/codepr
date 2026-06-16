<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title={data.verified ? 'Email Verified — Code Puerto Rico' : 'Verification Failed'}
	description="Event notification verification for Code Puerto Rico."
	canonical="https://code.pr/upcoming-events/verify"
/>

<section class="page-hero">
	<div class="container">
		{#if data.verified}
			<h1>You're in!</h1>
			<p class="page-lead">We'll email you when your selected events are scheduled.</p>
		{:else}
			<h1>Verification Failed</h1>
			<p class="page-lead">{data.message}</p>
		{/if}
	</div>
</section>

<div class="page-body">
	<div class="container verify-body">
		{#if data.verified}
			<div class="verify-card success">
				<div class="icon">✓</div>
				<h2>Email confirmed{data.name ? `, ${data.name}` : ''}!</h2>
				<p>We've saved your event preferences. When any of your selected events get scheduled, we'll send you a heads-up.</p>
				<a href="/upcoming-events" class="btn">Back to Events →</a>
			</div>
		{:else}
			<div class="verify-card error">
				<div class="icon">✕</div>
				<h2>Link not valid</h2>
				<p>{data.message}</p>
				<a href="/upcoming-events" class="btn">Try again →</a>
			</div>
		{/if}
	</div>
</div>

<style>
	.verify-body {
		display: flex;
		justify-content: center;
		padding-top: 2rem;
	}

	.verify-card {
		max-width: 480px;
		width: 100%;
		text-align: center;
		padding: 3rem 2rem;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
	}

	.verify-card.success {
		border-color: var(--color-accent);
		background: rgba(27, 169, 202, 0.04);
	}

	.verify-card.error {
		border-color: #fca5a5;
		background: rgba(220, 38, 38, 0.04);
	}

	.icon {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 auto 1.5rem;
	}

	.success .icon {
		background: rgba(27, 169, 202, 0.15);
		color: var(--color-accent);
	}

	.error .icon {
		background: rgba(220, 38, 38, 0.1);
		color: #dc2626;
	}

	.verify-card h2 {
		font-size: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.verify-card p {
		color: var(--color-text-muted);
		margin-bottom: 1.75rem;
		font-size: 0.95rem;
		line-height: 1.6;
	}
</style>
