<!-- Header.svelte -->
<script lang="ts">
	const nav = [
		{ label: 'Home', href: '/' },
		{ label: 'Upcoming Events', href: '/upcoming-events' },
		{ label: 'Workshops', href: '/workshops' },
		{ label: 'Dev Agency', href: '/agency' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'About Us', href: '/about-us' },
		{ label: 'Contact us', href: '/contactus' }
	];
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
			<li><a href="/web/login" class="signin">Sign in</a></li>
			<li><a href="/contactus" class="contact">Contact Us</a></li>
		</ul>
	</nav>
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
		padding: 0.5rem 1rem;
		border-right: 1px solid var(--color-border);
	}

	.logo-link img {
		height: 40px;
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
		font-size: 1rem;
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
		font-size: 0.95rem;
	}

	.utility li {
		display: flex;
		align-items: stretch;
	}

	.signin {
		display: flex;
		align-items: center;
		padding: 0 1rem;
		color: #333;
		font-weight: 700;
		border-left: 1px solid var(--color-border);
	}

	.signin:hover {
		background: #f8f9fa;
		color: var(--color-primary);
		text-decoration: none;
	}

	.contact {
		display: flex;
		align-items: center;
		padding: 0 1rem;
		background: var(--color-primary);
		color: #fff;
		font-weight: 700;
		text-decoration: none;
	}

	.contact:hover {
		background: var(--color-primary-hover);
		text-decoration: none;
	}

	@media (max-width: 900px) {
		.primary {
			display: none;
		}
	}
</style>
