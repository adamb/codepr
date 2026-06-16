<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Blog"
	description="Event recaps, community voices, and lessons from the builders at Code Puerto Rico."
/>

<h1>Code Puerto Rico Blog</h1>

<p class="lead">Event recaps, community voices, and lessons from the builders.</p>

<section class="posts">
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
</section>

<style>
	.lead {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.posts {
		display: grid;
		gap: 2rem;
	}

	.post {
		padding: 2rem;
		border: 1px solid #eaeaea;
		border-radius: 12px;
		background: #fff;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
	}

	.author {
		font-weight: 600;
		margin: 0;
	}

	.date {
		color: #666;
		font-size: 0.875rem;
		margin: 0;
	}

	.post h2 {
		margin: 0 0 0.75rem;
		font-size: 1.6rem;
	}

	.post h2 a {
		color: #1a1a1a;
	}

	.post h2 a:hover {
		color: #667eea;
	}

	.excerpt {
		color: #666;
		margin-bottom: 1rem;
	}

	.read-more {
		font-weight: 600;
	}
</style>
