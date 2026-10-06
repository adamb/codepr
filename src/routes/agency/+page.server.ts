import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// The dev agency page became /development. Keep the old URL (and its inbound links
// and search equity) alive with a permanent redirect.
export const load: PageServerLoad = () => {
	redirect(301, '/development');
};
