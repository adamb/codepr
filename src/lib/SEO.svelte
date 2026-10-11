<!-- SEO.svelte -->
<script lang="ts">
	interface Props {
		title: string;
		description?: string;
		image?: string;
		canonical?: string;
		type?: string;
		publishedTime?: string;
		modifiedTime?: string;
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
		noindex?: boolean;
	}

	const {
		title,
		description,
		image,
		canonical,
		type = 'website',
		publishedTime,
		modifiedTime,
		jsonLd,
		noindex = false
	}: Props = $props();

	const siteName = 'Code Puerto Rico';
	const defaultDescription =
		'Software and AI development from San Juan, Puerto Rico, plus a tech hub with workspace and events.';
	const defaultImage = 'https://code.pr/images/code-pr-big.webp';
	const fullTitle = $derived(
		title === siteName || title.includes(siteName) ? title : `${title} | ${siteName}`
	);
	const ogImage = $derived(image ?? defaultImage);
	// Escape "<" so JSON content can never close the script tag.
	const jsonLdTag = $derived(
		jsonLd
			? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}<\/script>`
			: ''
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description ?? defaultDescription} />

	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}

	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description ?? defaultDescription} />
	<meta property="og:type" content={type} />
	{#if canonical}
		<meta property="og:url" content={canonical} />
	{/if}
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description ?? defaultDescription} />
	<meta name="twitter:image" content={ogImage} />

	<!-- Article metadata -->
	{#if type === 'article'}
		{#if publishedTime}
			<meta property="article:published_time" content={publishedTime} />
		{/if}
		{#if modifiedTime}
			<meta property="article:modified_time" content={modifiedTime} />
		{/if}
	{/if}

	{#if jsonLdTag}
		{@html jsonLdTag}
	{/if}
</svelte:head>
