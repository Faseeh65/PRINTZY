import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  MapPin,
  Clock,
  Truck,
  CheckCircle2,
  Package,
  ArrowRight,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { seo } from "@/lib/seo";
import { cityDetails, CityDetail } from "@/data/city-details";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const Route = createFileRoute("/cities/$slug")({
  loader: ({ params }) => {
    const city = cityDetails[params.slug];
    if (!city) {
      throw notFound();
    }
    return { city };
  },
  head: ({ loaderData }) => {
    const data = loaderData as { city: CityDetail } | undefined;
    if (!data?.city) {
      return seo({
        title: "City Packaging Services | Printzy",
        description: "Custom packaging delivery across Pakistan.",
        path: "/",
      });
    }
    const { city } = data;
    return seo({
      title: city.metaTitle,
      description: city.metaDescription,
      path: `/cities/${city.slug}`,
    });
  },
  component: CityDetailPage,
});

function CityDetailPage() {
  const { city } = Route.useLoaderData() as { city: CityDetail };

  const structuredData = city.isPrimaryHub
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${site.name} — Custom Packaging ${city.cityName}`,
        description: city.metaDescription,
        url: `${site.url}/cities/${city.slug}`,
        telephone: site.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          addressLocality: city.cityName,
          addressCountry: "PK",
        },
        areaServed: {
          "@type": "City",
          name: city.cityName,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Custom Packaging Printing and Delivery",
        provider: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
        areaServed: {
          "@type": "City",
          name: city.cityName,
        },
        description: city.metaDescription,
      };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const safeJsonLd = JSON.stringify(structuredData).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
  const safeFaqLd = JSON.stringify(faqSchema).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeFaqLd }} />

      <PageHero title={city.h1} text={city.intro} />

      <section className="section-pad">
        <div className="container-site max-w-5xl space-y-12">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumbs" className="text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-muted-foreground">Cities</li>
              <li>/</li>
              <li className="font-medium text-foreground">{city.cityName}</li>
            </ol>
          </nav>

          {/* Context & Local Dynamics */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
                Regional Logistics & Market
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Tailored packaging solutions for {city.cityName}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {city.cityContext}
              </p>

              {/* Delivery and Logistics Strip */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center gap-3">
                    <Clock className="size-6 text-secondary" />
                    <h3 className="font-bold text-foreground">Transit Timeline</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{city.deliveryTime}</p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-center gap-3">
                    <Truck className="size-6 text-secondary" />
                    <h3 className="font-bold text-foreground">Logistics Protocol</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{city.logisticsDetails}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="rounded-2xl border border-border bg-accent p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                  <MapPin className="size-4" />
                  <span>Delivery to {city.cityName}</span>
                </div>
                <h3 className="mt-2 font-bold text-lg text-foreground">
                  Order Packaging in {city.cityName}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Digital mockup and proof review, with order quantities confirmed for your product.
                </p>

                <div className="mt-6 space-y-2 text-xs text-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-secondary" />
                    <span>Quote tailored to your requirements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-secondary" />
                    <span>Product-specific material options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-secondary" />
                    <span>Protected carton shipment</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button asChild className="w-full" shimmer>
                  <Link to="/quote" search={{ product: undefined }}>
                    Get a Free Quote
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    WhatsApp Inquiries
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Local Industries Served */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
              Local Segments
            </span>
            <h2 className="mt-2 text-2xl font-bold text-foreground">
              Industries We Serve in {city.cityName}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {city.localIndustries.map((ind: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <span className="text-sm text-foreground font-medium">{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Products in this City */}
          <div className="space-y-6">
            <div>
              <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
                Demand Trends
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">
                Popular Packaging Products in {city.cityName}
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {city.popularProducts.map((p: { title: string; slug: string; reason: string }) => (
                <div
                  key={p.slug}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between transition-all duration-300 hover:shadow-lift hover:border-secondary/30"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                      <Package className="size-5 text-secondary" />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.reason}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      to="/products/$slug"
                      params={{ slug: p.slug }}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:underline"
                    >
                      <span>Specifications</span>
                      <ChevronRight className="size-4" />
                    </Link>
                    <Link
                      to="/quote"
                      search={{ product: p.slug }}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      Instant Quote &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Step Ordering Process in this City */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-foreground">
              How to Order Custom Packaging in {city.cityName}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-4">
              {city.orderingSteps.map((step: string, idx: number) => (
                <div key={idx} className="relative rounded-xl border border-border bg-background p-5">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-peach text-navy font-bold text-sm">
                    0{idx + 1}
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* City FAQs */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions — {city.cityName}</h2>
            <div className="space-y-4">
              {city.faqs.map((f: { q: string; a: string }, idx: number) => (
                <details
                  key={idx}
                  open={idx === 0}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:border-secondary/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-semibold text-foreground focus-visible:outline-none">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="size-5 shrink-0 text-secondary" />
                      <span>{f.q}</span>
                    </span>
                    <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <div className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground leading-relaxed">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
