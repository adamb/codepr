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
	}

	const {
		title,
		description,
		image,
		canonical,
		type = 'website',
		publishedTime,
		modifiedTime
	}: Props = $props();

	const siteName = 'Code Puerto Rico';
	const defaultDescription = 'Tech Hub, Coworking & Events in San Juan, Puerto Rico.';
	const defaultImage = 'https://code.pr/images/code-pr-big.webp';
	const fullTitle = $derived(
		title === siteName || title.includes(siteName) ? title : `${title} | ${siteName} Tech Hub`
	);
	const ogImage = $derived(image ?? defaultImage);
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
	<meta property="og:type" content={type} />
	{#if canonical}
		<meta property="og:url" content={canonical} />
	{/if}
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@CodePuerto" />
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
</svelte:head>
