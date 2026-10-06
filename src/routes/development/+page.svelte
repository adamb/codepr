<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import { services, projects, developmentInquiries } from '$lib/content';

	const codeSnippet = `// Code Puerto Rico Development
function deliverProject(client) {
  const team = puertoRicoEngineers(client.scope);
  const plan = seniorReview(team.architecture());
  const build = iterateWithClient(team.code(), plan);
  return launchWithSupport(build, '30-days');
}`;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': 'https://code.pr/development#service',
		name: 'Code Puerto Rico Development',
		url: 'https://code.pr/development',
		description:
			'Custom software, AI-enabled applications, integrations and business systems built by Puerto Rico-based engineers in San Juan.',
		provider: { '@id': 'https://code.pr/#organization' },
		areaServed: 'Puerto Rico',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '1550 PR-25, 2nd Floor',
			addressLocality: 'San Juan',
			addressRegion: 'PR',
			postalCode: '00909',
			addressCountry: 'US'
		},
		makesOffer: services.map((s) => ({
			'@type': 'Offer',
			itemOffered: { '@type': 'Service', name: s.title, description: s.blurb }
		}))
	};

	const aiItems = [
		['AI-enabled software', 'AI built into custom applications, not bolted on afterwards.'],
		['AI automation', 'Automating repetitive, rules-heavy work in your business.'],
		['LLM integrations', 'Connecting language models to your data, documents and systems.'],
		['AI-assisted workflows', 'Hand-offs where AI drafts or classifies and people decide.'],
		['Intelligent internal tools', 'Internal apps that search, summarize or route work for your team.'],
		['Rapid AI prototypes', 'A working proof of concept in days or weeks, before a full build.']
	];

	const steps = [
		['01', 'Discovery call', 'We learn about your business, goals and requirements, then give you a clear scope and a fixed-price quote.'],
		['02', 'Scope & design', 'You review wireframes and mockups. Nothing goes to development until you are happy with the design.'],
		['03', 'Build & review', 'We build in sprints with regular check-ins. Senior engineers review all code before it reaches you.'],
		['04', 'Launch & support', 'We handle deployment and provide 30 days of post-launch support. For CRM migrations, we stay on for hypercare.']
	];

	const phases = [
		['Assess', 'Audit all Salesforce objects, workflows and integrations', '1–2'],
		['Transform', 'Map and convert data to the Odoo schema', '2–3'],
		['Load', 'Populate a staging environment and validate all records', '3–4'],
		['Test', 'User acceptance testing with your team; fix any discrepancies', '4–5'],
		['Cutover', 'Go live on Odoo; Salesforce kept read-only for 30 days', '5–6']
	];
</script>

<SEO
	title="Software & AI Development in Puerto Rico"
	description="Code Puerto Rico builds custom software, AI-enabled applications, integrations and Odoo migrations with Puerto Rico-based engineers, nearshore from San Juan."
	canonical="https://code.pr/development"
	{jsonLd}
/>

<section class="dev-hero">
	<div class="container">
		<div class="hero-inner">
			<div class="hero-text">
				<span class="eyebrow">Code Puerto Rico Development</span>
				<h1>Software &amp; AI Development in Puerto Rico</h1>
				<p class="hero-sub">
					Code Puerto Rico builds custom software, AI-enabled applications, integrations and
					business systems using Puerto Rico-based engineering talent.
				</p>
				<div class="hero-actions">
					<a href="/contactus?inquiry=custom-software" class="btn btn-lg">Start a Software Project</a>
					<a href="#what-we-build" class="btn btn-lg btn-ghost-white">What we build</a>
				</div>
			</div>
			<div class="hero-code">
				<pre class="code-preview" aria-label="Our development model in pseudocode"><code>{codeSnippet}</code></pre>
			</div>
		</div>
	</div>
</section>

<div class="page-body">
	<section class="block" id="what-we-build">
		<div class="container">
			<h2>What We Build</h2>
			<p class="lead">
				Nearshore engineering from San Juan, covering the full path from prototype to production.
			</p>
			<div class="tiles">
				{#each services as service}
					<div class="tile">
						<h3>{service.title}</h3>
						<p>{service.blurb}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="block alt" id="ai-development">
		<div class="container">
			<h2>AI Development</h2>
			<p class="lead">
				We use AI to build technology: AI inside the software we ship, and AI in the way we build it.
			</p>
			<div class="tiles">
				{#each aiItems as [title, text]}
					<div class="tile">
						<h3>{title}</h3>
						<p>{text}</p>
					</div>
				{/each}
			</div>
			<p class="note">
				Example from our lab: when off-the-shelf vision models misread an open gate as closed, we
				fine-tuned a small classifier and connected it to Home Assistant.
				<a href="/blog/4/beach-gate-vision-classifier">Read the write-up →</a>
			</p>
			<p class="note subtle">
				Courses and workshops are a separate community activity, described under
				<a href="#education">Education is separate</a> below.
			</p>
		</div>
	</section>

	<section class="block" id="custom-software">
		<div class="container split">
			<div>
				<h2>Custom Software</h2>
				<p class="lead">Web applications, internal tools, APIs and backend systems built for how you work.</p>
				<p>
					From polished marketing sites to full-featured web applications, we design and build fast,
					mobile-responsive software that represents your brand and does real work for your team.
					Our own site, code.pr, is a SvelteKit application on Cloudflare Pages that runs payments,
					sign-ups and lead capture against our Odoo system.
				</p>
			</div>
			<ul class="check-list">
				<li>Discovery, wireframes and visual design</li>
				<li>React, Next.js, SvelteKit, Webflow and WordPress front ends</li>
				<li>CMS integration, SEO and accessibility</li>
				<li>E-commerce, booking and membership features</li>
				<li>APIs, webhooks and backend services</li>
				<li>30-day post-launch support</li>
			</ul>
		</div>
	</section>

	<section class="block alt" id="integrations">
		<div class="container split">
			<div>
				<h2>Integrations &amp; Automation</h2>
				<p class="lead">Connect the systems you already run and remove the manual steps between them.</p>
				<p>
					We connect payments, CRMs, forms, email and internal systems through their APIs. In our
					own operation that includes Stripe payments that post invoices into Odoo, website and
					TikTok lead forms that route into our CRM, and event sign-ups with email verification.
				</p>
			</div>
			<ul class="check-list">
				<li>Payment and billing integrations</li>
				<li>Lead capture and routing between web forms, Salesforce and Odoo</li>
				<li>Notification and approval workflows</li>
				<li>Webhook and API-based system-to-system sync</li>
			</ul>
		</div>
	</section>

	<section class="block" id="crm-erp-migration">
		<div class="container">
			<h2>CRM / ERP Migration</h2>
			<p class="lead">
				Salesforce → Odoo migration in a five-phase method. Typical timeline: <strong>5–6 weeks</strong>
				for a standard Salesforce instance.
			</p>
			<div class="split">
				<div>
					<p>
						Odoo is an open-source platform that covers CRM, sales, marketing, project management,
						HR, invoicing and reporting in one database, with no per-seat licensing. We run Odoo
						ourselves at Code Puerto Rico, so we know it well. Your Salesforce data stays read-only
						for 30 days after cutover, so there is always a safety net.
					</p>
					<p>
						We also help with other CRM and ERP integrations, custom Odoo workflows and field
						mapping, user training and documentation.
					</p>
				</div>
				<div class="table-wrap">
					<table>
						<thead>
							<tr><th>Phase</th><th>What happens</th><th>Weeks</th></tr>
						</thead>
						<tbody>
							{#each phases as [phase, what, weeks]}
								<tr><td><strong>{phase}</strong></td><td>{what}</td><td>{weeks}</td></tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>

	<section class="block alt" id="prototypes">
		<div class="container split">
			<div>
				<h2>Prototypes &amp; New Products</h2>
				<p class="lead">Test an idea with working software before committing to the full build.</p>
				<p>
					A proof of concept answers the real questions early: does the data support it, does the
					AI model behave, will people use it. We scope prototypes tightly and tell you plainly
					what they showed.
				</p>
			</div>
			<ul class="check-list">
				<li>Technical validation of an idea or integration</li>
				<li>AI proofs of concept</li>
				<li>First versions of internal or customer-facing products</li>
				<li>Architecture and next-step planning</li>
			</ul>
		</div>
	</section>

	<section class="block" id="engineering-model">
		<div class="container">
			<h2>Our Engineering Model</h2>
			<p class="lead">
				A Puerto Rico-based team, senior review on every deliverable, and a process you can follow.
			</p>
			<ul class="check-list wide">
				<li>We hire and work with Puerto Rico-based software engineers.</li>
				<li>Holberton-trained engineers are part of our talent pipeline.</li>
				<li>Senior engineers review architecture, code quality and deliverables.</li>
				<li>AI-first workflows, with human review before anything ships.</li>
				<li>Fixed-price quotes after a scoped discovery call.</li>
				<li>Client projects create professional technology opportunities and real-world experience for local engineers.</li>
			</ul>
			<div class="steps">
				{#each steps as [num, title, text]}
					<div class="step">
						<span class="step-number">{num}</span>
						<h3>{title}</h3>
						<p>{text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="block alt" id="projects">
		<div class="container">
			<h2>Current &amp; Recent Projects</h2>
			<p class="lead">
				Client work, the systems we run ourselves, and lab prototypes. We do not publish results
				we have not measured.
			</p>
			<div class="project-grid">
				{#each projects as project}
					<article class="project-card">
						<div class="project-top">
							<span class="project-kind">{project.kind}</span>
							<span class="project-status">{project.status}</span>
						</div>
						<h3>{project.client}</h3>
						<dl>
							<dt>Need</dt>
							<dd>{project.need}</dd>
							<dt>Work</dt>
							<dd>{project.work}</dd>
							<dt>Category</dt>
							<dd>{project.category}</dd>
						</dl>
						{#if project.href}
							<a href={project.href}>{project.hrefLabel} →</a>
						{/if}
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="block" id="why-puerto-rico">
		<div class="container">
			<h2>Why Puerto Rico / Nearshore</h2>
			<div class="tiles">
				<div class="tile">
					<h3>U.S. jurisdiction</h3>
					<p>Puerto Rico is a U.S. territory: U.S. dollar, U.S. legal framework, no currency risk.</p>
				</div>
				<div class="tile">
					<h3>English-fluent, U.S. time zone</h3>
					<p>Work in your hours with an engineering team you can reach the same day.</p>
				</div>
				<div class="tile">
					<h3>A local talent pipeline</h3>
					<p>New Holberton cohorts graduate in San Juan each year, alongside an active developer community.</p>
				</div>
				<div class="tile">
					<h3>Built in San Juan</h3>
					<p>Our team works from 1550 PR-25, San Juan, where you can also book meeting space for project sessions.</p>
				</div>
				<div class="tile">
					<h3>Local impact</h3>
					<p>Engagements create technology work for Puerto Rico-based engineers.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="block alt" id="education">
		<div class="container split">
			<div>
				<h2>Education is separate</h2>
				<p>
					<strong>Holberton Coding School Puerto Rico</strong> is technical education and talent
					development. <strong>Code Puerto Rico Development</strong> is commercial software and
					AI engineering. They share a building and a talent pipeline, and they are different
					activities.
				</p>
			</div>
			<p>
				<a href="https://www.holbertonschoolpr.com" target="_blank" rel="noopener">Holberton Coding School Puerto Rico →</a><br />
				<a href="/workshops">Community workshops →</a><br />
				<a href="/space">Workspace &amp; event space in San Juan →</a>
			</p>
		</div>
	</section>

	<section class="cta-section" id="start-a-project">
		<div class="container">
			<div class="cta-inner">
				<h2>Start a Project</h2>
				<p>Tell us about your project. We respond within one business day with a discovery call invite and initial questions.</p>
				<div class="chips">
					{#each developmentInquiries as type}
						<a class="chip" href={`/contactus?inquiry=${type.value}`}>{type.label}</a>
					{/each}
				</div>
				<p class="contact-direct">Or email us at <a href="mailto:info@code.pr">info@code.pr</a></p>
				<a href="/contactus?inquiry=custom-software" class="btn btn-white btn-lg">Start a Software Project →</a>
			</div>
		</div>
	</section>
</div>

<style>
	.dev-hero {
		background: var(--color-dark);
		padding: 5rem 0 4rem;
		width: 100%;
	}

	.hero-inner {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 3.5rem;
		align-items: center;
	}

	.eyebrow {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-accent);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-bottom: 1rem;
	}

	.hero-text h1 {
		color: #fff;
		font-size: clamp(2rem, 4.2vw, 3.2rem);
		line-height: 1.1;
		margin-bottom: 1.25rem;
	}

	.hero-sub {
		color: rgba(255, 255, 255, 0.72);
		font-size: 1.15rem;
		line-height: 1.6;
		max-width: 560px;
		margin-bottom: 1.75rem;
	}

	.hero-actions {
		display: flex;
		gap: 0.875rem;
		flex-wrap: wrap;
	}

	.hero-inner > *,
	.split > * {
		min-width: 0;
	}

	.code-preview {
		background: #0a1420;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		margin: 0;
		overflow-x: auto;
	}

	.code-preview code {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.7;
		color: #9ad7e8;
		white-space: pre;
	}

	.page-body {
		padding: 0;
	}

	.block {
		padding: 4.5rem 0;
	}

	.block.alt {
		background: var(--color-light);
	}

	.block h2 {
		font-size: clamp(1.7rem, 3vw, 2.4rem);
		margin-bottom: 0.6rem;
	}

	.block .lead {
		font-size: 1.1rem;
		max-width: 760px;
	}

	.tiles {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 2rem;
	}

	.tile {
		background: #fff;
		border: 1px solid var(--color-border);
		border-top: 3px solid var(--color-accent);
		border-radius: var(--radius);
		padding: 1.25rem;
	}

	.tile h3 {
		font-size: 1.05rem;
		margin-bottom: 0.4rem;
	}

	.tile p {
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--color-text-muted);
		margin: 0;
	}

	.note {
		margin: 1.75rem 0 0;
		font-size: 1rem;
	}

	.note.subtle {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		color: var(--color-text-muted);
	}

	.split {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 3rem;
		align-items: start;
	}

	.check-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.check-list.wide {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.65rem 2rem;
		margin: 1.5rem 0 2.5rem;
	}

	.check-list li {
		position: relative;
		padding-left: 1.6rem;
	}

	.check-list li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--color-accent);
		font-weight: 700;
	}

	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		background: #fff;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9rem;
	}

	th,
	td {
		text-align: left;
		padding: 0.75rem 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	th {
		background: var(--color-dark);
		color: #fff;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	.step {
		padding: 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.step-number {
		font-family: var(--font-mono);
		color: var(--color-primary);
		font-weight: 600;
		font-size: 0.85rem;
	}

	.step h3 {
		font-size: 1.1rem;
		margin: 0.35rem 0;
	}

	.step p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--color-text-muted);
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin-top: 2rem;
	}

	.project-card {
		background: #fff;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
	}

	.project-top {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.project-kind {
		color: var(--color-accent);
	}

	.project-status {
		color: var(--color-text-muted);
		text-align: right;
		text-transform: none;
		letter-spacing: 0;
		font-weight: 600;
	}

	.project-card h3 {
		font-size: 1.15rem;
		margin-bottom: 0.75rem;
	}

	.project-card dl {
		margin: 0 0 1rem;
		flex: 1;
	}

	.project-card dt {
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		margin-top: 0.6rem;
	}

	.project-card dd {
		margin: 0.1rem 0 0;
		font-size: 0.92rem;
		line-height: 1.5;
	}

	.project-card a {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.cta-section {
		background: var(--color-dark);
		padding: 4.5rem 0;
	}

	.cta-inner {
		max-width: 760px;
		color: rgba(255, 255, 255, 0.75);
	}

	.cta-inner h2 {
		color: #fff;
		font-size: clamp(1.8rem, 3.2vw, 2.5rem);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 1.25rem 0;
	}

	.chip {
		padding: 0.4rem 0.9rem;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 100px;
		color: #fff;
		font-size: 0.85rem;
		text-decoration: none;
	}

	.chip:hover {
		border-color: #fff;
		color: #fff;
		text-decoration: none;
	}

	.contact-direct a {
		color: #fdba74;
	}

	@media (max-width: 900px) {
		.hero-inner,
		.split {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.tiles,
		.project-grid {
			grid-template-columns: 1fr 1fr;
		}

		.steps {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 640px) {
		.dev-hero {
			padding: 3.5rem 0 3rem;
		}

		.block {
			padding: 3rem 0;
		}

		.tiles,
		.project-grid,
		.steps,
		.check-list.wide {
			grid-template-columns: 1fr;
		}

		.hero-actions :global(.btn) {
			width: 100%;
		}
	}
</style>
