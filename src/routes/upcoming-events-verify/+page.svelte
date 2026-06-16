<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Email Verification"
	description="Event signup verification."
	canonical="https://code.pr/upcoming-events-verify"
/>

<section class="verify">
	<h1>Verification Failed</h1>
	<p>The verification link is invalid or has expired.</p>
	<a href="/upcoming-events" class="btn">Back to Events</a>
</section>

<style>
	.verify {
		text-align: center;
		padding: 4rem 2rem;
		background: #f8f9fa;
		border-radius: 12px;
	}

	.verify h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.verify p {
		font-size: 1.125rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		background: var(--color-primary);
		color: white;
	}
</style>
