# Headshot Cape Town — Decap CMS

Decap is configured to commit content edits directly to GitHub.

## How to log in

1. Visit `https://headshotcapetown.co.za/admin`
2. Click **"Login with GitHub"**
3. Authorize the OAuth app (you'll only do this once)
4. You're in.

## How to enable GitHub OAuth

Decap's GitHub backend needs an OAuth app to authenticate. Two options:

### Option A — Netlify Identity / Git Gateway (easiest)

Even if you're hosting on Vercel, you can use Netlify's free Git Gateway just for auth.
1. Sign up at netlify.com (free)
2. Create a "site" but don't deploy — just enable **Identity** + **Git Gateway**
3. Update `public/admin/config.yml` `backend.name` to `git-gateway`

### Option B — Self-hosted OAuth

Run a tiny OAuth proxy. The simplest is https://github.com/vencax/netlify-cms-github-oauth-provider — deploy it free on Vercel, point Decap at it.

For now, the config uses the **direct GitHub backend** which works for editors who have repo write access. If your wife/team need access without GitHub accounts, switch to Git Gateway.

## What lives where

| Decap collection | Files |
|---|---|
| Site content → Homepage | `content/site.md` |
| Site content → Pricing | `content/pricing.md` |
| Testimonials | `content/testimonials/*.md` |
| Journal articles | `content/journal/*.md` |
| Client logos | `content/client-logos/*.md` + uploaded image |

## Image uploads

Drop into the CMS — they're stored in `/public/images/uploads/`. Vercel rebuilds on commit so they appear within ~30 seconds.
