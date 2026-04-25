# Headshot Cape Town

Next.js 14 (App Router) site for headshotcapetown.co.za. Hosted on Vercel.

## Stack

- **Next.js 14** with App Router
- **Vercel** for hosting and auto-deploys on push to `main`
- **Postmark** for the contact form (`/api/enquiry` route)
- **Cal.com** embed for booking
- **Markdown content** in `/content/*.md`, edited directly via the GitHub web UI or locally

## Local development

```bash
npm install
npm run dev
```

Site runs at http://localhost:3000.

## Editing content

All site copy lives in markdown:

- `content/site.md` — homepage sections
- `content/pricing.md` — pricing packages
- `content/testimonials/*.md` — one file per testimonial
- `content/journal/*.md` — one file per journal article
- `content/client-logos/*.md` — one file per client logo

Edit on GitHub (pencil icon, commit) or locally. Vercel auto-deploys within ~30 seconds of a push.

## Environment variables

See `.env.example`. Set the same keys in **Vercel > Project Settings > Environment Variables**:

| Name | Where | Notes |
|---|---|---|
| `POSTMARK_TOKEN` | Server-side | Postmark Server Token. Required for the contact form. |
| `NEXT_PUBLIC_CAL_USERNAME` | Public | Cal.com `username/event-slug`. |
| `NEXT_PUBLIC_WA_NUMBER` | Public | WhatsApp number, no plus, no spaces. |
| `NEXT_PUBLIC_GA_ID` | Public | GA4 measurement ID, e.g. `G-XXXXXXX`. |

## Deploying

Push to `main` and Vercel rebuilds. That is the entire workflow.
