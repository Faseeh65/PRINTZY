import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { initSentry, captureException } from "../lib/sentry";
import { trackPageView } from "../lib/analytics";
import { trackGtmPageView } from "../lib/gtm";
import { getEnvConfig } from "../lib/env";
import { logger } from "../lib/logger";
import { site } from "@/data/site";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { TopBar, Navbar, Footer, FloatingActions } from "@/components/site/Layout";
import { ErrorBoundary, DefaultErrorFallback } from "@/components/site/ErrorBoundary";

const siteUrl = site.url.replace(/\/$/, "");

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="max-w-lg text-center">
        <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
          Error 404
        </span>
        <h1 className="mt-4 text-6xl font-bold text-foreground">Page Not Found</h1>
        <p className="mt-3 text-base text-muted-foreground">
          The packaging page or resource you are looking for does not exist or may have been updated.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-left shadow-soft">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Explore Popular Packaging
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {products.slice(0, 6).map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground"
              >
                &bull; {p.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" shimmer>
            <Link to="/products">Browse All Products</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  useEffect(() => {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error("[RouterErrorComponent]", err);
    captureException(err, { boundary: "tanstack_root_error_component" });
    reportLovableError(err, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const handleReset = () => {
    router.invalidate();
    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <DefaultErrorFallback
        error={error instanceof Error ? error : new Error(String(error))}
        reset={handleReset}
      />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Printzy" },
      { name: "theme-color", content: "#1F4E5F" },
      { title: "Printzy | Custom Printed Packaging" },
      {
        name: "description",
        content: "Custom printed packaging for brands, food chains and retailers across Pakistan.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "font",
        href: "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        href: "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: site.name,
              description: site.about,
              url: siteUrl,
              logo: `${siteUrl}/images/logo.jpeg`,
              email: site.email,
              telephone: site.phoneIntl,
              areaServed: {
                "@type": "Country",
                name: "Pakistan",
              },
              sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
            },
            {
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              name: site.name,
              url: siteUrl,
              publisher: { "@id": `${siteUrl}/#organization` },
              inLanguage: "en-PK",
            },
            {
              "@type": "LocalBusiness",
              "@id": `${siteUrl}/#localbusiness`,
              name: site.name,
              description: site.about,
              url: siteUrl,
              telephone: site.phoneDisplay,
              priceRange: "$$",
              image: `${siteUrl}/images/logo.jpeg`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lahore",
                addressCountry: "PK",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "09:00",
                  closes: "18:00",
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const env = getEnvConfig();
  const gtmId = env.gtmId;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {gtmId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    initSentry();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      trackPageView(window.location.pathname);
      trackGtmPageView(window.location.pathname);
    }
  }, [router.state.location.pathname]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-navy focus:text-white focus:px-5 focus:py-3 focus:font-semibold focus:shadow-xl focus:ring-4 focus:ring-teal focus:outline-none"
        >
          Skip to main content
        </a>
        <TopBar />
        <Navbar />
        <div id="main" aria-hidden="true" />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <Outlet />
        </main>
        <Footer />
        <FloatingActions />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
