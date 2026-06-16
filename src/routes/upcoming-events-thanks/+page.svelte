<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Thanks (Event Interest)"
	description="Thanks for signing up. We just sent you a verification email."
	canonical="https://code.pr/upcoming-events-thanks"
/>

<div class="page-body container">
	<section class="thanks">
		<h1>Almost there!</h1>
		<p>We just sent you a verification email. Click the link in it to confirm your signup. Check your spam folder if you don't see it within a few minutes.</p>
		<a href="/upcoming-events" class="btn btn-lg">Back to Events</a>
	</section>
</div>

<style>
	.thanks {
		text-align: center;
		padding: 5rem 2rem;
	}

	.thanks h1 {
		margin-bottom: 1rem;
	}

	.thanks p {
		font-size: 1.1rem;
		color: var(--color-text-muted);
		margin-bottom: 2rem;
		max-width: 500px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
