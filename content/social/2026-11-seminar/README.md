# Free seminar giveaway: from Instagram comment to CRM lead

Status: **draft, waiting on Adam's review**. Nothing here is posted or scheduled.

## The idea

A free seminar that teaches small businesses the exact setup Code PR is building for itself. Someone comments a keyword on an Instagram post, gets an automatic DM, fills out a short form, and shows up as a lead in Odoo. The signup flow for the seminar is itself a live demo of that setup, and every signup is a warm Code PR lead.

## Open decisions for Adam

1. **Format:** in person at Code PR in San Juan, online, or both. The drafts assume both (in person, also streamed) and mark it as `[FORMAT]`.
2. **Date and time:** no date is set. Drafts use `[DATE]` and `[TIME]`. Leaving at least 10 days between the first post and the seminar gives the posts time to work.
3. **Length:** the drafts assume 90 minutes (60 teaching, 30 Q&A).
4. **Keyword:** `SEMINAR` in the English post, `SEMINARIO` in the Spanish one. Both go to the same signup link.
5. **ManyChat plan:** the free plan covers 25 contacts a month. If we expect more signups, start the Pro 14-day trial right before launch so it covers the signup window. (Code PR Automations flagged this.)
6. **Seat cap:** if it's in person, how many seats does the room hold?

## Signup flow

1. A person comments `SEMINAR` on the post or Reel.
2. ManyChat auto-replies publicly ("Sent you the link!") and sends a DM.
3. The DM links to `https://code.pr/start?service=seminar` (page being built by Code PR Automations on a branch).
4. The form asks for name, email, WhatsApp, and an optional line on what they want to automate. Their Instagram handle comes from the link.
5. n8n creates the lead in Odoo under the Code PR Services team, owner Adam, tagged seminar, source Instagram, medium ManyChat. This is on the test Odoo first.
6. The page shows a confirmation, and a reminder goes out before the event. The reminder email or WhatsApp still needs to be decided and approved by Adam before it's turned on.

## Files

- [instagram-post.md](instagram-post.md): the announcement post (carousel) in English and Spanish
- [reel-script.md](reel-script.md): a 30 to 40 second Reel
- [manychat-dm.md](manychat-dm.md): the comment reply and DM text
- [signup-page-copy.md](signup-page-copy.md): copy for `code.pr/start?service=seminar`
- [seminar-outline.md](seminar-outline.md): what we actually teach
- [schedule.md](schedule.md): suggested posting order once a date is set
