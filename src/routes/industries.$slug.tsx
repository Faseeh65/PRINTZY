import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check, HelpCircle, ArrowRight, CheckCircle2, ChevronRight, Package } from "lucide-react";
import { seo } from "@/lib/seo";
import { industryDetails, IndustryDetail } from "@/data/industry-details";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = industryDetails[params.slug];
    if (!industry) {
      throw notFound();
    }
    return { industry };
  },
  head: ({ loaderData }) => {
    const data = loaderData as { industry: IndustryDetail } | undefined;
    if (!data?.industry) {
      return seo({
        title: "Industry Packaging | Printzy",
        description: "Custom packaging tailored for Pakistani businesses.",
        path: "/industries",
      });
    }
    const { industry } = data;
    return seo({
      title: industry.metaTitle,
      description: industry.metaDescription,
      path: `/industries/${industry.slug}`,
    });
  },
  component: IndustryDetailPage,
});

function IndustryDetailPage() {
  const { industry } = Route.useLoaderData() as { industry: IndustryDetail };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const safeJsonLd = JSON.stringify(faqSchema).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd }} />

      <PageHero title={industry.h1} text={industry.heroText} />

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
              <li>
                <Link to="/industries" className="hover:text-secondary">
                  Industries
                </Link>
              </li>
              <li>/</li>
              <li className="font-medium text-foreground">{industry.name}</li>
            </ol>
          </nav>

          {/* Overview & Market Reality */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
                Sector Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Packaging that wins customer recall in {industry.name}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {industry.overview}
              </p>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
                <h3 className="font-bold text-lg text-foreground">Key Challenges We Solve</h3>
                <ul className="space-y-3">
                  {industry.keyChallengesSolved.map((c: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-secondary" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="rounded-2xl border border-border bg-accent p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground">Need Custom {industry.name} Packaging?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Request a digital mockup and an itemised price breakdown for your requirements.
                </p>
                <div className="mt-6 space-y-3 text-xs sm:text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-secondary" />
                    <span>Free pre-production proof</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-secondary" />
                    <span>Order quantities confirmed by product</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-secondary" />
                    <span>Nationwide delivery across Pakistan</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button asChild className="w-full" shimmer>
                  <Link to="/quote" search={{ product: undefined }}>
                    Get a Quote
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="space-y-6">
            <div>
              <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
                Curated Lineup
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">
                Recommended Packaging Suite for {industry.name}
              </h2>
              <p className="mt-1 text-muted-foreground">
                Build a unified brand experience with matching containers, bags, and napkins.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {industry.recommendedProducts.map((p: { title: string; slug: string; reason: string }) => (
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
                      <span>View Specifications</span>
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

          {/* Mini Checklist */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
              Buyer Checklist
            </span>
            <h2 className="mt-2 text-2xl font-bold text-foreground">
              Packaging Checklist for {industry.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Essential technical specifications to verify before committing to bulk manufacturing.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {industry.packagingChecklist.map((item: { item: string; tip: string }, idx: number) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{item.item}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 FAQs */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {industry.faqs.map((f: { q: string; a: string }, idx: number) => (
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
