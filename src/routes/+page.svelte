<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Code Puerto Rico | Tech Hub, Coworking & Events in San Juan"
	description="A tech hub in San Juan offering coworking, community events, and a space for builders, founders, and creatives. Join Puerto Rico's growing tech ecosystem."
	canonical="https://code.pr/"
/>

<!-- Hero Cover -->
<section class="hero-cover">
	<div class="hero-overlay"></div>
	<div class="container">
		<div class="hero-content">
			<h1>Puerto Rico's tech hub for builders, founders & innovators.</h1>
			<p><a href="/upcoming-events" class="btn btn-lg btn-white">See upcoming events</a></p>
		</div>
	</div>
</section>

<!-- Agency Section -->
<section class="agency-section">
	<div class="container">
		<div class="agency-grid">
			<div class="agency-text">
				<div class="section-tag">New</div>
				<h2>We now build software<br />for <em>your</em> business too.</h2>
				<p>Our new <strong>Development Agency</strong> puts Code PR's best Holberton-trained engineers on your project — delivering professional websites and modern CRM systems with AI-First workflows at nearshore rates.</p>

				<div class="agency-services">
					<div class="agency-service">
						<div class="service-icon-sm">🌐</div>
						<div>
							<h4>Website Development</h4>
							<p>React, Next.js, WordPress, Webflow — mobile-responsive, SEO-optimized, built to last. Starting at $3,000.</p>
						</div>
					</div>
					<div class="agency-service">
						<div class="service-icon-sm">🔄</div>
						<div>
							<h4>CRM Outmigration (Salesforce → Odoo)</h4>
							<p>Move off Salesforce to open-source Odoo. Typical savings: 60–80% on licensing. Full data migration included.</p>
						</div>
					</div>
				</div>

				<div class="agency-cta">
					<a href="/agency" class="btn-accent">See all services</a>
					<a href="/contactus" class="btn-ghost">Start a project →</a>
				</div>
			</div>

			<div class="agency-side">
				<div class="agency-stats-grid">
					<div class="agency-stat">
						<div class="num">9<span>mo</span></div>
						<div class="label">Holberton Training</div>
					</div>
					<div class="agency-stat">
						<div class="num">AI</div>
						<div class="label">First Workflows</div>
					</div>
					<div class="agency-stat">
						<div class="num">60%</div>
						<div class="label">Avg CRM Savings</div>
					</div>
					<div class="agency-stat">
						<div class="num">PR</div>
						<div class="label">Nearshore Talent</div>
					</div>
				</div>

				<div class="agency-proof">
					<h4>🔨 Current Projects</h4>
					<div class="proof-item"><span class="proof-dot"></span><span>Advent-Morro Equity Partners — website</span></div>
					<div class="proof-item"><span class="proof-dot"></span><span>Local Brewing Company — website</span></div>
					<div class="proof-item"><span class="proof-dot"></span><span>Code PR — Salesforce → Odoo migration</span></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- What We Offer -->
<section class="offerings">
	<div class="container">
		<h2>What we offer</h2>
		<p class="lead">A tech-forward space for coworking, events, and community in San Juan.</p>

		<div class="offerings-grid">
			<div class="offering">
				<hr />
				<div class="offering-icon">
					<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
						<path fill="currentColor" d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
					</svg>
				</div>
				<h3 class="offering-title">Bespoke Dev Agency</h3>
				<p>Our development agency puts Holberton-trained engineers on your project — websites, CRM migrations, and custom software at nearshore rates.</p>
			</div>
			<div class="offering">
				<hr />
				<div class="offering-icon">
					<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
						<path fill="currentColor" d="M7 2v11h3v9l7-12h-4l4-8z" />
					</svg>
				</div>
				<h3 class="offering-title">Events & Meetups</h3>
				<p>Workshops, lightning talks, hack nights, and community gatherings that bring Puerto Rico's tech scene together.</p>
			</div>
			<div class="offering">
				<hr />
				<div class="offering-icon">
					<svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
						<path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
					</svg>
				</div>
				<h3 class="offering-title">Tech Community</h3>
				<p>Connect with developers, founders, designers, and remote workers building cool things in Puerto Rico.</p>
			</div>
		</div>
	</div>
</section>

<!-- Community CTA -->
<section class="community">
	<div class="community-shape"></div>
	<div class="container community-content">
		<h2>More Than a Space — A Tech Hub</h2>
		<p>Code Puerto Rico is where the island's tech community comes together. We host lightning talks, hack nights, workshops, demo days, and community meetups — all in our San Juan space. Whether you want to learn, present, or just meet other builders, there's something on the calendar for you.</p>
		<p>We also run Holberton Coding School Puerto Rico out of the same building, so you'll be surrounded by students, alumni, and mentors who are all building things.</p>
		<p class="community-actions">
			<a href="/upcoming-events" class="btn">See upcoming events</a>
			<a href="/about-us" class="btn btn-outline">About us</a>
		</p>
	</div>
</section>

<style>
	/* Hero Cover */
	.hero-cover {
		position: relative;
		display: flex;
		align-items: center;
		padding: 96px 0;
		background: url('/images/cover.jpg') center center / cover no-repeat;
		width: 100%;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 66.6667%;
		color: #fff;
	}

	.hero-content h1 {
		font-size: calc(1.5125rem + 3.15vw);
		font-weight: 700;
		line-height: 1.2;
		color: #fff;
		margin-bottom: 1.5rem;
	}

	@media (min-width: 1200px) {
		.hero-content h1 {
			font-size: 3.875rem;
		}
	}

	/* Agency Section */
	.agency-section {
		background: linear-gradient(135deg, #0d1f3c 0%, #1b3b6b 100%);
		padding: 80px 0;
		width: 100%;
	}

	.section-tag {
		display: inline-block;
		background: rgba(249, 115, 22, 0.2);
		color: #fdba74;
		padding: 0.25rem 0.75rem;
		border-radius: 100px;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin-bottom: 0.875rem;
	}

	.agency-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 56px;
		align-items: center;
	}

	.agency-text h2 {
		font-size: clamp(1.7rem, 3vw, 2.3rem);
		font-weight: 800;
		color: #fff;
		margin-bottom: 1.25rem;
		line-height: 1.2;
	}

	.agency-text h2 em {
		font-style: normal;
		color: #f97316;
	}

	.agency-text p {
		color: rgba(255, 255, 255, 0.72);
		font-size: 0.95rem;
		line-height: 1.75;
		margin-bottom: 1rem;
	}

	.agency-text strong {
		color: #fff;
	}

	.agency-services {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1.75rem 0;
	}

	.agency-service {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		padding: 1.25rem;
	}

	.service-icon-sm {
		font-size: 1.4rem;
		width: 44px;
		height: 44px;
		background: rgba(249, 115, 22, 0.15);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.agency-service h4 {
		font-size: 0.95rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 0.25rem;
	}

	.agency-service p {
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.5;
		margin: 0;
	}

	.agency-cta {
		display: flex;
		gap: 0.875rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}

	.btn-accent {
		background: #f97316;
		color: #fff;
		padding: 0.8rem 1.75rem;
		border-radius: 8px;
		font-weight: 700;
		font-size: 0.95rem;
		transition: all 0.2s;
		display: inline-block;
		border: 2px solid #f97316;
		text-decoration: none;
	}

	.btn-accent:hover {
		background: #ea6d0c;
		border-color: #ea6d0c;
		transform: translateY(-1px);
		text-decoration: none;
	}

	.btn-ghost {
		background: transparent;
		color: rgba(255, 255, 255, 0.8);
		padding: 0.8rem 1.75rem;
		border-radius: 8px;
		font-weight: 600;
		font-size: 0.95rem;
		transition: all 0.2s;
		display: inline-block;
		border: 2px solid rgba(255, 255, 255, 0.25);
		text-decoration: none;
	}

	.btn-ghost:hover {
		border-color: rgba(255, 255, 255, 0.6);
		color: #fff;
		text-decoration: none;
	}

	.agency-stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.agency-stat {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		padding: 1.5rem;
		text-align: center;
	}

	.agency-stat .num {
		font-size: 2rem;
		font-weight: 900;
		color: #f97316;
		line-height: 1;
	}

	.agency-stat .num span {
		font-size: 1rem;
		margin-left: 0.1rem;
	}

	.agency-stat .label {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.5);
		margin-top: 0.375rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.agency-proof {
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		padding: 1.5rem;
		margin-top: 1rem;
	}

	.agency-proof h4 {
		font-size: 0.8rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.875rem;
	}

	.proof-item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.07);
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.7);
	}

	.proof-item:first-of-type {
		border-top: none;
		padding-top: 0;
	}

	.proof-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
		background: #f97316;
	}

	/* What We Offer */
	.offerings {
		padding: 64px 0;
	}

	.offerings :global(h2) {
		font-size: calc(1.425rem + 2.1vw);
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	@media (min-width: 1200px) {
		.offerings :global(h2) {
			font-size: 3rem;
		}
	}

	.offerings :global(.lead) {
		font-size: 1.125rem;
		font-weight: 300;
		color: var(--color-text-muted);
	}

	.offerings-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin-top: 2rem;
	}

	.offering {
		padding: 1rem 0.5rem;
	}

	.offering hr {
		width: 100%;
		border: 0;
		border-top: 1px solid var(--color-border);
		margin: 0 0 1.5rem;
	}

	.offering-icon {
		width: 56px;
		height: 56px;
		border-radius: 10px;
		background: rgba(249, 115, 22, 0.1);
		color: var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.offering-title {
		font-size: 1.35rem;
		font-weight: 700;
		margin-bottom: 0.625rem;
		font-family: var(--font-headings);
		letter-spacing: -0.02em;
	}

	.offering p {
		color: #212529;
		font-size: 0.95rem;
		line-height: 1.6;
		margin-bottom: 0;
	}

	/* Community */
	.community {
		position: relative;
		padding: 96px 0;
		background: #fff;
		overflow: hidden;
		width: 100%;
	}

	.community-shape {
		position: absolute;
		inset: 0;
		background: url('/images/hero-shape.svg') center center / cover no-repeat;
		opacity: 0.35;
		z-index: 0;
	}

	.community-content {
		position: relative;
		z-index: 1;
		max-width: 66.6667%;
	}

	.community-content h2 {
		margin-bottom: 1.25rem;
	}

	.community-content p {
		color: var(--color-text-muted);
		font-size: 1rem;
		line-height: 1.7;
	}

	.community-actions {
		margin-top: 1.5rem;
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.community-actions .btn-outline {
		margin-left: 0;
	}

	@media (max-width: 900px) {
		.hero-content,
		.community-content {
			max-width: 100%;
		}

		.agency-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.agency-stats-grid {
			grid-template-columns: repeat(4, 1fr);
		}

		.offerings-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.hero-cover,
		.community {
			padding: 64px 0;
		}

		.agency-section {
			padding: 64px 0;
		}

		.agency-stats-grid {
			grid-template-columns: 1fr 1fr;
		}

		.offerings {
			padding: 48px 0;
		}
	}
</style>
