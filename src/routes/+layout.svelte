<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<div class="layout">
	<Header />

	<main id="wrap">
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		line-height: 1.6;
		color: #1a1a1a;
	}

	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
		padding: 2rem 1.5rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}
</style>
