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
			<img src="/images/logo.webp" alt="Code Puerto Rico Tech Hub" width="180" height="40" />
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
		border-bottom: 1px solid #eaeaea;
		background: #fff;
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
		max-width: 1200px;
		margin: 0 auto;
		padding: 0.75rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.logo-link img {
		height: 40px;
		width: auto;
		display: block;
	}

	.primary {
		display: flex;
		gap: 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.primary a {
		color: #333;
		font-weight: 500;
		font-size: 0.95rem;
		text-decoration: none;
	}

	.primary a:hover {
		color: #0066cc;
		text-decoration: underline;
	}

	.utility {
		display: flex;
		align-items: center;
		gap: 1rem;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 0.9rem;
	}

	.signin {
		color: #666;
	}

	.contact {
		background: #667eea;
		color: #fff;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		font-weight: 600;
	}

	.contact:hover {
		background: #5568d3;
	}

	@media (max-width: 900px) {
		.primary {
			display: none;
		}
	}
</style>
