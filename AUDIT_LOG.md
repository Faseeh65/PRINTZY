# Printzy Site Audit Log

## Phase 0 — discovery and baseline

**Date:** 2026-11-13

- Framework: TanStack Start with TanStack Router, React, TypeScript, Vite, and Neon Postgres. Route modules live in `src/routes`; shared layout and conversion sections live in `src/components/site`.
- Page metadata and canonical URLs are generated through `src/lib/seo.ts`. Product, industry, city, blog, FAQ, image, and business-fact content live under `src/data` and `src/config`.
- `public/robots.txt` exists, allows general crawling, disallows selected private paths, and references the sitemap. It does not disallow static assets.
- `public/sitemap.xml` exists and lists the homepage and many content routes. It has no `lastmod` values; route completeness and date accuracy still need a route-by-route comparison.
- JSON-LD exists for sitewide organization data and selected FAQ/product/city/industry routes. Product pages previously emitted an `AggregateOffer` without a price; that offer was removed because no verified price is configured. A full route-by-route schema/content validation remains outstanding.
- Homepage FAQs use native `<details>` elements, so answers are present in the DOM without an accordion click.
- TanStack Start provides server rendering, but crawler-visible rendered output was not independently verified in this audit.
- The configured web search tool could not fetch `printzy.site`, so the live crawl, redirect/header checks, and live markup comparison remain unverified. Lighthouse mobile metrics were not collected; Lighthouse CI is not configured in `package.json`.
- Source inspection found visible bracketed placeholders in FAQ, About, contact, sample, city, and blog content, plus unverified marketing claims. These are being replaced with honest fallbacks. Remaining broad content-claim review is ongoing.

## Phase 1 — critical trust, content, and conversion fixes

- Replaced placeholder MOQ, lead-time, payment, sample, food-contact, delivery, and export copy with quote-dependent fallback wording in FAQ, contact, About, request-sample, city, and blog content.
- Removed the unverified homepage “500+ brands served” statistic and corrected “Pan-country” to “Nationwide”.
- Removed unverified founder quotation and street-address/map placeholders from About. The page now uses the configured Lahore base and asks visitors to contact the team before a visit.
- Removed the unsupported `AggregateOffer` from product JSON-LD while prices remain unknown.
- Replaced the generic product-page “certified” statement and food-brand trust headline with product-specific neutral copy. Replaced “Low MOQ” with a factual quote-dependent description.
- Updated site-wide WhatsApp links to use `buildWhatsAppUrl`; quote submission also uses that helper, preserving one encoded `?text=` parameter. Existing tests already cover the helper.
- Added mobile safe-area padding and bottom-content clearance for the fixed mobile CTA bar.
- Persisted UI UX Pro Max guidance in `design-system/printzy/MASTER.md`, reconciled with the required Printzy palette, font stack, and existing interface style.
- Added a post-build scan of compiled output for visible confirmation placeholders and lorem ipsum.
- Added materials/documentation, export inquiry, pricing, shipping, and payment information pages with conservative copy, linked from the shared footer and added to the XML sitemap.
- Added a domain migration plan that preserves existing slugs and calls for direct 301 redirects if the owner later chooses a new domain.
- Local SSR checks returned HTTP 200 for the new buyer-information pages; each included an H1 and no checked placeholder markers.
- XML parsing passed for the sitemap (44 URLs). The new pages and placeholder audit script passed focused ESLint with the repo-wide Prettier rule disabled.
- Local SSR check of `/faq` returned HTTP 200; FAQ answers and native `<details>` markup were present in the response, with no `[MOQ: confirm]` text.
- `npm.cmd run build` passed, including the post-build placeholder scan. `git diff --check` passed.
- Focused tests for business facts/WhatsApp URLs and site config passed: 8 tests across 2 files.
- `npm.cmd run lint` is not clean: ESLint reports 503 issues across the repository, including files under `.agents/skills`. Focused lint on the new pages and placeholder audit passes. Focused lint on edited legacy files also reports existing `any` usages and formatting violations; those files were not broadly reformatted as part of this change.

### Still outstanding

- Confirm all owner-only facts listed in `OWNER_TODO.md`.
- Finish remaining content and template claim review, including shared CTAs, product/industry data, and the sample flow.
- Implement or verify server-side quote email delivery, file upload, thank-you flow, and complete analytics events.
- Add/verify the quality and compliance, pricing, shipping, payment terms, export, author, and other requested pages only when their factual prerequisites are met.
- Generate and compare the sitemap against all canonical indexable routes; add accurate `lastmod` values.
- Validate all JSON-LD, metadata, image dimensions/alt text, internal links, redirect behavior, headers, and Core Web Vitals.
- Re-run lint after the existing formatting/type lint backlog is resolved.
- Grafify, Serena, and 21st.dev are not available as callable MCP tools in this session; UI UX Pro Max was available and used.

## Follow-up — owner facts and motion polish

- Applied the owner-provided Lahore base, Faizan Ali / Owner profile, 50/50 payment split, and 1–2 hour business-hours WhatsApp response target to the business-facts config and relevant pages. `OWNER_TODO.md` now separates those confirmed values from remaining questions.
- Added a staggered reveal and short icon-settle animation to the homepage customer-journey cards. Reveal animations now degrade to visible content without JavaScript or `IntersectionObserver`, reveal focused content immediately, and respect reduced-motion settings.
