<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Email Verification"
	description="Event signup verification."
	canonical="https://code.pr/upcoming-events-verify"
/>

<div class="page-body container">
	<section class="verify">
		<h1>Verification Failed</h1>
		<p>The verification link is invalid or has expired.</p>
		<a href="/upcoming-events" class="btn btn-lg">Back to Events</a>
	</section>
</div>

<style>
	.verify {
		text-align: center;
		padding: 5rem 2rem;
	}

	.verify h1 {
		margin-bottom: 1rem;
	}

	.verify p {
		font-size: 1.1rem;
		color: var(--color-text-muted);
		margin-bottom: 2rem;
	}
</style>
