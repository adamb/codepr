<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<div class="layout">
	<header>
		<nav>
			<a href="/" class="logo">Code Puerto Rico</a>
			<ul>
				<li><a href="/about-us">About</a></li>
				<li><a href="/agency">Agency</a></li>
				<li><a href="/upcoming-events">Events</a></li>
				<li><a href="/contactus">Contact</a></li>
			</ul>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<p>1550 PR-25, 2nd Floor • San Juan PR 00909</p>
		<p><a href="mailto:info@code.pr">info@code.pr</a> • +1 787-296-9300</p>
	</footer>
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

	header {
		border-bottom: 1px solid #eaeaea;
		padding: 1rem 2rem;
	}

	nav {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-weight: 700;
		font-size: 1.25rem;
		color: #000;
		text-decoration: none;
	}

	nav ul {
		display: flex;
		gap: 2rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	nav a {
		color: #333;
		text-decoration: none;
	}

	nav a:hover {
		color: #0066cc;
	}

	main {
		flex: 1;
		padding: 3rem 2rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	footer {
		border-top: 1px solid #eaeaea;
		padding: 2rem;
		text-align: center;
		color: #666;
		font-size: 0.875rem;
	}

	footer a {
		color: #666;
	}
</style>
