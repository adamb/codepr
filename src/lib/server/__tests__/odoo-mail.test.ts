import { describe, it, expect } from 'vitest';
import {
	buildContactMail,
	buildWorkshopMail,
	sendFormMail,
	isEmail,
	cleanHeader,
	FORM_MAIL_TO,
	FORM_MAIL_FROM
} from '../odoo-mail';

/** Minimal fake Odoo: records mail.mail create/send calls. */
function fakeOdoo(opts: { failOn?: string } = {}) {
	const calls: Array<{ model: string; method: string; args: unknown[] }> = [];
	const mails: Record<string, unknown>[] = [];
	const rpc = async (model: string, method: string, args: unknown[]) => {
		calls.push({ model, method, args });
		if (opts.failOn === `${model}.${method}`) throw new Error(`Odoo fault in ${model}.${method}`);
		if (model === 'mail.mail' && method === 'create') {
			mails.push(args[0] as Record<string, unknown>);
			return mails.length;
		}
		if (model === 'mail.mail' && method === 'send') return null; // Odoo returns None
		throw new Error(`unexpected ${model}.${method}`);
	};
	return { rpc, calls, mails };
}

describe('buildContactMail', () => {
	it('escapes user input and keeps line breaks', () => {
		const m = buildContactMail({
			name: 'Eve <script>alert(1)</script>',
			email: 'eve@example.com',
			phone: '787-555-0100',
			company: 'A & B "Co"',
			subject: 'Hi',
			question: 'line1\nline2 <b>bold</b>'
		});
		expect(m.bodyHtml).not.toContain('<script>');
		expect(m.bodyHtml).toContain('&lt;script&gt;');
		expect(m.bodyHtml).toContain('A &amp; B &quot;Co&quot;');
		expect(m.bodyHtml).toContain('line1<br>line2 &lt;b&gt;bold&lt;/b&gt;');
		expect(m.replyTo).toBe('eve@example.com');
		expect(m.subject).toBe('[code.pr contact] Hi — Eve  script alert(1) /script');
	});

	it('strips header injection from subject and omits bad reply-to', () => {
		const m = buildContactMail({
			name: 'X',
			email: 'not-an-email\r\nBcc: victim@example.com',
			subject: 'Hello\r\nBcc: victim@example.com',
			question: 'q'
		});
		expect(m.subject).not.toMatch(/[\r\n]/);
		expect(m.replyTo).toBeUndefined();
	});

	it('skips empty optional rows', () => {
		const m = buildContactMail({ name: 'N', email: 'n@x.co', subject: 's', question: 'q' });
		expect(m.bodyHtml).not.toContain('>Phone<');
		expect(m.bodyHtml).not.toContain('>Company<');
	});
});

describe('buildWorkshopMail', () => {
	it('builds the registration notice', () => {
		const m = buildWorkshopMail({ name: 'Ana <i>', email: 'ana@example.com' });
		expect(m.subject).toBe('[code.pr workshop] Linux Workshop Registration — Ana  i');
		expect(m.bodyHtml).toContain('Defenestration Workshop: Installing Linux on Your PC');
		expect(m.bodyHtml).toContain('Ana &lt;i&gt;');
		expect(m.replyTo).toBe('ana@example.com');
	});
});

describe('sendFormMail', () => {
	it('creates one mail.mail to info@code.pr from info@code.pr with reply-to, then sends it', async () => {
		const odoo = fakeOdoo();
		const id = await sendFormMail(odoo.rpc, buildWorkshopMail({ name: 'A', email: 'a@b.co' }));
		expect(id).toBe(1);
		expect(odoo.calls.map((c) => `${c.model}.${c.method}`)).toEqual(['mail.mail.create', 'mail.mail.send']);
		expect(odoo.calls[1].args).toEqual([[1]]);
		expect(odoo.mails[0]).toMatchObject({
			email_to: FORM_MAIL_TO,
			email_from: FORM_MAIL_FROM,
			reply_to: 'a@b.co',
			auto_delete: true
		});
		expect(FORM_MAIL_TO).toBe('info@code.pr');
		expect(FORM_MAIL_FROM).toContain('<info@code.pr>');
	});

	it('omits reply_to when there is none', async () => {
		const odoo = fakeOdoo();
		await sendFormMail(odoo.rpc, { subject: 's', bodyHtml: '<p>x</p>' });
		expect(odoo.mails[0]).not.toHaveProperty('reply_to');
	});

	it('propagates Odoo errors so the form can show an error', async () => {
		const odoo = fakeOdoo({ failOn: 'mail.mail.send' });
		await expect(sendFormMail(odoo.rpc, { subject: 's', bodyHtml: 'x' })).rejects.toThrow(/Odoo fault/);
	});
});

describe('helpers', () => {
	it('isEmail', () => {
		expect(isEmail('a@b.co')).toBe(true);
		expect(isEmail('a@b')).toBe(false);
		expect(isEmail('a b@c.co')).toBe(false);
		expect(isEmail('a@b.co\nBcc: x@y.z')).toBe(false);
	});
	it('cleanHeader', () => {
		expect(cleanHeader(' a\r\nb<c> ')).toBe('a b c');
	});
});
