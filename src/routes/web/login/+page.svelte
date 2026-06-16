<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Sign in"
	description="Sign in to Code Puerto Rico."
	canonical="https://code.pr/web/login"
/>

<div class="page-body container">
	<section class="login">
		<h1>Sign in</h1>
		<p>This is a static mirror of the public Code Puerto Rico website. The members-only portal is not available here.</p>
		<a href="/" class="btn btn-lg">Back to home</a>
	</section>
</div>

<style>
	.login {
		text-align: center;
		padding: 5rem 2rem;
	}

	.login h1 {
		margin-bottom: 1rem;
	}

	.login p {
		color: var(--color-text-muted);
		margin-bottom: 2rem;
		max-width: 480px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
