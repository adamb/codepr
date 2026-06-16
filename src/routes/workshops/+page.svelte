<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Workshops"
	description="Hands-on learning at Code Puerto Rico. Free technical workshops open to beginners — just bring curiosity and a willingness to learn."
	canonical="https://code.pr/workshops"
/>

<section class="page-hero">
	<div class="container">
		<h1>Workshops</h1>
		<p class="page-lead">Free, hands-on technical learning. Bring curiosity — we'll handle the rest.</p>
	</div>
</section>

<div class="page-body">
	<div class="container">
		<section class="workshop-list">
			<h2>Upcoming</h2>
			<p class="lead">Open to beginners and curious builders.</p>

			<div class="workshop">
				<div class="workshop-meta">
					<span class="ws-tag">Free</span>
					<span class="ws-date">May 26, 2026 · 6–8 PM AST</span>
				</div>
				<h3>Defenestration Workshop: Installing Linux on Your PC</h3>
				<p><strong>Location:</strong> <a href="https://maps.app.goo.gl/e6p69iQqdQpftG4g9" target="_blank" rel="noopener">Code Puerto Rico, San Juan</a></p>
				<p>A free, hands-on session for installing Linux on a PC with guided support, presented as a "third option beyond Windows or Mac."</p>
				<a href="/workshops/linux-workshop" class="btn">Details & Registration →</a>
			</div>
		</section>

		<section class="teach-cta">
			<div class="teach-inner">
				<div>
					<h2>Suggest or Teach a Workshop</h2>
					<p>Have an idea? Want to volunteer to teach? We'd love to hear from you.</p>
				</div>
				<a href="/contactus" class="btn btn-white">Get in touch →</a>
			</div>
		</section>
	</div>
</div>

<style>
	.workshop-list {
		margin-bottom: 3rem;
	}

	.workshop-list h2 {
		margin-bottom: 0.25rem;
	}

	.workshop {
		margin-top: 2rem;
		padding: 2rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: #fff;
	}

	.workshop-meta {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.875rem;
	}

	.ws-tag {
		background: rgba(249, 115, 22, 0.1);
		color: var(--color-primary);
		font-size: 0.72rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 0.2rem 0.625rem;
		border-radius: 100px;
	}

	.ws-date {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
	}

	.workshop h3 {
		font-size: 1.35rem;
		margin-bottom: 0.75rem;
	}

	.workshop p {
		font-size: 0.95rem;
		color: var(--color-text-muted);
		margin-bottom: 0.625rem;
	}

	.workshop p strong {
		color: var(--color-text);
	}

	.workshop .btn {
		margin-top: 0.5rem;
	}

	.teach-cta {
		background: var(--color-dark);
		border-radius: var(--radius-lg);
		padding: 2.5rem;
	}

	.teach-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	.teach-inner h2 {
		color: #fff;
		font-size: 1.5rem;
		margin-bottom: 0.375rem;
	}

	.teach-inner p {
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
		font-size: 0.95rem;
	}

	@media (max-width: 640px) {
		.teach-inner {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
