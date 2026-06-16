<script lang="ts">
	import '../../app.css';
</script>

<h1>Where Puerto Rico Builds Tech</h1>

<p class="lead">Code Puerto Rico is the parent organization behind Holberton Coding School Puerto Rico and our growing coworking + events community. We share one space in San Juan: the school trains the next generation of developers, and Code PR opens the doors to builders, founders, and the broader tech community.</p>

<p>Whether you're here to take a class, rent a desk, host a meetup, or just meet other people building things in Puerto Rico — you're in the right place.</p>

<section class="team">
	<h2>Meet Our Team</h2>
	
	<div class="team-grid">
		<div class="team-member">
			<div class="photo-placeholder">Mercedes Díaz</div>
			<h3>Mercedes Díaz</h3>
			<p class="role">Campus Director</p>
			<p>Mercedes oversees day-to-day operations at the campus, ensuring that our coworking members and coding school students have an outstanding experience. She brings strong organizational leadership and a deep commitment to the community.</p>
		</div>
		
		<div class="team-member">
			<div class="photo-placeholder">Raphael Santos</div>
			<h3>Raphael Santos</h3>
			<p class="role">Software Engineering Educational Lead</p>
			<p>Raphael leads the software engineering education program, bringing hands-on technical expertise and a passion for mentoring the next generation of developers. He shapes the curriculum and supports students and community members on their coding journeys.</p>
		</div>
		
		<div class="team-member">
			<div class="photo-placeholder">Jeandres Zapata</div>
			<h3>Jeandres Zapata</h3>
			<p class="role">Marketing and Admissions Manager</p>
			<p>Jeandres handles marketing and admissions, helping spread the word about Code Puerto Rico and welcoming new members into the community. He connects people with the right programs and opportunities.</p>
		</div>
		
		<div class="team-member">
			<div class="photo-placeholder">Ellen Calabrese</div>
			<h3>Ellen Calabrese</h3>
			<p class="role">Student Success Manager</p>
			<p>Ellen is dedicated to supporting students and community members throughout their journey. She coordinates events, manages student outcomes, and ensures everyone has the resources they need to succeed.</p>
		</div>
		
		<div class="team-member">
			<div class="photo-placeholder">Adam Beguelin</div>
			<h3>Adam Beguelin</h3>
			<p class="role">Founder and Chief Mentor</p>
			<p>Adam is the founder and chief mentor of both Code Puerto Rico and Holberton Coding School Puerto Rico. He is passionate about building tech community on the island and creating pathways for the next generation of developers and entrepreneurs.</p>
		</div>
		
		<div class="team-member">
			<div class="photo-placeholder">Cyril Meduňa</div>
			<h3>Cyril Meduňa</h3>
			<p class="role">Board Member — Managing Partner, Advent Morro Equity Fund</p>
			<p>Cyril serves on the board and brings strategic business and investment expertise. As Managing Partner at Advent Morro Equity Fund, he provides valuable guidance on growth and sustainability.</p>
		</div>
	</div>
</section>

<style>
	.lead {
		font-size: 1.25rem;
		color: #666;
		line-height: 1.8;
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
	}
	
	.photo-placeholder {
		width: 100%;
		height: 200px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
		margin-bottom: 1rem;
	}
	
	.team-member h3 {
		margin: 0 0 0.25rem 0;
	}
	
	.role {
		color: #667eea;
		font-weight: 600;
		margin: 0 0 1rem 0;
		font-size: 0.875rem;
	}
</style>
