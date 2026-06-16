/** HMAC-signed tokens for email verification (Web Crypto — works in Cloudflare Workers). */

const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface TokenPayload {
	email: string;
	name: string;
	interests: string[];
}

async function hmac(data: string, secret: string): Promise<string> {
	const key = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
	return btoa(String.fromCharCode(...new Uint8Array(sig)))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');
}

export async function createToken(payload: TokenPayload, secret: string): Promise<string> {
	const data = JSON.stringify({ ...payload, exp: Date.now() + EXPIRY_MS });
	const b64 = btoa(unescape(encodeURIComponent(data)));
	const sig = await hmac(b64, secret);
	return `${b64}.${sig}`;
}

export async function verifyToken(token: string, secret: string): Promise<TokenPayload> {
	const dot = token.lastIndexOf('.');
	if (dot < 0) throw new Error('Malformed token');

	const b64 = token.slice(0, dot);
	const sig = token.slice(dot + 1);

	const expected = await hmac(b64, secret);
	if (expected !== sig) throw new Error('Invalid token signature');

	const data = JSON.parse(decodeURIComponent(escape(atob(b64)))) as TokenPayload & {
		exp: number;
	};
	if (Date.now() > data.exp) throw new Error('Token expired');

	return { email: data.email, name: data.name, interests: data.interests };
}
