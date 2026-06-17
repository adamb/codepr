## Project Configuration

- **Language**: TypeScript
- **Package Manager**: npm
- **Framework**: SvelteKit 5 (Svelte runes: `$state`, `$props`, `$derived`)
- **Deployment**: Cloudflare Pages (auto-deploys on push to `main`)

---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the source for **code.pr**, a SvelteKit website hosted on Cloudflare Pages. It replaced the original Odoo-served site in June 2026. Odoo remains running as a CRM backend at `odoo.code.pr`.

## Infrastructure

```
User → code.pr (Cloudflare Pages) → SvelteKit app
              ↓ server functions call
         odoo.code.pr (Cloudflare Tunnel → Linode) → Odoo 18
```

### Cloudflare Pages
- Project name: `codepr`
- Production URL: `https://code.pr` (custom domain) and `https://codepr.pages.dev`
- Pushes to `main` auto-deploy. No build command needed — Cloudflare runs `npm run build`.
- `code.pr` is in a **different Cloudflare account** than the Pages project, but cross-account custom domain was possible because the same user has access to both accounts.

### Odoo (CRM backend)
- URL: `https://odoo.code.pr`
- Running on a Linode server via **Cloudflare Tunnel** (tunnel name: `odoo-prod`, systemd service `cloudflared`)
- Tunnel config: `/etc/cloudflared/config.yml` on the Linode (`adam@odoo`)
- Odoo 18, database: `cpr`
- Used only as CRM — not the public website anymore
- Outgoing mail: Postfix → ImprovMX relay (configured in Odoo as mail server named "improvmx", `smtp_host: postfix`, port 25)

### Cloudflare Tunnel config (on Linode at `/etc/cloudflared/config.yml`)
```yaml
ingress:
  - hostname: odoo.code.pr
    service: http://localhost:8069
  - service: http_status:404
```
To restart after config changes: `sudo systemctl restart cloudflared`

### Cloudflare Access (odoo.code.pr)
`odoo.code.pr` is behind Cloudflare Access (Zero Trust). Employees log in with their `@code.pr` Google/email. The SvelteKit app bypasses the human auth flow using a **service token** — policy action must be **"Service Auth"** (not "Allow") on the `odoo.code.pr` application.

### DNS (code.pr zone — separate Cloudflare account)
- `code.pr` → Cloudflare Pages (custom domain, managed by Pages)
- `odoo.code.pr` → `odoo-prod` tunnel (CNAME to tunnel ID)

## Environment Variables

Non-secret config lives in `wrangler.toml` `[vars]` (checked into git):
```toml
ODOO_URL = "https://odoo.code.pr"
ODOO_DB  = "cpr"
ODOO_USER = "adam@code.pr"
```

Secrets set in Cloudflare Pages dashboard → Settings → Environment variables:
- `ODOO_API_KEY` — Odoo API key for `adam@code.pr`
- `NOTIFY_SECRET` — Random hex secret for HMAC-signing verification tokens

See `.env.example` for the full list.

## Key Features

### Notify Me (event subscriptions)
Route: `src/routes/upcoming-events/`

Flow:
1. User submits form with name, email, and event checkboxes → `?/notify` action
2. Server signs a 24-hour HMAC token (see `src/lib/token.ts`) and creates a `mail.mail` record in Odoo, which sends a verification email via Postfix/ImprovMX
3. User clicks link → `/upcoming-events/verify?token=…`
4. Server validates token, creates or updates `res.partner` in Odoo with `res.partner.category` interest tags

Odoo `res.partner.category` IDs:
- 1 = Interest: Demo Nights & Lightning Talks
- 2 = Interest: AI Coding Tools
- 3 = Interest: Pitch and Prototype
- 4 = Interest: Cloudflare Meetup
- 5 = Interest: Home Assistant Meetup
- 6 = Interest: Demo Day

### Odoo API client (`src/lib/odoo.ts`)
Uses **XML-RPC** (not JSON-RPC). Odoo's `/web/session/authenticate` JSON-RPC endpoint rejects API keys — only XML-RPC `/xmlrpc/2/common` accepts them. The client includes a self-contained XML-RPC request builder and response parser (no dependencies).

Note: `mail.mail.send` returns `None`, which Odoo can't marshal back over XML-RPC (`allow_none=False`). The client treats the "cannot marshal None" fault as a success (the mail was already sent before the response serialization fails).

## Design System

- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (code)
- **Colors**: Orange `#f97316` (CTAs), Teal `#1ba9ca` (accents), Dark navy `#0d1b2a` (background)
- **Header height**: 116px (100px logo matching Odoo original `logo-height: 6.25rem`, plus 8px top/bottom padding)

## What NOT to touch
- `svelte.config.js` — Cloudflare adapter config
- `wrangler.toml` — except `[vars]` section for non-secret env config
- Cloudflare adapter internals
