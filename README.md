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
- **Fonts:** Google Fonts (Assistant, Source Sans 3)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — cover-image hero, agency announcement, stats, offerings, community CTA |
| `/about-us` | Gray title bar, About section, circular team photos with bios |
| `/agency` | Dev agency services, process, Salesforce→Odoo migration table, projects |
| `/upcoming-events` | Demo Days, past events, recurring meetups, community opportunities |
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
- Contact form is frontend-only (`mailto:` action).
- Visual styling approximates the production Odoo theme: teal primary (`#1ba9ca`), dark footer (`#2d2f35`), orange agency accents (`#f97316`), production cover image and decorative shapes.

## Known Differences from Production

These are expected for a static SvelteKit mirror:

- **Navigation:** preview includes `/workshops` in the main nav; production does not. Production has a `/web/login` "Sign in" link; preview does not.
- **Social links:** preview links directly to `x.com/codepr` and `instagram.com/codepr`; production routes through `/website/social/*` redirects.
- **Assets:** local `/images/...` and `/team/...` paths instead of Odoo `/web/image/...` URLs.
- **Forms:** event notification and contact forms are static; production submits through Odoo workflows.
- **Pricing:** preview uses concise plan summaries; production includes detailed bullet lists per plan.
- **Upcoming Events:** registration email and a few section headings differ slightly, but event data matches.
- **Blog article:** substance and panelists match; some heading order and wording differ.

## Quality Checks

```sh
npm run check   # svelte-check (0 errors, 0 warnings)
npm run build   # production build with Cloudflare adapter
```
