<!-- Header.svelte -->
<script lang="ts">
	let mobileOpen = $state(false);

	const nav = [
		{ label: 'Events', href: '/upcoming-events' },
		{ label: 'Workshops', href: '/workshops' },
		{ label: 'Dev Agency', href: '/agency' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About', href: '/about-us' },
		{ label: 'Pricing', href: '/pricing' }
	];

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<header>
	<a href="#wrap" class="skip-link">Skip to Content</a>
	<nav aria-label="Main navigation">
		<a href="/" class="logo-link" aria-label="Code Puerto Rico Tech Hub home">
			<img src="/images/logo.webp" alt="Code Puerto Rico" width="95" height="40" />
		</a>
		<ul class="primary">
			{#each nav as { label, href }}
				<li><a {href}>{label}</a></li>
			{/each}
		</ul>
		<a href="/contactus" class="nav-cta">Start a project →</a>
		<button
			class="mobile-toggle"
			type="button"
			aria-label="Toggle mobile navigation"
			aria-expanded={mobileOpen}
			aria-controls="mobile-nav"
			onclick={toggleMobile}
			aria-haspopup="true"
		>
			<span class="bar" aria-hidden="true"></span>
			<span class="bar" aria-hidden="true"></span>
			<span class="bar" aria-hidden="true"></span>
		</button>
	</nav>

	{#if mobileOpen}
		<div id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">
			<ul class="mobile-links">
				{#each nav as { label, href }}
					<li><a {href} onclick={closeMobile}>{label}</a></li>
				{/each}
			</ul>
			<a href="/contactus" class="mobile-cta" onclick={closeMobile}>Start a project →</a>
		</div>
	{/if}
</header>

<style>
	header {
		background: var(--color-dark);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.skip-link {
		position: absolute;
		left: -9999px;
		z-index: 101;
		padding: 0.5rem 1rem;
		background: var(--color-primary);
		color: #fff;
		border-radius: 0 0 var(--radius) 0;
		font-weight: 600;
	}

	.skip-link:focus {
		left: 0;
	}

	nav {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 0 1.5rem;
		display: flex;
		align-items: center;
		height: 64px;
		gap: 0;
	}

	.logo-link {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		margin-right: 2rem;
		opacity: 0.92;
		transition: opacity 0.15s;
	}

	.logo-link:hover {
		opacity: 1;
	}

	.logo-link img {
		height: 36px;
		width: auto;
		display: block;
		filter: brightness(0) invert(1);
	}

	.primary {
		display: flex;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
		flex: 1;
		gap: 0;
		height: 100%;
	}

	.primary li {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.primary a {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 0.875rem;
		color: rgba(255, 255, 255, 0.65);
		font-weight: 500;
		font-size: 0.9rem;
		text-decoration: none;
		border-bottom: 2px solid transparent;
		transition: color 0.15s, border-color 0.15s;
		letter-spacing: -0.01em;
	}

	.primary a:hover {
		color: #fff;
		border-bottom-color: var(--color-primary);
	}

	.nav-cta {
		display: inline-flex;
		align-items: center;
		padding: 0.55rem 1.25rem;
		background: var(--color-primary);
		color: #fff;
		font-family: var(--font-headings);
		font-weight: 600;
		font-size: 0.875rem;
		border-radius: var(--radius);
		text-decoration: none;
		letter-spacing: -0.01em;
		transition: background 0.15s;
		flex-shrink: 0;
		margin-left: 1rem;
	}

	.nav-cta:hover {
		background: var(--color-primary-hover);
		color: #fff;
		text-decoration: none;
		transform: none;
	}

	.mobile-toggle {
		display: none;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
		width: 40px;
		height: 40px;
		padding: 0;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--radius);
		cursor: pointer;
		margin-left: 0.75rem;
	}

	.mobile-toggle:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.bar {
		display: block;
		width: 18px;
		height: 2px;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 2px;
	}

	.mobile-nav {
		background: #111d2c;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		padding: 1rem 1.5rem 1.25rem;
	}

	.mobile-links {
		list-style: none;
		margin: 0 0 1rem;
		padding: 0;
	}

	.mobile-links li {
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
	}

	.mobile-links a {
		display: block;
		padding: 0.875rem 0;
		color: rgba(255, 255, 255, 0.75);
		font-size: 1rem;
		font-weight: 500;
		text-decoration: none;
		transition: color 0.15s;
	}

	.mobile-links a:hover {
		color: #fff;
	}

	.mobile-cta {
		display: block;
		padding: 0.8rem 1rem;
		background: var(--color-primary);
		color: #fff;
		font-family: var(--font-headings);
		font-weight: 600;
		text-align: center;
		border-radius: var(--radius);
		text-decoration: none;
		font-size: 0.95rem;
	}

	.mobile-cta:hover {
		background: var(--color-primary-hover);
		text-decoration: none;
		color: #fff;
	}

	@media (max-width: 900px) {
		.primary,
		.nav-cta {
			display: none;
		}

		.mobile-toggle {
			display: flex;
			margin-left: auto;
		}
	}

	@media (min-width: 901px) {
		.mobile-nav {
			display: none;
		}
	}
</style>
