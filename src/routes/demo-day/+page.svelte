<script lang="ts">
	import { onMount } from 'svelte';

	// Unlisted page: not linked from nav, not in sitemap.xml, noindex via meta + root _headers.
	const base = '/dd26-u5p8dbs9uw';
	const pagePath = '/demo-day';

	interface Cut {
		id: string;
		label: string;
		fragment: string;
		title: string;
		duration: string;
		concept: string;
	}

	const cuts: Record<string, Cut> = {
		snappy_01_agency_mirror: { id: 'snappy_01_agency_mirror', label: '01', fragment: 'cut-01', title: 'Agency Mirror', duration: '0:59', concept: 'A cut on every beat: each graduate gets a moment on stage in their own words, then a look at what they built.' },
		snappy_02_lightning_45: { id: 'snappy_02_lightning_45', label: '02', fragment: 'cut-02', title: 'Lightning 45', duration: '0:45', concept: 'Ultra-fast social cut: eight one-liners in under a minute, from "Let\'s start the show" to the confetti.' },
		snappy_03_cold_open_hook: { id: 'snappy_03_cold_open_hook', label: '03', fragment: 'cut-03', title: 'Cold Open Hook', duration: '0:54', concept: 'Opens cold on a question from the stage, then the title drops and every graduate fires off a line.' },
		snappy_04_why_i_built_it: { id: 'snappy_04_why_i_built_it', label: '04', fragment: 'cut-04', title: 'Why I Built It', duration: '0:59', concept: 'The problem each graduate set out to solve, and why it mattered to them.' },
		snappy_05_what_it_does: { id: 'snappy_05_what_it_does', label: '05', fragment: 'cut-05', title: 'What It Does', duration: '0:59', concept: 'Product first: the sharpest demo moment from each project, then the builder behind it.' },
		snappy_06_4k_first_vo: { id: 'snappy_06_4k_first_vo', label: '06', fragment: 'cut-06', title: '4K First', duration: '0:55', concept: 'Each graduate on stage, then their voice carries over crisp footage of their app in action.' },
		snappy_07_dynamic_captions: { id: 'snappy_07_dynamic_captions', label: '07', fragment: 'cut-07', title: 'Dynamic Captions', duration: '0:55', concept: 'Our punchiest cut, with bold word-by-word captions so it works with the sound off.' },
		snappy_08_pr_community_energy: { id: 'snappy_08_pr_community_energy', label: '08', fragment: 'cut-08', title: 'Puerto Rico Community Energy', duration: '0:59', concept: 'Puerto Rico pride and community: the most human lines of the night, the crowd, and a big finish.' },
		snappy_09_teaser30_all_grads: { id: 'snappy_09_teaser30_all_grads', label: '09', fragment: 'cut-09', title: '30s Teaser — All Grads', duration: '0:29', concept: 'Thirty seconds, every graduate: a quick burst from each, then congrats and confetti.' },
		snappy_10_teaser30_4k_sizzle: { id: 'snappy_10_teaser30_4k_sizzle', label: '10', fragment: 'cut-10', title: '30s Teaser — 4K Sizzle', duration: '0:31', concept: 'A high-energy montage of the night with standout voices on top.' },
		snappy_11_teaser30_captioned_hook: { id: 'snappy_11_teaser30_captioned_hook', label: '11', fragment: 'cut-11', title: '30s Teaser — Captioned Hook', duration: '0:31', concept: 'A scroll-stopper built for silent autoplay, captioned from start to finish.' },
		snappy_12_teaser30_problem_payoff: { id: 'snappy_12_teaser30_problem_payoff', label: '12', fragment: 'cut-12', title: '30s Teaser — Problem → Payoff', duration: '0:31', concept: 'Real problems, real apps: each problem cut straight against the demo that solves it.' },
		wildcard_01_splitscreen_demo: { id: 'wildcard_01_splitscreen_demo', label: 'W1', fragment: 'cut-w1', title: 'Split-Screen Demo', duration: '0:57', concept: 'Graduate on stage up top, their live product below, with an audio-reactive bar in the middle.' },
		wildcard_02_hype_trailer: { id: 'wildcard_02_hype_trailer', label: 'W2', fragment: 'cut-w2', title: 'Hype Trailer', duration: '0:47', concept: 'Movie-trailer style: Eight builders. Seven products. One Demo Day. Puerto Rico.' },
		wildcard_03_kinetic_type: { id: 'wildcard_03_kinetic_type', label: 'W3', fragment: 'cut-w3', title: 'Kinetic Type', duration: '0:49', concept: 'Magazine-style layout with giant word-by-word typography for every graduate.' },
		wildcard_04_ai_bumpers_remix: { id: 'wildcard_04_ai_bumpers_remix', label: 'W4', fragment: 'cut-w4', title: 'Bumpers Remix', duration: '0:57', concept: 'Neon seahorse opener and light-streak transitions over a tropical-tech house beat.' },
		wildcard_05_pr_dembow_anthem: { id: 'wildcard_05_pr_dembow_anthem', label: 'W5', fragment: 'cut-w5', title: 'Puerto Rico Dembow Anthem', duration: '0:43', concept: 'Beat-chopped to a dembow rhythm with red-and-blue borders and the most Puerto Rico lines of the night.' },
		wildcard_06_directors_cut_4090: { id: 'wildcard_06_directors_cut_4090', label: 'W6', fragment: 'cut-w6', title: "Director's Cut", duration: '0:59', concept: 'The full showcase: cinematic color, every graduate, and a festive finish.' }
	};

	const groups: { title: string; blurb: string; ids: string[] }[] = [
		{
			title: 'Top picks',
			blurb: 'Start here.',
			ids: ['snappy_01_agency_mirror', 'snappy_07_dynamic_captions', 'snappy_09_teaser30_all_grads', 'wildcard_01_splitscreen_demo', 'wildcard_06_directors_cut_4090']
		},
		{
			title: 'Core cuts (45–60s)',
			blurb: 'Eight takes on the night, each under a minute.',
			ids: ['snappy_01_agency_mirror', 'snappy_02_lightning_45', 'snappy_03_cold_open_hook', 'snappy_04_why_i_built_it', 'snappy_05_what_it_does', 'snappy_06_4k_first_vo', 'snappy_07_dynamic_captions', 'snappy_08_pr_community_energy']
		},
		{
			title: '30-second teasers',
			blurb: 'Short and shareable.',
			ids: ['snappy_09_teaser30_all_grads', 'snappy_10_teaser30_4k_sizzle', 'snappy_11_teaser30_captioned_hook', 'snappy_12_teaser30_problem_payoff']
		},
		{
			title: 'Wildcards',
			blurb: 'Creative experiments with bigger swings.',
			ids: ['wildcard_01_splitscreen_demo', 'wildcard_02_hype_trailer', 'wildcard_03_kinetic_type', 'wildcard_04_ai_bumpers_remix', 'wildcard_05_pr_dembow_anthem', 'wildcard_06_directors_cut_4090']
		}
	];

	const firstGroupOf = new Map<string, string>();
	for (const group of groups) {
		for (const id of group.ids) {
			if (!firstGroupOf.has(id)) firstGroupOf.set(id, group.title);
		}
	}

	const fileCache = new Map<string, File>();
	let canWebShare = $state<boolean | null>(null);
	let status = $state<Record<string, 'idle' | 'preparing' | 'ready' | 'copied' | 'error'>>({});

	function cutStatus(key: string) {
		return status[key] ?? 'idle';
	}

	function setStatus(key: string, value: 'idle' | 'preparing' | 'ready' | 'copied' | 'error') {
		status = { ...status, [key]: value };
	}

	function shareUrl(c: Cut) {
		const origin = typeof window !== 'undefined' ? window.location.origin : 'https://code.pr';
		return `${origin}${pagePath}#${c.fragment}`;
	}

	function shareTitle(c: Cut) {
		return `Holberton Demo Day — ${c.title}`;
	}

	function shareText(c: Cut) {
		return `From Holberton Puerto Rico Demo Day: ${c.title}. Congrats, graduates!`;
	}

	function shareFileName(c: Cut) {
		const slug = c.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
		return `holberton-demo-day-${c.label.toLowerCase()}-${slug}.mp4`;
	}

	async function getVideoFile(c: Cut) {
		const cached = fileCache.get(c.id);
		if (cached) return cached;
		const res = await fetch(`${base}/${c.id}.mp4`);
		if (!res.ok) throw new Error(`Could not fetch video (${res.status})`);
		const blob = await res.blob();
		const file = new File([blob], shareFileName(c), { type: 'video/mp4' });
		fileCache.set(c.id, file);
		return file;
	}

	function isAbort(err: unknown) {
		return err instanceof DOMException
			? err.name === 'AbortError'
			: typeof err === 'object' && err !== null && 'name' in err && (err as { name: string }).name === 'AbortError';
	}

	async function copyText(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			try {
				const el = document.createElement('textarea');
				el.value = text;
				el.setAttribute('readonly', '');
				el.style.position = 'fixed';
				el.style.left = '-9999px';
				document.body.appendChild(el);
				el.select();
				const ok = document.execCommand('copy');
				document.body.removeChild(el);
				return ok;
			} catch {
				return false;
			}
		}
	}

	async function copyLink(c: Cut, key: string) {
		const ok = await copyText(shareUrl(c));
		if (ok) {
			setStatus(key, 'copied');
			setTimeout(() => {
				if (cutStatus(key) === 'copied') setStatus(key, 'idle');
			}, 2000);
		} else {
			setStatus(key, 'error');
		}
	}

	async function tryShare(data: ShareData) {
		await navigator.share(data);
	}

	function canShareFiles(file: File) {
		try {
			return typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });
		} catch {
			return false;
		}
	}

	async function shareCut(c: Cut, key: string) {
		setStatus(key, 'preparing');
		try {
			const file = await getVideoFile(c);
			const title = shareTitle(c);
			const text = shareText(c);
			try {
				if (canShareFiles(file)) {
					await tryShare({ files: [file], title, text });
				} else {
					await tryShare({ url: shareUrl(c), title, text });
				}
				setStatus(key, 'idle');
			} catch (err) {
				if (isAbort(err)) {
					setStatus(key, 'idle');
					return;
				}
				// A long fetch can burn the user-activation window. Keep the file
				// ready so the next tap opens the share sheet immediately.
				setStatus(key, 'ready');
			}
		} catch {
			setStatus(key, 'error');
		}
	}

	async function onShareClick(c: Cut, key: string) {
		if (!canWebShare) {
			await copyLink(c, key);
			return;
		}
		if (cutStatus(key) === 'ready' && fileCache.has(c.id)) {
			const file = fileCache.get(c.id)!;
			try {
				if (canShareFiles(file)) {
					await tryShare({ files: [file], title: shareTitle(c), text: shareText(c) });
				} else {
					await tryShare({ url: shareUrl(c), title: shareTitle(c), text: shareText(c) });
				}
				setStatus(key, 'idle');
			} catch (err) {
				if (isAbort(err)) {
					setStatus(key, 'idle');
					return;
				}
				await copyLink(c, key);
			}
			return;
		}
		await shareCut(c, key);
	}

	function buttonLabel(key: string) {
		const s = cutStatus(key);
		if (s === 'preparing') return 'Preparing…';
		if (s === 'ready') return 'Tap to share';
		if (s === 'copied') return 'Copied!';
		if (s === 'error') return canWebShare === false ? 'Copy failed' : 'Share failed — try download';
		return canWebShare === false ? 'Copy link' : 'Share';
	}

	// Playing one video pauses all the others.
	function onPlay(e: Event) {
		const current = e.currentTarget as HTMLVideoElement;
		document.querySelectorAll('video').forEach((v) => {
			if (v !== current && !v.paused) v.pause();
		});
	}

	onMount(() => {
		canWebShare = typeof navigator.share === 'function';
		const hash = window.location.hash.replace(/^#/, '');
		if (hash) {
			document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});
</script>

<svelte:head>
	<title>Holberton Puerto Rico Demo Day — Recap Cuts (Nov 2026)</title>
	<meta name="robots" content="noindex,nofollow" />
	<meta name="googlebot" content="noindex,nofollow" />
</svelte:head>

<section class="page-hero">
	<div class="container">
		<span class="eyebrow">Demo Day · November 2026 · San Juan</span>
		<h1>Holberton Puerto Rico Demo Day — Recap Cuts (Nov 2026)</h1>
		<p class="page-lead">
			Eight graduates, eight builds, one great night. Here are the vertical recap cuts, ready to
			watch, download, and share. Congrats, graduates!
		</p>
		<p class="share-tip">Tap Share on any video to post it to Instagram or send it to friends.</p>
	</div>
</section>

<div class="page-body">
	<div class="container">
		{#each groups as group, gi (group.title)}
			<section class="group" class:top={gi === 0}>
				<h2>{group.title}</h2>
				<p class="blurb">{group.blurb}</p>
				<div class="grid">
					{#each group.ids as id (id)}
						{@const c = cuts[id]}
						{@const key = `${group.title}:${id}`}
						{@const canonical = firstGroupOf.get(id) === group.title}
						<article class="cut" id={canonical ? c.fragment : undefined}>
							<video
								controls
								playsinline
								preload="metadata"
								poster={`${base}/${c.id}.jpg`}
								onplay={onPlay}
							>
								<source src={`${base}/${c.id}.mp4`} type="video/mp4" />
							</video>
							<div class="meta">
								<div class="title-row">
									<span class="label">{c.label}</span>
									<h3>{c.title}</h3>
									<span class="dur">{c.duration}</span>
								</div>
								<p>{c.concept}</p>
								<div class="actions">
									<button
										type="button"
										class="btn share-btn"
										disabled={cutStatus(key) === 'preparing'}
										aria-label={canWebShare === false ? `Copy link to ${c.title}` : `Share ${c.title}`}
										onclick={() => onShareClick(c, key)}
									>
										{buttonLabel(key)}
									</button>
									<a class="dl" href={`${base}/${c.id}.mp4`} download>Download MP4</a>
								</div>
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>

<style>
	.page-hero {
		background: var(--color-dark);
		color: #fff;
		padding: 2.5rem 0 2rem;
	}
	.container {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: 0 1rem;
	}
	.eyebrow {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-accent);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}
	.page-hero h1 {
		color: #fff;
		font-size: clamp(1.6rem, 5vw, 2.6rem);
		line-height: 1.15;
		margin: 0 0 0.75rem;
	}
	.page-lead {
		color: #cbd5e1;
		max-width: 46rem;
		margin: 0;
		font-size: 1.05rem;
	}
	.share-tip {
		color: #fff;
		max-width: 46rem;
		margin: 0.85rem 0 0;
		font-size: 0.95rem;
		font-weight: 600;
	}
	.page-body {
		padding: 1.5rem 0 3rem;
	}
	.group {
		margin-top: 2rem;
	}
	.group h2 {
		font-size: 1.4rem;
		margin: 0 0 0.25rem;
	}
	.group.top h2 {
		color: var(--color-primary);
	}
	.blurb {
		color: var(--color-text-muted);
		margin: 0 0 1rem;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}
	@media (min-width: 640px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 960px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.cut {
		background: var(--color-light);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		scroll-margin-top: 8.5rem;
	}
	video {
		display: block;
		width: 100%;
		aspect-ratio: 9 / 16;
		max-height: 80vh;
		background: #000;
		object-fit: contain;
	}
	.meta {
		padding: 0.85rem 1rem 1rem;
	}
	.title-row {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}
	.label {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: #fff;
		background: var(--color-accent);
		border-radius: 4px;
		padding: 0.05rem 0.4rem;
	}
	.title-row h3 {
		font-size: 1.05rem;
		margin: 0;
		flex: 1;
	}
	.dur {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-text-muted);
	}
	.meta p {
		margin: 0.4rem 0 0.6rem;
		font-size: 0.95rem;
		color: var(--color-text);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1rem;
	}
	.share-btn {
		padding: 0.65rem 1.25rem;
		font-size: 0.9rem;
	}
	.share-btn:disabled {
		opacity: 0.75;
		transform: none;
		cursor: wait;
	}
	.dl {
		display: inline-block;
		font-weight: 600;
		font-size: 0.9rem;
	}
</style>
