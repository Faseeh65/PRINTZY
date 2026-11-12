# Printzy.site — Comprehensive SEO & Content Implementation Plan

This roadmap translates the recommendations from `printzy-seo-content-and-antigravity-prompts.md` into clean, testable, phased milestones obeying all project rules.

---

## Phase 1: Product Route Architecture & Indexable URLs (Prompt 2)
1. **Dynamic Product Route (`/products/$slug`):**
   - Implement route `src/routes/products.$slug.tsx` using TanStack Router.
   - Comprehensive structured data: `Product` schema (title, description, brand, offer, without falsified ratings) and `BreadcrumbList`.
   - Complete page layout: H1, intro narrative, structured technical specifications table, print options explanation, target industries, pricing logic guide, 4-step ordering workflow, product-specific FAQs, related products, and sticky conversion CTA.
2. **Product Data Model Extension (`src/data/products.ts`):**
   - Expand product models to cover all 8 core packaging categories:
     1. `custom-paper-cups`
     2. `custom-pizza-boxes`
     3. `custom-food-boxes`
     4. `custom-takeaway-packaging`
     5. `custom-paper-bags`
     6. `custom-napkins-tissues`
     7. `cup-sleeves-stickers`
     8. `custom-mailer-gift-boxes`
   - Maintain backward compatibility: support legacy short slugs (`cups`, `boxes`, `food`, etc.) with seamless 301 redirects to canonical product routes.
3. **Internal Linking Updates:**
   - Update cards on Homepage (`src/components/site/sections.tsx`), Products Hub (`src/routes/products.tsx`), and Navigation menus so cards link to `/products/[slug]`.
   - Preserve `/quote?product=[slug]` strictly for pre-filling the quote form upon clicking "Get Quote".

---

## Phase 2: Homepage & About Page Overhaul (Prompt 3)
1. **Homepage Narrative & Trust Enhancement:**
   - Implement verified hero copy, clear value propositions, and "One supplier for the whole customer journey" positioning.
   - **Fix StatCounter SSR Bug:** Ensure initial server-rendered HTML contains the actual stat value (`500+`, `24h`) rather than `0+` before hydration.
   - Add a dynamic, safe `Proof` component that renders genuine verified reviews and client logos, or cleanly hides if unverified, preventing fake reviews.
2. **About Page Expansion (`src/routes/about.tsx`):**
   - Expand from ~70 words to 350+ words of structured, authentic copy detailing Printzy's printing standards, quality control checkpoints, and team narrative.
   - Add transparent placeholder blocks for factory location, hours, and leadership.

---

## Phase 3: Dedicated FAQ, Policies & Commercial Trust (Prompt 4)
1. **Dedicated `/faq` Route:**
   - Create `src/routes/faq.tsx` featuring the 12 comprehensive commercial Q&A items from Section 5.5.
   - Guarantee 100% crawlability in SSR HTML using accessible native `<details>` elements or always-rendered HTML markup with `FAQPage` JSON-LD.
2. **Commercial Trust Pages:**
   - Create `/return-and-reprint-policy` explaining reprint guarantees, sample inspection terms, and defect claims.
   - Create `/request-sample` outlining free digital mockup versus physical sample procedures.
   - Create `/artwork-guide` detailing file preparation (vector AI/PDF/EPS vs raster PNG/JPG, 300 DPI, bleed margins, CMYK).

---

## Phase 4: Industry & City Landing Pages (Prompt 5)
1. **Industry Hubs (`/industries/$slug`):**
   - Dedicated landing pages for Cafes & Coffee Shops, Restaurants & Food Chains, Bakeries, Cloud Kitchens, and E-commerce.
2. **City Landing Pages (`/cities/$slug`):**
   - High-intent landing pages for primary delivery hubs: Lahore, Karachi, Islamabad, and Faisalabad.
   - Distinct regional logistics details, turnaround estimates, and local packaging needs.

---

## Phase 5: Technical SEO, Sitemap & Analytics Verification (Prompt 7 & 8)
1. **Dynamic Sitemap (`public/sitemap.xml`):**
   - Expand sitemap to index all products, trust policies, and FAQ pages with proper priorities.
2. **Robots & Canonical Integrity:**
   - Validate canonical URLs, Open Graph images, Twitter cards, and breadcrumbs.
3. **Verification & Regression Testing:**
   - `bunx tsc --noEmit` (0 errors).
   - `bun run test` (all unit and SEO tests pass).
   - `bun run build` + `npx wrangler deploy --dry-run`.

