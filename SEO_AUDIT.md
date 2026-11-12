# Printzy.site — Comprehensive SEO & Content Audit

**Date:** 10 November 2026  
**Audited Domain:** `https://printzy.site` (`en-PK`)  
**Auditor Framework:** Technical SEO + Conversion Architecture + E-E-A-T Compliance

---

## 1. Route & Rendering Inventory

| Route | File Path | Rendering Mode | Crawler Status & Indexability |
|---|---|---|---|
| `/` | `src/routes/index.tsx` | SSR (Cloudflare Worker) | HTML present; `<title>` and `<meta description>` intact; **Issue: StatCounter SSR renders "0+ Brands / 0h"** |
| `/products` | `src/routes/products.tsx` | SSR | Hub page only; **Issue: Cards point to `/quote?product=...` rather than indexable product URLs** |
| `/about` | `src/routes/about.tsx` | SSR | HTML present; **Issue: Extremely thin copy (~70 words); lacks address, factory, and team verification** |
| `/contact` | `src/routes/contact.tsx` | SSR | Contact channels present; **Issue: Missing physical address, map, and business entity info** |
| `/how-it-works` | `src/routes/how-it-works.tsx` | SSR | Basic 4-step workflow |
| `/industries` | `src/routes/industries.tsx` | SSR | Hub page only; no sub-pages for cafes, bakeries, or cloud kitchens |
| `/gallery` | `src/routes/gallery.tsx` | SSR | Portfolio imagery present |
| `/quote` | `src/routes/quote.tsx` | SSR / Client Interactive | Form page; pre-selects via search query params |
| `/privacy` | `src/routes/privacy.tsx` | SSR | Standard privacy terms |
| `/terms` | `src/routes/terms.tsx` | SSR | Standard service terms |
| `/products/[slug]` | *MISSING* | *None* | **CRITICAL: Zero individual product pages exist on the website** |
| `/faq` | *MISSING* | *None* | **HIGH: FAQ only exists on homepage; answers risk being omitted in collapsed accordion** |
| `/cities/[slug]` | *MISSING* | *None* | **HIGH: Zero city-specific landing pages (Lahore, Karachi, Islamabad)** |
| `/artwork-guide` | *MISSING* | *None* | **MEDIUM: No artwork prep or vector requirements page** |
| `/request-sample` | *MISSING* | *None* | **MEDIUM: No sample request policy or landing page** |
| `/return-and-reprint-policy` | *MISSING* | *None* | **HIGH: Essential commercial trust & risk-reduction page is missing** |

---

## 2. Issues Ranked by Impact

### Level 1: Critical (Directly Blocks Rankings & Organic Traffic)
1. **Zero Indexable Product URLs (`/products/[slug]`):**
   - Currently, cards across the homepage, products hub, and footer link directly to `/quote?product=cups` or `/quote?product=boxes`.
   - Google cannot rank Printzy for high-volume commercial keywords like *"custom paper cups Pakistan"*, *"custom pizza boxes with logo"*, or *"printed kraft boxes Lahore"* because no dedicated URL exists to target these queries.
2. **Reused Product Photography Across Distinct Categories:**
   - The same food image is used for both `Pizza & Food Boxes` and `Takeaway Packaging`.
   - The same napkin photo is used for both `Tissues & Napkins` and `Sleeves & Stickers`.
   - The same shipping box photo is used for both `Custom Boxes` and `Other Custom Packaging`.
   - This diminishes user trust, damages E-E-A-T, and appears generic/template-made.

### Level 2: High (Hurts Trust, E-E-A-T, and Conversion Rate)
3. **StatCounter SSR Zero Bug:**
   - In `src/components/site/primitives.tsx`, `StatCounter` initializes state with `useState(0)`.
   - In SSR HTML returned to search engine crawlers and slow mobile connections, the site visibly states **"0+ Brands served"** and **"0h Quote turnaround"**.
4. **Thin Copy on About Page (~70 words):**
   - About page lacks company founding story, years in business, print technology (offset/flexo/UV/digital), physical location, and leadership.
5. **No Commercial Risk-Reduction Policies:**
   - Buyers ordering custom packaging in Pakistan require clear reprint, refund, and physical sample policies before placing orders.
6. **No Dedicated FAQ Page:**
   - FAQs only exist as an accordion component on the homepage with 7 basic questions.
   - Accordion content closed by default risks being deprioritized or missed by web crawlers compared to semantic server-rendered HTML.

### Level 3: Medium (Missed Geographic & Informational Intent)
7. **No Location Signals or City Pages:**
   - Packaging is inherently location-sensitive due to shipping speed and freight costs.
   - Competitors dominate city searches (Lahore, Karachi, Islamabad) with tailored landing pages showing delivery times and regional clients.
8. **Minimal XML Sitemap:**
   - `public/sitemap.xml` only indexes 10 basic routes, missing all commercial product categories.
9. **No Educational or Artwork Preparation Content:**
   - Missing artwork submission guidelines (vector vs raster, bleed, CMYK vs RGB) results in repeated customer support friction.

---

## 3. SEO Action Checklist

- [ ] Implement dynamic routing for `/products/$slug` with comprehensive schema (`Product`, `BreadcrumbList`).
- [ ] Implement data-driven product definitions with specs tables, MOQ, materials, and product-specific FAQs.
- [ ] Fix `StatCounter` to render the genuine static number directly in SSR HTML before hydrating.
- [ ] Create `/faq` page containing all 12 complete, indexable Q&A pairs with `FAQPage` JSON-LD.
- [ ] Create trust pages: `/return-and-reprint-policy`, `/artwork-guide`, and `/request-sample`.
- [ ] Rewrite homepage and About page with transparent claims, owner info, and placeholder tags for unverified facts.
- [ ] Expand `sitemap.xml` to include all new indexable URLs.

