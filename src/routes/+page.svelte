<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import { services, projects } from '$lib/content';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': 'https://code.pr/#organization',
		name: 'Code Puerto Rico',
		legalName: 'Code Puerto Rico, LLC',
		url: 'https://code.pr/',
		logo: 'https://code.pr/images/logo.webp',
		description:
			'Software and AI development company and technology hub in San Juan, Puerto Rico. Builds custom software, AI-enabled systems and integrations with Puerto Rico-based engineers, and operates workspace and event space.',
		email: 'info@code.pr',
		telephone: '+1-787-296-9300',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '1550 PR-25, 2nd Floor',
			addressLocality: 'San Juan',
			addressRegion: 'PR',
			postalCode: '00909',
			addressCountry: 'US'
		},
		areaServed: 'Puerto Rico',
		sameAs: [
			'https://instagram.com/code_puertorico',
			'https://www.facebook.com/profile.php?id=61564742363745'
		]
	};

	const aiPoints = [
		'AI-enabled software',
		'AI automation',
		'LLM integrations',
		'AI-assisted workflows',
		'Intelligent internal tools',
		'Rapid AI prototypes'
	];
</script>

<SEO
	title="Software & AI Development in Puerto Rico | Code Puerto Rico"
	description="Custom software, AI applications and integrations built by Puerto Rico-based engineers from our San Juan tech hub, plus coworking, meeting and event space."
	canonical="https://code.pr/"
	{jsonLd}
/>

<!-- Hero -->
<section class="hero-cover">
	<div class="hero-overlay"></div>
	<div class="container">
		<div class="hero-content">
			<p class="hero-eyebrow">Code Puerto Rico Development · San Juan, PR</p>
			<h1>AI &amp; Software Development from Puerto Rico</h1>
			<p class="hero-sub">
				We build custom software, AI-enabled systems and integrations for businesses, with a
				Puerto Rico-based engineering team working from our tech hub in San Juan.
			</p>
			<p class="hero-actions">
				<a href="/contactus?inquiry=custom-software" class="btn btn-lg">Start a Software Project</a>
				<a href="/development" class="btn btn-lg btn-ghost-white">See what we build</a>
			</p>
			<p class="hero-meta">
				Built in San Juan · 1550 PR-25 · Also home to a
				<a href="/space">workspace and event space</a>
			</p>
		</div>
	</div>
</section>

<!-- Services -->
<section class="services" id="services">
	<div class="container">
		<h2>Software &amp; AI engineering for business</h2>
		<p class="lead">
			Code Puerto Rico Development is our commercial engineering practice: nearshore engineering
			from Puerto Rico, with senior review on every deliverable.
		</p>

		<div class="service-grid">
			{#each services as service}
				<div class="service-tile">
					<h3>{service.title}</h3>
					<p>{service.blurb}</p>
				</div>
			{/each}
		</div>

		<p class="section-link"><a href="/development">Explore our software &amp; AI development services →</a></p>
	</div>
</section>

<!-- AI as development -->
<section class="ai-section">
	<div class="container">
		<div class="ai-grid">
			<div>
				<p class="eyebrow">AI development</p>
				<h2>We use AI to build technology.</h2>
				<p>
					AI is part of how we engineer and what we engineer. We build AI into custom software,
					automate business processes with it, and use AI-assisted workflows so a small team
					ships working systems quickly, with senior engineers reviewing the result.
				</p>
				<ul class="ai-points">
					{#each aiPoints as point}
						<li>{point}</li>
					{/each}
				</ul>
				<p class="ai-note">
					Training and workshops are a separate community activity at Code PR and Holberton. They
					are not what this section is about.
				</p>
			</div>
			<aside class="ai-example">
				<p class="eyebrow">From our lab</p>
				<h3>A small model for one real problem</h3>
				<p>
					Off-the-shelf vision models kept reading a gate that was standing open as closed. We
					fine-tuned a 6 MB image classifier and connected it to Home Assistant, so every phone
					alert doubles as a training label. It still makes mistakes, and the write-up shows them.
				</p>
				<a href="/blog/4/beach-gate-vision-classifier">Read the write-up →</a>
			</aside>
		</div>
	</div>
</section>

<!-- Talent and growth -->
<section class="talent">
	<div class="container">
		<div class="talent-head">
			<h2>Puerto Rico engineering talent, applied to commercial software.</h2>
			<p class="lead">
				Code PR spent years building a developer community and a talent pipeline in San Juan. That
				engineering capacity now works on commercial software and AI projects.
			</p>
		</div>

		<ol class="story">
			<li>
				<span class="story-step">1</span>
				<h3>Community</h3>
				<p>A tech hub in San Juan where developers, founders and teams meet, build and host events.</p>
			</li>
			<li>
				<span class="story-step">2</span>
				<h3>Talent pipeline</h3>
				<p>Holberton Coding School Puerto Rico trains software engineers in the same building.</p>
			</li>
			<li>
				<span class="story-step">3</span>
				<h3>Commercial engineering</h3>
				<p>Code Puerto Rico Development puts that talent to work on client software and AI projects.</p>
			</li>
		</ol>

		<ul class="talent-points">
			<li>We hire and work with Puerto Rico-based software engineers.</li>
			<li>Client projects create professional technology opportunities on the island.</li>
			<li>Holberton-trained engineers are part of our talent pipeline.</li>
			<li>Real client work gives engineers real-world experience.</li>
			<li>Code PR connects local technical talent with commercial software work.</li>
		</ul>
	</div>
</section>

<!-- Projects -->
<section class="projects">
	<div class="container">
		<h2>Current &amp; recent work</h2>
		<p class="lead">Client projects, the systems we run ourselves, and prototypes from our lab.</p>

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

		<p class="section-link"><a href="/development#projects">More on how we work →</a></p>
	</div>
</section>

<!-- Workspace (secondary) -->
<section class="workspace">
	<div class="container workspace-inner">
		<div class="workspace-text">
			<p class="eyebrow">Our San Juan home</p>
			<h2>Work, Meet &amp; Build in San Juan</h2>
			<p>
				Code Puerto Rico combines a software development team with a physical tech hub in San
				Juan. In addition to our development team, we operate a flexible technology workspace with
				floating desks, meeting space, and event capacity for groups of up to approximately 70
				people.
			</p>
			<p class="workspace-actions">
				<a href="/pricing" class="btn btn-outline">Rent a Desk</a>
				<a href="/contactus?inquiry=host-an-event" class="btn btn-outline">Host an Event</a>
				<a href="/space" class="btn btn-outline">View Workspace</a>
			</p>
		</div>
		<ul class="workspace-facts">
			<li><strong>Floating desks</strong> for developers, founders and remote teams</li>
			<li><strong>Meeting space</strong> for client sessions and workshops</li>
			<li><strong>Event space</strong> for groups of up to approximately 70</li>
		</ul>
	</div>
</section>

<!-- Education and community (separate from development) -->
<section class="community">
	<div class="community-shape"></div>
	<div class="container">
		<h2>Education and community</h2>
		<p class="lead">
			Learning and community live alongside the development team. They are separate from it.
		</p>
		<div class="community-grid">
			<div class="community-card">
				<h3>Holberton Coding School Puerto Rico</h3>
				<p>
					Technical education and talent development, run from the same building. Holberton
					trains software engineers; Code PR Development is the commercial engineering practice
					where that talent can work.
				</p>
				<a href="https://www.holbertonschoolpr.com" target="_blank" rel="noopener">Visit Holberton Puerto Rico →</a>
			</div>
			<div class="community-card">
				<h3>Events, meetups &amp; workshops</h3>
				<p>
					Lightning talks, hack nights, demo days and hands-on workshops that bring Puerto Rico's
					tech community together in San Juan.
				</p>
				<a href="/upcoming-events">See upcoming events →</a>
			</div>
		</div>
	</div>
</section>

<!-- Final CTA -->
<section class="final-cta">
	<div class="container final-inner">
		<h2>Have a software or AI project in mind?</h2>
		<p>Tell us what you need. We respond within one business day.</p>
		<p class="final-actions">
			<a href="/contactus?inquiry=custom-software" class="btn btn-lg">Discuss Your Project</a>
			<a href="/about-us" class="btn btn-lg btn-ghost-white">About Code PR</a>
		</p>
	</div>
</section>

<style>
	/* Hero */
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
		background: linear-gradient(105deg, rgba(13, 27, 42, 0.9) 0%, rgba(13, 27, 42, 0.7) 60%, rgba(13, 27, 42, 0.5) 100%);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 780px;
		color: #fff;
	}

	.hero-eyebrow,
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: 1rem;
	}

	.hero-content h1 {
		font-size: clamp(2.2rem, 5vw, 3.9rem);
		font-weight: 800;
		line-height: 1.1;
		color: #fff;
		margin-bottom: 1.25rem;
	}

	.hero-sub {
		font-size: clamp(1.05rem, 1.6vw, 1.3rem);
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.85);
		max-width: 640px;
		margin-bottom: 1.75rem;
	}

	.hero-actions,
	.final-actions {
		display: flex;
		gap: 0.875rem;
		flex-wrap: wrap;
		margin-bottom: 1.5rem;
	}

	.hero-meta {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.65);
		margin: 0;
	}

	.hero-meta a {
		color: #fff;
		text-decoration: underline;
	}

	/* Services */
	.services {
		padding: 80px 0;
		background: var(--color-light);
	}

	.services h2,
	.talent h2,
	.projects h2,
	.community h2,
	.ai-section h2,
	.workspace h2,
	.final-cta h2 {
		font-size: clamp(1.7rem, 3.2vw, 2.5rem);
		margin-bottom: 0.75rem;
	}

	.services .lead,
	.projects .lead,
	.community .lead,
	.talent .lead {
		max-width: 760px;
		font-size: 1.1rem;
	}

	.service-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 2rem;
	}

	.service-tile {
		background: #fff;
		border: 1px solid var(--color-border);
		border-top: 3px solid var(--color-accent);
		border-radius: var(--radius);
		padding: 1.25rem 1.25rem 1.1rem;
	}

	.service-tile h3 {
		font-size: 1.05rem;
		margin-bottom: 0.4rem;
	}

	.service-tile p {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		line-height: 1.55;
		margin: 0;
	}

	.section-link {
		margin: 1.75rem 0 0;
		font-weight: 600;
	}

	/* AI */
	.ai-section {
		padding: 80px 0;
		background: linear-gradient(135deg, #0d1f3c 0%, #1b3b6b 100%);
		color: rgba(255, 255, 255, 0.8);
	}

	.ai-section h2,
	.ai-section h3 {
		color: #fff;
	}

	.ai-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 3.5rem;
		align-items: start;
	}

	.ai-points {
		list-style: none;
		margin: 1.25rem 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.6rem 1.5rem;
	}

	.ai-points li {
		position: relative;
		padding-left: 1.25rem;
		color: #fff;
		font-weight: 500;
	}

	.ai-points li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55em;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-primary);
	}

	.ai-note {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.55);
		margin: 0;
	}

	.ai-example {
		background: rgba(255, 255, 255, 0.07);
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: var(--radius-lg);
		padding: 1.75rem;
	}

	.ai-example h3 {
		font-size: 1.35rem;
	}

	.ai-example p {
		font-size: 0.95rem;
	}

	.ai-example a {
		color: #fdba74;
		font-weight: 600;
	}

	/* Talent */
	.talent {
		padding: 80px 0;
	}

	.story {
		list-style: none;
		margin: 2rem 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}

	.story li {
		padding: 1.5rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.story li:last-child {
		border-color: var(--color-primary);
		background: #fffaf7;
	}

	.story h3 {
		font-size: 1.2rem;
	}

	.story p {
		margin: 0;
		font-size: 0.95rem;
		color: var(--color-text-muted);
	}

	.story-step {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--color-dark);
		color: #fff;
		font-weight: 700;
		font-size: 0.85rem;
		margin-bottom: 0.75rem;
	}

	.talent-points {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.6rem 2rem;
	}

	.talent-points li {
		position: relative;
		padding-left: 1.5rem;
	}

	.talent-points li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: var(--color-accent);
		font-weight: 700;
	}

	/* Projects */
	.projects {
		padding: 80px 0;
		background: var(--color-light);
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

	/* Workspace */
	.workspace {
		padding: 64px 0;
		background: #fff;
		border-top: 1px solid var(--color-border);
	}

	.workspace-inner {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	.workspace-text .eyebrow {
		margin-bottom: 0.5rem;
	}

	.workspace-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 1.25rem 0 0;
	}

	.workspace-facts {
		list-style: none;
		margin: 0;
		padding: 1.5rem;
		background: var(--color-light);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		font-size: 0.95rem;
	}

	/* Community */
	.community {
		position: relative;
		padding: 80px 0;
		background: var(--color-light);
		overflow: hidden;
		width: 100%;
	}

	.community-shape {
		position: absolute;
		inset: 0;
		background: url('/images/hero-shape.svg') center center / cover no-repeat;
		opacity: 0.3;
		z-index: 0;
	}

	.community .container {
		position: relative;
		z-index: 1;
	}

	.community-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
		margin-top: 2rem;
	}

	.community-card {
		background: #fff;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1.75rem;
	}

	.community-card h3 {
		font-size: 1.3rem;
	}

	.community-card p {
		color: var(--color-text-muted);
		font-size: 0.95rem;
	}

	.community-card a {
		font-weight: 600;
	}

	/* Final CTA */
	.final-cta {
		background: var(--color-dark);
		padding: 72px 0;
		color: rgba(255, 255, 255, 0.75);
	}

	.final-cta h2 {
		color: #fff;
	}

	.final-inner p:not(.final-actions) {
		font-size: 1.1rem;
	}

	@media (max-width: 900px) {
		.service-grid,
		.project-grid {
			grid-template-columns: 1fr 1fr;
		}

		.ai-grid,
		.workspace-inner,
		.community-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.story {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.hero-cover {
			padding: 64px 0;
		}

		.services,
		.ai-section,
		.talent,
		.projects,
		.community {
			padding: 56px 0;
		}

		.service-grid,
		.project-grid,
		.ai-points,
		.talent-points {
			grid-template-columns: 1fr;
		}

		.hero-actions :global(.btn),
		.final-actions :global(.btn) {
			width: 100%;
		}
	}
</style>
