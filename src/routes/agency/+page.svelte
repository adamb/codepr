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

<div class="hero">
	<h1>Development Agency</h1>
	<p class="subtitle">World-class software, built in Puerto Rico</p>
</div>

<section class="intro">
	<h2>Our Model</h2>
	<p class="lead">Trained here. Built for you.</p>
	<p>Holberton School at Code Puerto Rico produces some of the most rigorously trained software engineers in the Caribbean. Our development agency puts that talent to work on real client projects — with senior engineer oversight on every engagement.</p>

	<pre class="code-block" aria-label="Our development model in pseudocode"><code>{@html codeSnippet}</code></pre>

	<ul class="model-highlights">
		<li>Developers trained in-house at Holberton School</li>
		<li>Senior QA and architecture review on every deliverable</li>
		<li>US timezone, English-fluent, nearshore rates</li>
		<li>Projects that create local tech jobs in Puerto Rico</li>
	</ul>
</section>

<section class="services">
	<h2>What We Build</h2>
	<p class="lead">Our Services</p>
	<p>We launch with two focused service lines — chosen because we can deliver them exceptionally well from day one.</p>

	<div class="service-cards">
		<div class="service-card">
			<h3>Website Development</h3>
			<p>From polished marketing sites to full-featured web applications, we design and build fast, mobile-responsive websites that represent your brand and convert visitors into customers.</p>
			<ul class="service-list">
				<li>Discovery, wireframes, and visual design</li>
				<li>React, Next.js, Webflow, and WordPress front ends</li>
				<li>CMS integration, SEO, and accessibility</li>
				<li>E-commerce, booking, and membership features</li>
				<li>30-day post-launch support</li>
			</ul>
			<p><strong>Starting at $3,000.</strong></p>
		</div>
		<div class="service-card featured">
			<h3>CRM Outmigration & Odoo</h3>
			<p>Still paying Salesforce per-seat fees? We migrate your CRM to <strong>Odoo</strong> — an open-source platform that covers CRM, sales, marketing, invoicing, and project management at a fraction of the cost.</p>
			<ul class="service-list">
				<li>Data audit and zero-loss migration</li>
				<li>Custom field mapping and workflow recreation</li>
				<li>User training and documentation</li>
				<li>30-day hypercare after cutover</li>
				<li>Ongoing consulting and optimization</li>
			</ul>
			<p><strong>Typical savings: 60–80% vs. Salesforce.</strong></p>
		</div>
	</div>
</section>

<section class="why-odoo">
	<h2>Why Odoo?</h2>
	<p class="lead">One platform. No per-seat trap.</p>
	<p>Odoo is an open-source ERP/CRM that handles everything Salesforce does — and more — without the per-seat licensing trap. It covers contact management, sales pipelines, email marketing, project management, HR, invoicing, and reporting in a single integrated platform. We use it ourselves at Code Puerto Rico, so we know it inside and out.</p>
	<ul class="odoo-benefits">
		<li><strong>Open source:</strong> No ongoing licensing fees per user.</li>
		<li><strong>All-in-one:</strong> CRM, sales, marketing, projects, HR, and invoicing in one database.</li>
		<li><strong>Flexible:</strong> Custom modules and workflows built for how you actually work.</li>
		<li><strong>Proven:</strong> Used by startups, nonprofits, and enterprise teams worldwide.</li>
	</ul>
</section>

<section class="process">
	<h2>Process</h2>
	<p class="lead">How a Project Works</p>
	<p>From first conversation to launch, here's what to expect when you work with us.</p>

	<div class="steps">
		<div class="step">
			<span class="step-number">1</span>
			<h3>Discovery Call</h3>
			<p>We learn about your business, goals, and requirements. You get a clear scope and a fixed-price quote — no surprises.</p>
		</div>
		<div class="step">
			<span class="step-number">2</span>
			<h3>Scope & Design</h3>
			<p>We deliver wireframes and visual mockups for your review. Nothing goes to development until you're happy with the design.</p>
		</div>
		<div class="step">
			<span class="step-number">3</span>
			<h3>Build & Review</h3>
			<p>Our team builds in sprints with regular check-ins. Senior engineers review all code before it reaches you.</p>
		</div>
		<div class="step">
			<span class="step-number">4</span>
			<h3>Launch & Support</h3>
			<p>We handle deployment and provide 30 days of post-launch support. For CRM migrations, we stay on for hypercare.</p>
		</div>
	</div>
</section>

<section class="migration">
	<h2>Salesforce → Odoo</h2>
	<p class="lead">The Migration Process</p>
	<p>We've developed a proven, five-phase migration methodology. Your Salesforce data stays read-only for 30 days after cutover — so there's always a safety net.</p>
	<p class="timeline">Typical timeline: <strong>5–6 weeks</strong> for a standard Salesforce instance. Complex customizations or high data volumes may extend this — we'll tell you upfront.</p>

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
</section>

<section class="projects">
	<h2>In Progress</h2>
	<p class="lead">Current Projects</p>
	<p>We opened with three anchor engagements that will become our first published case studies.</p>

	<div class="project-list">
		<div class="project">
			<h3>Private Equity Firm Website</h3>
			<p>A polished investor-facing site for the PE firm that invested in Holberton Puerto Rico — showcasing their portfolio, team, and investment thesis.</p>
		</div>
		<div class="project">
			<h3>Local Brewing Company</h3>
			<p>A brand-forward website for Local Brewing Company featuring the taproom, events, menu, and merchandise — built to grow with the business.</p>
		</div>
		<div class="project">
			<h3>Code PR: Salesforce → Odoo</h3>
			<p>We're migrating our own CRM from Salesforce to Odoo — managing student inquiries, enrollment, and alumni tracking in a single open-source platform.</p>
		</div>
	</div>
</section>

<section class="difference">
	<h2>Why Us</h2>
	<p class="lead">The Code PR Difference</p>

	<div class="benefits">
		<div class="benefit">
			<h3>We Trained Your Team</h3>
			<p>Every developer on your project graduated from Holberton School at Code Puerto Rico. We know exactly what they can do — because we taught them.</p>
		</div>
		<div class="benefit">
			<h3>Senior Oversight on Every Project</h3>
			<p>Junior developers are paired with senior engineers who review architecture, code quality, and deliverables before anything reaches you.</p>
		</div>
		<div class="benefit">
			<h3>Nearshore Rates</h3>
			<p>Get US-quality software at nearshore rates. Puerto Rico is a US territory — no currency risk, no contractor compliance headaches.</p>
		</div>
		<div class="benefit">
			<h3>Fixed-Price Quotes</h3>
			<p>We scope carefully and quote fixed prices. No hourly billing surprises — you know what you're getting and what you're paying.</p>
		</div>
		<div class="benefit">
			<h3>Local Impact</h3>
			<p>Every engagement creates real tech jobs in Puerto Rico. Working with us means investing in the island's economic future.</p>
		</div>
		<div class="benefit">
			<h3>Growing Talent Pipeline</h3>
			<p>New Holberton cohorts graduate each year, giving us a continuously refreshing pool of trained developers as our project volume grows.</p>
		</div>
	</div>
</section>

<section class="cta-section">
	<h2>Ready to Build Something?</h2>
	<p>Tell us about your project — we'll respond within one business day with a discovery call invite and initial questions.</p>
	<p class="contact-direct">Or reach us directly at <a href="mailto:info@code.pr">info@code.pr</a></p>
	<a href="/contactus" class="btn primary">Start a project →</a>
</section>

<style>
	.hero {
		text-align: center;
		padding: 5rem 2rem;
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
		color: white;
		border-radius: 16px;
		margin-bottom: 3rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin: 0 0 0.5rem 0;
		font-weight: 800;
	}

	.subtitle {
		font-size: 1.5rem;
		opacity: 0.9;
		margin: 0;
	}

	section {
		margin-bottom: 4rem;
	}

	.lead {
		font-size: 1.25rem;
		color: #666;
	}

	.code-block {
		background: #1e1e2f;
		color: #a5d6ff;
		padding: 1.5rem;
		border-radius: 12px;
		overflow-x: auto;
		font-family: 'Source Code Pro', 'Fira Code', monospace;
		font-size: 0.95rem;
		line-height: 1.6;
		margin: 1.5rem 0;
		border-left: 4px solid var(--color-primary);
	}

	.code-block code {
		font-family: inherit;
		white-space: pre;
	}

	.model-highlights {
		background: #f8f9fa;
		padding: 1.5rem 2rem;
		border-radius: 12px;
		margin-top: 1.5rem;
	}

	.service-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.service-card {
		padding: 2rem;
		border: 1px solid #eaeaea;
		border-radius: 12px;
		background: #fff;
	}

	.service-card.featured {
		background: #f8f9fa;
		border-color: var(--color-primary);
	}

	.service-list {
		margin: 1rem 0 1.25rem;
		padding-left: 1.25rem;
	}

	.service-list li {
		margin-bottom: 0.5rem;
	}

	.why-odoo {
		padding: 2rem;
		background: #f8f9fa;
		border-radius: 16px;
	}

	.odoo-benefits {
		margin: 1.5rem 0 0;
		padding-left: 1.25rem;
	}

	.odoo-benefits li {
		margin-bottom: 0.75rem;
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.step {
		text-align: center;
		padding: 2rem 1.5rem;
		background: #f8f9fa;
		border-radius: 12px;
	}

	.step-number {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--color-primary);
		color: white;
		border-radius: 50%;
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.migration {
		padding: 2rem;
		background: #f8f9fa;
		border-radius: 16px;
	}

	.timeline {
		font-size: 1.125rem;
		padding: 1rem;
		background: white;
		border-radius: 8px;
		margin: 1.5rem 0;
	}

	.migration-table {
		width: 100%;
		border-collapse: collapse;
		background: white;
		border-radius: 8px;
		overflow: hidden;
	}

	.migration-table th,
	.migration-table td {
		padding: 1rem;
		text-align: left;
		border-bottom: 1px solid #eaeaea;
	}

	.migration-table th {
		background: var(--color-primary);
		color: white;
		font-weight: 600;
	}

	.project-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.project {
		padding: 1.5rem;
		border: 1px solid #eaeaea;
		border-radius: 8px;
	}

	.benefits {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.benefit {
		padding: 1.5rem;
		background: #f8f9fa;
		border-radius: 8px;
	}

	.cta-section {
		text-align: center;
		padding: 4rem 2rem;
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
		color: white;
		border-radius: 16px;
	}

	.cta-section h2 {
		margin: 0 0 1rem 0;
		font-size: 2rem;
	}

	.contact-direct {
		margin-bottom: 2rem;
	}

	.contact-direct a {
		color: white;
		font-weight: 600;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		border: 2px solid white;
		color: white;
		transition: background 0.2s, color 0.2s;
	}

	.btn.primary {
		background: white;
		color: var(--color-primary-dark);
	}

	.btn:hover {
		background: rgba(255, 255, 255, 0.15);
		opacity: 1;
	}

	.btn.primary:hover {
		background: #f0f9fb;
		color: var(--color-primary-dark);
	}

	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1.25rem;
		}

		.code-block {
			font-size: 0.8rem;
			padding: 1rem;
		}
	}
</style>
