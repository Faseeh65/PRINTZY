# Printzy — Cloudflare Production Deployment Guide

## 1. Overview & Chosen Target
Printzy is configured as a **Cloudflare Worker** using Nitro's `cloudflare-module` preset with **Workers + Assets**.
The application runs full SSR (Server-Side Rendering) powered by TanStack Start, connects to Neon Lakebase Postgres via `@neondatabase/serverless`, and verifies user requests with Cloudflare Turnstile.

---

## 2. Cloudflare Worker Configuration

* **Project Type**: Cloudflare Worker (Module format)
* **Configuration File**: Root `wrangler.jsonc` (compiled by Nitro into `.output/server/wrangler.json`)
* **Build Command**: `npm run build`
* **Deploy Command**: `npm run deploy:cloudflare` (runs `npx wrangler deploy`)
* **Output Artifacts**:
  * Server Entrypoint: `.output/server/index.mjs`
  * Static Assets Directory: `.output/public`
* **Compatibility Settings**:
  * Compatibility Date: `2026-10-10`
  * Compatibility Flags: `["nodejs_compat"]`
* **Rate Limiting Bindings**:
  * `RATE_LIMIT_GENERAL`: 60 requests per 60 seconds
  * `RATE_LIMIT_SENSITIVE`: 5 requests per 60 seconds (for `/quote` submissions)

---

## 3. Environment Variables & Secrets Classification

### A. Build-Time Variables (Set in Cloudflare Build / CI)
These variables are prefixed with `VITE_` and are inlined into the client bundle at compile time:
* `VITE_APP_ENV`: `production` (or `staging`)
* `VITE_SITE_URL`: `https://printzy.site`
* `VITE_TURNSTILE_SITE_KEY`: Cloudflare Turnstile Site Key (public)
* `VITE_ANALYTICS_ENABLED`: `true`
* `VITE_GTM_ID`: `GTM-W8JX29CJ`
* `VITE_SENTRY_DSN`: Sentry DSN (optional)

### B. Runtime Secrets (Cloudflare Dashboard Only)
> **CRITICAL SECURITY REQUIREMENT**: Never commit secrets to source control or embed them in `.env`. Add these exclusively in the Cloudflare Dashboard under **Workers & Pages > printzy > Settings > Variables and Secrets**:
* `DATABASE_URL_POOLED`: Neon Postgres pooled connection string (contains `...-pooler...neondb?sslmode=require`)
* `DATABASE_URL`: Neon Postgres direct connection string (optional fallback)
* `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile Secret Key (server verification)

---

## 4. Local Development Runtime

Local emulation uses Wrangler Worker mode:
```bash
# Build the production artifacts
npm run build

# Start local Worker server on port 8788
npx wrangler dev --port 8788
```
Local secrets live exclusively in `.env.local` (which is in `.gitignore` and never committed).

---

## 5. Manual Domain & DNS Steps

1. In Cloudflare Dashboard, navigate to **Workers & Pages** > **printzy**.
2. Go to **Settings** > **Domains & Routes** > **Custom Domains**.
3. Click **Add Custom Domain** and enter:
   * `printzy.pk`
   * `www.printzy.pk` (redirects canonically to apex domain via server handler)
4. Confirm DNS records are automatically managed by Cloudflare.
5. In **SSL/TLS Settings**, ensure encryption mode is set to **Full (strict)**.
6. Under **Security > WAF**, verify that standard DDoS and Bot Fight modes do not block Turnstile or assets.

