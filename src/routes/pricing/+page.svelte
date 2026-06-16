<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	const plans = [
		{
			name: 'Virtual Office',
			price: '$ 69 / month',
			stripe: 'https://buy.stripe.com/28E4gz1CV7q48H23A45c400',
			cta: 'Get Virtual Office',
			description:
				'A professional San Juan business address, mail and package handling, arrival alerts, and secure storage until pickup. Build a local Puerto Rico presence without a physical desk.'
		},
		{
			name: 'Hot Desk',
			price: '$ 249 / month',
			stripe: 'https://buy.stripe.com/bJe7sLgxPh0E4qMdaE5c401',
			cta: 'Join Hot Desk',
			description:
				'Open-desk access in Santurce, kitchen and lounge use, fast Wi-Fi, ample power, plus monthly meeting-room credit. Built for freelancers, founders, and remote workers.'
		},
		{
			name: 'Hot Desk + Virtual Office',
			price: '$ 299 / month',
			stripe: 'https://buy.stripe.com/3cI8wPftL9yc1eA3A45c402',
			cta: 'Join the Combo',
			description:
				'The best of both plans: hot-desk access plus a professional business address, extra conference-room credit, and priority booking for meetings and events.'
		},
		{
			name: 'Conference Room Hours',
			price: '$ 15 / hour',
			stripe: 'https://buy.stripe.com/eVq5kD3L3bGk8H2gmQ5c403',
			cta: 'Buy Now',
			description:
				'Meeting room for up to 10 people with Wi-Fi, a large flat-screen, complimentary coffee and water, and a board-room setup. Eight-hour daily cap.'
		},
		{
			name: 'Event Space',
			price: '$ 1,000 / event',
			stripe: 'https://buy.stripe.com/7sYdR995naCg5uQb2w5c404',
			cta: 'Buy Now',
			description:
				'Large venue for up to 75 guests with projector and A/V equipment, adaptable layout, and on-site support for workshops, panels, and similar events.'
		},
		{
			name: 'Holberton Grad Membership',
			price: '$ 24 / month',
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
/>

<h1>Pricing</h1>

<section class="intro">
	<h2>Membership plans</h2>
	<p class="lead">Flexible coworking and virtual office plans in San Juan, Puerto Rico.</p>
</section>

<section class="plans">
	{#each plans as plan}
		<div class="plan">
			<h3>{plan.name}</h3>
			<p class="price">{plan.price}</p>
			<p class="description">{plan.description}</p>
			<a href={plan.stripe} target="_blank" rel="noopener" class="btn primary">{plan.cta}</a>
		</div>
	{/each}
</section>

<section class="special">
	<h2>Special Offerings</h2>

	<div class="plan day-pass">
		<h3>Day Pass</h3>
		<p class="price">$40 Day Pass</p>
		<p class="description">Just visiting Puerto Rico? Grab a day pass and work from our San Juan space for the day.</p>
		<a href="https://buy.stripe.com/bJe4gz2GZeSw0aweeI5c406" target="_blank" rel="noopener" class="btn primary">Buy Day Pass</a>
	</div>
</section>

<style>
	.lead {
		font-size: 1.25rem;
		color: #666;
	}

	.plans {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		margin-bottom: 3rem;
	}

	.plan {
		padding: 2rem;
		border: 1px solid #eaeaea;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
	}

	.plan h3 {
		margin-top: 0;
		font-size: 1.35rem;
	}

	.price {
		font-size: 1.75rem;
		font-weight: 800;
		color: #667eea;
		margin: 0 0 1rem;
	}

	.description {
		color: #666;
		flex: 1;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.25rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		border: 2px solid #667eea;
		color: #667eea;
		text-align: center;
		margin-top: 1rem;
	}

	.btn.primary {
		background: #667eea;
		color: white;
	}

	.day-pass {
		background: #f8f9fa;
		border-color: #667eea;
	}
</style>
