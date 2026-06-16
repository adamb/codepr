# Code Puerto Rico — Website

SvelteKit 2.x website for Code Puerto Rico, migrated from Odoo.

**Production:** https://code.pr  
**Cloudflare Pages mirror:** https://codepr.pages.dev  
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
| `/about-us` | About Code Puerto Rico + team bios with photos |
| `/agency` | Dev agency services, Salesforce→Odoo migration process |
| `/upcoming-events` | Demo Days, past events, recurring meetups |
| `/workshops` | Workshop listings |
| `/workshops/linux-workshop` | Linux installation workshop details |
| `/pricing` | Coworking, virtual office, event space pricing |
| `/blog` | Blog index |
| `/blog/1/what-does-a-developer-actually-need-to-succeed-in-the-age-of-ai-1` | AI panel event recap |
| `/privacy-policy` | Privacy policy |
| `/contactus` | Contact form, map embed, location info |
| `/upcoming-events-thanks` | Event interest signup confirmation |
| `/upcoming-events-verify` | Event signup verification failure |

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

- Migrated from Odoo CMS to SvelteKit on Cloudflare Pages.
- All public content extracted from the live Odoo site.
- Images downloaded from production and served from `/static`.
- Social links (`/website/social/*`) redirect to real profiles.
- Contact form is frontend-only (mailto action).
