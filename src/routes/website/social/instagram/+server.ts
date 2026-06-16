import { redirect } from '@sveltejs/kit';

export function GET() {
	return redirect(302, 'https://instagram.com/codepr');
}
