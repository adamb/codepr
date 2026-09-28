/**
 * Stripe webhook signature verification (Web Crypto, works on Cloudflare Workers/Pages).
 *
 * Header format: `Stripe-Signature: t=<unix>,v1=<hex hmac>[,v1=...][,v0=...]`
 * Expected signature: HMAC-SHA256(endpointSecret, `${t}.${rawBody}`) as lowercase hex.
 * See https://docs.stripe.com/webhooks#verify-manually
 */

export const DEFAULT_TOLERANCE_SECONDS = 300;

export type SignatureResult = { ok: true; timestamp: number } | { ok: false; reason: string };

function toHex(buf: ArrayBuffer): string {
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Constant-time string comparison (both inputs are hex digests of equal length when valid). */
function safeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return diff === 0;
}

export async function computeStripeSignature(
	secret: string,
	timestamp: number | string,
	rawBody: string
): Promise<string> {
	const key = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${rawBody}`));
	return toHex(sig);
}

export async function verifyStripeSignature(
	rawBody: string,
	header: string | null,
	secret: string,
	toleranceSeconds = DEFAULT_TOLERANCE_SECONDS,
	nowSeconds = Math.floor(Date.now() / 1000)
): Promise<SignatureResult> {
	if (!header) return { ok: false, reason: 'missing Stripe-Signature header' };

	let timestamp: number | null = null;
	const v1: string[] = [];
	for (const part of header.split(',')) {
		const idx = part.indexOf('=');
		if (idx === -1) continue;
		const k = part.slice(0, idx).trim();
		const v = part.slice(idx + 1).trim();
		if (k === 't') timestamp = Number(v);
		else if (k === 'v1') v1.push(v);
	}
	if (timestamp === null || !Number.isFinite(timestamp)) return { ok: false, reason: 'no timestamp' };
	if (v1.length === 0) return { ok: false, reason: 'no v1 signature' };
	if (toleranceSeconds > 0 && Math.abs(nowSeconds - timestamp) > toleranceSeconds) {
		return { ok: false, reason: 'timestamp outside tolerance' };
	}

	const expected = await computeStripeSignature(secret, timestamp, rawBody);
	if (!v1.some((s) => safeEqual(s, expected))) return { ok: false, reason: 'signature mismatch' };
	return { ok: true, timestamp };
}
