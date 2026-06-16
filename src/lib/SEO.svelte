<!-- SEO.svelte -->
<script lang="ts">
	interface Props {
		title: string;
		description?: string;
		image?: string;
		canonical?: string;
	}

	const { title, description, image, canonical }: Props = $props();

	const siteName = 'Code Puerto Rico';
	const defaultDescription = 'Tech Hub, Coworking & Events in San Juan, Puerto Rico.';
	const fullTitle = title === siteName || title.includes(siteName)
		? title
		: `${title} | ${siteName} Tech Hub`;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description ?? defaultDescription} />

	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description ?? defaultDescription} />
	<meta property="og:type" content="website" />
	{#if canonical}
		<meta property="og:url" content={canonical} />
	{/if}
	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description ?? defaultDescription} />
	{#if image}
		<meta name="twitter:image" content={image} />
	{/if}
</svelte:head>
