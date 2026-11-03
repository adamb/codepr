# ManyChat setup for @code_puertorico (FREE plan)

Status: checklist for Adam. Needs his own sign-in. Nothing is set up yet. Do this on a **desktop browser** (plan management is desktop-only).
Verified against help.manychat.com on Nov 3, 2026. Menu names below are quoted from those articles; if a screen differs, the linked article wins.

## Before you start (Instagram side)
1. @code_puertorico must be a **professional** (Business or Creator) account and linked to the Code PR Facebook Page (id 1028351890369931).
2. In the Instagram app: Settings → Messages and story replies → Message controls → Connected tools → turn on **Allow access to messages**. (Instagram's in-app wording; check it matches on the phone.)

## 1. Sign up and connect Instagram
Doc: https://help.manychat.com/hc/en-us/articles/14281290924444-How-to-connect-Instagram-to-Manychat
1. Go to manychat.com, sign up with your Meta (Facebook) login.
2. Pick Instagram as the channel. ManyChat offers three methods:
   - **Via Meta** (recommended; needs the IG account in a Meta Business Portfolio).
   - **Connect Via Instagram** (simplest, no business account; some advanced features limited).
   - **Connect Via Meta Business Suite** (needs IG linked to a FB Page).
   Pick Via Meta if Code PR has a Business Portfolio, otherwise Connect Via Instagram.
3. When Meta asks which accounts, tick **only** @code_puertorico (and the Code PR Page if asked). Do not tick Holberton or Sensr.

## 2. Comment keyword automations ("Auto-DM links from comments")
Doc: https://help.manychat.com/hc/en-us/articles/16654065283100-Quick-Automation-Auto-DM-links-from-comments
For each row below: **Automations** tab → **My Automations** → **+New Automation** → **Auto-DM links from comments** (or **+ Start From Scratch** → **Post or Reel Comment**).
1. Choose which post triggers it: **A specific post or reel**, **Any post or reel**, or **Next post or reel** (only one "next post" automation at a time).
2. Enter the keyword(s) the comment must include.
3. Public reply: add up to three messages (ManyChat shuffles them). Use the ones in [../2026-11-seminar/manychat-dm.md](../2026-11-seminar/manychat-dm.md).
4. **Opening DM** is optional. Turning it on means people tap a button first (opt-in), which allows follow-ups for 24 h. Suggest: off for v1, to keep it one step.
5. Link DM: paste the DM text and add the link (up to three links).
6. Optional follow-up DM if the link isn't clicked: skip for v1.
7. Click **Go Live** (top right).

| Priority | Keywords | Trigger post | Link | DM text |
|---|---|---|---|---|
| 1 | SEMINAR, SEMINARIO | specific: seminar post + Reel ([SEMINAR DATE]) | https://code.pr/start?service=seminar (ES: add `&lang=es`) | [manychat-dm.md](../2026-11-seminar/manychat-dm.md) |
| 2 | MIGRATE | Any post or reel | https://code.pr/start?service=migration | "Here's the link for a free first call about moving your CRM to Odoo: …" / ES "Aquí tienes el link para tu llamada gratis: …" |
| 3 | WEB | Any post or reel | https://code.pr/start?service=web-seo | same pattern |
| 4 | AI | Any post or reel | https://code.pr/start?service=ai-content | same pattern |

Note: "AI" is a short word and will match lots of comments if ManyChat matches on "includes". Consider "AI" only as an exact word, or switch the keyword to something like AUTOMATE. (Matching rules not verified in docs.)

## 3. DM keyword triggers (someone DMs the word instead of commenting)
Doc: https://help.manychat.com/hc/en-us/articles/14281211785884-How-to-use-Keywords-Trigger-in-Manychat
- Option A: **Automation → Keywords → + New Keyword**, enter words, pick Instagram, choose the rule.
- Option B: open an automation in the Flow Builder → **+ New trigger** → **User sends a message**.
- Free limit: **3 custom keyword triggers** per account, up to 10 keywords each. If you exceed it, automations stop sending. Suggested: one rule for SEMINAR/SEMINARIO only.

## 4. Personalizing the link (dynamic fields)
Docs: https://help.manychat.com/hc/en-us/articles/14281183702556-Variables · https://help.manychat.com/hc/en-us/articles/14281292522652-System-Fields · https://help.manychat.com/hc/en-us/articles/14281157003292-Buttons
- Variables can go in message text and button names via the **{ }** picker (e.g. `{{instagram_username}}`). The docs don't restrict variables to paid plans; I couldn't find a doc that says outright that URLs in buttons accept variables on the Free plan. **Test it once** with the "Preview in Instagram" option (not "Preview in Manychat", which doesn't render variables).
- **Instagram contacts have no first name in ManyChat** by default, only the Instagram Username. So `{first name}` in our DM draft should become `{{instagram_username}}` or be dropped.
- The /start page (PR #8) reads `ig`, `name` and `subscriber_id` from the URL. Suggested link if variables work: `https://code.pr/start?service=seminar&ig={{instagram_username}}`.

## 5. Plan limits (Free plan, new pricing from Mar 2, 2026)
Docs: https://help.manychat.com/hc/en-us/articles/25800197498652-Free-plan · https://manychat.com/pricing · https://help.manychat.com/hc/en-us/articles/14281375479324-How-to-start-or-renew-your-subscription
- Free: $0, **25 Active Contacts/month**, **4 live automations**, 2 channels, 1 user. Going over 25 can stop delivery.
- The 4 rows above use all 4 live automations. Priority is the order in the table; pause MIGRATE/WEB/AI during the seminar window if needed.
- Paid (only with Adam's decision, not now): Essential $14/mo annual ($17 monthly), 250 contacts, unlimited automations. Pro $29/mo annual ($39 monthly), 2,500 contacts.
- 14-day free trial for Essential or Pro, once per channel. It needs a card and **renews automatically unless cancelled**. Start it from the workspace banner **Activate Pro Trial**, or **Settings → Billing → Activate Pro Trial**. Don't add the AI add-on (billed immediately).

## 6. Test
Comment SEMINAR from a second account on the post, confirm the public reply and the DM arrive, tap the link, and (once the n8n flow is on) check a lead lands in Odoo.
