# PRINTZY.SITE: MASTER PROMPT FOR ANTIGRAVITY
(Copy everything below this line into Antigravity as one task. Work phase by phase, commit after each phase.)

---

## ROLE
You are a senior full-stack engineer, technical SEO specialist and conversion copywriter. You are upgrading **https://printzy.site/**, a custom-printed packaging website (paper cups, pizza boxes, food boxes, takeaway sets, paper bags, napkins, cup sleeves and stickers, mailer/gift boxes) for a Pakistani manufacturer. Primary market: Pakistan (cafes, restaurants, bakeries, cloud kitchens, e-commerce). Secondary goal: win **export/international buyers**.

Work inside the existing codebase. Do NOT rebuild from scratch. Preserve existing design language (theme colour #1F4E5F), existing URLs and slugs. If you must change a URL, add a 301 redirect.

## NON-NEGOTIABLE RULES
1. **Never invent business facts.** No made-up MOQs, prices, lead times, certifications, client names, reviews, ratings, addresses, years in business, or "brands served" numbers. Every unknown goes into `src/config/business-facts` (or the project's equivalent), as `null` with a `TODO` comment. The UI must degrade gracefully (hide the line, or show "Contact us for exact details") when a value is `null`. It must never show raw text like `[MOQ: confirm]`.
2. **No fake social proof.** No fabricated testimonials, star ratings, logos or case studies. Build the components (testimonial card, case-study template, logo strip) but render them only when real data exists in the config/content files.
3. **Schema must match visible page content** (Google structured-data policy). Never add markup for content that isn't on the page.
4. **Content must be people-first and original per page**: written for buyers, showing real expertise and clear authorship (Google's "helpful, reliable, people-first content" guidance). No keyword stuffing, no copy-paste blocks repeated across unrelated products.
5. Keep Core Web Vitals healthy: no heavy new libraries; lazy-load below-the-fold images; explicit width/height on images.
6. Do not touch the GTM container ID (GTM-W8JX29CJ). Add events through the dataLayer.
7. After each phase: run build + lint, fix errors, then write a short entry in `AUDIT_LOG.md` (what changed, files touched, anything still blocked on owner input).

---

## PHASE 0: DISCOVERY AND BASELINE (do first, change nothing yet)
1. Detect framework, router, how pages/metadata are generated, where product/industry/blog content lives, and how the sitemap/robots are produced.
2. **Verify things an external crawl could not see**, and report results in `AUDIT_LOG.md`:
   - Does `/robots.txt` exist, is it valid, does it reference the sitemap, does it avoid blocking CSS/JS/images?
   - Does `/sitemap.xml` exist, does it list every canonical indexable URL (home, products, industries, blog posts, policies), with accurate `lastmod`?
   - Which JSON-LD blocks exist per page type (Organization, LocalBusiness, Product, BreadcrumbList, Article, FAQPage)? Are they valid and matching visible content?
   - Is the homepage FAQ section rendering answers in the DOM? (In the crawl, the 7 homepage questions showed with no visible answers. Confirm whether this is a rendering/JS bug.)
   - Are all pages server-rendered or statically generated so crawlers see full content without JS?
   - Lighthouse (mobile) scores for home, one product page, one blog page. Record LCP, CLS, INP.
3. Grep the whole repo and rendered output for every placeholder pattern: `\[.*confirm.*\]`, `\[X-Y`, `\[MOQ`, `\[free /`, `\[couriers`, `\[sample policy`, `\[export terms`, `TODO`, `lorem`. Produce a table: placeholder text, file, page URL.

---

## PHASE 1: CRITICAL FIXES (these hurt trust and conversion right now)

### 1.1 Raw placeholders are live on the public site
These strings were found on the live site and must never be visible to visitors:
- Homepage hero bullets: "MOQ: confirm minimum"; How it Works step 4: "[X-Y working days: confirm]"
- Product pages (cups, mailer boxes, and likely all others): meta description contains `[MOQ: confirm]`; spec table has `[MOQ: 500 pcs confirm]`, `[confirm available sizes]`, `[7-10 working days after proof approval]`; FAQ answers contain `[MOQ: confirm, e.g. 500 or 1,000 pieces]`
- `/faq`: MOQ per category, production time, design fee `[free / nominal design fee: confirm]`, sample policy, `[couriers: confirm]`, `[export terms & shipping arrangements: confirm]`
- `/contact`: payment milestones `[50% advance: confirm]`, `[50% balance: confirm]`
- `/industries/cafes` FAQ: `[MOQ: confirm, e.g. 500 – 1,000 pcs]`
- Blog `/blog/custom-packaging-moq-explained-pakistan`: `[confirm with sales team: estimated 1,000+ units per category]` and related-product cards leaking "MOQ: 500 pcs confirm" strings

**Do this:** create one typed config file holding, per product: `moq`, `leadTimeDays`, `sizes`, `startingPrice` (optional), `materials`. Plus global: `paymentTerms`, `couriers`, `designFeePolicy`, `samplePolicy`, `exportTerms`, `businessHours`, `address`. Every page reads from it. Add a **build-time check** that fails the build if any rendered HTML contains `[` + `confirm`, `TODO` or `lorem`. Where values are `null`, use honest fallback copy ("MOQ depends on product and design. Send your quantity on WhatsApp and we will confirm the best run size").

### 1.2 Broken WhatsApp deep links
Product-page WhatsApp links have a malformed double query string:
`...custom%20packaging.?text=Hi%20Printzy...`
Fix the helper that builds these so there is exactly one `?text=` with the product-specific message, URL-encoded properly. Add a unit test. Check every page including the sticky mobile bar.

### 1.3 Copy-paste template errors
- `/products/custom-mailer-gift-boxes` says "Manufactured with certified food-grade substrates" (wrong for mailers), has the heading "Options Tailored to Your Menu & Budget" and "Trusted by Food Brands" (wrong audience), and calls E-flute corrugated "rigid". Rigid boxes normally means chipboard set-up boxes, so rename to "Corrugated mailer boxes" or add a genuine rigid-box option.
- Audit all 8 product pages for the same template leakage and rewrite section headings and spec subtitles per product.
- `/industries/cafes` states "8oz and 12oz cups account for roughly 80% of cafe orders". This is an unsourced statistic. Remove it, or replace with a defensible statement, or cite a real source.

### 1.4 Unverified claims on the homepage
"500+ Brands served" and "Trusted by Food Brands" have no evidence on the site. Read the owner-approved value from config. If it is `null`, hide the stat. Same for "certified food-grade" and "multi-point quality control": keep only claims the owner confirms, and add a "Compliance and documents" block that lists real documents only (see 2.3).

### 1.5 Internal inconsistencies
- Design support: About says "Free design support" while FAQ shows a design-fee placeholder. Unify via config.
- Footer: About page footer links products to `/quote?product=...` and omits Guides/FAQ/policy links, while other pages link to real product URLs. Use ONE shared header/footer component everywhere, with real product URLs.
- Homepage stat label "Pan-country" → "Nationwide".

---

## PHASE 2: TRUST AND E-E-A-T (biggest gap versus established competitors)
1. **About page rewrite**: who runs Printzy (real name and role, owner-supplied), why it started, production setup (own press or partner presses, stated honestly), city, years operating, what happens from artwork to delivery. Add a "Company details" block: legal/business name, NTN/SECP registration if the owner provides it, address, hours. Use first-person, specific, verifiable language. Avoid generic adjectives.
2. **Contact page**: add physical address (or "Operations based in [city]" if the owner doesn't want a street address), embedded map, hours (the page shows Mon–Sat 9am–6pm for phone only), a contact form with email delivery. Recommend and support a domain email (e.g. sales@printzy.pk or @printzy.com) instead of Gmail. Implement the swap through config.
3. **Compliance and documents page** `/quality-and-compliance`: what food-contact documents exist (only the real ones), ink/board specifications, what is available on request. Link from product pages.
4. **Real proof**: rebuild `/gallery` into a categorized portfolio with captions (product, size, material, finish, industry). Currently the gallery shows the same 6 images as the homepage, and those same 6 files (food, cups, boxes, napkins, bags, press) are reused across every product and industry page. Build a case-study template (`/work/[slug]`: client brief, product, quantity, result, photo) and a testimonial component. Both render only from real data files. Add an "Upload real photos here" README with exact filenames and recommended dimensions.
5. **Authorship**: blog posts are bylined to generic teams ("Printzy Packaging Team"). Add real author profiles (name, role, photo, short bio) with `/authors/[slug]` pages, `datePublished` and `dateModified` visible on each post, and a "Reviewed by" line where applicable.
6. Add a "How we price" explainer and a visible **starting-price range per product** if the owner supplies them (this lifts conversion and also unlocks valid Product/Offer markup).

---

## PHASE 3: CONVERSION AND LEAD CAPTURE
1. **Quote form (`/quote`)** currently only builds a WhatsApp message (button: "Send quote request via WhatsApp"). Upgrade:
   - Server-side submission (API route/serverless function) that emails the owner AND stores the lead (SQLite/JSON/Google Sheet webhook, whichever fits the stack).
   - Add fields: email, city, country (default Pakistan, needed for export leads), required-by date, logo file upload (PNG/JPG/PDF/AI/SVG, size-limited, validated), "Have you printed packaging before?", consent checkbox.
   - Spam protection (honeypot + rate limit or Turnstile).
   - Thank-you page `/quote/thank-you` with next steps and a WhatsApp CTA; fire conversion event.
   - Keep WhatsApp as an alternative path, not the only one.
2. **Sticky mobile CTA bar** (Call / WhatsApp / Quote) exists in some form. Verify on all pages and make sure it never covers the footer or form fields.
3. **Analytics events via GTM dataLayer**: `quote_submit`, `whatsapp_click` (with product), `call_click`, `file_upload`, `sample_request_submit`, `catalog_download`.
4. Add a downloadable **product catalog / spec sheet PDF** (generated from config data) gated by optional email, and a **dieline/size guide** page for pizza boxes, food boxes and cups.
5. Add a "Request a sample" form that actually submits (currently only a link exists in the footer; verify the page works).

---

## PHASE 4: TECHNICAL SEO
1. **robots.txt** and **sitemap.xml**: create or fix. Sitemap auto-generated from routes, absolute URLs, accurate lastmod, excludes thank-you/utility pages. Robots references the sitemap. Submit-ready for Google Search Console and Bing Webmaster.
2. **Metadata**
   - Unique title (≤ 60 chars) and meta description (≤ 155 chars) per page; remove placeholder text from descriptions.
   - Blog posts: `og:type = article`, `article:published_time`, `article:modified_time`. Per-page OG images (generate with a build script: title + product image + brand colour), instead of the single shared `og-image.jpg`.
   - Self-referencing canonical on every page (already present, keep it). Ensure no trailing-slash or www/non-www duplicates; add redirects.
   - Add `hreflang` only if/when real language versions exist (see Phase 5).
3. **Structured data (JSON-LD)**. Keep it accurate and minimal:
   - Sitewide: `Organization` (name, url, logo, contactPoint, sameAs for real profiles only). `LocalBusiness` or the closest subtype with address, phone, hours once the owner supplies an address (name and address are the minimum properties).
   - Every inner page: `BreadcrumbList` matching the visible breadcrumbs.
   - Blog posts: `Article`/`BlogPosting` with real author, dates, image.
   - Product pages: `Product` only works as a rich-result candidate if an `offers`, `review` or `aggregateRating` exists. Add `offers`/`AggregateOffer` ONLY if real starting prices are published on the page. Otherwise use `Product` with name/description/image/brand purely as descriptive markup and do not expect rich results.
   - `FAQPage`: Google ended FAQ rich results in 2026, so it will not produce a SERP feature. Keep the visible FAQ content (it helps users and AI answers). Markup is optional and low priority; do not spend effort on it. Never mark up content that isn't visible.
   - Validate everything with the Rich Results Test and schema.org validator; log results.
4. **Images**: unique, descriptive filenames and alt text per image (not the same alt for reused files); serve WebP/AVIF with `srcset`; lazy-load below the fold; preload the LCP image. Fix the issue that napkins artwork is reused for "Cup Sleeves & Stickers", and the single "food" image is reused for pizza boxes, food boxes and takeaway sets. Use a placeholder system that makes missing real photos obvious in the dev log (not on the live site).
5. **Performance/accessibility**: target Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility/SEO/best-practices. Ensure the accordion FAQs are keyboard accessible and their answers are in the HTML (not injected only after click).
6. **Domain/redirects**: report whether `printzy.site` has HTTPS redirect, a single canonical host, and security headers. (Owner note: a `.pk` or `.com` domain typically carries more buyer trust than `.site`. Do not migrate; just add a `docs/DOMAIN_MIGRATION.md` with a safe 301 plan.)
7. Add a custom **404 page** with search/product links, and a `/products` index that has real content (intro text, comparison table, filters), not just cards.

---

## PHASE 5: CONTENT EXPANSION (missing pages that capture search demand)
Write all copy in clear, specific, buyer-oriented English with natural Pakistani-market terminology (chai karak, cloud kitchen, takeaway, etc.). Each page: unique H1, 600–1,000 words where the topic warrants, real specs from config, FAQ, internal links, CTA. Where facts are missing, leave clearly-marked TODO blocks in the content files, never in the rendered output.

**5.1 City landing pages** (genuinely useful, not doorway spam): `/custom-packaging-lahore`, `/custom-packaging-karachi`, `/custom-packaging-islamabad`, `/custom-packaging-faisalabad`. Each must include real delivery times to that city (from config), typical local business types, and a CTA. If you can't make each materially different and helpful, create only the ones the owner has real delivery data for.

**5.2 Product-detail depth**: for each of the 8 products add a size/spec table, material options, finishing options, dieline/size chart, typical use cases, an "order checklist", and 4–6 product-specific FAQs.

**5.3 Missing product categories to evaluate with the owner** (add pages only if Printzy actually produces them): paper cup lids, burger wrap/butter paper, fries boxes, cake/bakery boxes (separate page), tissue paper and sticker seals, shopping/gift bags with ribbon handles, printed tape.

**5.4 Export / international page** `/export-custom-packaging` (important for the owner's lead goal):
- Who it's for (importers, distributors, cafes and chains abroad, Amazon/Shopify brands).
- MOQ for export, lead time, sample process (courier sample kit), payment terms (T/T, L/C if offered), Incoterms offered (EXW/FOB/CIF/DDP, only the real ones), shipping methods and ports, packing/palletization, documents provided (commercial invoice, packing list, certificate of origin, food-contact documents if real).
- Why Pakistan-made packaging is cost-competitive (stated factually, no fabricated numbers).
- RFQ form with country, destination port, incoterm, target price, quantity, timeline. Route leads to a separate tag/email.
- Add an international-friendly quote path (USD ranges only if the owner supplies them).

**5.5 Blog expansion** (topic clusters, each 1,200+ words, bylined, dated, with internal links to product pages):
- "How much do custom paper cups cost in Pakistan?" (use only owner-supplied ranges, otherwise explain cost drivers)
- "Paper cup sizes and lid compatibility guide"
- "Pizza box size chart for Pakistan (7, 9, 12, 14, 16 inch)"
- "Food-grade packaging: what to ask your supplier for"
- "Packaging for cloud kitchens: delivery-proof setup"
- "Kraft vs white board: which to choose"
- "How to order custom packaging for a new cafe, step by step"
- "Importing custom packaging from Pakistan: a buyer's guide" (supports the export goal)
Add category and tag pages, "related articles" blocks, a table of contents component, and update `dateModified` honestly when content changes.

**5.6 Roman Urdu / Urdu support**: add an Urdu or Roman Urdu quick-guide block on the homepage, quote page and FAQ ("Cup ki price kya hai?", "Minimum order kitna hai?", "Mockup kaise milta hai?"). One product-page FAQ already uses Roman Urdu; extend this pattern. Only add full `/ur/` pages with `hreflang` if the owner approves translation; otherwise keep it as on-page blocks.

**5.7 Utility pages**: `/pricing-guide` (how pricing works; ranges only if supplied), `/artwork-guide` (verify it exists and is complete: file formats, bleed, safe area, CMYK/Pantone, dieline downloads), `/shipping-and-delivery`, `/payment-terms` (move the contact-page terms here, link from footer), `/careers` is NOT needed.

---

## PHASE 6: NAVIGATION AND INTERNAL LINKING
- One shared header and footer component site-wide (see 1.5). Add FAQ, Request a Sample, Artwork Guide, Export, Quality & Compliance to the footer on every page.
- Product pages: add "Related guides" (blog) and "Used by" (industry pages). Blog posts: add "Related products" with real MOQ/lead time from config (this is where the placeholder leak happened).
- Industry pages: link to the exact matching products and to relevant blog guides; keep each industry page's copy unique (check for template repetition).
- Add breadcrumbs everywhere with matching BreadcrumbList.
- Run a link checker: zero broken internal links, zero redirect chains, no orphan pages.

---

## PHASE 7: QA AND REPORT
1. Automated checks (add as `npm run audit` or equivalent): placeholder scan, broken links, missing alt text, duplicate titles/descriptions, sitemap vs routes diff, JSON-LD validation, Lighthouse CI on 5 key pages.
2. Manual checks: test quote form end-to-end (email received, lead stored, file upload works, thank-you event fires), test every WhatsApp button, test mobile layouts at 360px and 390px widths.
3. Produce these files in the repo root:
   - `AUDIT_LOG.md`: phase-by-phase changes
   - `OWNER_TODO.md`: **every fact only the owner can provide** (see list below), each with the exact config key it fills
   - `SEO_LAUNCH_CHECKLIST.md`: Search Console + Bing verification, sitemap submission, Google Business Profile setup, first-30-days monitoring plan, KPIs (impressions, clicks, quote submits, WhatsApp clicks)

### OWNER_TODO.md must list at minimum
- MOQ per product (cups, pizza boxes, food boxes, takeaway sets, bags, napkins, sleeves/stickers, mailer boxes)
- Production lead time per product and typical courier time per city
- Available sizes per product
- Starting prices or price ranges per product (optional but strongly recommended)
- Payment terms (advance %, methods, export terms)
- Courier partners
- Design fee policy and sample policy (is the sample fee credited to the bulk order?)
- Export terms: MOQ, Incoterms, ports, payment methods, documents available
- Real address, hours, registration numbers, domain email
- Real food-safety/compliance documents
- Real product photos (minimum 5 per category), real client logos/testimonials with permission, real "brands served" count
- Names, roles, photos and bios of the people behind Printzy
- Real social profiles (Instagram, Facebook, LinkedIn) for `sameAs`

---

## ACCEPTANCE CRITERIA (Definition of Done)
- [ ] Zero visible placeholder strings anywhere (build fails if any appear)
- [ ] All WhatsApp links valid with a single `?text=` parameter
- [ ] Quote form submits server-side, stores the lead, and sends an email, with a thank-you page and tracked events
- [ ] robots.txt and sitemap.xml valid and consistent with routes
- [ ] Valid JSON-LD on every template, matching visible content
- [ ] Unique, accurate title/description/H1 per page; per-page OG images
- [ ] No unsourced statistics or unverifiable claims on any page
- [ ] Export page, pricing guide, and ≥ 8 additional guides published (or drafted as ready-to-publish content files where owner input is missing)
- [ ] Shared header/footer; no orphan pages; no broken links
- [ ] Lighthouse mobile: performance ≥ 90; accessibility, SEO and best-practices ≥ 95 on home, product, blog and quote pages
- [ ] `AUDIT_LOG.md`, `OWNER_TODO.md`, `SEO_LAUNCH_CHECKLIST.md` delivered

Begin with Phase 0 now. Report findings, then proceed phase by phase without stopping, unless a decision truly requires owner input. In that case, add it to `OWNER_TODO.md`, use the safe fallback, and keep going.
