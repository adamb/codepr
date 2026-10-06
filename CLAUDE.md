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

### Branches, previews and staging
- Production branch: `main` (auto-deploys to code.pr). Every other branch gets a Pages preview at `https://<branch-alias>.codepr.pages.dev` (e.g. `staging-ai-dev-positioning.codepr.pages.dev`).
- `staging.code.pr` is NOT configured in this repo. To expose a branch there: Cloudflare Pages → `codepr` → Custom domains → add `staging.code.pr`, then set the CNAME `staging` → `<branch-alias>.codepr.pages.dev` in the code.pr zone (separate Cloudflare account). Pages maps custom domains to production only, so the CNAME to the branch alias is what pins it to a branch.
- `src/hooks.server.ts` sends `X-Robots-Tag: noindex` on every host except `code.pr`/`www.code.pr`, so staging and previews are never indexed and nothing needs removing at merge time.
- Contact form (`/contactus`) emails from any non-production host are subject-tagged `[STAGING TEST]`.

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

Service token credentials are stored as:
- Cloudflare Pages secrets: `CF_ACCESS_CLIENT_ID`, `CF_ACCESS_CLIENT_SECRET`
- Claude Code MCP config: `~/.claude.json` under `projects["/home/adam/code/codepr"].mcpServers.odoo.env`

### Odoo MCP server (Claude Code)
`mcp-server-odoo` is configured in `~/.claude.json` for the `/home/adam/code/codepr` project. Because `odoo.code.pr` is behind Cloudflare Access and `mcp-server-odoo` has no native support for CF Access headers, the installed package is **patched** to inject them.

**Patched files** (both archive paths must be kept in sync):
- `~/.cache/uv/archive-v0/iYIirAeVwrzVOwtNPnCIv/mcp_server_odoo/performance.py`
- `~/.cache/uv/archive-v0/iYIirAeVwrzVOwtNPnCIv/mcp_server_odoo/config.py`
- `~/.cache/uv/archive-v0/rG9-6SuwEeV8fDe0BXp7G/lib/python3.11/site-packages/mcp_server_odoo/performance.py`
- `~/.cache/uv/archive-v0/rG9-6SuwEeV8fDe0BXp7G/lib/python3.11/site-packages/mcp_server_odoo/config.py`

**What the patch does:**
1. `config.py` — reads `CF_ACCESS_CLIENT_ID` and `CF_ACCESS_CLIENT_SECRET` from env and stores them on `OdooConfig`
2. `performance.py` — passes those values into `OdooSafeTransport`/`OdooTransport`, which call `connection.putheader(...)` in `send_headers()` on every XML-RPC request

**If the MCP stops connecting after a `uvx` cache update** (new archive path), re-apply the patch:
```bash
# Find the active archive used by uvx
uvx mcp-server-odoo --help 2>&1 | head -1   # will fail but shows which archive errors

# Copy patches from the known-good archive to the new one
cp ~/.cache/uv/archive-v0/iYIirAeVwrzVOwtNPnCIv/mcp_server_odoo/performance.py \
   ~/.cache/uv/archive-v0/<NEW_ARCHIVE>/lib/python3.11/site-packages/mcp_server_odoo/performance.py
cp ~/.cache/uv/archive-v0/iYIirAeVwrzVOwtNPnCIv/mcp_server_odoo/config.py \
   ~/.cache/uv/archive-v0/<NEW_ARCHIVE>/lib/python3.11/site-packages/mcp_server_odoo/config.py
```

Then reconnect with `/mcp reconnect all` in Claude Code.

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

## Positioning and content

Primary story: software & AI development from San Juan (`/development`, homepage hero). Workspace/events (`/space`, `/pricing`) is secondary; Holberton and workshops are presented as education/community, separate from development. Shared service and project copy lives in `src/lib/content.ts` — only add claims the operation can back up. `/agency` 301-redirects to `/development`.

## Design System

- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (code)
- **Colors**: Orange `#f97316` (CTAs), Teal `#1ba9ca` (accents), Dark navy `#0d1b2a` (background)
- **Header height**: 116px (100px logo matching Odoo original `logo-height: 6.25rem`, plus 8px top/bottom padding)

## What NOT to touch
- `svelte.config.js` — Cloudflare adapter config
- `wrangler.toml` — except `[vars]` section for non-secret env config
- Cloudflare adapter internals

### Stripe webhook (membership / day-pass fulfillment)
Route: `src/routes/cpr_membership/stripe/webhook/+server.ts` → `https://code.pr/cpr_membership/stripe/webhook`

The Stripe live-mode endpoint was originally served by the Odoo addon `cpr_membership` (adamb/cprodoo).
That addon was uninstalled on 2026-06-17 along with Odoo's `website` module during the move to SvelteKit,
so the URL 404'd. This route keeps the same URL and ports the addon's logic to XML-RPC
(`src/lib/server/stripe-fulfillment.ts`):
- `checkout.session.completed` / `checkout.session.async_payment_succeeded` → find/create `res.partner`,
  (optionally, `STRIPE_PORTAL_INVITES=true`) create portal user + invitation for new contacts, create posted + paid `account.move` (ref `Stripe: <cs_… or in_…>`)
- `invoice.paid` → same, ref `Stripe: in_…` (dedupes with the checkout event for a subscription's first invoice)
- Idempotent on `ref`, so Stripe retries / manual resends never duplicate invoices.
- Verifies `Stripe-Signature` with Pages secret `STRIPE_WEBHOOK_SECRET` (fails closed with 500 if unset).

### Stripe charge alert emails
`charge.succeeded` (and `charge.refunded` / `charge.failed` if the Stripe endpoint is subscribed to them)
sends an alert to **info@code.pr** (only recipient) via Odoo `mail.mail` (Postfix → ImprovMX, From info@code.pr),
the same mail path as Notify Me — no Resend key needed. Code: `src/lib/server/charge-notify.ts`.
- Dedup: deterministic Message-Id `<stripe-charge-succeeded-ch_…@code.pr>` stored in Odoo (`auto_delete` off), checked before sending.
- Events older than 72h are skipped (quiet bulk replays).
- Email failures are logged; the webhook still returns 2xx. Kill switch: Pages env `STRIPE_CHARGE_EMAILS=off`.
- Note: `RESEND_API_KEY` is NOT set in Pages. `/contactus` now falls back to sending through Odoo `mail.mail` (same path as Notify Me) when Resend is absent; the Linux workshop form still needs Resend.
