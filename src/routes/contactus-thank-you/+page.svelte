<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Thanks for Contacting Us"
	description="Thank you for reaching out to Code Puerto Rico. We'll get back to you as soon as possible."
	canonical="https://code.pr/contactus-thank-you"
/>

<div class="page-body container">
	<section class="thanks">
		<h1>Thanks for reaching out!</h1>
		<p>We've received your message and will get back to you as soon as possible.</p>
		<a href="/" class="btn btn-lg">Back to Home</a>
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
	}
</style>
