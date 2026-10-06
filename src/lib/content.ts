// Shared marketing content for the homepage and /development.
// Only describes work that exists in this repo, the Holberton PR repo, or published site content.

export interface Service {
	title: string;
	blurb: string;
}

export const services: Service[] = [
	{
		title: 'Custom Software Development',
		blurb: 'Purpose-built applications designed around how your business actually works.'
	},
	{
		title: 'AI Applications & Automation',
		blurb: 'LLM and machine-learning features built into real applications and workflows.'
	},
	{
		title: 'AI-First Development Workflows',
		blurb: 'We build with AI coding tools, and senior engineers review everything that ships.'
	},
	{
		title: 'Business Process Automation',
		blurb: 'Replace manual steps such as lead routing, payments and notifications with reliable automation.'
	},
	{
		title: 'CRM & ERP Integration / Migration',
		blurb: 'Connect, consolidate or move your CRM and ERP data. We run Odoo ourselves.'
	},
	{
		title: 'Salesforce → Odoo Migration',
		blurb: 'A five-phase migration: assess, transform, load, test and cut over.'
	},
	{
		title: 'Cloud Applications & Infrastructure',
		blurb: 'Applications deployed on modern cloud platforms, including Cloudflare.'
	},
	{
		title: 'Systems Integration',
		blurb: 'Connect payments, CRMs, forms, email and internal systems through their APIs.'
	},
	{
		title: 'Internal Business Tools',
		blurb: 'Dashboards, admin tools and workflow apps that save your team time.'
	},
	{
		title: 'Web Applications',
		blurb: 'Fast, mobile-responsive sites and web apps in React, Next.js, SvelteKit, Webflow or WordPress.'
	},
	{
		title: 'APIs & Backend Systems',
		blurb: 'Server-side logic, webhooks and API integrations, built to be maintained.'
	},
	{
		title: 'Data / AI Integrations',
		blurb: 'Bring AI models and your own data into the systems you already use.'
	},
	{
		title: 'Prototypes & Proofs of Concept',
		blurb: 'Working prototypes that test an idea before you commit to a full build.'
	},
	{
		title: 'Technical Architecture & Digital Transformation',
		blurb: 'Help choosing and planning the right systems before the building starts.'
	}
];

export interface Project {
	client: string;
	kind: 'Client project' | 'Internal system' | 'Internal R&D';
	need: string;
	work: string;
	category: string;
	status: string;
	href?: string;
	hrefLabel?: string;
}

export const projects: Project[] = [
	{
		client: 'Advent-Morro Equity Partners',
		kind: 'Client project',
		need: 'An investor-facing web presence showing their portfolio, team and investment thesis.',
		work: 'Website design and development.',
		category: 'Web application',
		status: 'In progress'
	},
	{
		client: 'Local Brewing Company',
		kind: 'Client project',
		need: 'A brand-forward site for the taproom, events, menu and merchandise.',
		work: 'Website design and development, built to grow with the business.',
		category: 'Web application',
		status: 'In progress'
	},
	{
		client: 'Code Puerto Rico (our own CRM)',
		kind: 'Internal system',
		need: 'One open-source platform for student inquiries, enrollment and alumni tracking, instead of Salesforce.',
		work: 'Salesforce → Odoo migration, plus a lead-routing integration that sends website inquiries to both systems.',
		category: 'CRM / ERP migration · Systems integration',
		status: 'In progress'
	},
	{
		client: 'Code Puerto Rico (code.pr platform)',
		kind: 'Internal system',
		need: 'Replace the old Odoo-served website with a site that also runs our business processes.',
		work: 'SvelteKit app on Cloudflare Pages. Stripe payments post invoices into Odoo, event sign-ups use email verification, and TikTok lead-gen forms feed Odoo.',
		category: 'Cloud application · APIs & backend · Process automation',
		status: 'In production'
	},
	{
		client: 'Code Puerto Rico (internal lab)',
		kind: 'Internal R&D',
		need: 'Off-the-shelf vision models kept reading a gate that was standing open as closed.',
		work: 'Fine-tuned a small image classifier and wired it into Home Assistant, so phone alerts double as training labels.',
		category: 'AI prototype · Machine learning',
		status: 'Running as a prototype. It still makes mistakes, and we say so in the write-up.',
		href: '/blog/4/beach-gate-vision-classifier',
		hrefLabel: 'Read the write-up'
	}
];

export interface InquiryType {
	value: string;
	label: string;
}

export const developmentInquiries: InquiryType[] = [
	{ value: 'ai-automation', label: 'AI / automation' },
	{ value: 'custom-software', label: 'Custom software' },
	{ value: 'web-application', label: 'Web application' },
	{ value: 'crm-erp-migration', label: 'CRM / ERP migration' },
	{ value: 'systems-integration', label: 'Systems integration' },
	{ value: 'development-other', label: 'Other development project' }
];

export const workspaceInquiries: InquiryType[] = [
	{ value: 'rent-a-desk', label: 'Rent a desk' },
	{ value: 'host-an-event', label: 'Host an event' },
	{ value: 'workspace', label: 'Ask about workspace' }
];

export const generalInquiry: InquiryType = { value: 'general', label: 'General question' };

export const allInquiries: InquiryType[] = [
	...developmentInquiries,
	...workspaceInquiries,
	generalInquiry
];

export function inquiryLabel(value: string): string | undefined {
	return allInquiries.find((i) => i.value === value)?.label;
}
