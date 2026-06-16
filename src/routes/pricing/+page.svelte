<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	const plans = [
		{
			name: 'Virtual Office',
			price: '$69',
			period: '/ month',
			stripe: 'https://buy.stripe.com/28E4gz1CV7q48H23A45c400',
			cta: 'Get Virtual Office',
			description:
				'A professional San Juan business address, mail and package handling, arrival alerts, and secure storage until pickup. Build a local Puerto Rico presence without a physical desk.'
		},
		{
			name: 'Hot Desk',
			price: '$249',
			period: '/ month',
			stripe: 'https://buy.stripe.com/bJe7sLgxPh0E4qMdaE5c401',
			cta: 'Join Hot Desk',
			description:
				'Open-desk access in Santurce, kitchen and lounge use, fast Wi-Fi, ample power, plus monthly meeting-room credit. Built for freelancers, founders, and remote workers.'
		},
		{
			name: 'Hot Desk + Virtual Office',
			price: '$299',
			period: '/ month',
			stripe: 'https://buy.stripe.com/3cI8wPftL9yc1eA3A45c402',
			cta: 'Join the Combo',
			description:
				'The best of both plans: hot-desk access plus a professional business address, extra conference-room credit, and priority booking for meetings and events.',
			featured: true
		},
		{
			name: 'Conference Room',
			price: '$15',
			period: '/ hour',
			stripe: 'https://buy.stripe.com/eVq5kD3L3bGk8H2gmQ5c403',
			cta: 'Book Now',
			description:
				'Meeting room for up to 10 people with Wi-Fi, a large flat-screen, complimentary coffee and water, and a board-room setup. Eight-hour daily cap.'
		},
		{
			name: 'Event Space',
			price: '$1,000',
			period: '/ event',
			stripe: 'https://buy.stripe.com/7sYdR995naCg5uQb2w5c404',
			cta: 'Book Now',
			description:
				'Large venue for up to 75 guests with projector and A/V equipment, adaptable layout, and on-site support for workshops, panels, and similar events.'
		},
		{
			name: 'Holberton Grad',
			price: '$24',
			period: '/ month',
			stripe: 'https://buy.stripe.com/bJe8wP0yRcKoe1m7Qk5c405',
			cta: 'Join Us',
			description:
				'Discounted hot-desk membership for Holberton graduates, with gigabit Wi-Fi and weekday access from morning to early evening.'
		}
	];
</script>

<SEO
	title="Pricing"
	description="Coworking, virtual office, and event space pricing at Code Puerto Rico in San Juan."
	canonical="https://code.pr/pricing"
/>

<section class="page-hero">
	<div class="container">
		<h1>Pricing</h1>
		<p class="page-lead">Flexible coworking, virtual office, and event space plans in San Juan.</p>
	</div>
</section>

<div class="page-body">
	<div class="container">
		<section class="plans-section">
			<div class="plans-grid">
				{#each plans as plan}
					<div class="plan" class:featured={plan.featured}>
						{#if plan.featured}
							<div class="plan-tag">Most Popular</div>
						{/if}
						<h3>{plan.name}</h3>
						<div class="price-row">
							<span class="price">{plan.price}</span>
							<span class="period">{plan.period}</span>
						</div>
						<p class="description">{plan.description}</p>
						<a href={plan.stripe} target="_blank" rel="noopener" class="plan-btn">{plan.cta} →</a>
					</div>
				{/each}
			</div>
		</section>

		<section class="day-pass-section">
			<div class="day-pass">
				<div class="day-pass-text">
					<h3>Day Pass</h3>
					<p>Just visiting Puerto Rico? Work from our San Juan space for the day.</p>
				</div>
				<div class="day-pass-right">
					<span class="day-price">$40 <span class="day-period">/ day</span></span>
					<a href="https://buy.stripe.com/bJe4gz2GZeSw0aweeI5c406" target="_blank" rel="noopener" class="plan-btn">Buy Day Pass →</a>
				</div>
			</div>
		</section>

		<section class="contact-cta">
			<p>Questions about which plan is right for you? <a href="/contactus">Get in touch →</a></p>
		</section>
	</div>
</div>

<style>
	.plans-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin-bottom: 2.5rem;
	}

	.plan {
		padding: 1.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		position: relative;
		background: #fff;
	}

	.plan.featured {
		border-color: var(--color-primary);
		background: #fffaf7;
	}

	.plan-tag {
		position: absolute;
		top: -1px;
		left: 1.5rem;
		background: var(--color-primary);
		color: #fff;
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		padding: 0.2rem 0.625rem;
		border-radius: 0 0 6px 6px;
	}

	.plan h3 {
		font-size: 1rem;
		font-weight: 700;
		margin: 0 0 0.875rem;
		letter-spacing: -0.01em;
	}

	.price-row {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
		margin-bottom: 0.875rem;
	}

	.price {
		font-family: var(--font-headings);
		font-size: 2rem;
		font-weight: 800;
		color: var(--color-primary);
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.period {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.description {
		color: var(--color-text-muted);
		font-size: 0.875rem;
		line-height: 1.65;
		flex: 1;
		margin-bottom: 1.25rem;
	}

	.plan-btn {
		display: inline-flex;
		align-items: center;
		padding: 0.7rem 1.25rem;
		background: var(--color-primary);
		color: #fff;
		font-family: var(--font-headings);
		font-weight: 600;
		font-size: 0.875rem;
		border-radius: var(--radius);
		text-decoration: none;
		transition: background 0.15s;
		align-self: flex-start;
	}

	.plan-btn:hover {
		background: var(--color-primary-hover);
		color: #fff;
		text-decoration: none;
	}

	/* Day pass */
	.day-pass-section {
		margin-bottom: 2rem;
	}

	.day-pass {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		padding: 1.75rem 2rem;
		background: var(--color-dark);
		border-radius: var(--radius-lg);
	}

	.day-pass-text h3 {
		color: #fff;
		font-size: 1.25rem;
		margin-bottom: 0.375rem;
	}

	.day-pass-text p {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.9rem;
		margin: 0;
	}

	.day-pass-right {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		flex-shrink: 0;
	}

	.day-price {
		font-family: var(--font-headings);
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--color-primary);
		letter-spacing: -0.02em;
	}

	.day-period {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.5);
		font-weight: 400;
	}

	.contact-cta {
		text-align: center;
		padding: 1.5rem 0;
	}

	.contact-cta p {
		color: var(--color-text-muted);
		margin: 0;
	}

	.contact-cta a {
		color: var(--color-primary);
		font-weight: 600;
	}

	@media (max-width: 900px) {
		.plans-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 600px) {
		.plans-grid {
			grid-template-columns: 1fr;
		}

		.day-pass {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
