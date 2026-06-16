<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Workshops"
	description="Hands-on learning at Code Puerto Rico. Free technical workshops open to beginners — just bring curiosity and a willingness to learn."
/>

<h1>Workshops</h1>

<section class="intro">
	<h2>Upcoming</h2>
	<p class="lead">Hands-on learning at Code Puerto Rico.</p>
	<p>We run free, hands-on technical workshops open to beginners and curious builders. Whether you want to install Linux, explore AI tools, or level up your coding skills, you only need curiosity and a willingness to learn.</p>
</section>

<section class="workshop-list">
	<div class="workshop">
		<h3>Defenestration Workshop: Installing Linux on Your PC</h3>
		<p><strong>Date:</strong> Tuesday, May 26, 2026 | 6:00 PM – 8:00 PM AST</p>
		<p><strong>Location:</strong> <a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a></p>
		<p><strong>Cost:</strong> Free</p>
		<p>A free, hands-on session for installing Linux on a PC with guided support, presented as a “third option beyond Windows or Mac.”</p>
		<a href="/workshops/linux-workshop" class="btn">Details & Registration →</a>
	</div>
</section>

<section class="cta">
	<h2>Suggest or Teach a Workshop</h2>
	<p>Have an idea for a workshop? Want to volunteer to teach? We'd love to hear from you.</p>
	<a href="/contactus" class="btn primary">Get in touch</a>
</section>

<style>
	.lead {
		font-size: 1.25rem;
		color: #666;
	}

	.workshop-list {
		margin: 2rem 0 3rem;
	}

	.workshop {
		padding: 2rem;
		background: #f8f9fa;
		border-radius: 12px;
		border: 1px solid #eaeaea;
	}

	.workshop h3 {
		margin-top: 0;
		color: #667eea;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		border: 2px solid #667eea;
		color: #667eea;
		margin-top: 1rem;
	}

	.btn.primary {
		background: #667eea;
		color: white;
	}

	.cta {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 2.5rem;
		border-radius: 12px;
		text-align: center;
	}

	.cta h2 {
		margin-top: 0;
	}

	.cta .btn {
		border-color: white;
		color: white;
	}
</style>
