<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Code Puerto Rico | Tech Hub, Coworking & Events in San Juan"
	description="Puerto Rico's tech hub for builders, founders & innovators. Coworking, events, and a development agency in San Juan."
/>

<section class="hero">
	<div class="hero-content">
		<h1>Puerto Rico's tech hub for builders, founders & innovators.</h1>
		<a href="/upcoming-events" class="cta">See upcoming events</a>
	</div>
</section>

<section class="new">
	<span class="badge">New</span>
	<h2>We now build software<br />for <em>your</em> business too.</h2>
	<p>Our new <strong>Development Agency</strong> puts Code PR's best Holberton-trained engineers on your project — delivering professional websites and modern CRM systems with AI-First workflows at nearshore rates.</p>

	<div class="services">
		<div class="service">
			<span class="icon">🌐</span>
			<h3>Website Development</h3>
			<p>React, Next.js, WordPress, Webflow — mobile-responsive, SEO-optimized, built to last. Starting at $3,000.</p>
		</div>
		<div class="service">
			<span class="icon">🔄</span>
			<h3>CRM Outmigration (Salesforce → Odoo)</h3>
			<p>Move off Salesforce to open-source Odoo. Typical savings: 60–80% on licensing. Full data migration included.</p>
		</div>
	</div>

	<div class="actions">
		<a href="/agency" class="btn">See all services</a>
		<a href="/contactus" class="btn primary">Start a project →</a>
	</div>

	<div class="stats">
		<div class="stat">
			<span class="value">9mo</span>
			<span class="label">Holberton Training</span>
		</div>
		<div class="stat">
			<span class="value">AI</span>
			<span class="label">First Workflows</span>
		</div>
		<div class="stat">
			<span class="value">60%</span>
			<span class="label">Avg CRM Savings</span>
		</div>
		<div class="stat">
			<span class="value">PR</span>
			<span class="label">Nearshore Talent</span>
		</div>
	</div>
</section>

<section class="projects">
	<h3>🔨 Current Projects</h3>
	<ul>
		<li>Advent-Morro Equity Partners — website</li>
		<li>Local Brewing Company — website</li>
		<li>Code PR — Salesforce → Odoo migration</li>
	</ul>
</section>

<section class="offerings">
	<h2>What we offer</h2>
	<p class="lead">A tech-forward space for coworking, events, and community in San Juan.</p>

	<div class="cards">
		<div class="card">
			<h3>Bespoke Dev Agency</h3>
			<p>Our development agency puts Holberton-trained engineers on your project — websites, CRM migrations, and custom software at nearshore rates.</p>
		</div>
		<div class="card">
			<h3>Events & Meetups</h3>
			<p>Workshops, lightning talks, hack nights, and community gatherings that bring Puerto Rico's tech scene together.</p>
		</div>
		<div class="card">
			<h3>Tech Community</h3>
			<p>Connect with developers, founders, designers, and remote workers building cool things in Puerto Rico.</p>
		</div>
	</div>
</section>

<section class="community">
	<h2>More Than a Space — A Tech Hub</h2>
	<p>Code Puerto Rico is where the island's tech community comes together. We host lightning talks, hack nights, workshops, demo days, and community meetups — all in our San Juan space. Whether you want to learn, present, or just meet other builders, there's something on the calendar for you.</p>
	<p>We also run Holberton Coding School Puerto Rico out of the same building, so you'll be surrounded by students, alumni, and mentors who are all building things.</p>
	<div class="actions">
		<a href="/upcoming-events" class="btn">See upcoming events</a>
		<a href="/about-us" class="btn secondary">About us</a>
	</div>
</section>

<style>
	.hero {
		text-align: center;
		padding: 5rem 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border-radius: 16px;
		margin-bottom: 3rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin: 0 0 1.5rem 0;
		line-height: 1.2;
		font-weight: 800;
	}

	.cta {
		display: inline-block;
		background: white;
		color: #667eea;
		padding: 0.875rem 1.75rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.05rem;
	}

	.cta:hover {
		background: #f8f9fa;
	}

	.new {
		background: #f8f9fa;
		padding: 2.5rem;
		border-radius: 16px;
		margin-bottom: 3rem;
		position: relative;
	}

	.badge {
		position: absolute;
		top: -12px;
		left: 24px;
		background: #00c853;
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.new h2 {
		margin-top: 0.5rem;
		font-size: 2.25rem;
	}

	.new em {
		font-style: italic;
	}

	.services {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin: 2rem 0;
	}

	.service {
		background: white;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
	}

	.icon {
		font-size: 2rem;
		display: block;
		margin-bottom: 0.5rem;
	}

	.actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin: 2rem 0 0;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		border: 2px solid #667eea;
		color: #667eea;
		background: transparent;
	}

	.btn.primary {
		background: #667eea;
		color: white;
	}

	.btn.secondary {
		border-color: #666;
		color: #666;
	}

	.btn:hover {
		opacity: 0.9;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-top: 2.5rem;
		padding-top: 2rem;
		border-top: 1px solid #e0e0e0;
	}

	.stat {
		text-align: center;
	}

	.stat .value {
		display: block;
		font-size: 1.75rem;
		font-weight: 800;
		color: #667eea;
	}

	.stat .label {
		font-size: 0.8rem;
		color: #666;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.projects {
		margin-bottom: 3rem;
	}

	.projects ul {
		background: #f8f9fa;
		padding: 1.5rem 2rem;
		border-radius: 12px;
	}

	.offerings {
		margin-bottom: 3rem;
	}

	.lead {
		font-size: 1.25rem;
		color: #666;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.card {
		padding: 1.5rem;
		border: 1px solid #eaeaea;
		border-radius: 12px;
	}

	.community {
		background: #f8f9fa;
		padding: 3rem;
		border-radius: 16px;
	}

	.community h2 {
		margin-top: 0;
	}

	@media (max-width: 768px) {
		.hero {
			padding: 3rem 1.5rem;
		}

		.hero h1 {
			font-size: 2rem;
		}

		.stats {
			grid-template-columns: repeat(2, 1fr);
		}

		.new {
			padding: 1.5rem;
		}

		.community {
			padding: 2rem 1.5rem;
		}
	}
</style>
