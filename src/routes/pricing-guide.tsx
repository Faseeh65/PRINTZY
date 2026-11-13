import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, Ruler, Shapes } from "lucide-react";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/pricing-guide")({
  head: () =>
    seo({
      title: "Custom Packaging Pricing Guide | Printzy",
      description:
        "Learn which product, size, material, print, finishing, and quantity details shape a custom packaging quote.",
      path: "/pricing-guide",
    }),
  component: PricingGuide,
});

const factors = [
  {
    icon: Shapes,
    title: "Packaging format",
    text: "Cups, boxes, bags, napkins, and sleeves use different materials and production setups.",
  },
  {
    icon: Ruler,
    title: "Size and construction",
    text: "Dimensions, wall structure, closures, and inserts affect the material and production plan.",
  },
  {
    icon: Calculator,
    title: "Quantity and print details",
    text: "Share the required quantity, artwork, print coverage, and finish so the team can prepare a relevant quote.",
  },
];

function PricingGuide() {
  return (
    <>
      <PageHero
        title="How Custom Packaging Is Priced"
        text="Each quote is based on the product specification and order details. Printzy does not publish a universal per-piece price for custom work."
      />
      <section className="section-pad">
        <div className="container-site max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            {factors.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <Icon className="size-8 text-secondary" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6">
            <h2 className="text-xl font-bold">To request a useful estimate</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>Choose a product and share the size or a sample reference.</li>
              <li>Tell us your planned quantity and destination.</li>
              <li>Attach or describe your artwork and any material or finish requirements.</li>
              <li>Review the written quote, schedule, and terms before approving production.</li>
            </ol>
            <Button asChild className="mt-5">
              <Link to="/quote" search={{ product: undefined }}>
                Request a quote
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <QuoteCTA />
    </>
  );
}
