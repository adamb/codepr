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

<h1>Where Puerto Rico Builds Tech</h1>

<section class="intro">
	<h2>About Code Puerto Rico</h2>
	<p class="lead">Code Puerto Rico is the parent organization behind Holberton Coding School Puerto Rico and our growing coworking + events community. We share one space in San Juan: the school trains the next generation of developers, and Code PR opens the doors to builders, founders, and the broader tech community.</p>
	<p>Whether you're here to take a class, rent a desk, host a meetup, or just meet other people building things in Puerto Rico — you're in the right place.</p>
</section>

<section class="team">
	<h2>Meet Our Team</h2>

	<div class="team-grid">
		{#each team as member}
			<div class="team-member">
				<img src={member.photo} alt={member.name} class="photo" width="300" height="300" />
				<h3>{member.name}</h3>
				<p class="role">{member.role}</p>
				<p>{member.bio}</p>
			</div>
		{/each}
	</div>
</section>

<style>
	.lead {
		font-size: 1.25rem;
		color: #666;
		line-height: 1.8;
	}

	.intro {
		margin-bottom: 3rem;
	}

	.team {
		margin-top: 4rem;
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.team-member {
		padding: 1.5rem;
		border: 1px solid #eaeaea;
		border-radius: 12px;
		background: #fff;
	}

	.photo {
		width: 100%;
		height: 280px;
		object-fit: cover;
		border-radius: 8px;
		margin-bottom: 1rem;
	}

	.team-member h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1.25rem;
	}

	.role {
		color: #667eea;
		font-weight: 600;
		margin: 0 0 1rem 0;
		font-size: 0.875rem;
	}

	@media (max-width: 768px) {
		.photo {
			height: 240px;
		}
	}
</style>
