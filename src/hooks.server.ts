import type { Handle } from '@sveltejs/kit';

// Only the production hostnames are indexable. Any other host (staging.code.pr,
// *.pages.dev previews, localhost) gets noindex, so a staging/preview deployment can
// never compete with production in search. Decided per request from the hostname,
// so nothing staging-specific needs to be removed when a branch is merged to main.
const INDEXABLE_HOSTS = new Set(['code.pr', 'www.code.pr']);

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	if (!INDEXABLE_HOSTS.has(event.url.hostname)) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	}
	return response;
};
