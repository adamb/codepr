# Code Puerto Rico — Website

SvelteKit 2.x website for Code Puerto Rico, migrated from Odoo.

**Live:** https://code.pr  
**Deploy:** Cloudflare Pages (auto-deploys on push to `main`)

## Stack

- **Framework:** SvelteKit 2.x with Svelte 5 runes
- **Language:** TypeScript
- **Hosting:** Cloudflare Pages (edge SSR)
- **Adapter:** `@sveltejs/adapter-cloudflare`
- **Styling:** Custom CSS (no framework)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, agency services, stats, current projects |
| `/about-us` | Team bios (Mercedes, Raphael, Jeandres, Ellen, Adam, Cyril) |
| `/agency` | Dev agency services, Salesforce→Odoo migration process |
| `/upcoming-events` | Demo Days, past events, recurring meetups |
| `/contactus` | Contact form, map embed, location info |

## Developing

```sh
npm install
npm run dev
```

## Building

```sh
npm run build
```

## Deploying

Cloudflare Pages auto-deploys on every push to `main`:

```sh
git add .
git commit -m "your message"
git push
```

Manual deploy (if needed):

```sh
npx wrangler pages deploy
```

## Migration Notes

- Migrated from Odoo CMS to static/SSR SvelteKit
- All content extracted from live Odoo site
- Images: currently using placeholders (team photos need to be added to `/static`)
- Contact form: frontend only — needs Cloudflare Worker or backend integration

## TODO

- [ ] Add team photos to `/static` and update `about-us` page
- [ ] Wire up contact form to Cloudflare Worker / email service
- [ ] Add Open Graph meta tags for social sharing
- [ ] Set up custom domain in Cloudflare Pages
