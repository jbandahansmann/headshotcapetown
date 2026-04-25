# Headshot Cape Town — Production codebase

Next.js 14 (App Router) + Decap CMS + Vercel hosting.
Form posts to a PHP endpoint on Hostinger; emails sent via Resend.

---

## What's in this codebase

- **`/app`** — Next.js App Router pages (`/`, `/journal`, `/journal/[slug]`, `/admin`)
- **`/components`** — All V1 sections as React components
- **`/content`** — Markdown content edited via Decap CMS (`site.md`, `pricing.md`, `testimonials/*`, `journal/*`)
- **`/public`** — Static assets: portraits, client logos, fonts, favicon, `/admin/index.html`
- **`/public/admin/config.yml`** — Decap CMS configuration (Git Gateway / GitHub auth)
- **`/lib`** — Helpers: `siteConfig.ts`, `formatRand.ts`, `mdx.ts`
- **`/styles`** — Global CSS, font definitions
- **`next.config.mjs`** — Static export config (`output: 'export'`)
- **`/api/enquiry.php`** — Drop this file onto your Hostinger shared hosting; the form POSTs here, it sends email via Resend

---

## First-time setup

### 1. Push to GitHub

```bash
cd handoff
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/jbandahansmann/headshotcapetown.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to https://vercel.com/new
2. Import `jbandahansmann/headshotcapetown`
3. Framework: **Next.js** (auto-detected)
4. Add environment variables:
   - `NEXT_PUBLIC_FORM_ENDPOINT` = `https://jurgen.co.za/api/enquiry.php`
   - `NEXT_PUBLIC_CAL_USERNAME` = `your-cal-username/15min-discovery`
   - `NEXT_PUBLIC_GA_ID` = `G-XXXXXXX` (when ready)
5. Click **Deploy**.

### 3. Wire up the domain

In Vercel → Project → Settings → Domains → add `headshotcapetown.co.za`.
Vercel will tell you the DNS records. In Hostinger DNS panel:
- Update `A` record for `@` to Vercel's IP
- Update `CNAME` for `www` to `cname.vercel-dns.com`

Wait 5–60 minutes for propagation. SSL is automatic.

### 4. Drop the PHP endpoint onto Hostinger

Upload `api/enquiry.php` to `public_html/api/` on your Hostinger hosting.
Edit the file's top constants:
- `RESEND_API_KEY` — your Resend key
- `TO_EMAIL` — `headshots@jurgen.co.za`
- `ALLOWED_ORIGIN` — `https://headshotcapetown.co.za`

### 5. Enable Decap CMS

Decap uses GitHub OAuth via Git Gateway or direct GitHub backend.
Easiest: **GitHub backend** — see `public/admin/config.yml`.
Visit `headshotcapetown.co.za/admin` and log in with GitHub.

### 6. Cal.com

Sign up at cal.com, create a `15min-discovery` event type, set availability.
The embed pulls from `NEXT_PUBLIC_CAL_USERNAME`.

---

## Local development

```bash
npm install
npm run dev
```

Site runs at http://localhost:3000. Admin at http://localhost:3000/admin
(local Decap edits write directly to your filesystem when run with `npx decap-server`).

---

## Deploying changes

Just push to `main`. Vercel auto-deploys.
Decap edits via `/admin` commit to GitHub, which triggers the same deploy.

---

## Phase 2 (post-launch)

- `/corporate-headshots-cape-town` dedicated landing page
- `/linkedin-photographer-cape-town` dedicated landing page
- 4–6 more journal articles
- Google Search Console + Bing Webmaster verification
- Second Google Business Profile for "Headshot Cape Town"
