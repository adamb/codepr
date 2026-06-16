<script lang="ts">
	import SEO from '$lib/SEO.svelte';

	const team = [
		{
			name: 'Mercedes Díaz',
			role: 'Campus Director',
			photo: '/team/mercedes.jpeg',
			bio: 'Mercedes oversees day-to-day operations at the campus, ensuring that our coworking members and coding school students have an outstanding experience. She brings strong organizational leadership and a deep commitment to the community.'
		},
		{
			name: 'Raphael Santos',
			role: 'Software Engineering Educational Lead',
			photo: '/team/raphael.jpeg',
			bio: 'Raphael leads the software engineering education program, bringing hands-on technical expertise and a passion for mentoring the next generation of developers. He shapes the curriculum and supports students and community members on their coding journeys.'
		},
		{
			name: 'Jeandres Zapata',
			role: 'Marketing and Admissions Manager',
			photo: '/team/jeandres.jpeg',
			bio: 'Jeandres handles marketing and admissions, helping spread the word about Code Puerto Rico and welcoming new members into the community. He connects people with the right programs and opportunities.'
		},
		{
			name: 'Ellen Calabrese',
			role: 'Student Success Manager',
			photo: '/team/ellen.jpeg',
			bio: 'Ellen is dedicated to supporting students and community members throughout their journey. She coordinates events, manages student outcomes, and ensures everyone has the resources they need to succeed.'
		},
		{
			name: 'Adam Beguelin',
			role: 'Founder and Chief Mentor',
			photo: '/team/adam.jpeg',
			bio: 'Adam is the founder and chief mentor of both Code Puerto Rico and Holberton Coding School Puerto Rico. He is passionate about building tech community on the island and creating pathways for the next generation of developers and entrepreneurs.'
		},
		{
			name: 'Cyril Meduňa',
			role: 'Board Member — Managing Partner, Advent Morro Equity Fund',
			photo: '/team/cyril.jpeg',
			bio: 'Cyril serves on the board and brings strategic business and investment expertise. As Managing Partner at Advent Morro Equity Fund, he provides valuable guidance on growth and sustainability.'
		}
	];
</script>

<SEO
	title="About Us"
	description="Code Puerto Rico is the umbrella organization for Holberton Coding School Puerto Rico and a growing coworking + events community in San Juan."
	canonical="https://code.pr/about-us"
/>

<section class="page-hero">
	<div class="container">
		<h1>Where Puerto Rico Builds Tech</h1>
		<p class="page-lead">AI-first dev shop, coding school, tech hub, and community — all in San Juan.</p>
	</div>
</section>

<div class="page-body">
	<section class="intro">
		<div class="container">
			<div class="intro-inner">
				<h2>About Code Puerto Rico</h2>
				<p class="lead">Code Puerto Rico is the parent organization behind Holberton Coding School Puerto Rico and our growing coworking + events community. We share one space in San Juan: the school trains the next generation of developers, and Code PR opens the doors to builders, founders, and the broader tech community.</p>
				<p>Whether you're here to take a class, rent a desk, host a meetup, or just meet other people building things in Puerto Rico — you're in the right place.</p>
			</div>
		</div>
	</section>

	<section class="team">
		<div class="container">
			<div class="team-header">
				<h2>Meet Our Team</h2>
				<p class="lead">The people behind Code Puerto Rico.</p>
			</div>

			<div class="team-grid">
				{#each team as member}
					<div class="team-member">
						<img src={member.photo} alt={member.name} class="photo" width="300" height="300" />
						<div class="team-info">
							<h4>{member.name}</h4>
							<p class="role">{member.role}</p>
							<p class="bio">{member.bio}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>

<style>
	.intro {
		padding-bottom: 0;
	}

	.intro-inner {
		max-width: 760px;
	}

	.intro h2 {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		margin-bottom: 1rem;
	}

	.team {
		padding-top: 3rem;
	}

	.team-header {
		margin-bottom: 2.5rem;
	}

	.team-header h2 {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		margin-bottom: 0.5rem;
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem 3rem;
	}

	.team-member {
		display: flex;
		gap: 1.25rem;
		padding: 1.75rem 0;
		border-top: 1px solid var(--color-border);
	}

	.photo {
		width: 96px;
		height: 96px;
		object-fit: cover;
		object-position: top center;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.team-info h4 {
		font-size: 1.05rem;
		font-weight: 700;
		margin: 0 0 0.2rem;
		letter-spacing: -0.01em;
	}

	.role {
		color: var(--color-accent);
		font-size: 0.82rem;
		font-weight: 600;
		margin: 0 0 0.625rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.bio {
		font-size: 0.9rem;
		line-height: 1.65;
		color: var(--color-text-muted);
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		.team-grid {
			grid-template-columns: 1fr;
		}

		.team-member {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
