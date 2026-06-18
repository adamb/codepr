<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="AI for Executives: What Matters Now"
	description="An exclusive executive briefing on AI's practical impact for business leaders. July 9, 2026 · Aloft San Juan."
	canonical="https://code.pr/events/ai-for-executives"
/>

<section class="page-hero">
	<div class="container">
		<span class="eyebrow">Executive Briefing · July 9, 2026</span>
		<h1>AI for Executives: What Matters Now</h1>
		<p class="page-lead">
			An exclusive briefing for business leaders, executives, and decision-makers who want to understand
			how AI is reshaping the future of business — and how to act on it.
		</p>
	</div>
</section>

<div class="page-body">
	<div class="container content-layout">

		<div class="main-content">
			<div class="detail-card">
				<div class="detail-row">
					<span class="detail-label">Date</span>
					<span>Wednesday, July 9, 2026</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Time</span>
					<span>3:30 PM – 7:00 PM AST</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Location</span>
					<span>Aloft San Juan · Convention Center District · San Juan, Puerto Rico</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Format</span>
					<span>In-Person · Valet Parking Available</span>
				</div>
			</div>

			<section class="about">
				<h2>About This Event</h2>
				<p>
					Artificial Intelligence is transforming the way organizations operate, make decisions, and
					drive growth. Yet for many business leaders, the key question remains: <strong>How can we
					leverage AI strategically to create real business value?</strong>
				</p>
				<p>
					This session explores how AI is evolving from a technology tool into a new form of labor —
					capable of augmenting productivity, streamlining operations, improving customer experiences,
					and accelerating decision-making across organizations.
				</p>
			</section>

			<section class="speakers">
				<h2>Featured Speakers</h2>
				<div class="speakers-list">
					<div class="speaker-card">
						<div class="speaker-name">Adam Beguelin, PhD</div>
						<div class="speaker-title">Co-Founder and Chief Mentor</div>
						<div class="speaker-org">Holberton School Puerto Rico</div>
					</div>
					<div class="speaker-card">
						<div class="speaker-name">Vincent Guarino</div>
						<div class="speaker-title">President</div>
						<div class="speaker-org">San Juan Export Services</div>
					</div>
				</div>
			</section>

			<section class="topics">
				<h2>Topics Include</h2>
				<ul class="topics-list">
					<li>Understanding the AI Landscape in 2026</li>
					<li>AI Assistants, AI Agents, and the Future of Work</li>
					<li>Practical Applications Across Marketing, Sales, Finance, Operations, and Customer Service</li>
					<li>Identifying High-Impact Opportunities Within Your Organization</li>
					<li>AI Governance, Risk Management, and Responsible Adoption</li>
					<li>Live Demonstrations of AI-Powered Business Solutions</li>
					<li>Real-World Examples of AI-Driven Business Transformation</li>
				</ul>
			</section>

			<section class="experience">
				<h2>Executive Experience</h2>
				<ul class="experience-list">
					<li>☕ Executive Coffee Reception &amp; Networking</li>
					<li>🎤 Strategic AI Leadership Briefing</li>
					<li>💡 Live AI Demonstrations</li>
					<li>🤝 Executive Networking Opportunities</li>
					<li>🍷 Cocktail Reception Following the Seminar</li>
					<li>🚗 Valet Parking Available</li>
				</ul>
			</section>
		</div>

		<aside class="register-aside">
			<div class="register-card">
				<h2>Reserve Your Seat</h2>
				<div class="register-meta">
					<div class="register-date">July 9, 2026</div>
					<div class="register-time">3:30 PM – 7:00 PM AST</div>
					<div class="register-venue">Aloft San Juan</div>
				</div>
				<a
					href="https://www.eventbrite.com/e/1990812678312?aff=oddtdtcreator"
					target="_blank"
					rel="noopener"
					class="btn btn-lg register-btn"
				>
					Register on Eventbrite →
				</a>
				<p class="register-note">Exclusive executive event — seats are limited.</p>
			</div>
		</aside>

	</div>
</div>

<style>
	.content-layout {
		display: grid;
		grid-template-columns: 1fr 360px;
		gap: 3rem;
		align-items: start;
	}

	.eyebrow {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-accent);
		letter-spacing: 0.06em;
		margin-bottom: 0.75rem;
	}

	.detail-card {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		margin-bottom: 2.5rem;
	}

	.detail-row {
		display: grid;
		grid-template-columns: 90px 1fr;
		gap: 1rem;
		padding: 0.875rem 1.25rem;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.9rem;
		align-items: center;
	}

	.detail-row:last-child {
		border-bottom: none;
	}

	.detail-label {
		font-weight: 700;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-text-muted);
	}

	section {
		margin-bottom: 2.5rem;
	}

	.about h2,
	.speakers h2,
	.topics h2,
	.experience h2 {
		font-size: 1.35rem;
		margin-bottom: 0.875rem;
	}

	.about p {
		color: var(--color-text-muted);
		font-size: 0.95rem;
		line-height: 1.7;
		margin-bottom: 0.75rem;
	}

	.about strong {
		color: var(--color-text);
	}

	/* Speakers */
	.speakers-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.speaker-card {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1rem 1.25rem;
	}

	.speaker-name {
		font-weight: 700;
		font-size: 1rem;
		margin-bottom: 0.15rem;
	}

	.speaker-title {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.speaker-org {
		font-size: 0.875rem;
		color: var(--color-accent);
		font-weight: 600;
	}

	/* Topics */
	.topics-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.topics-list li {
		padding-left: 1.5rem;
		position: relative;
		color: var(--color-text-muted);
		font-size: 0.95rem;
		line-height: 1.55;
	}

	.topics-list li::before {
		content: '✔';
		position: absolute;
		left: 0;
		color: var(--color-primary);
		font-size: 0.8rem;
		top: 0.1em;
	}

	/* Experience */
	.experience-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.experience-list li {
		color: var(--color-text-muted);
		font-size: 0.95rem;
	}

	/* Register aside */
	.register-card {
		background: var(--color-dark);
		border-radius: var(--radius-lg);
		padding: 2rem;
		position: sticky;
		top: 128px;
	}

	.register-card h2 {
		color: #fff;
		font-size: 1.25rem;
		margin-bottom: 1.25rem;
	}

	.register-meta {
		margin-bottom: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.register-date {
		color: #fff;
		font-weight: 700;
		font-size: 1rem;
	}

	.register-time,
	.register-venue {
		color: rgba(255, 255, 255, 0.55);
		font-size: 0.875rem;
	}

	.register-btn {
		display: block;
		text-align: center;
		width: 100%;
		text-decoration: none;
	}

	.register-note {
		margin-top: 1rem;
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.4);
		text-align: center;
	}

	@media (max-width: 900px) {
		.content-layout {
			grid-template-columns: 1fr;
		}

		.register-card {
			position: static;
		}
	}
</style>
