<script lang="ts">
	import SEO from '$lib/SEO.svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
</script>

<SEO
	title="Upcoming Events"
	description="Demo Days, workshops, lightning talks, and community meetups at Code Puerto Rico in San Juan."
	canonical="https://code.pr/upcoming-events"
/>

<section class="page-hero">
	<div class="container">
		<h1>Events</h1>
		<p class="page-lead">
			Demo Days, workshops, lightning talks, and community meetups in San Juan. &nbsp;
			<a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener" class="map-link">View on map →</a>
		</p>
	</div>
</section>

<div class="page-body">
	<div class="container events-layout">

		<aside class="sidebar">
			<nav class="sidebar-nav" aria-label="Page sections">
				<a href="#upcoming">Upcoming Events</a>
				<a href="#past">Past Events</a>
				<a href="#recurring">Recurring Events</a>
				<a href="#hosting">Host Your Own Event</a>
				<a href="#talks">Invited Tech Talks</a>
			</nav>
		</aside>

		<div class="events-main">

			<section id="upcoming">
				<h2>Upcoming Events</h2>

				<div class="table-wrap">
					<table class="events-table">
						<thead>
							<tr>
								<th>Event</th>
								<th>Date & Time</th>
								<th>Location</th>
								<th>Admission</th>
								<th>Registration</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td data-label="Event"><strong>Demo Day — Cohort 28</strong></td>
								<td data-label="Date & Time"><strong>Friday, July 31, 2026</strong><br />9:00 AM – 12:00 PM</td>
								<td data-label="Location"><a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a></td>
								<td data-label="Admission">Free</td>
								<td data-label="Registration">Email info@code.pr</td>
							</tr>
							<tr>
								<td data-label="Event"><strong>Demo Day — Cohort 29</strong></td>
								<td data-label="Date & Time"><strong>Friday, November 13, 2026</strong><br />9:00 AM – 12:00 PM</td>
								<td data-label="Location"><a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a></td>
								<td data-label="Admission">Free</td>
								<td data-label="Registration">Email info@code.pr</td>
							</tr>
						</tbody>
					</table>
				</div>

				<blockquote>
					<strong>Demo Day:</strong> Meet and recruit emerging tech talent, see capstone project demos, and network with the local tech community.
				</blockquote>
			</section>

			<section id="past">
				<h2>Past Events</h2>

				<div class="table-wrap">
					<table class="events-table">
						<thead>
							<tr>
								<th>Event</th>
								<th>Date & Time</th>
								<th>Location</th>
								<th>Admission</th>
								<th>Link</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td data-label="Event"><strong><a href="/events/ai-for-executives">AI for Executives: What Matters Now</a></strong></td>
								<td data-label="Date & Time">Wednesday, July 9, 2026 · 3:30 PM – 7:00 PM</td>
								<td data-label="Location">Aloft San Juan, Convention Center District</td>
								<td data-label="Admission">$200 early bird / $250</td>
								<td data-label="Link"><a href="https://www.eventbrite.com/e/1990812678312?aff=oddtdtcreator" target="_blank" rel="noopener">Eventbrite →</a></td>
							</tr>
							<tr>
								<td data-label="Event"><strong>Defenestration Workshop: Installing Linux on Your PC</strong></td>
								<td data-label="Date & Time">May 26, 2026 · 6–8 PM AST</td>
								<td data-label="Location"><a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a></td>
								<td data-label="Admission">Free</td>
								<td data-label="Link"><a href="/workshops/linux-workshop">Details →</a></td>
							</tr>
							<tr>
								<td data-label="Event"><strong>Tech Lightning Talks</strong></td>
								<td data-label="Date & Time">May 14, 2026 · 5–7 PM AST</td>
								<td data-label="Location"><a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a></td>
								<td data-label="Admission">Free</td>
								<td data-label="Link"><a href="https://luma.com/b8vxm247" target="_blank" rel="noopener">Luma →</a></td>
							</tr>
							<tr>
								<td data-label="Event"><strong>Tech Lightning Talks</strong></td>
								<td data-label="Date & Time">Apr 9, 2026 · 5–7 PM EDT</td>
								<td data-label="Location"><a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a></td>
								<td data-label="Admission">Free</td>
								<td data-label="Link"><a href="https://luma.com/iaoka3rx" target="_blank" rel="noopener">Luma →</a></td>
							</tr>
							<tr>
								<td data-label="Event"><strong>AI Across Industries: Two Pathways to Careers in PR</strong></td>
								<td data-label="Date & Time">Apr 8, 2026</td>
								<td data-label="Location"><a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a></td>
								<td data-label="Admission">Free</td>
								<td data-label="Link"><a href="https://www.eventbrite.com/e/ai-across-industries-two-pathways-to-careers-in-puerto-rico-tickets-1985248253969?aff=oddtdtcreator" target="_blank" rel="noopener">Eventbrite →</a></td>
							</tr>
							<tr>
								<td data-label="Event"><strong>Tech Lightning Talks</strong></td>
								<td data-label="Date & Time">Feb 26, 2026 · 5–7 PM AST</td>
								<td data-label="Location"><a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a></td>
								<td data-label="Admission">Free</td>
								<td data-label="Link"><a href="https://luma.com/mvc2tiql" target="_blank" rel="noopener">Luma →</a></td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="past-details">
					<h3>Workshops & Panels</h3>

					<div class="event-card">
						<h4>AI Across Industries: Two Pathways to Careers in Puerto Rico</h4>
						<p class="event-date">Wed, April 8, 2026 &nbsp;·&nbsp; Partners: Code Puerto Rico, ALPFA PR</p>
						<p><strong>Panelists:</strong> Adam Beguelin · Gabe Perez · Antonio J Rodriguez · Javier Rosario · Luis R. Esteves</p>
						<a href="https://www.eventbrite.com/e/ai-across-industries-two-pathways-to-careers-in-puerto-rico-tickets-1985248253969?aff=oddtdtcreator" target="_blank" rel="noopener">View on Eventbrite →</a>
					</div>

					<h3>Tech Lightning Talks</h3>
					<p class="series-desc">Recurring series. 5-minute talks on AI, coding, startups, tools, automations, hacks, side projects, demos, and lessons learned. Audience: students, alumni, builders, founders, and curious humans. Free.</p>

					<div class="talk-row">
						<span>May 14, 2026 · 5–7 PM AST</span>
						<a href="https://luma.com/b8vxm247" target="_blank" rel="noopener">View on Luma →</a>
					</div>
					<div class="talk-row">
						<span>April 9, 2026 · 5–7 PM EDT</span>
						<a href="https://luma.com/iaoka3rx" target="_blank" rel="noopener">View on Luma →</a>
					</div>
					<div class="talk-row">
						<span>February 26, 2026 · 5–7 PM AST</span>
						<a href="https://luma.com/mvc2tiql" target="_blank" rel="noopener">View on Luma →</a>
					</div>
				</div>
			</section>

			<section id="recurring" class="recurring">
				<h2>Recurring Events — Notify Me</h2>
				<p class="lead">Check the ones you're interested in and we'll notify you when they're scheduled.</p>

				{#if form?.success}
					<div class="notify-success" role="alert">
						<strong>Check your inbox!</strong> We sent a confirmation link to <strong>{form.email}</strong>. Click it to complete your signup.
					</div>
				{:else}
					<form
						class="notify-form"
						method="POST"
						action="?/notify"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								submitting = false;
								await update();
							};
						}}
					>
						{#if form?.error}
							<p class="notify-error" role="alert">{form.error}</p>
						{/if}

						<fieldset>
							<legend>Select events to receive notifications when scheduled.</legend>
							<label><input type="checkbox" name="demo_day" value="1" /> Demo Day</label>
							<label><input type="checkbox" name="demo_nights" value="1" /> Demo Nights &amp; Lightning Talks</label>
							<label><input type="checkbox" name="ai_coding" value="1" /> AI Coding Tools Introduction</label>
							<label><input type="checkbox" name="pitch_prototype" value="1" /> Pitch and Prototype</label>
							<label><input type="checkbox" name="cloudflare" value="1" /> Cloudflare Meetup</label>
							<label><input type="checkbox" name="home_assistant" value="1" /> Home Assistant Meetup</label>
						</fieldset>

						<div class="notify-contact">
							<input type="text" name="name" placeholder="Your name" required autocomplete="name" />
							<input type="email" name="email" placeholder="Your email" required autocomplete="email" />
						</div>

						<button type="submit" class="btn" disabled={submitting}>
							{submitting ? 'Sending…' : 'Notify Me →'}
						</button>
					</form>
				{/if}

				<ul class="recurring-list">
					<li><strong>Demo Nights & Lightning Talks:</strong> Monthly showcase. 10-min project demos + 5-min insight bursts.</li>
					<li><strong>AI Coding Tools Introduction:</strong> Hands-on walkthrough of tools like Cursor, Claude Code, etc.</li>
					<li><strong>Pitch and Prototype:</strong> Pitch ideas to grads; grads prototype ideas in one night.</li>
					<li><strong>Cloudflare Meetup:</strong> DNS, CDN, Workers, Pages, Tunnels. For developers and sysadmins.</li>
					<li><strong>Home Assistant Meetup:</strong> Home automation, integrations, hardware, and troubleshooting.</li>
				</ul>
			</section>

			<div class="bottom-grid">
				<section id="hosting">
					<h2>Host Your Own Event</h2>
					<ul>
						<li>Space open for meetups, workshops, hackathons, and study groups.</li>
						<li>Events strengthening the local tech community can be hosted at <strong>little or no cost</strong>.</li>
						<li>On-site support provided by Code Puerto Rico.</li>
					</ul>
				</section>

				<section id="talks">
					<h2>Invited Tech Talks</h2>
					<ul>
						<li>World-class entrepreneurs and innovators sharing journeys and lessons.</li>
						<li>Topics: global impact companies (AI, medical tech, infrastructure).</li>
						<li>Format: Presentation + Q&A.</li>
						<li><strong>Status:</strong> Stay tuned for upcoming sessions.</li>
					</ul>
				</section>
			</div>

		</div>
	</div>
</div>

<style>
	.map-link {
		color: rgba(255, 255, 255, 0.55);
		font-size: 0.875rem;
		text-decoration: none;
		white-space: nowrap;
	}

	.map-link:hover {
		color: rgba(255, 255, 255, 0.9);
	}

	/* Layout */
	.events-layout {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 3.5rem;
		align-items: start;
	}

	/* Sidebar */
	.sidebar {
		position: sticky;
		top: 128px;
	}

	.sidebar-nav {
		display: flex;
		flex-direction: column;
	}

	.sidebar-nav a {
		display: block;
		padding: 0.5rem 0 0.5rem 1rem;
		border-left: 2px solid var(--color-border);
		color: var(--color-text-muted);
		font-size: 0.875rem;
		font-weight: 500;
		text-decoration: none;
		transition: color 0.15s, border-color 0.15s;
		line-height: 1.4;
	}

	.sidebar-nav a:hover {
		color: var(--color-accent);
		border-left-color: var(--color-accent);
	}

	/* Main content sections */
	.events-main section {
		margin-bottom: 3rem;
		padding-bottom: 3rem;
		border-bottom: 1px solid var(--color-border);
	}

	.events-main section:last-of-type,
	.events-main .bottom-grid {
		border-bottom: none;
	}

	.events-main h2 {
		font-size: clamp(1.25rem, 2.5vw, 1.75rem);
		margin-bottom: 1.25rem;
	}

	/* Tables */
	.table-wrap {
		width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		margin: 0 0 1.25rem;
	}

	.events-table {
		width: 100%;
		min-width: 540px;
		border-collapse: collapse;
		background: white;
	}

	.events-table th,
	.events-table td {
		padding: 0.8rem 1rem;
		text-align: left;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.875rem;
	}

	.events-table tbody tr:last-child td {
		border-bottom: none;
	}

	.events-table thead th {
		background: var(--color-dark);
		color: rgba(255, 255, 255, 0.65);
		font-family: var(--font-headings);
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
	}

	.events-table tbody tr:hover td {
		background: var(--color-light);
	}

	.events-table a {
		color: var(--color-accent);
		font-weight: 600;
	}

	blockquote {
		border-left: 3px solid var(--color-accent);
		padding: 0.875rem 1.25rem;
		margin: 0;
		background: rgba(27, 169, 202, 0.05);
		border-radius: 0 var(--radius) var(--radius) 0;
		font-size: 0.9rem;
		color: var(--color-text-muted);
	}

	/* Past details */
	.past-details {
		margin-top: 1.75rem;
	}

	.past-details h3 {
		font-size: 1.1rem;
		margin: 1.75rem 0 0.75rem;
	}

	.event-card {
		padding: 1.25rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		margin-bottom: 1rem;
	}

	.event-card h4 {
		font-size: 0.95rem;
		margin-bottom: 0.375rem;
	}

	.event-date {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		margin-bottom: 0.5rem;
	}

	.event-card a {
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--color-accent);
	}

	.series-desc {
		color: var(--color-text-muted);
		font-size: 0.875rem;
		margin-bottom: 1rem;
	}

	.talk-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.625rem 0;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.talk-row:last-of-type {
		border-bottom: none;
	}

	.talk-row a {
		font-weight: 600;
		font-size: 0.85rem;
		color: var(--color-accent);
	}

	/* Recurring */
	.recurring {
		background: var(--color-light);
		border-radius: var(--radius-lg);
		padding: 2rem !important;
		border-bottom: none !important;
		border: 1px solid var(--color-border);
	}

	.notify-form fieldset {
		border: none;
		padding: 0;
		margin: 1rem 0;
	}

	.notify-form legend {
		font-weight: 600;
		font-size: 0.9rem;
		margin-bottom: 0.875rem;
	}

	.notify-form label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		cursor: pointer;
		font-size: 0.875rem;
	}

	.notify-success {
		background: rgba(27, 169, 202, 0.08);
		border: 1px solid var(--color-accent);
		border-radius: var(--radius);
		padding: 1rem 1.25rem;
		font-size: 0.9rem;
		color: var(--color-text);
		margin-bottom: 1rem;
	}

	.notify-error {
		background: rgba(220, 38, 38, 0.07);
		border: 1px solid rgba(220, 38, 38, 0.3);
		border-radius: var(--radius);
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		color: #b91c1c;
		margin-bottom: 0.875rem;
	}

	.notify-contact {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.625rem;
		margin: 0.875rem 0;
	}

	.notify-contact input {
		padding: 0.6rem 0.875rem;
		border: 1.5px solid var(--color-border);
		border-radius: var(--radius);
		font-size: 0.9rem;
		font-family: var(--font-body);
		color: var(--color-text);
		background: #fff;
		transition: border-color 0.15s;
	}

	.notify-contact input:focus {
		outline: none;
		border-color: var(--color-accent);
		box-shadow: 0 0 0 3px rgba(27, 169, 202, 0.12);
	}

	.notify-form button:disabled {
		opacity: 0.65;
		cursor: not-allowed;
	}

	.recurring-list {
		background: white;
		padding: 1.25rem 1.5rem;
		border-radius: var(--radius);
		margin-top: 1.25rem;
		font-size: 0.875rem;
		list-style: none;
		padding-left: 1.5rem;
	}

	.recurring-list li {
		margin-bottom: 0.75rem;
		color: var(--color-text-muted);
	}

	.recurring-list li:last-child {
		margin-bottom: 0;
	}

	.recurring-list strong {
		color: var(--color-text);
	}

	/* Bottom grid */
	.bottom-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 0;
	}

	.bottom-grid section {
		padding: 1.75rem !important;
		border: 1px solid var(--color-border) !important;
		border-radius: var(--radius-lg) !important;
		border-bottom: 1px solid var(--color-border) !important;
		margin-bottom: 0 !important;
	}

	.bottom-grid section h2 {
		font-size: 1.1rem;
		margin-bottom: 0.875rem;
	}

	.bottom-grid ul {
		color: var(--color-text-muted);
		font-size: 0.875rem;
		margin: 0;
	}

	.bottom-grid li {
		margin-bottom: 0.5rem;
	}

	/* Responsive */
	@media (max-width: 540px) {
		.notify-contact {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 900px) {
		.events-layout {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.sidebar {
			position: static;
		}

		.sidebar-nav {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.25rem;
		}

		.sidebar-nav a {
			border-left: none;
			border-bottom: 2px solid var(--color-border);
			padding: 0.375rem 0.75rem;
			font-size: 0.8rem;
		}

		.sidebar-nav a:hover {
			border-left: none;
			border-bottom-color: var(--color-accent);
		}

		.bottom-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.events-table,
		.events-table thead,
		.events-table tbody,
		.events-table th,
		.events-table td,
		.events-table tr {
			display: block;
		}

		.events-table {
			min-width: unset;
		}

		.events-table thead {
			position: absolute;
			left: -9999px;
		}

		.events-table tr {
			border-bottom: 1px solid var(--color-border);
			padding: 0.5rem;
		}

		.events-table td {
			border: none;
			padding: 0.375rem 0.5rem;
		}

		.events-table td::before {
			content: attr(data-label) ': ';
			font-weight: 700;
			font-size: 0.72rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			color: var(--color-text-muted);
		}
	}
</style>
