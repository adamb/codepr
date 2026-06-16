<!-- Header.svelte -->
<script lang="ts">
	let mobileOpen = $state(false);

	const nav = [
		{ label: 'Home', href: '/' },
		{ label: 'Upcoming Events', href: '/upcoming-events' },
		{ label: 'Workshops', href: '/workshops' },
		{ label: 'Dev Agency', href: '/agency' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About Us', href: '/about-us' },
		{ label: 'Contact us', href: '/contactus' }
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
			<img src="/images/logo.webp" alt="Code Puerto Rico Tech Hub" width="95" height="40" />
		</a>
		<ul class="primary">
			{#each nav as { label, href }}
				<li><a {href}>{label}</a></li>
			{/each}
		</ul>
		<ul class="utility">
			<li><a href="/contactus" class="contact">Contact Us</a></li>
		</ul>
		<button
			class="mobile-toggle"
			type="button"
			aria-label="Toggle mobile navigation"
			aria-expanded={mobileOpen}
			aria-controls="mobile-nav"
			onclick={toggleMobile}
			aria-haspopup="true"
		>
			<span class="hamburger" aria-hidden="true"></span>
			<span class="hamburger" aria-hidden="true"></span>
			<span class="hamburger" aria-hidden="true"></span>
		</button>
	</nav>

	{#if mobileOpen}
		<div id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">
			<ul class="mobile-links">
				{#each nav as { label, href }}
					<li><a {href} onclick={closeMobile}>{label}</a></li>
				{/each}
			</ul>
			<a href="/contactus" class="mobile-contact" onclick={closeMobile}>Contact Us</a>
		</div>
	{/if}
</header>

<style>
	header {
		background: #fff;
		border-bottom: 1px solid var(--color-border);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.skip-link {
		position: absolute;
		left: -9999px;
		z-index: 101;
		padding: 0.5rem 1rem;
		background: #000;
		color: #fff;
		border-radius: 0 0 8px 0;
	}

	.skip-link:focus {
		left: 0;
	}

	nav {
		max-width: 1140px;
		margin: 0 auto;
		padding: 0;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		gap: 0;
	}

	.logo-link {
		display: flex;
		align-items: center;
		padding: 0.75rem 1rem;
		border-right: 1px solid var(--color-border);
	}

	.logo-link img {
		height: 46px;
		width: auto;
		display: block;
	}

	.primary {
		display: flex;
		align-items: stretch;
		list-style: none;
		margin: 0;
		padding: 0;
		flex: 1;
	}

	.primary li {
		border-right: 1px solid var(--color-border);
	}

	.primary a {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 1rem;
		color: #333;
		font-weight: 400;
		font-size: 1.05rem;
		text-decoration: none;
		transition: background 0.15s;
	}

	.primary a:hover {
		background: #f8f9fa;
		color: var(--color-primary);
	}

	.utility {
		display: flex;
		align-items: stretch;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 1rem;
	}

	.utility li {
		display: flex;
		align-items: stretch;
	}

	.contact {
		display: flex;
		align-items: center;
		padding: 0 1.25rem;
		background: var(--color-primary);
		color: #fff;
		font-weight: 700;
		text-decoration: none;
	}

	.contact:hover {
		background: var(--color-primary-hover);
		text-decoration: none;
	}

	.mobile-toggle {
		display: none;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 100%;
		padding: 0.75rem 1rem;
		background: transparent;
		border: none;
		border-left: 1px solid var(--color-border);
		cursor: pointer;
		flex-direction: column;
		gap: 5px;
	}

	.mobile-toggle:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: -2px;
	}

	.hamburger {
		display: block;
		width: 24px;
		height: 2px;
		background: #333;
		border-radius: 2px;
		transition: transform 0.2s, opacity 0.2s;
	}

	.mobile-nav {
		display: none;
		background: #fff;
		border-bottom: 1px solid var(--color-border);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
		padding: 1rem;
	}

	.mobile-links {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.mobile-links li {
		border-bottom: 1px solid var(--color-border);
	}

	.mobile-links a {
		display: block;
		padding: 0.875rem 0;
		color: #333;
		font-size: 1.05rem;
		text-decoration: none;
	}

	.mobile-links a:hover {
		color: var(--color-primary);
	}

	.mobile-contact {
		display: block;
		margin-top: 0.75rem;
		padding: 0.875rem 1rem;
		background: var(--color-primary);
		color: #fff;
		font-weight: 700;
		text-align: center;
		border-radius: 6px;
		text-decoration: none;
	}

	.mobile-contact:hover {
		background: var(--color-primary-hover);
		text-decoration: none;
	}

	@media (max-width: 900px) {
		.primary,
		.utility {
			display: none;
		}

		.mobile-toggle {
			display: flex;
		}

		.mobile-nav {
			display: block;
		}
	}
</style>
