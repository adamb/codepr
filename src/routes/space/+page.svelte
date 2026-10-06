<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	// Amenities below are the ones already documented on /pricing. Prices live there only.
	const offerings = [
		{
			id: 'desks',
			title: 'Floating & hot desks',
			text: 'Open-desk access in Santurce for developers, founders, freelancers and remote workers.',
			items: [
				'Kitchen and lounge use',
				'Fast Wi-Fi and ample power',
				'Monthly meeting-room credit'
			]
		},
		{
			id: 'flexible',
			title: 'Flexible workspace',
			text: 'Options that fit how your team actually works, from a day pass to a standing desk.',
			items: [
				'Day pass for visitors',
				'Virtual office: a San Juan business address, mail and package handling, arrival alerts and secure storage',
				'Discounted desk membership for Holberton graduates'
			]
		},
		{
			id: 'meetings',
			title: 'Meeting space',
			text: 'A conference room for client sessions, team working meetings and small workshops.',
			items: [
				'Seats up to 10 people',
				'Wi-Fi and a large flat-screen',
				'Complimentary coffee and water, board-room setup'
			]
		},
		{
			id: 'events',
			title: 'Event rentals',
			text: 'A large, adaptable room for meetups, workshops, panels and company events.',
			items: [
				'Groups of up to approximately 70 people',
				'Projector and A/V equipment',
				'Adaptable layout and on-site support'
			]
		}
	];
</script>

<SEO
	title="Coworking & Event Space in San Juan"
	description="Hot desks, a meeting room and event space for up to approximately 70 people at Code Puerto Rico's tech hub in San Juan, Puerto Rico."
	canonical="https://code.pr/space"
/>

<section class="page-hero">
	<div class="container">
		<p class="eyebrow">Our San Juan home</p>
		<h1>Work, Meet &amp; Build in San Juan</h1>
		<p class="page-lead">
			A workspace for developers, founders, teams and events, at the tech hub where our
			software development team works.
		</p>
		<p class="hero-actions">
			<a href="/pricing" class="btn btn-lg">Rent a Desk</a>
			<a href="/contactus?inquiry=host-an-event" class="btn btn-lg btn-ghost-white">Host an Event</a>
			<a href="/contactus?inquiry=workspace" class="btn btn-lg btn-ghost-white">Ask About Workspace</a>
		</p>
	</div>
</section>

<div class="page-body">
	<div class="container">
		<section class="intro">
			<h2>A tech hub with an engineering team inside it</h2>
			<p class="lead">
				Code Puerto Rico combines a software development team with a physical tech hub in San
				Juan. Our extra office capacity is open to the local technology and business community
				as coworking, meeting and event space.
			</p>
		</section>

		<section class="offerings" aria-label="Workspace options">
			{#each offerings as o}
				<article class="offering" id={o.id}>
					<h3>{o.title}</h3>
					<p>{o.text}</p>
					<ul>
						{#each o.items as item}
							<li>{item}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</section>

		<p class="pricing-link">
			Current rates and booking links are on the <a href="/pricing">pricing page</a>. For anything
			else, such as a custom event or a team that needs several desks,
			<a href="/contactus?inquiry=workspace">ask us about workspace</a>.
		</p>

		<section class="location">
			<div>
				<h2>Location</h2>
				<address>
					Code Puerto Rico<br />
					1550 PR-25, 2nd Floor<br />
					San Juan, PR 00909
				</address>
				<p>
					<a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Open in Google Maps →</a>
				</p>
			</div>
			<div>
				<h2>Who it's for</h2>
				<ul class="audience">
					<li>Developers and remote workers who want a desk in San Juan</li>
					<li>Founders and small teams</li>
					<li>Organizers of tech meetups, workshops and business events</li>
					<li>Anyone visiting Puerto Rico who needs a day of work</li>
				</ul>
			</div>
		</section>

		<section class="dev-link">
			<div>
				<h2>Building something? Our engineers work here.</h2>
				<p>
					Code Puerto Rico Development builds custom software, AI-enabled systems and integrations
					for businesses, with Puerto Rico-based engineers.
				</p>
			</div>
			<a href="/development" class="btn btn-lg">See what we build</a>
		</section>
	</div>
</div>

<style>
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: 0.75rem;
	}

	.page-hero h1 {
		font-size: clamp(2rem, 4.5vw, 3.4rem);
	}

	.page-hero .page-lead {
		max-width: 680px;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 1.75rem 0 0;
	}

	.intro {
		max-width: 780px;
		margin-bottom: 2.5rem;
	}

	.intro h2,
	.location h2,
	.dev-link h2 {
		font-size: clamp(1.5rem, 2.8vw, 2.1rem);
	}

	.offerings {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
	}

	.offering {
		border: 1px solid var(--color-border);
		border-top: 3px solid var(--color-accent);
		border-radius: var(--radius-lg);
		padding: 1.75rem;
		background: #fff;
	}

	.offering h3 {
		font-size: 1.3rem;
	}

	.offering p {
		color: var(--color-text-muted);
	}

	.offering ul,
	.audience {
		margin: 0;
		padding-left: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		font-size: 0.95rem;
	}

	.pricing-link {
		margin: 1.75rem 0 3rem;
		font-size: 1.02rem;
	}

	.location {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		padding-top: 2.5rem;
		border-top: 1px solid var(--color-border);
	}

	address {
		font-style: normal;
		line-height: 1.7;
		margin-bottom: 0.75rem;
	}

	.dev-link {
		margin-top: 3.5rem;
		padding: 2rem;
		background: var(--color-dark);
		border-radius: var(--radius-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		color: rgba(255, 255, 255, 0.75);
	}

	.dev-link h2 {
		color: #fff;
		margin-bottom: 0.5rem;
	}

	.dev-link p {
		margin: 0;
	}

	@media (max-width: 800px) {
		.offerings,
		.location {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.dev-link {
			flex-direction: column;
			align-items: flex-start;
		}

		.page-hero {
			padding: 3.5rem 0;
		}
	}
</style>
