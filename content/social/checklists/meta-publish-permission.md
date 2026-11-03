# Meta: enable Instagram publishing for n8n ("Code PR n8n", App ID 921227250787205)

Status: checklist for Adam. Needs his own Meta sign-in. Nothing changed yet. Context: /workspace/N8N_CodePR-ovh/HANDOFF-META.md (Sep 30): the app is Live, `metaCodePRGraph1` was a Sep 25 Graph login for DMs/comments, not connected to any active workflow, and no one has granted `instagram_content_publish`. No publishing workflow exists yet.

## Do I need App Review? No, for our own account.
Meta's App Review table: "My app is only for a business I own or manage" → **Standard Access**, **App Review not required** (both Instagram Login and Facebook Login).
https://developers.facebook.com/documentation/instagram-platform/app-review
Standard Access works for people who have a role on the app (admin/developer/tester). Adam owns the app and admins the Page, so he qualifies.
https://developers.facebook.com/docs/instagram-platform/overview

## Steps (Facebook Login path, matches the existing n8n credential)
1. developers.facebook.com → My Apps → **Code PR n8n**.
2. App roles: confirm Adam's Facebook account is an **Administrator** of the app.
3. In the app's use case / permissions screen, make sure these are added (Standard Access is fine):
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
   - `pages_read_engagement`
   (Keep the existing DM/comment permissions on the credential.)
4. Confirm @code_puertorico is a professional account linked to Page 1028351890369931. If Meta says the Page needs **Page Publishing Authorization (PPA)**, complete it in Page settings first; publishing fails until PPA is done. https://developers.facebook.com/documentation/instagram-platform/content-publishing
5. Check the n8n OAuth redirect URI for the **new OVH n8n host** is listed under the app's Facebook Login → Valid OAuth Redirect URIs (n8n shows the exact URI on the credential screen). Code PR Automations can tell you the value.
6. In your **1:1 chat with Code PR Automations**, open n8n → Credentials → `metaCodePRGraph1` → **Reconnect**. In the Meta dialog, choose "Edit access" and tick **only** the Code PR Page and @code_puertorico. Do not tick Holberton or Sensr. Approve all four permissions above.
7. Tell Automations it's done. Automations then builds the publish workflow and does **one** test post only with your OK.

Notes:
- The API posts from a public image URL (container → `media_publish`), so media has to be on a public link (e.g. code.pr or a Cloudflare bucket), not the private repo.
- The Instagram Login path uses different scopes (`instagram_business_content_publish`, host graph.instagram.com); an app can use one login type or the other, not both. We stay on Facebook Login since that's what the credential uses.
- Exact menu labels in the app dashboard change often; I didn't click through them live. Docs above are the source.

## Free fallback (works today)
- Post by hand in the Instagram app from your phone (upload the slide files).
- Or schedule for free in **Meta Business Suite** (Planner / Create post → Schedule), which covers IG and the FB Page.
