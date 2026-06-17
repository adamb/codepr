/** Minimal Odoo XML-RPC client. API key auth works; JSON-RPC session auth does not accept API keys. */

export interface OdooAuth {
	url: string;
	db: string;
	uid: number;
	apiKey: string;
	cfHeaders?: Record<string, string>;
}

export async function authenticate(
	url: string,
	db: string,
	user: string,
	apiKey: string,
	cfHeaders?: Record<string, string>
): Promise<OdooAuth> {
	const uid = await xmlRpcCall<number>(
		url,
		'/xmlrpc/2/common',
		'authenticate',
		[db, user, apiKey, {}],
		cfHeaders
	);
	if (!uid) throw new Error('Odoo authentication failed: invalid credentials');
	return { url, db, uid, apiKey, cfHeaders };
}

export async function callKw(
	auth: OdooAuth,
	model: string,
	method: string,
	args: unknown[],
	kwargs: Record<string, unknown> = {}
): Promise<unknown> {
	return xmlRpcCall(
		auth.url,
		'/xmlrpc/2/object',
		'execute_kw',
		[auth.db, auth.uid, auth.apiKey, model, method, args, kwargs],
		auth.cfHeaders
	);
}

// ---- XML-RPC request builder ----

function xmlVal(v: unknown): string {
	if (v === null || v === undefined) return '<nil/>';
	if (typeof v === 'boolean') return `<boolean>${v ? 1 : 0}</boolean>`;
	if (typeof v === 'number')
		return Number.isInteger(v) ? `<int>${v}</int>` : `<double>${v}</double>`;
	if (typeof v === 'string')
		return `<string>${v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</string>`;
	if (Array.isArray(v))
		return `<array><data>${v.map((x) => `<value>${xmlVal(x)}</value>`).join('')}</data></array>`;
	if (typeof v === 'object') {
		const members = Object.entries(v as Record<string, unknown>)
			.map(([k, val]) => `<member><name>${k}</name><value>${xmlVal(val)}</value></member>`)
			.join('');
		return `<struct>${members}</struct>`;
	}
	return `<string>${String(v)}</string>`;
}

function buildRequest(method: string, params: unknown[]): string {
	return `<?xml version='1.0'?><methodCall><methodName>${method}</methodName><params>${params
		.map((p) => `<param><value>${xmlVal(p)}</value></param>`)
		.join('')}</params></methodCall>`;
}

// ---- XML-RPC response parser ----

interface Ctx {
	pos: number;
	xml: string;
}

function skipWs(c: Ctx) {
	while (c.pos < c.xml.length && c.xml[c.pos] <= ' ') c.pos++;
}

function expect(c: Ctx, s: string) {
	const i = c.xml.indexOf(s, c.pos);
	if (i === -1) throw new Error(`XML-RPC parse: expected "${s}"`);
	c.pos = i + s.length;
}

function readUntil(c: Ctx, s: string): string {
	const i = c.xml.indexOf(s, c.pos);
	if (i === -1) throw new Error(`XML-RPC parse: expected closing "${s}"`);
	const text = c.xml.slice(c.pos, i);
	c.pos = i + s.length;
	return text;
}

function peekTag(c: Ctx): string {
	let i = c.pos;
	while (i < c.xml.length && c.xml[i] <= ' ') i++;
	const j = c.xml.indexOf('<', i);
	if (j === -1) return '';
	const k = c.xml.indexOf('>', j);
	if (k === -1) return '';
	return c.xml.slice(j + 1, k);
}

function parseVal(c: Ctx): unknown {
	skipWs(c);
	if (c.xml.startsWith('<value>', c.pos)) c.pos += 7;
	skipWs(c);

	const tag = peekTag(c);

	if (tag === 'int' || tag === 'i4') {
		expect(c, `<${tag}>`);
		const n = parseInt(readUntil(c, `</${tag}>`), 10);
		if (c.xml.startsWith('</value>', c.pos)) c.pos += 8;
		return n;
	}
	if (tag === 'string') {
		expect(c, '<string>');
		const s = readUntil(c, '</string>')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&amp;/g, '&');
		if (c.xml.startsWith('</value>', c.pos)) c.pos += 8;
		return s;
	}
	if (tag === 'boolean') {
		expect(c, '<boolean>');
		const b = readUntil(c, '</boolean>').trim() === '1';
		if (c.xml.startsWith('</value>', c.pos)) c.pos += 8;
		return b;
	}
	if (tag.startsWith('nil')) {
		expect(c, '<nil');
		readUntil(c, '>');
		if (c.xml.startsWith('</value>', c.pos)) c.pos += 8;
		return null;
	}
	if (tag === 'double') {
		expect(c, '<double>');
		const d = parseFloat(readUntil(c, '</double>'));
		if (c.xml.startsWith('</value>', c.pos)) c.pos += 8;
		return d;
	}
	if (tag === 'array') {
		expect(c, '<array>');
		expect(c, '<data>');
		const items: unknown[] = [];
		while (true) {
			skipWs(c);
			if (c.xml.startsWith('</data>', c.pos)) {
				c.pos += 7;
				break;
			}
			items.push(parseVal(c));
		}
		expect(c, '</array>');
		if (c.xml.startsWith('</value>', c.pos)) c.pos += 8;
		return items;
	}
	if (tag === 'struct') {
		expect(c, '<struct>');
		const obj: Record<string, unknown> = {};
		while (true) {
			skipWs(c);
			if (c.xml.startsWith('</struct>', c.pos)) {
				c.pos += 9;
				break;
			}
			expect(c, '<member>');
			expect(c, '<name>');
			const name = readUntil(c, '</name>');
			obj[name] = parseVal(c);
			expect(c, '</member>');
		}
		if (c.xml.startsWith('</value>', c.pos)) c.pos += 8;
		return obj;
	}

	// Bare string (text directly in <value> with no type tag)
	const next = c.xml.indexOf('<', c.pos);
	if (next > c.pos) {
		const text = c.xml.slice(c.pos, next);
		c.pos = next;
		if (c.xml.startsWith('</value>', c.pos)) c.pos += 8;
		return text;
	}

	throw new Error(`XML-RPC: unknown type tag="${tag}"`);
}

function parseResponse(xml: string): unknown {
	const c: Ctx = { pos: 0, xml };
	if (xml.includes('<fault>')) {
		expect(c, '<fault>');
		const fault = parseVal(c) as Record<string, unknown>;
		// Odoo can't marshal None over XML-RPC (allow_none=False server-side).
		// Void methods (like mail.mail.send) return None after succeeding — treat as null.
		if (String(fault.faultString ?? '').includes('cannot marshal None')) return null;
		throw new Error(`Odoo fault ${fault.faultCode}: ${fault.faultString}`);
	}
	expect(c, '<params>');
	expect(c, '<param>');
	return parseVal(c);
}

async function xmlRpcCall<T = unknown>(
	url: string,
	path: string,
	method: string,
	params: unknown[],
	cfHeaders?: Record<string, string>
): Promise<T> {
	const body = buildRequest(method, params);
	const resp = await fetch(`${url}${path}`, {
		method: 'POST',
		headers: { 'Content-Type': 'text/xml', Accept: 'text/xml', ...cfHeaders },
		body
	});
	if (!resp.ok) throw new Error(`Odoo HTTP ${resp.status}: ${resp.statusText}`);
	return parseResponse(await resp.text()) as T;
}
