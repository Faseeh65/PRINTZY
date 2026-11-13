# Domain migration plan

This is a preparation plan only. Keep `printzy.site` as the production domain unless the owner chooses and controls a replacement domain.

## Before changing domains

1. Confirm ownership, DNS access, HTTPS support, and email impact for the replacement domain.
2. Export the current route list, metadata, sitemap, redirects, analytics configuration, and Search Console/Bing properties.
3. Keep every existing path and slug where possible. Prepare a one-to-one redirect map for any path that must change.
4. Lower DNS TTL in advance and verify the replacement host and TLS certificate before switching.
5. Update the canonical site URL, sitemap, robots sitemap reference, Open Graph URLs, and any environment variables in one release.

## Cutover

1. Point the replacement domain to the production host and verify HTTPS.
2. Redirect each old URL directly to its matching new URL with a permanent 301. Avoid redirect chains and do not redirect all old URLs to the homepage.
3. Keep the old domain and redirects active for at least one year; retain it longer if it continues to receive traffic or links.
4. Submit the new sitemap and verify representative URLs in Search Console and Bing Webmaster Tools.
5. Monitor crawl errors, canonical selection, traffic, quote submissions, and WhatsApp clicks during the first month.

Do not rewrite published Git history during this work. Changes pushed to the Lovable-connected branch synchronize to the editor.
