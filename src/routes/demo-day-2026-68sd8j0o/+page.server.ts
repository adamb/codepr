import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// The unlisted recap page now lives at /demo-day. Keep the first URL working
// so anyone who already has the long link still lands on the cuts.
export const load: PageServerLoad = () => {
	redirect(301, '/demo-day');
};
