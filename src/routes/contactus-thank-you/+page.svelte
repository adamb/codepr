<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Thanks for Contacting Us"
	description="Thank you for reaching out to Code Puerto Rico. We'll get back to you as soon as possible."
	canonical="https://code.pr/contactus-thank-you"
/>

<section class="thanks">
	<h1>Thanks for reaching out!</h1>
	<p>We've received your message and will get back to you as soon as possible.</p>
	<a href="/" class="btn">Back to Home</a>
</section>

<style>
	.thanks {
		text-align: center;
		padding: 4rem 2rem;
		background: #f8f9fa;
		border-radius: 12px;
	}

	.thanks h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.thanks p {
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
		color: #fff;
	}

	.btn:hover {
		background: var(--color-primary-dark);
	}
</style>
