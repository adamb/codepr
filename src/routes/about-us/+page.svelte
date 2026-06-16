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
/>

<section class="page-title">
	<div class="container">
		<h1>Where Puerto Rico Builds Tech</h1>
	</div>
</section>

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
		<h3>Meet Our Team</h3>
		<p class="lead team-subtitle">Community-driven environment fostering collaboration</p>

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

<style>
	.page-title {
		background: rgba(0, 0, 0, 0.5);
		padding: 48px 0;
		width: 100%;
		color: #fff;
		text-align: center;
	}

	.page-title h1 {
		color: #fff;
		margin-bottom: 0;
		font-size: 2.5rem;
		font-weight: 700;
	}

	.intro {
		padding: 48px 0 24px;
	}

	.intro-inner {
		max-width: 83.3333%;
	}

	.intro h2 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.intro .lead {
		font-size: 1.125rem;
		font-weight: 300;
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.intro p {
		font-size: 1rem;
		line-height: 1.6;
	}

	.team {
		padding: 48px 0 64px;
	}

	.team h3 {
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.team-subtitle {
		font-size: 1.125rem;
		font-weight: 300;
		color: var(--color-text-muted);
		margin-bottom: 2rem;
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		margin-top: 2rem;
	}

	.team-member {
		display: flex;
		gap: 1.5rem;
		padding: 2rem 0;
	}

	.photo {
		width: 110px;
		height: 110px;
		object-fit: cover;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.team-info h4 {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0 0 0.25rem;
	}

	.role {
		color: var(--color-text-muted);
		font-size: 0.9rem;
		margin: 0 0 0.75rem;
	}

	.bio {
		font-size: 1rem;
		line-height: 1.6;
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		.team-grid {
			grid-template-columns: 1fr;
		}

		.team-member {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.intro-inner {
			max-width: 100%;
		}
	}
</style>
