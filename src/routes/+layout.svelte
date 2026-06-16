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
	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
		width: 100%;
	}
</style>
