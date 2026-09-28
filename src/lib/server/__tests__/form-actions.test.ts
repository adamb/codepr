import { describe, it, expect, vi, beforeEach } from 'vitest';

// Fake Odoo behind the real XML-RPC client module.
const odoo = vi.hoisted(() => ({
	mails: [] as Record<string, unknown>[],
	sent: [] as unknown[],
	fail: '' as '' | 'auth' | 'send'
}));

vi.mock('$env/dynamic/private', () => ({
	env: { ODOO_URL: 'https://odoo.example', ODOO_DB: 'cpr', ODOO_USER: 'u', ODOO_API_KEY: 'k' }
}));

vi.mock('$lib/odoo', () => ({
	authenticate: vi.fn(async () => {
		if (odoo.fail === 'auth') throw new Error('Odoo authentication failed');
		return { url: 'x', db: 'cpr', uid: 2, apiKey: 'k' };
	}),
	callKw: vi.fn(async (_auth: unknown, model: string, method: string, args: unknown[]) => {
		if (model === 'mail.mail' && method === 'create') {
			odoo.mails.push(args[0] as Record<string, unknown>);
			return odoo.mails.length;
		}
		if (model === 'mail.mail' && method === 'send') {
			if (odoo.fail === 'send') throw new Error('SMTP down');
			odoo.sent.push(args[0]);
			return null;
		}
		throw new Error(`unexpected ${model}.${method}`);
	})
}));

import { actions as contactActions } from '../../../routes/contactus/+page.server';
import { actions as workshopActions } from '../../../routes/workshops/linux-workshop/+page.server';

function formRequest(fields: Record<string, string>) {
	const body = new FormData();
	for (const [k, v] of Object.entries(fields)) body.set(k, v);
	return new Request('https://code.pr/x', { method: 'POST', body });
}

async function run(action: (e: any) => unknown, fields: Record<string, string>) {
	try {
		return { result: await action({ request: formRequest(fields) }) };
	} catch (thrown: any) {
		return { thrown }; // SvelteKit redirect() throws
	}
}

const contact = {
	name: 'Nancy <b>',
	email: 'nancy@example.com',
	phone: '787',
	company: '',
	subject: 'Desk',
	question: 'Is a desk free?\nThanks'
};

beforeEach(() => {
	odoo.mails.length = 0;
	odoo.sent.length = 0;
	odoo.fail = '';
});

describe('/contactus action', () => {
	it('sends one Odoo mail to info@code.pr and redirects to thank-you', async () => {
		const r = await run(contactActions.contact as any, contact);
		expect(r.thrown?.status).toBe(303);
		expect(r.thrown?.location).toBe('/contactus-thank-you');
		expect(odoo.mails).toHaveLength(1);
		expect(odoo.sent).toEqual([[1]]);
		expect(odoo.mails[0]).toMatchObject({ email_to: 'info@code.pr', reply_to: 'nancy@example.com' });
		expect(String(odoo.mails[0].body_html)).toContain('Nancy &lt;b&gt;');
	});

	it('shows a clear error and keeps the values when Odoo fails', async () => {
		odoo.fail = 'send';
		const r = await run(contactActions.contact as any, contact);
		expect(r.result).toMatchObject({ status: 502 });
		expect((r.result as any).data.message).toMatch(/could not send your message/i);
		expect((r.result as any).data.values.question.replace(/\r\n/g, '\n')).toBe(contact.question); // multipart uses CRLF
	});

	it('shows an error when Odoo login fails', async () => {
		odoo.fail = 'auth';
		const r = await run(contactActions.contact as any, contact);
		expect(r.result).toMatchObject({ status: 502 });
		expect(odoo.mails).toHaveLength(0);
	});

	it('validates required fields and email before touching Odoo', async () => {
		let r = await run(contactActions.contact as any, { ...contact, question: '' });
		expect(r.result).toMatchObject({ status: 400 });
		r = await run(contactActions.contact as any, { ...contact, email: 'nope' });
		expect(r.result).toMatchObject({ status: 400 });
		expect((r.result as any).data.message).toMatch(/valid email/i);
		expect(odoo.mails).toHaveLength(0);
	});
});

describe('/workshops/linux-workshop action', () => {
	const reg = { name: 'Ana', email: 'ana@example.com', acknowledgment: 'on' };

	it('sends the registration via Odoo and redirects', async () => {
		const r = await run(workshopActions.register as any, reg);
		expect(r.thrown?.status).toBe(303);
		expect(r.thrown?.location).toBe('/upcoming-events-thanks');
		expect(odoo.mails[0]).toMatchObject({ email_to: 'info@code.pr', reply_to: 'ana@example.com' });
		expect(String(odoo.mails[0].subject)).toContain('Linux Workshop Registration');
	});

	it('shows an error instead of silently dropping the registration', async () => {
		odoo.fail = 'send';
		const r = await run(workshopActions.register as any, reg);
		expect(r.result).toMatchObject({ status: 502 });
		expect((r.result as any).data.message).toMatch(/could not complete your registration/i);
	});

	it('still requires the acknowledgment', async () => {
		const r = await run(workshopActions.register as any, { name: 'Ana', email: 'ana@example.com' });
		expect(r.result).toMatchObject({ status: 400 });
		expect(odoo.mails).toHaveLength(0);
	});
});
