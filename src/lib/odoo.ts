/** Minimal Odoo JSON-RPC client for server-side use. */

export async function authenticate(
	url: string,
	db: string,
	user: string,
	apiKey: string
): Promise<{ sessionId: string }> {
	const resp = await fetch(`${url}/web/session/authenticate`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'call',
			id: 1,
			params: { db, login: user, password: apiKey }
		})
	});

	const data = (await resp.json()) as { result?: { uid: number } };
	if (!data.result?.uid) throw new Error('Odoo authentication failed');

	const setCookie = resp.headers.get('set-cookie') ?? '';
	const sessionId = setCookie.match(/session_id=([^;]+)/)?.[1] ?? '';
	if (!sessionId) throw new Error('Odoo did not return a session cookie');

	return { sessionId };
}

export async function callKw(
	url: string,
	sessionId: string,
	model: string,
	method: string,
	args: unknown[],
	kwargs: Record<string, unknown> = {}
): Promise<unknown> {
	const resp = await fetch(`${url}/web/dataset/call_kw`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `session_id=${sessionId}`
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			method: 'call',
			id: Math.floor(Math.random() * 1e9),
			params: { model, method, args, kwargs }
		})
	});

	const data = (await resp.json()) as {
		result?: unknown;
		error?: { data?: { message?: string }; message?: string };
	};
	if (data.error) {
		throw new Error(data.error.data?.message ?? data.error.message ?? 'Odoo RPC error');
	}
	return data.result;
}
