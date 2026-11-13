import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, MapPin, PackageCheck } from "lucide-react";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/export-custom-packaging")({
  head: () =>
    seo({
      title: "Export Packaging Inquiries | Printzy Pakistan",
      description:
        "Discuss a custom packaging inquiry for an international destination. Export quantities, documentation, shipping, and terms are confirmed per request.",
      path: "/export-custom-packaging",
    }),
  component: ExportCustomPackaging,
});

function ExportCustomPackaging() {
  return (
    <>
      <PageHero
        title="International Packaging Inquiries"
        text="Share your product and destination details so our team can review whether the order requirements and logistics can be supported."
      />
      <section className="section-pad">
        <div className="container-site max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: PackageCheck,
                title: "Product and quantity",
                text: "Tell us the packaging format, dimensions, print requirements, and requested quantity.",
              },
              {
                icon: MapPin,
                title: "Destination",
                text: "Include the destination country, city or port, and any delivery requirements.",
              },
              {
                icon: Globe2,
                title: "Documents and terms",
                text: "List any shipping terms or product documents you need us to review. Availability is confirmed for each inquiry.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <Icon className="size-8 text-secondary" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6">
            <h2 className="text-xl font-bold">Request an export review</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Export MOQ, production timing, transport options, documents, and payment terms are not
              published as fixed offers. Include your requirements so the team can respond with the
              details that apply to your shipment.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">Contact Printzy</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/quote">Start a quote request</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <QuoteCTA />
    </>
  );
}
