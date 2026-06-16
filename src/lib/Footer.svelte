<!-- Footer.svelte -->
<footer>
	<div class="footer-body">
		<div class="container footer-inner">
			<div class="footer-brand">
				<a href="/" aria-label="Code Puerto Rico home" class="footer-logo-link">
					<img src="/images/code-pr-big.webp" alt="Code Puerto Rico" width="160" height="54" />
				</a>
				<p class="tagline">Puerto Rico's tech hub for builders,<br />founders & innovators.</p>
				<div class="social">
					<a href="https://x.com/codepr" target="_blank" rel="noopener" aria-label="X / Twitter">
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
							<path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
						</svg>
					</a>
					<a href="https://instagram.com/codepr" target="_blank" rel="noopener" aria-label="Instagram">
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
							<path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
						</svg>
					</a>
				</div>
			</div>

			<div class="footer-nav">
				<h4>Explore</h4>
				<ul>
					<li><a href="/upcoming-events">Events</a></li>
					<li><a href="/workshops">Workshops</a></li>
					<li><a href="/agency">Dev Agency</a></li>
					<li><a href="/blog">Blog</a></li>
					<li><a href="/about-us">About Us</a></li>
					<li><a href="/pricing">Pricing</a></li>
				</ul>
			</div>

			<div class="footer-contact">
				<h4>Contact</h4>
				<address>
					<p>1550 PR-25, 2nd Floor<br />San Juan, PR 00909</p>
					<p><a href="tel:+17872969300">+1 787-296-9300</a></p>
					<p><a href="mailto:info@code.pr">info@code.pr</a></p>
				</address>
			</div>
		</div>
	</div>

	<div class="copyright-bar">
		<div class="container">
			<p>Copyright © Code Puerto Rico, LLC</p>
		</div>
	</div>
</footer>

<style>
	footer {
		background: var(--color-dark);
		color: rgba(255, 255, 255, 0.6);
	}

	.footer-body {
		padding: 3.5rem 0 2.5rem;
	}

	.footer-inner {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 3rem;
		align-items: start;
	}

	.footer-logo-link {
		display: inline-block;
		margin-bottom: 1rem;
	}

	.footer-logo-link img {
		height: 48px;
		width: auto;
		display: block;
		opacity: 0.9;
	}

	.tagline {
		font-size: 0.9rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.45);
		margin-bottom: 1.25rem;
	}

	.social {
		display: flex;
		gap: 0.625rem;
	}

	.social a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.07);
		color: rgba(255, 255, 255, 0.6);
		transition: all 0.15s;
	}

	.social a:hover {
		background: var(--color-primary);
		color: #fff;
		text-decoration: none;
	}

	.footer-nav h4,
	.footer-contact h4 {
		font-family: var(--font-headings);
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.35);
		margin-bottom: 1rem;
	}

	.footer-nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.footer-nav a {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.9rem;
		text-decoration: none;
		transition: color 0.15s;
	}

	.footer-nav a:hover {
		color: #fff;
	}

	address {
		font-style: normal;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	address p {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.55;
	}

	address a {
		color: rgba(255, 255, 255, 0.6);
		text-decoration: none;
		transition: color 0.15s;
	}

	address a:hover {
		color: #fff;
	}

	.copyright-bar {
		border-top: 1px solid rgba(255, 255, 255, 0.07);
		padding: 1rem 0;
	}

	.copyright-bar .container {
		display: flex;
		align-items: center;
	}

	.copyright-bar p {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.3);
		margin: 0;
	}

	@media (max-width: 768px) {
		.footer-inner {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}

		.footer-brand {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 480px) {
		.footer-inner {
			grid-template-columns: 1fr;
		}
	}
</style>
