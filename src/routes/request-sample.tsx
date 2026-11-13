import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Box, FileCheck, ArrowRight, ShieldCheck } from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const Route = createFileRoute("/request-sample")({
  head: () =>
    seo({
      title: "Request a Sample | Printzy Custom Packaging Pakistan",
      description:
        "Inspect packaging quality before placing a bulk order. Free 3D digital mockups, material swatch packs, and pre-production printed samples.",
      path: "/request-sample",
    }),
  component: RequestSample,
});

function RequestSample() {
  const sampleTiers = [
    {
      title: "1. Free 3D Digital Mockup",
      cost: "No charge",
      turnaround: "Timing confirmed with your request",
      icon: Sparkles,
      highlight: true,
      desc: "Perfect for visualizing your logo and colours in photorealistic 3D before committing.",
      features: [
        "Photorealistic 3D render of cups, boxes, or bags",
        "Exact proportions and die-line placement check",
        "Multiple colourway adjustments free of charge",
        "Includes itemised price breakdown and production timeline",
      ],
      actionLabel: "Get Free Mockup",
      actionHref: "/quote",
    },
    {
      title: "2. Material Stock Swatch Pack",
      cost: "Confirm delivery cost with the team",
      turnaround: "Timing confirmed with your request",
      icon: Box,
      highlight: false,
      desc: "Feel real paperboard GSM, inspect PE moisture linings, and test greaseproof fluting.",
      features: [
        "Sample pieces from past client production runs",
        "Single-wall vs double-wall cup paperboards",
        "Kraft vs bleached white paper bag handles",
        "Corrugated E-flute pizza and burger board samples",
      ],
      actionLabel: "Order Swatch Pack",
      actionHref: site.whatsapp,
      isExternal: true,
    },
    {
      title: "3. Pre-Production Printed Sample",
      cost: "Ask us for the sample cost",
      turnaround: "Timing confirmed with your request",
      icon: FileCheck,
      highlight: false,
      desc: "A single custom-printed physical sample bearing your exact branding prior to full run.",
      features: [
        "Printed on production-grade press equipment",
        "Verify physical colour accuracy and coating finish",
        "Fit-test your real burgers, pizzas, or coffee lids",
        "Sample costs and any order credit are confirmed with your quotation.",
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
        text="Never guess print quality or board strength. Choose the sample option that suits your timeline and order size."
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
                        Most Popular for New Brands
                      </span>
                    )}
                    <div className="flex size-12 items-center justify-center rounded-xl bg-peach text-navy font-bold">
                      <Icon className="size-6" />
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-foreground">{tier.title}</h2>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-2xl font-bold text-secondary">{tier.cost}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Turnaround: {tier.turnaround}</div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>

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

          {/* Workflow & Transparency Guarantee */}
          <div className="rounded-2xl border border-border bg-accent p-8 text-foreground">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-7 text-secondary" />
              <h3 className="text-xl font-bold">Why We Offer Samples</h3>
            </div>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              When ordering thousands of custom boxes or cups, physical confidence is essential. We
              provide samples so you can test paper strength in your kitchen, ensure paper cup lids fit
              snugly, and confirm that your brand colours reflect your exact visual identity.
            </p>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
