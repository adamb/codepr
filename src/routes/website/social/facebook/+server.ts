import { redirect } from '@sveltejs/kit';

export function GET() {
	return redirect(302, 'https://www.facebook.com/profile.php?id=61564742363745');
}
