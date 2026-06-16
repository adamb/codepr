<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Blog"
	description="Event recaps, community voices, and lessons from the builders at Code Puerto Rico."
	canonical="https://code.pr/blog"
/>

<section class="page-hero">
	<div class="container">
		<h1>Blog</h1>
		<p class="page-lead">Event recaps, community voices, and lessons from the builders.</p>
	</div>
</section>

<div class="page-body">
	<div class="container posts-wrap">
		<article class="post">
			<div class="meta">
				<img src="/team/jeandres.jpeg" alt="Jeandres Zapata" class="avatar" width="48" height="48" />
				<div>
					<p class="author">Jeandres Zapata</p>
					<p class="date">Apr 16, 2026</p>
				</div>
			</div>
			<h2><a href="/blog/1/what-does-a-developer-actually-need-to-succeed-in-the-age-of-ai-1">What Does a Developer Actually Need to Succeed in the Age of AI?</a></h2>
			<p class="excerpt">Five tech leaders share what they look for, what's changing, and how to stay relevant — straight from a packed panel in Puerto Rico.</p>
			<a href="/blog/1/what-does-a-developer-actually-need-to-succeed-in-the-age-of-ai-1" class="read-more">Read more →</a>
		</article>
	</div>
</div>

<style>
	.posts-wrap {
		max-width: 800px;
	}

	.post {
		padding: 2rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		margin-bottom: 1rem;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
	}

	.author {
		font-weight: 600;
		font-size: 0.9rem;
		margin: 0;
	}

	.date {
		color: var(--color-text-muted);
		font-size: 0.8rem;
		margin: 0;
		font-family: var(--font-mono);
	}

	.post h2 {
		font-size: clamp(1.25rem, 2.5vw, 1.65rem);
		margin: 0 0 0.75rem;
		letter-spacing: -0.02em;
	}

	.post h2 a {
		color: var(--color-text);
		text-decoration: none;
	}

	.post h2 a:hover {
		color: var(--color-primary);
	}

	.excerpt {
		color: var(--color-text-muted);
		font-size: 0.95rem;
		line-height: 1.65;
		margin-bottom: 1rem;
	}

	.read-more {
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--color-primary);
		text-decoration: none;
	}

	.read-more:hover {
		color: var(--color-primary-hover);
	}
</style>
