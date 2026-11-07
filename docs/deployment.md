# Production deployment and scaling

## Cloudflare Workers (recommended)

This project builds with Nitro's Cloudflare module preset. Cloudflare Workers
provides globally distributed ingress and autoscaling; Smart Placement is enabled
in [`wrangler.jsonc`](../wrangler.jsonc). Deploy from the repository root with:

```sh
npm ci
npm run deploy:cloudflare
```

Authenticate Wrangler first (`npx wrangler login`) and ensure the account selected
by Wrangler is the intended Cloudflare account. The command builds the Worker and
its static assets before deploying them.

The two rate-limit bindings are edge-local approximate limits: 60 general requests
or 5 sensitive requests per client IP per minute, per Cloudflare location. This
avoids process-local counters and works across Worker instances, but is not a
globally exact counter. Replace the sample positive-integer `namespace_id` values
with IDs unique in your Cloudflare account before deployment. The health endpoint
is exempt from limiting.

Hashed Vite files under `/assets/` receive one-year immutable caching. The static
asset `_headers` file applies that policy when Cloudflare serves files without
running the Worker. SSR HTML is returned with `max-age=0`, a 60-second shared-cache
freshness window, and stale-while-revalidate; error and health responses are
`no-store`. If you enable a Cloudflare Cache Rule for SSR HTML, cache only public
pages and include the full query string in the cache key (quote pages use the
`product` query parameter).

`GET /healthz` and `HEAD /healthz` are liveness checks and return no-store
responses. They deliberately do not test Supabase: the app currently has no
runtime database connection. Use the Worker deployment's own health/availability
signals for platform readiness until a database dependency is actually added.

## SEO and canonical host

TanStack Start server-renders each public route, including its route-specific title,
description, canonical URL, Open Graph/Twitter tags, and structured data. Keep
`VITE_SITE_URL` set to the preferred HTTPS origin (currently
`https://printzy.site`) in each deployment environment, and set `VITE_APP_ENV=production`
for production builds. The Worker permanently redirects the legacy `printzy.pk` host,
`www` aliases, and HTTP requests on known Printzy domains to that canonical origin. Update
[`public/sitemap.xml`](../public/sitemap.xml) and
[`public/robots.txt`](../public/robots.txt) whenever public routes change; keep
administrative and private paths disallowed in robots.

## Neon Postgres connection pooling and Cloudflare secrets

Printzy uses **Neon Lakebase Postgres** via `@neondatabase/serverless` for server-side persistence of quote requests.

### 1. Variables and Secrets Classification

- **Public Build-Time Variables (`VITE_*`)**:
  These are inlined into client JavaScript bundles at compile time. Never put database credentials or API secrets here!
  - `VITE_SITE_URL`: `https://printzy.site`
  - `VITE_APP_ENV`: `production` (or `staging`)
  - `VITE_TURNSTILE_SITE_KEY`: Public Turnstile sitekey
  - `VITE_ANALYTICS_ENABLED`: `true`
  - `VITE_GTM_ID`: `GTM-W8JX29CJ`

- **Runtime Worker Secrets (Server-Only)**:
  These are read exclusively on the server at runtime and are never sent to the browser:
  - `DATABASE_URL_POOLED`: Neon pooled connection string (prioritized by server)
  - `DATABASE_URL`: Neon direct connection string (optional fallback)
  - `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile secret key for server-side verification

### 2. How to Add Worker Secrets

1. **Via Cloudflare Dashboard**:
   Navigate to **Workers & Pages → printzy → Settings → Variables and Secrets → Add Secret**:
   - Add `DATABASE_URL_POOLED` with your pooled connection string (`...-pooler...neondb?sslmode=require`).
   - Add `TURNSTILE_SECRET_KEY` with your Turnstile secret key.

2. **Via Wrangler CLI**:
   ```sh
   npx wrangler secret put DATABASE_URL_POOLED
   npx wrangler secret put TURNSTILE_SECRET_KEY
   ```

### 3. Credential Rotation Procedure

1. In the Neon Console, navigate to **Project Settings → Roles & Databases**, and create a new role or reset the password for an auxiliary role.
2. Update the secret in Cloudflare via `npx wrangler secret put DATABASE_URL_POOLED` (or the Cloudflare Dashboard).
3. Cloudflare Workers will automatically distribute the new secret to new worker instances with zero downtime.
4. Verify by submitting a test quote request on `https://printzy.site/quote`.
5. Once verified, revoke the old password or delete the deprecated role in the Neon Console.

## Optional VPS or Docker path

[`Dockerfile`](../Dockerfile) builds Nitro with the `node-server` preset and runs
the generated Node server as an unprivileged user on port 3000. Build and run:

```sh
docker build -t printzy .
docker run --rm -p 3000:3000 printzy
```

Put a load balancer or TLS-terminating reverse proxy in front of several app
replicas. [`deploy/nginx.conf`](../deploy/nginx.conf) is a minimal HTTP reverse
proxy example; terminate TLS at Nginx or at the external load balancer, and use a
service-discovery/VIP address for `app:3000` when running multiple replicas.
Stock Nginx resolves the sample upstream at startup, so reload it or use an
orchestrator-provided stable service address when the replica set changes. Configure
the upstream health check to call `GET /healthz`, and make
[`deploy/50x.html`](../deploy/50x.html) available at
`/usr/share/nginx/html/50x.html` in the Nginx container for its 502/503/504 page.

Keep the application stateless between requests. Put shared mutable state in a
managed service (for example Supabase/Postgres or Redis), not in Node process
memory. Configure database pool limits for the total replica count and use the
Supavisor pooler for short-lived database clients. Preserve the one-year immutable
policy only for content-hashed files; keep HTML short-lived and errors uncached.
