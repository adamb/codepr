<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="We Made This Reel on a 4090 in San Juan"
	description="Grok Bot plus a local RTX 4090 at Code Puerto Rico, generating Instagram reels for @codepr and Holberton Coding School Puerto Rico."
	canonical="https://code.pr/blog/2/we-made-this-reel-on-a-4090-in-san-juan"
	type="article"
	publishedTime="2026-09-01"
	modifiedTime="2026-09-01"
/>

<div class="post-container container">
<article class="post">
	<header>
		<p class="kicker">Studio Notes</p>
		<h1>We Made This Reel on a 4090 in San Juan</h1>
		<p class="subtitle">Grok Bot plus a local RTX 4090 at Code Puerto Rico, generating Instagram reels for @codepr and Holberton Coding School Puerto Rico — and writing this post on the same Cloudflare site.</p>
		<div class="meta">
			<img src="/team/adam.jpeg" alt="Adam Beguelin" class="avatar" width="56" height="56" />
			<div>
				<p class="author">By Adam Beguelin</p>
				<p class="date">Tuesday, September 1, 2026 • Code Puerto Rico, San Juan</p>
			</div>
		</div>
	</header>

	<section class="content">
		<p>Most of the AI video you see is a cloud API. Ours is a box in Puerto Rico.</p>
		<p>This week I used <strong>Grok Bot</strong> as the operator and a local <strong>RTX 4090</strong> as the muscle. The bot talks to ComfyUI on Roux, our Linux workstation: Flux stills, LTX image-to-video, then ffmpeg into a 9:16 Reel. The file is meant for two accounts we actually run: <a href="https://instagram.com/codepr" target="_blank" rel="noopener">@codepr</a> (still slim) and Holberton Coding School Puerto Rico (the busy one). Not Holberton Global.</p>
		<p>The first reel is a little meta on purpose. Shot one is San Juan from a second-floor tech-hub window. Shot two is the 4090 and the node graph. Shot three is stylized Holbies at laptops — no real student faces. Captions in English and Spanish. End card: <a href="https://code.pr/">code.pr</a> and the Caribbean AI Summit, October 9–10 at the Puerto Rico Convention Center.</p>

		<h2>Why local</h2>
		<p>Cloud image APIs are fine until they refuse the brief, meter the tokens, or flatten everything into the same look. A 24 GB card in-house is slower to set up and faster to iterate once it is running. Students should see that path. The April panel at Code PR said the same thing in different words: know how to code, don’t only vibe. Joshua S. asked about local-machine workflows when APIs hit token limits. This is that workflow, pointed at Instagram.</p>

		<h2>The stack</h2>
		<ul class="tips">
			<li><strong>Grok Bot</strong> on a desktop, queuing work and writing captions.</li>
			<li><strong>ComfyUI 0.33</strong> on Roux, RTX 4090 24 GB, user-space only.</li>
			<li><strong>Flux</strong> for stills, <strong>LTX 2.5</strong> for a few seconds of motion.</li>
			<li><strong>ffmpeg</strong> to 1080×1920, AAC audio, burned-in bilingual captions. No borrowed pop tracks.</li>
			<li><strong>This site</strong> — SvelteKit on Cloudflare Pages — for the write-up, not my personal blog.</li>
		</ul>

		<h2>What we are not doing</h2>
		<p>We are not auto-posting yet. The reel gets a human look before it hits Instagram. We are not training on student photos. We are not replacing Holberton project-based learning with a prompt. The school is still nine months of building; the GPU is a shop tool.</p>

		<h2>What’s next</h2>
		<p>Holberton <strong>C31</strong> starts October 5, 2026. The <strong>Caribbean AI Summit</strong> is October 9–10 at the Convention Center; Holberton Puerto Rico is an educational sponsor with a booth. The Reels are how we talk about both without waiting on a cloud vendor’s content filter.</p>
		<p>If you want to learn this stack, come to a <a href="/upcoming-events">meetup</a>, apply at <a href="https://holbertonschoolpr.com" target="_blank" rel="noopener">holbertonschoolpr.com</a>, or just walk up to the 4090 and ask what it is generating.</p>
	</section>

	<section class="whats-next">
		<h2>Links</h2>
		<ul>
			<li><a href="https://code.pr/">code.pr</a></li>
			<li><a href="https://instagram.com/codepr" target="_blank" rel="noopener">Instagram @codepr</a></li>
			<li><a href="https://holbertonschoolpr.com" target="_blank" rel="noopener">Holberton Coding School Puerto Rico</a></li>
			<li><a href="/upcoming-events">Upcoming events</a></li>
		</ul>
	</section>
</article>
</div>

<style>
	.post-container {
		padding-top: 3.5rem;
		padding-bottom: 5rem;
	}

	.post {
		max-width: 800px;
	}

	.kicker {
		color: var(--color-accent);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.85rem;
		margin: 0 0 0.5rem;
	}

	.post h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 1.5rem;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #eaeaea;
	}

	.avatar {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		object-fit: cover;
	}

	.author {
		font-weight: 700;
		margin: 0;
	}

	.date,
	.partners {
		color: #666;
		font-size: 0.875rem;
		margin: 0.25rem 0 0;
	}

	.content h2 {
		margin-top: 2.5rem;
		font-size: 1.75rem;
	}

	.content ul {
		margin-bottom: 1.5rem;
	}

	.tips {
		background: #fff8f2;
		padding: 1.25rem 1.5rem;
		border-radius: var(--radius);
		border-left: 3px solid var(--color-primary);
	}

	.tips li {
		margin-bottom: 0.75rem;
	}

	.whats-next {
		margin-top: 2.5rem;
	}

	@media (max-width: 600px) {
		.post h1 {
			font-size: 1.75rem;
		}
	}
</style>
