<script lang="ts">
	import SEO from '$lib/SEO.svelte';
</script>

<SEO
	title="Four AI Models Said Our Open Gate Was Closed"
	description="Four local AI vision models called our open beach gate closed. So we fine-tuned a 6 MB classifier and let Home Assistant phone alerts collect the corrections."
	canonical="https://code.pr/blog/4/beach-gate-vision-classifier"
	type="article"
	publishedTime="2026-09-26"
	modifiedTime="2026-09-26"
	image="https://code.pr/blog/beach-gate-vision-classifier/og-banner.jpg"
/>

<div class="post-container container">
<article class="post">
	<header>
		<p class="kicker">Studio Notes</p>
		<h1>Four AI Models Said Our Open Gate Was Closed. So We Trained Our Own.</h1>
		<p class="subtitle">Local vision models called our open beach gate closed, so we trained a tiny classifier on one scene and let Home Assistant alerts collect the corrections.</p>
		<div class="meta">
			<img src="/team/adam.jpeg" alt="Adam Beguelin" class="avatar" width="56" height="56" />
			<div>
				<p class="author">By Adam Beguelin</p>
				<p class="date">Saturday, September 26, 2026 • Code Puerto Rico, San Juan</p>
			</div>
		</div>
	</header>

	<figure class="hero-cover">
		<img src="/blog/beach-gate-vision-classifier/night-closed-vs-ajar.jpg" alt="Two night camera stills of a wooden double gate with tree-shaped cutouts: closed on the left, ajar on the right." width="1400" height="404" />
		<figcaption>
			Closed (left) and ajar (right), same camera and crop, the evening of September 3. The tell is the parting at the center seam. The models were tested on a daytime closed frame and a dusk ajar frame from the same day.
			<span class="credit">Camera stills: Code Puerto Rico</span>
		</figcaption>
	</figure>

	<section class="content">
		<p>Four of the five local AI vision models we tested side by side looked at our beach gate standing ajar and said it was closed. They gave nearly the same reason: the panels were “parallel and flush.” What runs today is a 6 MB classifier fine-tuned on this one gate and wired into Home Assistant, so every alert on my phone can double as a training label. It still makes mistakes, and I’ll show you those too.</p>

		<h2>¿Abierto o cerrado?</h2>
		<p>A camera already watches the gate at a property in Río Grande. I wanted the house to notice when someone leaves the gate open and tell me. The obvious first try was an off-the-shelf <strong>vision-language model</strong>, an AI that answers questions about images.</p>

		<p>On September 3 we ran a quick check with five freely downloadable (open-weight) models through <strong>Ollama</strong>, which runs models locally, on our GPU workstation (an NVIDIA RTX 4090 we already use for video work). Each got the same crop and the same prompt, not tuned per model, which told them to say open only when the panels were clearly apart. They saw two frames: the gate closed in daylight and ajar at dusk. Four of them (qwen3.5:9b, qwen3.8:27b, qwen3-vl:4b and mistral-small3.1) got the closed frame right and called the ajar one closed. The fifth, moondream:1.8b, gave no usable answer.</p>

		<p>One very large cloud model, qwen3.5:397b on Ollama Cloud, did catch the ajar frame. We ran it in production for about a day, asking it three times per check and going with the majority. Two frames is not a benchmark, and we never tested that model on our full photo set. Still, I wanted the decision made inside the house, not by three cloud calls every check.</p>

		<h2>A small model for one scene</h2>
		<p>So we trained a classifier. It is <strong>MobileNetV3-Small</strong>, a compact image network pretrained on ImageNet, fine-tuned in <strong>PyTorch</strong> to answer a single question. We chose it because it is small enough to run without a GPU. A first version went live September 5. The one we ran until September 25 was retrained September 6 on 108 labeled frames and got 21 of 22 held-out images right. Held-out images are photos kept out of training to test the model. Only 6 of those 22 show the gate open, so the score says less than it seems.</p>

		<p>Training happens on the 4090: the September 25 run took 16.5 seconds wall-clock (40 passes over 120 photos, start-up included). The day-to-day checks run on a small CPU-only server; the workstation is needed elsewhere. Every five minutes the server grabs a still, crops it to the gate and classifies it. Each check takes about six seconds, model loading included.</p>

		<figure>
			<img src="/blog/beach-gate-vision-classifier/pipeline-loop.png" alt="Diagram: camera to classifier to Home Assistant, which sends a reminder and a phone push; a vote on the phone feeds the training set, which feeds a retrain on the GPU, which sends an updated model back to the classifier." width="1400" height="570" loading="lazy" />
			<figcaption>
				The top row runs on its own every five minutes. The orange path is the human in the loop, and it is what makes the model better.
				<span class="credit">Diagram: Code Puerto Rico</span>
			</figcaption>
		</figure>

		<h2>Home Assistant closes the loop</h2>
		<p>The classifier’s verdict flips a switch in <strong>Home Assistant</strong>, the open-source platform that already runs our lights, AC and cameras. If the gate reads open for 15 minutes, Home Assistant sends a reminder.</p>

		<p>Each time the verdict changes, my phone gets a push with the photo and two buttons: “Gate is open” and “Gate is closed.” A tap saves that frame, with my label, for the next retrain. If the gate flips to closed and I tap “Gate is open,” the frame becomes an open example and the alerts keep coming until I tap “Gate is closed.” If I ignore an alert, the verdict stands and the alerts stop. As of September 25, a vote only counts if it arrives within about 20 minutes of the photo. The catch: I can only correct the model when it changes its mind. A gate it wrongly calls closed sends no alert, as I found out.</p>

		<figure>
			<img src="/blog/beach-gate-vision-classifier/ha-closed-alert-vote.jpg" alt="iPhone notification: Beach gate CLOSED, all clear, with a camera thumbnail showing the gate and two buttons, Gate is open and Gate is closed." width="1200" height="1284" loading="lazy" />
			<figcaption>
				A real alert. Tapping either button files the photo as training data; ignoring it lets the verdict stand. “conf” is the model’s score for its verdict, not a calibrated probability. Snapshot link and background redacted.
				<span class="credit">Screenshot: Code Puerto Rico</span>
			</figcaption>
		</figure>

		<h2>The miss, and my own bad labels</h2>
		<p>On September 25 I left the gate open for about 18 minutes one afternoon and got no alert. In low afternoon sun and hard shadows, the model gave three open frames an open score (0 to 1, where 0.5 or more means open) of 0.13, 0.001 and 0.001. That is a miss, or false negative. The opposite error, calling a closed gate open, is a false alarm (false positive).</p>

		<p>Reviewing every labeled photo that day turned up a second problem: me. Three frames I had tapped “Gate is closed” clearly show the gate open. The model had called all three open, with scores of 0.98 to 0.99. My taps came seven hours to four days later. I was probably describing the gate as it was when I tapped, or reading “Gate is closed” as “I closed it.” One of those labels went into the September 6 retrain, and that model learned my mistake: it scored that wide-open frame 0.00.</p>

		<p>Then a surprise: rerun on those three frames, our first model, from September 5, scored them 0.99, 0.55 and 0.55. Did my bad label break the retrain? I can’t show that. Retraining on the same photos with different random starting points swung the scores from near 0 to 0.8, and removing the label didn’t reliably help. One training run proves little.</p>

		<figure>
			<img src="/blog/beach-gate-vision-classifier/error-gallery.jpg" alt="Six gate frames. Top row: three open gates I mislabeled closed. Bottom row: a glare-streaked closed gate the model called open, and two partly open gates in afternoon sun it called closed." width="1400" height="644" loading="lazy" />
			<figcaption>
				Top: the model was right and my labels were wrong. Bottom: real model errors, a 4:30 am glare streak and two of the September 25 afternoon misses.
				<span class="credit">Camera stills: Code Puerto Rico</span>
			</figcaption>
		</figure>

		<p>We fixed the three labels and added 11 hand-checked frames, for 150 labeled photos in all (63 open, 87 closed). We also used <strong>augmentation</strong>, adding altered copies of training photos with fake sun glare, hard shadows and tilted angles. Then we retrained. The table compares the two models, rerun from their saved files.</p>

		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th scope="col">What we tested</th>
						<th scope="col">Sep 6 model</th>
						<th scope="col">Sep 25 model</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>The original 22 held-out images</td>
						<td>21 of 22 right</td>
						<td>21 of 22 right</td>
					</tr>
					<tr>
						<td>The 3 afternoon misses</td>
						<td>0 of 3 caught</td>
						<td>3 of 3 (it trained on them)</td>
					</tr>
					<tr>
						<td>The same 3, model trained without them</td>
						<td>–</td>
						<td>1 of 3 caught</td>
					</tr>
					<tr>
						<td>False alarms, 789 frames believed closed (Sep 23–25)</td>
						<td>0</td>
						<td>0</td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="table-note"><em>In production, scores under 0.6 are marked unknown; that changes no result here.</em></p>

		<p>Held-out accuracy didn’t move, and both models still miss a night frame with a person standing in the open gateway. The retrained model catches the September 25 misses mostly because it has seen them; with them held out, it caught one of three. Our test scores also flatter the model: some test photos are near-twins of training photos taken minutes apart. The fix is more afternoon examples, which the phone votes can now supply.</p>

		<h2>What students should take from this</h2>
		<ul class="tips">
			<li><strong>Test before you trust.</strong> A two-frame test told us more than any model card.</li>
			<li><strong>Go small and specific</strong> when the camera never moves and the question never changes.</li>
			<li><strong>Audit your labels.</strong> Ours had errors, and the button wording invited them. Next step: “Photo shows open / closed.”</li>
			<li><strong>Hold out your failures, and retrain more than once,</strong> or you’re grading your own homework.</li>
			<li><strong>Connect the model to something real.</strong> Home Assistant is what turns a score into a reminder, and a reminder into new training data.</li>
		</ul>

		<p>Test, measure, fix the data, ship, repeat: that loop is applied AI, and it’s the habit we build at <strong>Holberton Coding School Puerto Rico</strong>, Code Puerto Rico’s school, through its AI Software Engineering program and the part-time AI for Developers program for working developers. Ask us about the gate at the Holberton Coding School Puerto Rico booth at the Caribbean AI Summit, October 9–10 at the Puerto Rico Convention Center.</p>

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

	.hero-cover img {
		max-width: 1400px;
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

	.table-wrap {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		margin: 0 0 0.75rem;
		border: 1px solid #eaeaea;
		border-radius: var(--radius, 8px);
	}

	.table-wrap table {
		width: 100%;
		min-width: 520px;
		border-collapse: collapse;
		font-size: 0.95rem;
		line-height: 1.45;
	}

	.table-wrap th,
	.table-wrap td {
		padding: 0.75rem 1rem;
		text-align: left;
		vertical-align: top;
		border-bottom: 1px solid #eaeaea;
	}

	.table-wrap thead th {
		background: #fff8f2;
		font-weight: 700;
		border-bottom: 2px solid var(--color-primary, #e01d40);
		white-space: nowrap;
	}

	.table-wrap tbody tr:last-child td {
		border-bottom: none;
	}

	.table-note {
		font-size: 0.875rem;
		color: #666;
		margin-bottom: 1.5rem;
	}

	.tips {
		background: #fff8f2;
		padding: 1.25rem 1.5rem;
		border-radius: var(--radius, 8px);
		border-left: 3px solid var(--color-primary, #e01d40);
	}

	.tips li {
		margin-bottom: 0.75rem;
	}

	@media (max-width: 600px) {
		.post h1 {
			font-size: 1.75rem;
		}
	}
</style>
