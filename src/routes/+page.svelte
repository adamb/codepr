<script lang="ts">
	import '../app.css';
</script>

<div class="hero">
	<h1>Puerto Rico's tech hub for builders, founders & innovators.</h1>
	<a href="/upcoming-events" class="cta">See upcoming events</a>
</div>

<section class="new">
	<span class="badge">New</span>
	<h2>We now build software for <em>your</em> business too.</h2>
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
			<span class="value">AI First</span>
			<span class="label">Workflows</span>
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
		padding: 4rem 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border-radius: 12px;
		margin-bottom: 3rem;
	}
	
	.hero h1 {
		font-size: 2.5rem;
		margin: 0 0 1.5rem 0;
		line-height: 1.2;
	}
	
	.cta {
		display: inline-block;
		background: white;
		color: #667eea;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
	}
	
	.new {
		background: #f8f9fa;
		padding: 2rem;
		border-radius: 12px;
		margin-bottom: 3rem;
		position: relative;
	}
	
	.badge {
		position: absolute;
		top: -12px;
		left: 20px;
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
	}
	
	.services {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin: 2rem 0;
	}
	
	.service {
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0,0,0,0.08);
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
		margin: 2rem 0;
	}
	
	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		border: 2px solid #667eea;
		color: #667eea;
	}
	
	.btn.primary {
		background: #667eea;
		color: white;
	}
	
	.btn.secondary {
		border-color: #666;
		color: #666;
	}
	
	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin: 2rem 0;
		padding: 2rem 0;
		border-top: 1px solid #eaeaea;
		border-bottom: 1px solid #eaeaea;
	}
	
	.stat {
		text-align: center;
	}
	
	.stat .value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: #667eea;
	}
	
	.stat .label {
		font-size: 0.75rem;
		color: #666;
		text-transform: uppercase;
	}
	
	.projects {
		margin-bottom: 3rem;
	}
	
	.projects ul {
		background: #f8f9fa;
		padding: 1.5rem 2rem;
		border-radius: 8px;
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
		border-radius: 8px;
	}
	
	.community {
		background: #f8f9fa;
		padding: 3rem 2rem;
		border-radius: 12px;
	}
	
	.community h2 {
		margin-top: 0;
	}
	
	@media (max-width: 768px) {
		.hero h1 {
			font-size: 1.75rem;
		}
		
		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
