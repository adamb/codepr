<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="18 Demo Day Cuts From One Livestream, Made on Our Own 4090"
	description="How we turned Holberton Puerto Rico's 45-minute Demo Day livestream into 18 vertical recap cuts overnight with open models on a local RTX 4090: Whisper, Demucs, RealESRGAN, Flux, Wan 2.2 and Stable Audio."
	canonical="https://code.pr/blog/6/holberton-demo-day-recap-cuts-rtx-4090"
	type="article"
	publishedTime="2026-11-20"
	modifiedTime="2026-11-20"
	image="https://code.pr/blog/holberton-demo-day-recap/og-banner.jpg"
/>

<div class="post-container container">
<article class="post">
	<header>
		<p class="kicker">Studio Notes</p>
		<h1>18 Demo Day Cuts From One Livestream, Made on Our Own 4090</h1>
		<p class="subtitle">We took Holberton Puerto Rico’s 45-minute Demo Day livestream and turned it into 18 vertical recap videos overnight, using open models on one local GPU and no cloud AI. Here’s how, including what we threw out.</p>
		<div class="meta">
			<img src="/team/adam.jpeg" alt="Adam Beguelin" class="avatar" width="56" height="56" />
			<div>
				<p class="author">By Adam Beguelin</p>
				<p class="date">Friday, November 20, 2026 • Code Puerto Rico, San Juan</p>
			</div>
		</div>
	</header>

	<figure class="hero-cover">
		<img src="/blog/holberton-demo-day-recap/hero-cuts.jpg" alt="Four vertical video frames: a glowing neon seahorse with a Holberton Demo Day title, Alejandro Colombani with a bold caption reading it's basically gambling, Karen Navarro on stage with her Nítido name plate, and Ellen Calabrese at the microphone with her Student Success Manager plate." width="1400" height="611" />
		<figcaption>
			Four of the 18 cuts. The neon seahorse is AI-generated; the people are not. Every face and voice is the real one from the night.
			<span class="credit">Frames: Code Puerto Rico</span>
		</figcaption>
	</figure>

	<div class="cta">
		<p><strong>Just here for the videos?</strong> All 18 cuts are at <a href="/demo-day">code.pr/demo-day</a>, each with a share button so you can post your favorite to Instagram.</p>
		<a href="/demo-day" class="cta-button">Watch the Demo Day cuts →</a>
	</div>

	<section class="content">
		<p>Demo Day at Holberton Coding School Puerto Rico in November was eight graduates, seven products and one long livestream. Nobody scrolls through 45 minutes on Instagram. So I asked my agent, Grok Bot, to turn it into short vertical videos, using Roux, the RTX 4090 workstation we already use for <a href="/blog/2/we-made-this-reel-on-a-4090-in-san-juan">reels</a> and <a href="/blog/4/beach-gate-vision-classifier">vision experiments</a>. One rule: every model that transcribed, cleaned, upscaled or generated anything had to be open and run on Roux. No cloud AI tokens on the media.</p>

		<p>By the next morning we had 18 vertical cuts (8 core cuts of 45 to 60 seconds, 4 teasers of 30 seconds and 6 “wildcard” cuts), 14 minutes 41 seconds of video in all. Every one passed automated QA.</p>

		<h2>The graduates</h2>
		<p>Ellen Calabrese, Student Success Manager, was the MC. These are the builders and what they built:</p>
		<ul class="tips grads">
			<li><strong>Alejandro Colombani</strong>, TradePilot: “So futures trade 23 hours a day; nobody can watch every single candle.”</li>
			<li><strong>Xander Roldan Villarrubia</strong>, Nova: “I am the only developer building Nova, but I didn't do it alone.”</li>
			<li><strong>Karen Navarro</strong>, Nítido: “Would you hand your house key to a stranger you met on a Facebook group?”</li>
			<li><strong>Alberto Frias Ruiz and Ian Aviles</strong>, ATCS (Adaptive Traffic Control System): “Can traffic lights respond better to the traffic actually waiting at an intersection?”</li>
			<li><strong>Romeo González</strong>, Pa’l Jangueo: “So Pa’l Jangueo was born from my passion for music, for arts.”</li>
			<li><strong>Joshua Santiago Ibarra</strong>, El Rebajón: “And all of this is under 150 kilobytes, so it can run on your phone.”</li>
			<li><strong>Luis Felipe Gonzalez</strong>, CATALOGA: “And I decided to build an app that can do that for me.”</li>
		</ul>
		<p>Every voice in the videos is real: the graduates and Ellen, in their own words. No AI voices, no paraphrasing.</p>

		<h2>Step 1: Pull the stream and find the words</h2>
		<p>We downloaded the YouTube livestream (45:47 at 720p) with <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" rel="noopener">yt-dlp</a>, together with its English captions and chapters. We also had a 61-second 4K highlight clip from the night, with each group’s name plates on screen. The chapters marked where each team’s segment started. The captions gave us a first transcript. We read the names and projects off the 4K plates with Tesseract OCR and a local vision model (qwen3-vl:8b in <a href="https://ollama.com/" target="_blank" rel="noopener">Ollama</a>).</p>

		<p>From there we built a pool of 77 short quotes. <a href="https://github.com/SYSTRAN/faster-whisper" target="_blank" rel="noopener">faster-whisper</a>, running locally, provided word-level timestamps, so each quote starts and ends on a sentence boundary. The first version clipped the tail of the word “trading” at one in-point. Whisper caught it, and we moved the cut by 30 ms.</p>

		<h2>Step 2: A first recap with no AI at all</h2>
		<p>The first deliverable was a single recap of about a minute and a half, and it went through several versions on November 19 between 3 PM and 7:30 PM. It turned out to be plain <a href="https://ffmpeg.org/" target="_blank" rel="noopener">ffmpeg</a> plus Python. The lower-thirds copy the real plates: the red seahorse square is cropped from a plate frame, the colors were sampled from it, and the names are set in Noto Sans Bold. The confetti, about 170 pieces with gravity, drag and spin, is procedural Python, drawn frame by frame. It was fast, on-brand and fully controllable, so a diffusion model would have been overkill.</p>

		<p>The GPU barely did anything in that phase. Whisper ran on the CPU, and we encoded with libx264 for quality. Most of the real work was editorial. My notes from those versions read like this: the music bed was inaudible, so turn it up. Give Romeo room for both the problem and the solution. Credit Ian, who co-presented ATCS. Remove the hiss on one mic. Put everyone’s full name on every plate.</p>

		<h2>Step 3: Overnight on the 4090</h2>
		<p>Next came the batch of 18 cuts, which ran from about 11 PM to 1:30 AM. This time the 4090 had real work to do:</p>
		<ul class="tips">
			<li><strong>Voices: <a href="https://github.com/facebookresearch/demucs" target="_blank" rel="noopener">Demucs</a></strong> (htdemucs) separated each speaker’s voice from room noise, followed by a gentle highpass and hum notches. All 77 quotes took 13.1 seconds of GPU time. A gating check compared every word before and after cleanup, and no words were lost.</li>
			<li><strong>Picture: <a href="https://github.com/xinntao/Real-ESRGAN" target="_blank" rel="noopener">RealESRGAN</a></strong> (x2plus) upscaled the 720p livestream shots, blended 50/50 with a plain Lanczos upscale. That’s a light hand on purpose: no face models, so faces stay as they really are. 1,566 frames took 168 seconds.</li>
			<li><strong>Motion graphics: <a href="https://github.com/black-forest-labs/flux" target="_blank" rel="noopener">Flux</a></strong> made the stills, <strong><a href="https://github.com/Wan-Video/Wan2.2" target="_blank" rel="noopener">Wan 2.2</a></strong> 14B animated them at 4.2 to 5.7 minutes per clip, RIFE doubled the frame rate and RealESRGAN upscaled them. The results were a neon-seahorse opener, light-streak transitions, a ribbons-and-confetti outro and a frosted-glass backdrop. No real person appears in any AI-generated asset.</li>
			<li><strong>Music: Stable Audio</strong> wrote three original beds (tropical-tech at 122 BPM, trailer hype at 120 BPM and Puerto Rico dembow at 96 BPM), plus hits, risers and whooshes. Every bed passed a vocal-leak check (Whisper plus a voice detector found 0 seconds of speech) and was mastered to -16 LUFS. No borrowed tracks.</li>
		</ul>

		<figure>
			<img src="/blog/holberton-demo-day-recap/seahorse-opener.jpg" alt="Eight frames of a glowing red and blue neon seahorse turning in place on a dark, smoky background." width="1400" height="307" loading="lazy" />
			<figcaption>
				The opener: a Flux still animated with Wan 2.2 on the 4090. The seahorse echoes the one on Holberton’s name plates, in the same red and blue.
				<span class="credit">Frames: Code Puerto Rico</span>
			</figcaption>
		</figure>

		<figure>
			<img src="/blog/holberton-demo-day-recap/openers-outros.jpg" alt="Contact sheet with four rows of frames: two neon seahorse openers, a palm-tree sunset outro with floating lights, and a red and blue ribbon outro with confetti." width="1200" height="1142" loading="lazy" />
			<figcaption>
				Openers and outros, frame by frame. We used the ribbons outro and the main seahorse.
				<span class="credit">QA sheet: Code Puerto Rico</span>
			</figcaption>
		</figure>

		<p>We considered the GPU encoder (NVENC) too. At the same settings it produced files of 19 to 20 MB, against 8 MB for x264, and x264 needed only 50 to 80 seconds per cut. We stayed on the CPU. The 4090 went where it made a visible difference.</p>

		<h2>Step 4: QA that doesn’t get tired at 1 AM</h2>
		<p>Every cut went through the same automated checks before it counted as done:</p>
		<ul class="tips">
			<li><strong>Loudness:</strong> -15.5 to -16 LUFS, with true peak at or below -1.5 dBTP. All 18 landed between -15.7 and -15.9 LUFS.</li>
			<li><strong>Clipped words:</strong> Whisper re-transcribed every quote from the final mix to confirm that its first and last words were there.</li>
			<li><strong>Names:</strong> OCR read every lower-third and end card and compared it with the exact full names, including the accents in Nítido, El Rebajón and González and the curly apostrophe in Pa’l Jangueo.</li>
			<li><strong>Contact sheets:</strong> a grid of frames from every cut, reviewed for faces, crops, blank openings and stray overlays.</li>
		</ul>

		<figure>
			<img src="/blog/holberton-demo-day-recap/qa-contact-sheet.jpg" alt="A grid of about 50 frames from one vertical cut, showing each graduate on stage with a red seahorse name plate, the Holberton Demo Day title, and a Congrats graduates end card with credits." width="1400" height="1244" loading="lazy" />
			<figcaption>
				The QA contact sheet for cut 01. Every lower-third gets its own frame, so a misspelled name has nowhere to hide.
				<span class="credit">QA sheet: Code Puerto Rico</span>
			</figcaption>
		</figure>

		<h2>What failed, and what we threw out</h2>
		<p>This is the most useful part of the log, so here it is unvarnished.</p>
		<ul class="tips">
			<li><strong>Whisper caught a line that flipped its meaning.</strong> On the final mix, “mistakes are <em>not</em> an option” came back as “mistakes are an option.” Checking the raw source showed that the “not” is barely audible in the livestream itself. We cut the line from every video rather than risk it.</li>
			<li><strong>The sharpest upscaler was rejected.</strong> 4x-UltraSharp made faces look waxy. For a graduation video, an authentic face beats a crisp one, so we kept the gentler 50/50 blend.</li>
			<li><strong>A prettier backdrop was rejected.</strong> The first editorial background had a water-drop ripple that pulled your eye away from the speakers. We replaced it with a calm frosted-glass loop.</li>
			<li><strong>A fact check fixed the trailer.</strong> ATCS is one product built by two people, so the cards read “Eight builders. Seven products.,” not “Seven builders.”</li>
			<li><strong>A human caught what QA missed.</strong> I noticed a boxed inset over Romeo about 56 seconds into one version. It was the 4K highlight clip’s own picture-in-picture, which our reframing had blown up. We dropped the shot, and the validator now refuses any crop on a shot with a burned-in inset or plate.</li>
			<li><strong>The machines misread, and so did we.</strong> Tesseract read “Ian” as “tan,” so his plate is verified against the exact image we composited. Whisper heard Romeo’s “hangout” as “angular” under the music, so we swapped in a different line. One reframe missed Xander entirely because the contact sheet was misread, and we had to re-crop and re-render.</li>
			<li><strong>Ordinary breakage.</strong> Two renders failed because a background shot was shorter than the hold planned for it. One QA run used a Python without Whisper installed. A process-kill pattern matched our own remote shell. The SSH connection dropped for a few minutes mid-batch. And Roux was shared with someone else’s heavy jobs for part of the day.</li>
		</ul>

		<h2>What I’d tell anyone trying this</h2>
		<ul class="tips">
			<li><strong>Start without AI.</strong> ffmpeg and a little Python took us surprisingly far. Use models where they help visibly: voices, upscaling and original graphics and music.</li>
			<li><strong>Put your rules in code.</strong> No face models, exact names and loudness targets became checks that run on every cut, not notes in someone’s head.</li>
			<li><strong>Use the transcriber as a proofreader.</strong> Whisper’s best catch wasn’t a transcription. It was a sentence whose meaning flipped.</li>
			<li><strong>Keep a human on the contact sheets.</strong> Automation caught most problems, and a person caught the one it didn’t.</li>
			<li><strong>Keep a log.</strong> Ours is why this post has real numbers in it.</li>
		</ul>

		<div class="cta">
			<p><strong>Watch them.</strong> All 18 cuts are on one page. Pick a favorite, tap Share, and send it to your feed or a friend. Congrats to the graduates.</p>
			<a href="/demo-day" class="cta-button">Watch the Demo Day cuts at code.pr/demo-day →</a>
		</div>

		<p><em>Follow Code Puerto Rico on Instagram: <a href="https://www.instagram.com/code_puertorico/" target="_blank" rel="noopener">@code_puertorico</a></em></p>
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

	.date {
		color: #666;
		font-size: 0.875rem;
		margin: 0.25rem 0 0;
	}

	.hero-cover,
	.content figure {
		margin: 0 0 2rem;
	}

	.hero-cover img,
	.content figure img {
		width: 100%;
		height: auto;
		border-radius: var(--radius, 8px);
		display: block;
	}

	figcaption {
		margin-top: 0.75rem;
		font-size: 0.875rem;
		color: #666;
		line-height: 1.45;
	}

	.credit {
		display: block;
		margin-top: 0.25rem;
		font-size: 0.8rem;
		color: #888;
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
		padding: 1.25rem 1.5rem 1.25rem 2.5rem;
		border-radius: var(--radius, 8px);
		border-left: 3px solid var(--color-primary, #e01d40);
	}

	.tips li {
		margin-bottom: 0.75rem;
	}

	.cta {
		margin: 0 0 2.5rem;
		padding: 1.5rem;
		border-radius: var(--radius, 8px);
		background: #0b1533;
		color: #fff;
	}

	.cta p {
		margin: 0 0 1rem;
		color: #fff;
	}

	.cta p a {
		color: #fff;
		text-decoration: underline;
	}

	.cta-button {
		display: inline-block;
		padding: 0.75rem 1.25rem;
		border-radius: var(--radius, 8px);
		background: var(--color-primary, #e01d40);
		color: #fff;
		font-weight: 700;
		text-decoration: none;
	}

	.cta-button:hover {
		filter: brightness(1.1);
	}

	@media (max-width: 600px) {
		.post h1 {
			font-size: 1.75rem;
		}
	}
</style>
