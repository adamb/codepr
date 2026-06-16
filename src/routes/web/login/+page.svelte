<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Sign in"
	description="Sign in to Code Puerto Rico."
	canonical="https://code.pr/web/login"
/>

<section class="login">
	<h1>Sign in</h1>
	<p>This is a static mirror of the public Code Puerto Rico website. The members-only portal is not available here.</p>
	<a href="/" class="btn">Back to home</a>
</section>

<style>
	.login {
		text-align: center;
		padding: 4rem 2rem;
		background: #f8f9fa;
		border-radius: 12px;
	}

	.login h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.login p {
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
