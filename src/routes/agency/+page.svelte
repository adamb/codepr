<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	const codeSnippet = `// Code Puerto Rico Dev Agency
function deliverProject(client) {
  const team = hireLocalTalent(client.scope);
  const design = seniorReview(team.plan());
  const build = iterateWithClient(team.code(), design);
  return launchWithSupport(build, '30-days');
}

// Output: US-quality software, nearshore rates, local jobs.`;
</script>

<SEO
	title="Dev Agency"
	description="World-class software, built in Puerto Rico. Website development and Salesforce → Odoo CRM migrations by Holberton-trained engineers."
	canonical="https://code.pr/agency"
/>

<section class="agency-hero">
	<div class="container">
		<div class="hero-inner">
			<div class="hero-text">
				<span class="eyebrow">Bespoke Dev Agency</span>
				<h1>World-class software,<br />built in Puerto Rico.</h1>
				<p class="hero-sub">Holberton-trained engineers. AI-first workflows. Nearshore rates. Senior oversight on every engagement.</p>
				<div class="hero-actions">
					<a href="/contactus" class="btn btn-white btn-lg">Start a project →</a>
					<a href="#services" class="btn btn-ghost-white btn-lg">See our services</a>
				</div>
			</div>
			<div class="hero-code">
				<pre class="code-preview" aria-label="Our development model in pseudocode"><code>{@html codeSnippet}</code></pre>
			</div>
		</div>
	</div>
</section>

<div class="page-body">
	<section class="intro">
		<div class="container">
			<div class="intro-grid">
				<div class="intro-text">
					<h2>Our Model</h2>
					<p class="lead">Trained here. Built for you.</p>
					<p>Holberton School at Code Puerto Rico produces some of the most rigorously trained software engineers in the Caribbean. Our development agency puts that talent to work on real client projects — with senior engineer oversight on every engagement.</p>

					<ul class="model-highlights">
						<li>Developers trained in-house at Holberton School</li>
						<li>Senior QA and architecture review on every deliverable</li>
						<li>US timezone, English-fluent, nearshore rates</li>
						<li>Projects that create local tech jobs in Puerto Rico</li>
					</ul>
				</div>
				<div class="stats-grid">
					<div class="stat">
						<div class="stat-num">9<span>mo</span></div>
						<div class="stat-label">Holberton Training</div>
					</div>
					<div class="stat">
						<div class="stat-num">AI</div>
						<div class="stat-label">First Workflows</div>
					</div>
					<div class="stat">
						<div class="stat-num">60%</div>
						<div class="stat-label">Avg CRM Savings</div>
					</div>
					<div class="stat">
						<div class="stat-num">PR</div>
						<div class="stat-label">Nearshore Talent</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="services" id="services">
		<div class="container">
			<h2>What We Build</h2>
			<p class="lead">Two focused service lines — chosen because we can deliver them exceptionally well from day one.</p>

			<div class="service-cards">
				<div class="service-card">
					<div class="service-icon">🌐</div>
					<h3>Website Development</h3>
					<p>From polished marketing sites to full-featured web applications, we design and build fast, mobile-responsive websites that represent your brand and convert visitors into customers.</p>
					<ul class="service-list">
						<li>Discovery, wireframes, and visual design</li>
						<li>React, Next.js, Webflow, and WordPress front ends</li>
						<li>CMS integration, SEO, and accessibility</li>
						<li>E-commerce, booking, and membership features</li>
						<li>30-day post-launch support</li>
					</ul>
					<p class="service-price">Starting at <strong>$3,000</strong></p>
				</div>
				<div class="service-card featured">
					<div class="featured-tag">Most Popular</div>
					<div class="service-icon">🔄</div>
					<h3>CRM Outmigration & Odoo</h3>
					<p>Still paying Salesforce per-seat fees? We migrate your CRM to <strong>Odoo</strong> — an open-source platform that covers CRM, sales, marketing, invoicing, and project management at a fraction of the cost.</p>
					<ul class="service-list">
						<li>Data audit and zero-loss migration</li>
						<li>Custom field mapping and workflow recreation</li>
						<li>User training and documentation</li>
						<li>30-day hypercare after cutover</li>
						<li>Ongoing consulting and optimization</li>
					</ul>
					<p class="service-price">Typical savings: <strong>60–80% vs. Salesforce</strong></p>
				</div>
			</div>
		</div>
	</section>

	<section class="why-odoo">
		<div class="container">
			<div class="odoo-inner">
				<div class="odoo-text">
					<h2>Why Odoo?</h2>
					<p class="lead">One platform. No per-seat trap.</p>
					<p>Odoo is an open-source ERP/CRM that handles everything Salesforce does — and more — without the per-seat licensing trap. It covers contact management, sales pipelines, email marketing, project management, HR, invoicing, and reporting in a single integrated platform. We use it ourselves at Code Puerto Rico, so we know it inside and out.</p>
				</div>
				<ul class="odoo-benefits">
					<li>
						<span class="benefit-label">Open source</span>
						No ongoing licensing fees per user.
					</li>
					<li>
						<span class="benefit-label">All-in-one</span>
						CRM, sales, marketing, projects, HR, and invoicing in one database.
					</li>
					<li>
						<span class="benefit-label">Flexible</span>
						Custom modules and workflows built for how you actually work.
					</li>
					<li>
						<span class="benefit-label">Proven</span>
						Used by startups, nonprofits, and enterprise teams worldwide.
					</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="process">
		<div class="container">
			<h2>How a Project Works</h2>
			<p class="lead">From first conversation to launch.</p>

			<div class="steps">
				<div class="step">
					<span class="step-number">01</span>
					<h3>Discovery Call</h3>
					<p>We learn about your business, goals, and requirements. You get a clear scope and a fixed-price quote — no surprises.</p>
				</div>
				<div class="step">
					<span class="step-number">02</span>
					<h3>Scope & Design</h3>
					<p>We deliver wireframes and visual mockups for your review. Nothing goes to development until you're happy with the design.</p>
				</div>
				<div class="step">
					<span class="step-number">03</span>
					<h3>Build & Review</h3>
					<p>Our team builds in sprints with regular check-ins. Senior engineers review all code before it reaches you.</p>
				</div>
				<div class="step">
					<span class="step-number">04</span>
					<h3>Launch & Support</h3>
					<p>We handle deployment and provide 30 days of post-launch support. For CRM migrations, we stay on for hypercare.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="migration">
		<div class="container">
			<h2>Salesforce → Odoo Migration</h2>
			<p class="lead">A proven five-phase methodology. Typical timeline: <strong>5–6 weeks</strong> for a standard Salesforce instance.</p>
			<p>Your Salesforce data stays read-only for 30 days after cutover — so there's always a safety net.</p>

			<div class="table-wrap">
				<table class="migration-table">
					<thead>
						<tr>
							<th>Phase</th>
							<th>What Happens</th>
							<th>Weeks</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><strong>Assess</strong></td>
							<td>Audit all Salesforce objects, workflows, and integrations</td>
							<td>1–2</td>
						</tr>
						<tr>
							<td><strong>Transform</strong></td>
							<td>Map and convert data to Odoo schema</td>
							<td>2–3</td>
						</tr>
						<tr>
							<td><strong>Load</strong></td>
							<td>Populate staging environment, validate all records</td>
							<td>3–4</td>
						</tr>
						<tr>
							<td><strong>Test</strong></td>
							<td>UAT with your team, fix any discrepancies</td>
							<td>4–5</td>
						</tr>
						<tr>
							<td><strong>Cutover</strong></td>
							<td>Go live on Odoo; Salesforce kept read-only for 30 days</td>
							<td>5–6</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<section class="projects">
		<div class="container">
			<h2>In Progress</h2>
			<p class="lead">Three anchor engagements becoming our first case studies.</p>

			<div class="project-list">
				<div class="project">
					<span class="project-dot"></span>
					<div>
						<h3>Private Equity Firm Website</h3>
						<p>A polished investor-facing site for the PE firm that invested in Holberton Puerto Rico — showcasing their portfolio, team, and investment thesis.</p>
					</div>
				</div>
				<div class="project">
					<span class="project-dot"></span>
					<div>
						<h3>Local Brewing Company</h3>
						<p>A brand-forward website for Local Brewing Company featuring the taproom, events, menu, and merchandise — built to grow with the business.</p>
					</div>
				</div>
				<div class="project">
					<span class="project-dot"></span>
					<div>
						<h3>Code PR: Salesforce → Odoo</h3>
						<p>We're migrating our own CRM from Salesforce to Odoo — managing student inquiries, enrollment, and alumni tracking in a single open-source platform.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="difference">
		<div class="container">
			<h2>The Code PR Difference</h2>
			<p class="lead">Why teams choose us.</p>

			<div class="benefits">
				<div class="benefit">
					<h4>We Trained Your Team</h4>
					<p>Every developer on your project graduated from Holberton School at Code Puerto Rico. We know exactly what they can do — because we taught them.</p>
				</div>
				<div class="benefit">
					<h4>Senior Oversight on Every Project</h4>
					<p>Junior developers are paired with senior engineers who review architecture, code quality, and deliverables before anything reaches you.</p>
				</div>
				<div class="benefit">
					<h4>Nearshore Rates</h4>
					<p>Get US-quality software at nearshore rates. Puerto Rico is a US territory — no currency risk, no contractor compliance headaches.</p>
				</div>
				<div class="benefit">
					<h4>Fixed-Price Quotes</h4>
					<p>We scope carefully and quote fixed prices. No hourly billing surprises — you know what you're getting and what you're paying.</p>
				</div>
				<div class="benefit">
					<h4>Local Impact</h4>
					<p>Every engagement creates real tech jobs in Puerto Rico. Working with us means investing in the island's economic future.</p>
				</div>
				<div class="benefit">
					<h4>Growing Talent Pipeline</h4>
					<p>New Holberton cohorts graduate each year, giving us a continuously refreshing pool of trained developers as our project volume grows.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="cta-section">
		<div class="container">
			<div class="cta-inner">
				<h2>Ready to Build Something?</h2>
				<p>Tell us about your project — we'll respond within one business day with a discovery call invite and initial questions.</p>
				<p class="contact-direct">Or reach us directly at <a href="mailto:info@code.pr">info@code.pr</a></p>
				<a href="/contactus" class="btn btn-white btn-lg">Start a project →</a>
			</div>
		</div>
	</section>
</div>

<style>
	/* Hero */
	.agency-hero {
		background: var(--color-dark);
		padding: 5rem 0 4rem;
		width: 100%;
	}

	.hero-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}

	.eyebrow {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-primary);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-bottom: 1rem;
	}

	.hero-text h1 {
		color: #fff;
		font-size: clamp(2rem, 4vw, 3.25rem);
		line-height: 1.1;
		margin-bottom: 1.25rem;
	}

	.hero-sub {
		color: rgba(255, 255, 255, 0.65);
		font-size: 1.05rem;
		line-height: 1.7;
		margin-bottom: 2rem;
	}

	.hero-actions {
		display: flex;
		gap: 0.875rem;
		flex-wrap: wrap;
	}

	.code-preview {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-lg);
		padding: 1.75rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.7;
		color: #a5d6ff;
		overflow-x: auto;
		margin: 0;
	}

	.code-preview code {
		font-family: inherit;
		white-space: pre;
	}

	/* Intro */
	.intro-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	.intro-text h2 {
		margin-bottom: 0.25rem;
	}

	.model-highlights {
		list-style: none;
		padding: 0;
		margin: 1.5rem 0 0;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.model-highlights li {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		font-size: 0.95rem;
		color: var(--color-text-muted);
	}

	.model-highlights li::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--color-primary);
		flex-shrink: 0;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.stat {
		background: var(--color-light);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		text-align: center;
	}

	.stat-num {
		font-family: var(--font-headings);
		font-size: 2rem;
		font-weight: 800;
		color: var(--color-primary);
		line-height: 1;
		letter-spacing: -0.03em;
	}

	.stat-num span {
		font-size: 1rem;
		margin-left: 0.1rem;
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		margin-top: 0.375rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	/* Services */
	.services {
		padding: 3rem 0;
		border-top: 1px solid var(--color-border);
	}

	.services h2 {
		margin-bottom: 0.25rem;
	}

	.service-cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-top: 2.5rem;
	}

	.service-card {
		padding: 2rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: #fff;
		position: relative;
	}

	.service-card.featured {
		border-color: var(--color-primary);
		background: #fffaf7;
	}

	.featured-tag {
		position: absolute;
		top: -1px;
		right: 1.5rem;
		background: var(--color-primary);
		color: #fff;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 0.25rem 0.625rem;
		border-radius: 0 0 6px 6px;
	}

	.service-icon {
		font-size: 1.75rem;
		margin-bottom: 0.875rem;
	}

	.service-card h3 {
		font-size: 1.35rem;
		margin-bottom: 0.75rem;
	}

	.service-list {
		color: var(--color-text-muted);
		font-size: 0.9rem;
		margin: 1rem 0 1.25rem;
	}

	.service-list li {
		margin-bottom: 0.5rem;
	}

	.service-price {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		margin: 0;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.service-price strong {
		color: var(--color-text);
	}

	/* Why Odoo */
	.why-odoo {
		padding: 3rem 0;
		background: var(--color-dark);
		width: 100%;
	}

	.odoo-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	.odoo-text h2 {
		color: #fff;
	}

	.odoo-text .lead {
		color: rgba(255, 255, 255, 0.55);
	}

	.odoo-text p:last-child {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.95rem;
		line-height: 1.75;
	}

	.odoo-benefits {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding-top: 0.5rem;
	}

	.odoo-benefits li {
		padding: 1.25rem;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius);
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.65);
		line-height: 1.6;
	}

	.benefit-label {
		display: block;
		font-weight: 700;
		color: var(--color-primary);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-bottom: 0.25rem;
	}

	/* Process */
	.process {
		padding: 3rem 0;
		border-top: 1px solid var(--color-border);
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
		margin-top: 2.5rem;
	}

	.step {
		padding: 1.75rem;
		background: var(--color-light);
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
	}

	.step-number {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-primary);
		letter-spacing: 0.05em;
		margin-bottom: 0.875rem;
	}

	.step h3 {
		font-size: 1.05rem;
		margin-bottom: 0.625rem;
	}

	.step p {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.65;
		margin: 0;
	}

	/* Migration table */
	.migration {
		padding: 3rem 0;
		border-top: 1px solid var(--color-border);
	}

	.table-wrap {
		width: 100%;
		overflow-x: auto;
		margin-top: 2rem;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
	}

	.migration-table {
		width: 100%;
		border-collapse: collapse;
		background: #fff;
		min-width: 520px;
	}

	.migration-table th,
	.migration-table td {
		padding: 1rem 1.25rem;
		text-align: left;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.9rem;
	}

	.migration-table thead th {
		background: var(--color-dark);
		color: rgba(255, 255, 255, 0.7);
		font-family: var(--font-headings);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.migration-table tbody tr:last-child td {
		border-bottom: none;
	}

	.migration-table tbody tr:hover td {
		background: var(--color-light);
	}

	/* Projects */
	.projects {
		padding: 3rem 0;
		border-top: 1px solid var(--color-border);
	}

	.project-list {
		display: flex;
		flex-direction: column;
		gap: 0;
		margin-top: 2rem;
	}

	.project {
		display: flex;
		gap: 1.25rem;
		align-items: flex-start;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.project:first-child {
		border-top: 1px solid var(--color-border);
	}

	.project-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-primary);
		flex-shrink: 0;
		margin-top: 0.5rem;
	}

	.project h3 {
		font-size: 1.05rem;
		margin-bottom: 0.375rem;
	}

	.project p {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		margin: 0;
	}

	/* Difference */
	.difference {
		padding: 3rem 0;
		border-top: 1px solid var(--color-border);
	}

	.benefits {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-top: 2.5rem;
	}

	.benefit {
		padding: 1.5rem;
		border-left: 2px solid var(--color-primary);
	}

	.benefit h4 {
		font-size: 0.95rem;
		margin-bottom: 0.5rem;
	}

	.benefit p {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		line-height: 1.65;
		margin: 0;
	}

	/* CTA */
	.cta-section {
		background: var(--color-dark);
		padding: 5rem 0;
		width: 100%;
		margin-top: 3rem;
	}

	.cta-inner {
		max-width: 600px;
	}

	.cta-inner h2 {
		color: #fff;
		font-size: clamp(1.75rem, 3vw, 2.5rem);
		margin-bottom: 1rem;
	}

	.cta-inner p {
		color: rgba(255, 255, 255, 0.65);
		font-size: 1rem;
		line-height: 1.7;
	}

	.contact-direct {
		margin-bottom: 1.75rem;
	}

	.contact-direct a {
		color: var(--color-primary);
		font-weight: 600;
	}

	.contact-direct a:hover {
		color: var(--color-primary-hover);
	}

	/* Responsive */
	@media (max-width: 900px) {
		.hero-inner,
		.intro-grid,
		.odoo-inner {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.hero-code {
			display: none;
		}

		.steps {
			grid-template-columns: repeat(2, 1fr);
		}

		.benefits {
			grid-template-columns: 1fr 1fr;
		}

		.service-cards {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.steps,
		.benefits {
			grid-template-columns: 1fr;
		}

		.stats-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
