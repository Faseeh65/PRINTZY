import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Box, FileCheck, ArrowRight, ShieldCheck, Globe2 } from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const Route = createFileRoute("/request-sample")({
  head: () =>
    seo({
      title: "Packaging Samples for Overseas Buyers | Printzy",
      description:
        "Learn about free digital mockups and ask about material swatches or printed samples for your packaging inquiry.",
      path: "/request-sample",
    }),
  component: RequestSample,
});

function RequestSample() {
  const sampleTiers = [
    {
      title: "1. Free 3D Digital Mockup",
      cost: "No charge",
      turnaround: "Timing confirmed per inquiry",
      icon: Sparkles,
      highlight: true,
      desc: "Review your logo on the requested packaging format before approving a production proof.",
      features: [
        "Free 3D digital mockup",
        "Artwork file checking",
        "Itemised quotation for the request",
        "Proof approval before production",
      ],
      actionLabel: "Get Free Mockup",
      actionHref: "/quote",
    },
    {
      title: "2. Material Stock Swatch Pack",
      cost: "Availability and fee confirmed per inquiry",
      turnaround: "Timing confirmed per inquiry",
      icon: Box,
      highlight: false,
      desc: "Ask whether a material swatch is available for the product and specification you are considering.",
      features: [
        "Share the product and material information you need to review",
        "Availability and sample fee confirmed per inquiry",
        "Delivery method and cost confirmed per inquiry",
      ],
      actionLabel: "Order Swatch Pack",
      actionHref: site.whatsapp,
      isExternal: true,
    },
    {
      title: "3. Pre-Production Printed Sample",
      cost: "Availability and fee confirmed per inquiry",
      turnaround: "Timing confirmed per inquiry",
      icon: FileCheck,
      highlight: false,
      desc: "Ask whether a physical printed sample is available for the product and artwork in your request.",
      features: [
        "Share the approved artwork and product specification",
        "Sample availability and fee confirmed per inquiry",
        "Any courier or delivery cost confirmed per inquiry",
      ],
      actionLabel: "Inquire on WhatsApp",
      actionHref: site.whatsapp,
      isExternal: true,
    },
  ];

  return (
    <>
      <PageHero
        title="Request a Sample Before You Order"
        text="Explore the review options and ask which sample approach is available for your product and order."
      />

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
              <li className="font-medium text-foreground">Request a Sample</li>
            </ol>
          </nav>

          {/* Sample Cards Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {sampleTiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.title}
                  className={`flex flex-col justify-between rounded-2xl border p-6 shadow-soft transition-all duration-300 hover:shadow-lift ${
                    tier.highlight
                      ? "border-secondary bg-card ring-2 ring-secondary/20"
                      : "border-border bg-card"
                  }`}
                >
                  <div>
                    {tier.highlight && (
                      <span className="mb-4 inline-block rounded-full bg-peach px-3 py-1 text-xs font-semibold text-navy">
                        Digital mockup
                      </span>
                    )}
                    <div className="flex size-12 items-center justify-center rounded-xl bg-peach text-navy font-bold">
                      <Icon className="size-6" />
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-foreground">{tier.title}</h2>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-2xl font-bold text-secondary">
                        {tier.cost}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Turnaround: {tier.turnaround}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {tier.desc}
                    </p>

                    <ul className="mt-6 space-y-2 border-t border-border pt-4 text-xs sm:text-sm text-muted-foreground">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-secondary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    {tier.isExternal ? (
                      <Button asChild className="w-full" variant="outline">
                        <a href={tier.actionHref} target="_blank" rel="noopener noreferrer">
                          <WhatsAppIcon />
                          {tier.actionLabel}
                        </a>
                      </Button>
                    ) : (
                      <Button asChild className="w-full" shimmer>
                        <Link to="/quote" search={{ product: undefined }}>
                          {tier.actionLabel}
                          <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <article className="rounded-2xl border border-border bg-muted/40 p-6">
            <Globe2 className="size-7 text-secondary" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-bold">Packaging samples for overseas buyers</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A free 3D mockup is available for review. Physical sample availability, fees and
              overseas courier costs are confirmed per inquiry. Include your destination country and
              the product you want to evaluate.
            </p>
            <Link
              to="/export-custom-packaging"
              className="mt-4 inline-flex min-h-11 items-center font-semibold text-secondary hover:underline"
            >
              Read about export packaging samples
            </Link>
          </article>

          {/* Workflow & Transparency Guarantee */}
          <div className="rounded-2xl border border-border bg-accent p-8 text-foreground">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-7 text-secondary" />
              <h3 className="text-xl font-bold">Why We Offer Samples</h3>
            </div>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              A free digital mockup and proof support the artwork review. Physical sample
              availability, fees and delivery arrangements are confirmed per inquiry.
            </p>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
