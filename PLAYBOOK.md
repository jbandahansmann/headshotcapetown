# Service Website Playbook

A reusable approach for building a fast, SEO-strong, conversion-focused website for a service business. Distilled from the Headshot Cape Town build (April 2026), which now sits at Lighthouse Performance 99 / Best Practices 100 / SEO 100, ships in days not weeks, and costs nothing to host beyond the Vercel free tier and a Postmark account.

Use this document as the brief at the start of a new service-website project. Read it, agree with it, then build to its rules. Most of the time we wasted on Headshot Cape Town came from violating one of the hard rules below.

---

## 1. When to use this approach

Use this for a **single-owner, single-editor service business** that:

- Sells a small number of related services (3-6, not 30)
- Has a clear local focus (e.g. Cape Town, Johannesburg)
- Wants to rank in Google for service-intent searches
- Needs a contact form, optional booking, and a simple journal
- Has one person (probably the owner) editing copy
- Doesn't need an online shop, user accounts, or a database

Do **not** use this approach for: e-commerce, multi-author publications, anything needing user logins, anything where multiple non-technical editors need to update content daily.

---

## 2. The stack and the reasoning

| Layer | Tool | Why this, not something else |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | Server-rendered HTML for SEO, modern React, free tier on Vercel, large community, fast |
| Hosting | **Vercel** | Auto-deploy on `git push`, free tier covers small sites, edge CDN built in, zero config |
| Source control | **GitHub** | Free, standard, integrates with Vercel out of the box |
| Email | **Postmark** | Transactional email with strong deliverability, simple REST API, fair pricing for low volume |
| Booking | **Cal.com (embedded, lazy-loaded)** | Free, mature, embeds cleanly. Lazy-load is non-negotiable (see anti-patterns) |
| Content storage | **Markdown files in the repo** | No database, no CMS, no auth. Owner edits via GitHub web UI or hands-off to Claude in a session |
| Fonts | **System fonts (Helvetica Neue stack, Georgia, system mono)** | Zero network cost, instant render. No Google Fonts ever |
| Images | **`next/image` with WebP source files** | Auto-optimised responsive sizes, modern format detection, lazy loading below the fold |
| Form processing | **Next.js API route → Postmark** | Server-side, env-var-protected token, no third-party form service needed |
| Analytics | **Google Analytics 4 + Google Search Console** | Free, the only two that matter for early-stage measurement |

Rules of thumb:
- **No CMS** unless a non-developer editor demands one and refuses GitHub
- **No database** unless storing user accounts or transactions
- **No third-party form service** when a Next.js API route + Postmark does the job in 50 lines
- **No PHP backend on a separate host**. The form lives in the same app

---

## 3. Five hard rules (non-negotiables)

Every one of these came from a mistake in the Headshot Cape Town build.

1. **No Google Fonts.** Use system fonts. Render-blocking font requests cost ~750ms of FCP and ~15-25 Lighthouse points. The site looks just as good in Helvetica/Georgia.

2. **Lazy-load every third-party embed.** Cal.com, YouTube, Twitter, Instagram, comment widgets — all of them. Use IntersectionObserver to defer until the section scrolls within 200px of the viewport. A single eager Cal.com embed will cost you ~350KB of JS, ~2 seconds of CPU time, and ~46 points of Lighthouse Best Practices.

3. **Always use `next/image`, never plain `<img>`.** Plain `<img>` serves the source file at full size regardless of display dimensions. `next/image` does responsive sizing, format negotiation, lazy loading. Add `priority` to the LCP element (the hero image).

4. **Single editor → no CMS.** Decap, Sanity, Contentful, all of them are overhead for one person. Edit markdown via GitHub web UI or via Claude in a session. Add a CMS only when you have a second editor who refuses GitHub.

5. **Substantial unique content per page.** Service landing pages need 1,500-2,500 words of genuinely different content per page. Same skeleton with different headlines is "doorway content" and Google's Helpful Content updates downrank it.

---

## 4. Project structure

```
project-name/
├── app/
│   ├── layout.tsx              Root layout, metadata, JSON-LD LocalBusiness schema
│   ├── page.tsx                Homepage (composes all sections)
│   ├── icon.svg                Favicon (Next.js auto-detects)
│   ├── sitemap.ts              Auto-generated sitemap.xml
│   ├── robots.ts               Auto-generated robots.txt
│   ├── api/
│   │   └── enquiry/route.ts    POST handler for the contact form → Postmark
│   ├── journal/
│   │   ├── page.tsx            Journal index
│   │   └── [slug]/page.tsx     Individual journal post
│   ├── corporate-headshots-cape-town/page.tsx    Service page
│   ├── team-headshots-cape-town/page.tsx         Service page
│   └── linkedin-photographer-cape-town/page.tsx  Service page
├── components/
│   ├── Header.tsx, Footer.tsx, Hero.tsx, Pricing.tsx, Process.tsx
│   ├── FAQ.tsx, Booking.tsx, CalCom.tsx, FinalCTA.tsx
│   ├── Personal.tsx, OnLocation.tsx, StudioInfo.tsx, LogoStrip.tsx
│   ├── Testimonial.tsx, TestimonialGrid.tsx, Stars.tsx
│   ├── Journal.tsx, WhatsAppFloat.tsx
│   └── ServicePage.tsx         Shared renderer for service pages
├── content/
│   ├── site.md                 Homepage frontmatter (hero, trust, on_location, process, faq)
│   ├── pricing.md              Pricing packages
│   ├── services/
│   │   ├── corporate-headshots.md     Service page content + long-form body
│   │   ├── team-headshots.md
│   │   └── linkedin-photographer.md
│   ├── testimonials/
│   │   └── one-file-per-testimonial.md
│   ├── journal/
│   │   └── one-file-per-post.md
│   └── client-logos/
│       └── one-file-per-logo.md
├── lib/
│   ├── siteConfig.ts           Site-wide config (name, domain, email, phone, parent brand)
│   └── mdx.ts                  Markdown loaders (readMarkdown, loadCollection, etc.)
├── public/
│   ├── images/uploads/         All site images
│   ├── logo/                   SVG logo files (mark, lockup, white variant)
│   └── favicon.ico             Fallback favicon for older browsers
├── styles/globals.css          All CSS (single file, ~400 lines)
├── .env.example                Documents required env vars
├── .gitignore
├── next.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

## 5. Initial setup checklist (Day 1, in order)

Do these in order. Each step has at least one specific gotcha that bit us in HCT.

### 5.1 — GitHub repo and local clone

1. Create empty GitHub repo: `github.com/{user}/{project-name}`
2. Clone locally: `git clone git@github.com:{user}/{project-name}.git`
3. **Or**: drop the project into a Google Drive folder if the owner needs to access files via Finder. Google Drive sync works fine with git but introduces sync delay (~30s) and occasional sync conflicts on simultaneous writes.

### 5.2 — Next.js scaffolding

1. `npx create-next-app@latest .` — Yes to TypeScript, yes to App Router, yes to ESLint, no to Tailwind (we use vanilla CSS), no to `src/` directory.
2. Update `package.json` — set name, remove unused deps.
3. Add only what's needed: `gray-matter`, `remark`, `remark-html` for markdown processing.

### 5.3 — Vercel connection

1. Import the GitHub repo at vercel.com/new.
2. Framework auto-detects as Next.js. Click Deploy.
3. Initial deploy succeeds with a default Next.js page.
4. **Do not configure custom env vars yet** — wait until step 5.6.

### 5.4 — Domain

1. Vercel → Project → Settings → Domains → add the domain.
2. Update DNS at the registrar (Hostinger, Cloudflare, wherever):
   - `A` record for `@` to Vercel's IP (Vercel shows the value)
   - `CNAME` for `www` to `cname.vercel-dns.com`
3. Wait 5-60 minutes for propagation. SSL is automatic.

### 5.5 — Postmark setup

1. Sign up at postmarkapp.com.
2. Verify the sending domain (e.g. `headshotcapetown.co.za`). Add the DNS records Postmark gives you.
3. Create a Server (e.g. "Production"). Copy the **Server Token**, not the Account Token.
4. Verify a sender signature matching what you'll send `From:` (e.g. `enquiries@yourdomain.co.za`).

### 5.6 — Vercel env vars (critical, easy to mess up)

In Vercel → Project → Settings → Environment Variables:

- `POSTMARK_TOKEN` = the Server Token from step 5.5. **Mark as Sensitive.**
- `NEXT_PUBLIC_CAL_USERNAME` = your Cal.com `username/event-slug` (if using Cal.com)
- `NEXT_PUBLIC_WA_NUMBER` = WhatsApp number, no plus sign, no spaces (e.g. `27789190454`)
- `NEXT_PUBLIC_GA_ID` = leave blank initially, add when GA4 is set up

**Critical**: do not add `NEXT_PUBLIC_FORM_ENDPOINT`. If it exists, the form will POST to whatever URL it points at. The Next.js API route at `/api/enquiry` is the right default and the code already falls back to that.

After adding env vars, **redeploy** — Vercel does not pick up env var changes until the next deploy.

### 5.7 — Build the contact form API route

Create `app/api/enquiry/route.ts`:
- Reads `process.env.POSTMARK_TOKEN` (matches the env var name exactly — no `_SERVER_TOKEN` suffix unless that's what's in Vercel)
- Validates `name`, `email`, and any other required fields
- POSTs to `https://api.postmarkapp.com/email` with `X-Postmark-Server-Token` header
- Returns JSON with `{ ok: true }` or `{ error: "..." }` and appropriate status code

### 5.8 — Smoke test

- Submit the form on the live site with your own email.
- Check the `To:` inbox for the test message.
- Check Postmark Activity for the send record.
- If 500 error: check Vercel function logs. Most likely the env var name doesn't match what the code reads.

### 5.9 — robots.txt + sitemap.xml

Both auto-generate via `app/robots.ts` and `app/sitemap.ts`. Verify both at `/robots.txt` and `/sitemap.xml` after deploy.

### 5.10 — Defer until later

Do **not** do these on Day 1. Each is a Phase 2 task:

- Google Search Console verification
- Google Analytics 4 setup
- Portfolio page
- Multiple journal posts
- Image optimisation rounds
- Open Graph image
- Apple touch icon

Get the core site live first. Measure first. Optimise after data.

---

## 6. Content patterns (markdown frontmatter shapes)

All site content lives in markdown files in `/content/`. Every file uses YAML frontmatter for structured data and an optional markdown body for long-form prose.

### 6.1 — Homepage (`content/site.md`)

```yaml
---
title: Site Name
hero:
  eyebrow: Eyebrow text · Location · Est. year
  headline_line1: First line of headline
  headline_line2: Second line
  headline_italic: word that appears italicised
  headline_line3: Final line.
  body: Hero body paragraph.
  primary_cta: Request a quote
  secondary_cta: WhatsApp 078 919 0454
  portrait: /images/uploads/hero-image.webp
trust:
  rating: 5
  rating_count: 27
  years: 17
  clients_count: 200+
on_location: { eyebrow, headline, headline_italic, body, image_1, image_2, stats: [{k, v}] }
process:
  steps: [{ n, t, d }]
faq: [{ q, a }]
---
```

### 6.2 — Pricing (`content/pricing.md`)

```yaml
---
packages:
  - name: "Essential"
    price: 1950
    blurb: "Short blurb."
    features:
      - "Feature 1"
      - "Feature 2"
  - name: "Signature"
    price: 2750
    blurb: "..."
    features: [...]
  - name: "Team"
    price_from: 3000
    blurb: "..."
    features: [...]
---
```

### 6.3 — Service page (`content/services/{slug}.md`)

```yaml
---
slug: corporate-headshots-cape-town    # the URL slug
title: Corporate Headshot Photographer in Cape Town
metaTitle: Corporate Headshot Photographer Cape Town
metaDescription: 150-character description with the keyword and a hook.
hero: { eyebrow, headline_line1, headline_line2, headline_italic, headline_line3, body, primary_cta, secondary_cta, portrait }
intro:
  eyebrow: Approach
  heading: Lead heading.
  paragraphs:
    - Lead paragraph 1.
    - Lead paragraph 2.
    - Lead paragraph 3.
    - Lead paragraph 4.
faqs:
  - q: Question?
    a: "Answer. Quote any answer that contains a colon followed by a space."
  - q: ...
serviceName: Service Name (for JSON-LD)
priceLow: 1950
priceHigh: 4500
---

## Long-form section heading

Markdown body content. This becomes the main long-form prose on the page,
rendered between the intro and the pricing. Should be 1,000-1,500 words
of genuinely different content per page, with multiple H2 sections.

## Another section

![Alt text describing the image](/images/uploads/file.webp)

> A pull quote that summarises a key point.

| Comparison | Option A | Option B |
|---|---|---|
| Cost | R750 | R1,200 |
```

### 6.4 — Testimonial (`content/testimonials/{slug}.md`)

```yaml
---
quote: "The testimonial quote, properly punctuated."
author: "First Last"
role: "Their role"               # optional
company: "Their company"         # optional
pages: [team, homepage]          # which pages show this in the grid
featuredOn: [team]               # which page(s) show this as the big featured testimonial
order: 3                         # global sort order
---
```

### 6.5 — Journal post (`content/journal/{slug}.md`)

```yaml
---
title: "How much does a corporate headshot cost in Cape Town?"
slug: "headshot-cost-cape-town"
tag: "Pricing"
readTime: "5 min read"
date: "2026-01-22"
excerpt: "One-line summary used on the journal index."
---

The body of the journal post in markdown. ## headings, **bold**, lists, etc.
```

---

## 7. Component patterns

The components are roughly 18 files, ~50-150 lines each. Each renders one section. The homepage composes them in `app/page.tsx`. Service pages compose a subset via the `ServicePage` component.

Key shared components:
- **Header** — logo, primary nav, CTA. Same on every page.
- **Footer** — site map, contact, parent brand reference. Same on every page.
- **Hero** — page H1, body, two CTAs, trust stats, portrait. Used on homepage and service pages.
- **Pricing** — three pricing cards with the middle one highlighted. Reused across pages.
- **Process** — numbered steps. Reused.
- **FAQ** — accordion-style Q&A list. Page-specific content via prop.
- **Booking** — the contact form. Posts to `/api/enquiry`. Reused everywhere with `id="enquire"` anchor.
- **CalCom** — lazy-loaded calendar embed. Homepage only by default.
- **TestimonialGrid** — three testimonial cards. Filtered by page tag.
- **Testimonial** — one big featured testimonial (text-only block, no image). Filtered by `featuredOn` tag.
- **ServicePage** — wraps the full service page composition. Each `app/{slug}/page.tsx` is just 9 lines that pass the slug.

---

## 8. Page recipes

### 8.1 — Homepage

Section order:
1. Header
2. Hero (with H1 keyword)
3. LogoStrip (trust signal)
4. Personal section (optional, "for individuals")
5. Pricing
6. Process
7. OnLocation (optional, for team-focused services)
8. Featured Testimonial (text-only block)
9. TestimonialGrid (3 cards filtered by `pages: [homepage]`)
10. StudioInfo (location, hours, parking)
11. Journal (3 most recent posts)
12. FAQ
13. Booking form (id="enquire")
14. CalCom (lazy-loaded)
15. FinalCTA
16. Footer
17. WhatsAppFloat

### 8.2 — Service landing page

Section order:
1. Header
2. Hero (page-specific keyword in H1)
3. LogoStrip
4. ServiceIntro (4-paragraph lead)
5. Long-form prose body (5-7 H2 sections, ~1,200 words, with 2 inline images and 1 pull quote per page)
6. Pricing (same as homepage)
7. Process (same as homepage)
8. Featured Testimonial (page-specific, via `featuredOn: [corporate]`)
9. TestimonialGrid (page-specific, via `pages: [corporate]`)
10. FAQ (12-15 page-specific questions)
11. Booking form
12. FinalCTA
13. Footer
14. WhatsAppFloat
15. Service + FAQPage JSON-LD scripts

### 8.3 — Journal post

Section order:
1. Header
2. "All articles" back link
3. Tag · readTime eyebrow
4. H1 title
5. Excerpt as lead
6. Body content (markdown, rendered as prose)
7. Footer
8. WhatsAppFloat
9. Article JSON-LD

---

## 9. Performance budget (non-negotiables)

Targets, measured on PageSpeed Insights mobile (Slow 4G):

| Metric | Target | Rationale |
|---|---|---|
| Performance score | ≥95 | Modern bar; Google uses these for ranking |
| Best Practices score | ≥95 | Reflects security, deprecated APIs, console errors |
| SEO score | 100 | Easy to hit and important |
| Accessibility score | ≥95 | Basic compliance; doesn't fix everything but catches obvious problems |
| LCP | <2.5s | "Good" Core Web Vital threshold |
| TBT | <200ms | "Good" threshold; lazy-load embeds is critical here |
| CLS | <0.1 | "Good" threshold; explicit width/height on all images |
| FCP | <1.8s | "Good" threshold; killed by Google Fonts if you use them |

If any service page falls below these targets, the fix is almost always one of:
- A heavy embed loading eagerly (lazy-load it)
- An image without `next/image` (convert it)
- Google Fonts or another render-blocking external request (kill it)
- A source image many times larger than its display size (re-export at 1500px long edge)

---

## 10. Anti-patterns from the Headshot Cape Town build

Every one of these wasted real time. Don't repeat them.

### 10.1 — CMS layer for a single editor
We installed Decap CMS + Netlify Identity + Git Gateway, requiring a second Netlify site, a `vercel.json` proxy, and a custom `/auth/` page to catch hash-token redirects. Five commits of plumbing, none of it needed because there was only ever one editor. **Edit markdown via GitHub web UI or via Claude.**

### 10.2 — Form endpoint on a separate host
First version POSTed to a PHP file on Hostinger that didn't exist (404). The PHP file lived in the Next.js repo's `api/` folder, which Next.js doesn't serve. **Use a Next.js API route. Same repo, same deploy, env vars in one place.**

### 10.3 — Wrong env var name on Vercel
Code read `POSTMARK_TOKEN`, env var was `POSTMARK_SERVER_TOKEN`. Form returned 500 "Email service is not configured." Cost half an hour. **Be deliberate about env var naming. Document the exact name in `.env.example`.**

### 10.4 — Stale `.env.example` poisoning Vercel env
Initial `.env.example` had `NEXT_PUBLIC_FORM_ENDPOINT=https://jurgen.co.za/api/enquiry.php` from an earlier setup. Whoever copied it into Vercel kept the override, which forced the form to POST to the dead URL. **Keep `.env.example` accurate. Audit it after every architectural change.**

### 10.5 — Resend → Postmark flip-flop
Original PHP file used Resend. We rewrote to Postmark mid-conversation when the user said "Postmark." **Confirm the email provider before writing code. Don't assume.**

### 10.6 — Google Fonts eating 750ms of FCP
Initial layout pulled three font families with eleven font weights from Google's CDN. PSI flagged "Render blocking requests, est savings 2,240ms." **System fonts always. Use `next/font/google` only if a specific font is non-negotiable for the brand.**

### 10.7 — Cal.com loading eagerly
Cal.com inline embed loaded its full bundle (348KB JS) and ran 2 seconds of CPU work on every homepage visit, even for visitors who never scrolled to it. **Wrap embeds in IntersectionObserver with a 200px rootMargin. Show a loading placeholder until then.**

### 10.8 — Plain `<img>` on every image
PSI flagged 625KB of wasted bandwidth from images served at 2-3x their displayed size. **Always `next/image`. `priority` on the LCP element. `sizes` attribute set explicitly.**

### 10.9 — Thin landing pages that are duplicates of each other
First service page set was the same skeleton with different headlines, ~400 words of unique copy each. Borderline doorway content. **Each service page needs 1,500-2,500 words of genuinely different prose. Different sections, different angles, different audience focus.**

### 10.10 — YAML duplicate keys (Google Drive sync conflict)
Two `body:` and `heading:` keys appeared in the same frontmatter mapping after a write that the user attributed to Google Drive merging concurrent edits. Build crashed with cryptic "Failed to collect page data". **If using Google Drive, wait for sync to complete before opening files in another editor. Verify diffs before commits.**

### 10.11 — YAML colon-space breaking the build
"The general rule is: a layer that holds its shape" inside an unquoted FAQ answer parsed as a nested mapping and crashed the build with "Failed to collect page data". **Quote any FAQ answer or markdown frontmatter value that contains `: ` (colon-space).**

### 10.12 — Async server component called from sync page
`<ServicePage />` was async, the page wrapper was sync. TypeScript was unhappy and build failed. **Match async/sync between page and component. If the data load is async, the page is async too.**

### 10.13 — Stale local clone, force-push attempted
Working tree was 18 commits behind origin. A naive push would have wiped real upstream work. **Always `git fetch && git status` before pushing. If diverged, inspect upstream commits before deciding to reset.**

### 10.14 — Broken footer links to pages that didn't exist yet
Footer linked to `/corporate-headshots-cape-town` etc. before the pages existed. Three 404s on every page load, also a Best Practices ding. **Don't ship links to non-existent routes. Build the page first, then add the link.**

### 10.15 — Journal cover images referenced but missing
Three journal markdown files referenced `/images/journal/{name}.jpg` which didn't exist. Three 404s on every journal page load. **If a frontmatter `cover:` is set, the image must exist. If unsure, leave the field out and let the placeholder render.**

### 10.16 — Markdown tables rendering as raw text
A pipe table in a service-page markdown body rendered as literal `| Studio | On-site |` text on the live page. Cause: `remark` + `remark-html` only handle CommonMark; GitHub-flavoured features (pipe tables, strikethrough, task lists, autolinks) require `remark-gfm`. **Install `remark-gfm` and add `.use(remarkGfm)` to the pipeline in both `renderMarkdownBody` and `getJournalPost`.** Without it, markdown body content silently loses any GFM-only feature.

### 10.17 — Faded inline images from `opacity` on parent paragraph
An inline image in the service-prose section rendered visibly faded compared to the same image opened directly in a new tab. Cause: markdown wraps standalone images in `<p>` tags, and `.service-prose p` had `opacity: 0.85` for body-text fading. Opacity cascades to the entire rendered subtree, so the image inherited the fade. **Never use `opacity` on a container that holds non-text content. Use `color: rgba(R, G, B, A)` for text colour, `border-color: rgba(...)` for borders.** The CSS opacity property is a compositing operation, not a property that applies only to text.

### 10.18 — `images.unoptimized` flag silently disabling next/image
`next.config.mjs` had `images: { unoptimized: true }` left over from an earlier static-export configuration. Symptom: `<Image>` components rendered correctly but the browser fetched the original source file at full resolution — a 1441x1800 hero image was served to mobile devices, pushing LCP to 4.1s. **Audit `next.config.mjs` early. If `output: 'export'` is gone, `images.unoptimized` should be too.** Vercel's runtime image optimisation is free and the Day 1 default for any non-static-export Next.js project on Vercel.

### 10.19 — Markdown body images bypassing next/image
Inline images written as `![alt](src)` in markdown body content render as plain `<img>` from remark-html and **do not** go through Vercel image optimisation. Symptom: PSI flags inline images at full source resolution while the hero (which uses `<Image>`) is fine. **From Day 1, render markdown body via a `MarkdownBody` server component** that processes markdown to HTML, then parses with `html-react-parser` to swap `<img>` for `<Image>` with dimensions read from disk via `image-size`. Required deps: `html-react-parser`, `image-size`. Apply the same component to journal post bodies — same problem there.

---

## 11. Editing workflow after launch

Two paths, depending on the editor's comfort level:

### 11.1 — GitHub web UI (free, no terminal needed)
1. Owner goes to `github.com/{user}/{project}` → Code tab.
2. Click into `content/site.md` (or whichever file).
3. Click pencil icon to edit.
4. Change the copy.
5. "Commit changes" — green button at the bottom.
6. Vercel auto-deploys within ~30 seconds.

Good for: small copy tweaks, swapping image references, updating prices.

### 11.2 — Claude session
1. Owner opens a Claude Code session in the project directory.
2. "Update the homepage hero body to say X."
3. Claude edits the markdown, commits, pushes. Vercel deploys.

Good for: bigger edits, bulk changes, anything where the owner would rather speak the change than write it.

### 11.3 — Adding new content
- **New journal post**: drop a new file in `content/journal/` with the frontmatter shape from §6.5.
- **New testimonial**: drop a new file in `content/testimonials/` with the shape from §6.4.
- **New images**: drop into `/public/images/uploads/` with descriptive filenames (lowercase, hyphens, no spaces). Reference via `/images/uploads/file.webp` in markdown.

---

## 12. Phased rollout

Don't try to ship everything on Day 1. The pattern that worked for HCT:

### Phase 1 — Core site (Day 1-2)
- Homepage with all key sections
- Three service landing pages (substantial unique content per page)
- Working contact form (Postmark via API route)
- Cal.com booking
- Footer with parent brand reference
- LocalBusiness JSON-LD
- Sitemap, robots.txt
- Live on the domain

### Phase 2 — Authority and depth (Week 1-2)
- 3-6 journal posts targeting long-tail queries
- Open Graph image for share previews
- Apple touch icon
- Image optimisation pass (re-export at correct sizes)
- Performance audit and fixes (target ≥95 Performance, ≥95 Best Practices)
- Google Search Console verification
- Google Analytics 4 setup

### Phase 3 — Visual polish and depth (Week 2-4)
- Real client portraits replacing placeholders
- Curated testimonials per service page
- Page-specific FAQ expansions
- Internal linking pass (relevant journal posts linked from service pages)

### Phase 4 — Portfolio (only when there's enough material)
- `/portfolio` page with category filtering
- 30+ images organised by service category
- Embedded portfolio sections on each service page

### Phase 5 — Iterate based on data
- Use GSC to see what queries the site ranks for
- Add new pages or expand existing ones to capture demand
- Refine copy and CTAs based on conversion data

Anything not in Phase 1 is not blocking launch.

---

## 13. Brand adaptation per project

When applying this template to a new business, change the following:

### 13.1 — Identity
- **Brand colour palette** in `styles/globals.css` (CSS variables at the top of the file)
- **Typography** — usually keep system font stack, but the serif and accent fonts can vary
- **Logo files** in `app/icon.svg` and `public/logo/`
- **Header/Footer wordmarks** to match the brand

### 13.2 — Site config (`lib/siteConfig.ts`)
- `name`, `domain`, `url`, `description`, `email`, `phone`, `whatsappNumber`, `calUsername`
- `studio` (or whichever field captures the physical location)
- `social` URLs
- `parent` (if it's a sub-brand of a larger business)
- `rating`, `founded`

### 13.3 — Content (`content/`)
- `site.md` — homepage hero, trust, FAQs
- `pricing.md` — package list
- `services/*.md` — three service pages with substantial unique content per page
- `testimonials/*.md` — at least 8-12, ideally pre-tagged by which page each appears on
- `journal/*.md` — start with 3-6 long-tail-targeted posts

### 13.4 — Routes
- Three service page directories under `app/`, named with the keyword (e.g. `app/{service}-{location}/page.tsx`)
- Each is a 9-line wrapper that imports `ServicePage` and `getServiceMetadata` and passes the slug

### 13.5 — Metadata (`app/layout.tsx`)
- Page title template
- Default description, OG cover, Twitter card
- Keywords array (used for the meta keywords tag — minor SEO impact but worth filling)
- Author name in JSON-LD
- LocalBusiness schema fields (address, geo coords, hours, founded, area served)

### 13.6 — Form destination (`app/api/enquiry/route.ts`)
- `TO` — owner's inbox
- `FROM` — verified Postmark sender
- Subject line template
- HTML email template (style + colour scheme should reflect the brand)

---

## 14. Using this document with Claude

When starting a new service-website project, paste this entire document into the first message of a Claude session along with:

1. **Business name and a one-paragraph description** — what they do, who their customers are
2. **Domain** — registered or to be registered
3. **Three service offerings** — these become the landing pages
4. **Brand palette** — primary colour, secondary, neutrals (or "use Helvetica Neue + Navy for a clean professional feel")
5. **Pricing** — at least three tiers if applicable
6. **Owner contact details** — email, WhatsApp, address (for LocalBusiness schema)
7. **Three to six existing testimonials** if available
8. **Anything specific** to flag — different industries, different audience, different tone

Claude will then build to the rules in this document. Reference the Headshot Cape Town repo (github.com/jbandahansmann/headshotcapetown) as the canonical implementation when in doubt.

---

## 15. Change log

- **2026-04-26** — Initial version, distilled from the Headshot Cape Town build.

When you build the next site with this playbook, add a line here noting what you learned that the playbook didn't cover. The doc gets better each time it's used.
