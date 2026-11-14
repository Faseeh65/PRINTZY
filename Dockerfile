FROM oven/bun:1.3.14 AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

ARG VITE_APP_ENV=production
ARG VITE_SITE_URL=https://printzy.site
ARG VITE_TURNSTILE_SITE_KEY
ARG VITE_ANALYTICS_ENABLED=true
ARG VITE_GTM_ID=GTM-W8JX29CJ

ENV NITRO_PRESET=node-server \
    VITE_APP_ENV=${VITE_APP_ENV} \
    VITE_SITE_URL=${VITE_SITE_URL} \
    VITE_TURNSTILE_SITE_KEY=${VITE_TURNSTILE_SITE_KEY} \
    VITE_ANALYTICS_ENABLED=${VITE_ANALYTICS_ENABLED} \
    VITE_GTM_ID=${VITE_GTM_ID}

RUN bun run build

FROM node:24-alpine AS runtime

ENV NODE_ENV=production \
    NITRO_HOST=0.0.0.0 \
    NITRO_PORT=3000

WORKDIR /app
COPY --from=build --chown=node:node /app/.output/ ./.output/

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/healthz').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
