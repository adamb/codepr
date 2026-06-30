<!-- Header.svelte -->
<script lang="ts">
	import { page } from '$app/stores';

	let mobileOpen = $state(false);

	const nav = [
		{ label: 'Events', href: '/upcoming-events' },
		{ label: 'Dev Agency', href: '/agency' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About', href: '/about-us' }
	];

	// Custom CTA for specific pages
	const customCtaPages: Record<string, { label: string; href: string }> = {
		'/events/ai-for-executives': {
			label: 'Register on Eventbrite →',
			href: 'https://www.eventbrite.com/e/1990812678312?aff=oddtdtcreator'
		}
	};

	const ctaOverride = $derived(customCtaPages[$page.url.pathname]);

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
			<img src="/images/logo.webp" alt="Code Puerto Rico" width="100" height="100" />
		</a>
		<ul class="primary">
			{#each nav as { label, href }}
				<li><a {href}>{label}</a></li>
			{/each}
		</ul>
		{#if ctaOverride}
			<a href={ctaOverride.href} class="nav-cta" target={ctaOverride.href.startsWith('http') ? '_blank' : undefined} rel={ctaOverride.href.startsWith('http') ? 'noopener' : undefined}>{ctaOverride.label}</a>
		{:else}
			<a href="/contactus" class="nav-cta">Start a project →</a>
		{/if}
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
			{#if ctaOverride}
				<a href={ctaOverride.href} class="mobile-cta" onclick={closeMobile} target={ctaOverride.href.startsWith('http') ? '_blank' : undefined} rel={ctaOverride.href.startsWith('http') ? 'noopener' : undefined}>{ctaOverride.label}</a>
			{:else}
				<a href="/contactus" class="mobile-cta" onclick={closeMobile}>Start a project →</a>
			{/if}
		</div>
	{/if}
</header>

<style>
	header {
		background: #fff;
		border-bottom: 1px solid var(--color-border);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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
		height: 116px; /* 100px logo + 8px top/bottom padding = matches Odoo */
		gap: 0;
	}

	.logo-link {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		padding: 0.5rem;
		margin-right: 1rem;
		transition: opacity 0.15s;
	}

	.logo-link:hover {
		opacity: 0.85;
	}

	.logo-link img {
		height: 6.25rem; /* matches Odoo logo-height: 6.25rem */
		width: auto;
		display: block;
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
		padding: 0 1rem;
		color: #444;
		font-weight: 500;
		font-size: 0.9rem;
		text-decoration: none;
		border-bottom: 2px solid transparent;
		transition: color 0.15s, border-color 0.15s;
		letter-spacing: -0.01em;
	}

	.primary a:hover {
		color: var(--color-accent);
		border-bottom-color: var(--color-accent);
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
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		cursor: pointer;
		margin-left: auto;
	}

	.mobile-toggle:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.bar {
		display: block;
		width: 18px;
		height: 2px;
		background: #555;
		border-radius: 2px;
	}

	.mobile-nav {
		background: #fff;
		border-top: 1px solid var(--color-border);
		padding: 1rem 1.5rem 1.25rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
	}

	.mobile-links {
		list-style: none;
		margin: 0 0 1rem;
		padding: 0;
	}

	.mobile-links li {
		border-bottom: 1px solid var(--color-border);
	}

	.mobile-links a {
		display: block;
		padding: 0.875rem 0;
		color: #444;
		font-size: 1rem;
		font-weight: 500;
		text-decoration: none;
		transition: color 0.15s;
	}

	.mobile-links a:hover {
		color: var(--color-accent);
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
		}
	}

	@media (min-width: 901px) {
		.mobile-nav {
			display: none;
		}
	}
</style>