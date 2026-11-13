import { createFileRoute, Link } from "@tanstack/react-router";
import { FileCheck2, MessageCircle, PackageCheck } from "lucide-react";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { site } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/quality-and-compliance")({
  head: () =>
    seo({
      title: "Packaging Materials & Documentation | Printzy",
      description:
        "Ask Printzy about material specifications and product documentation for custom packaging before placing an order.",
      path: "/quality-and-compliance",
    }),
  component: QualityAndCompliance,
});

function QualityAndCompliance() {
  return (
    <>
      <PageHero
        title="Materials & Product Documentation"
        text="Material specifications depend on the packaging format and intended use. Ask our team about the options and supporting documents available for your order."
      />
      <section className="section-pad">
        <div className="container-site max-w-4xl space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <PackageCheck className="size-8 text-secondary" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold">Material specifications</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Board, coating, barrier, and print options vary by product. Share the packaging
                format and how it will be used so we can discuss the relevant specification.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <FileCheck2 className="size-8 text-secondary" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold">Documents for your order</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Document availability depends on the selected material and product. Request the
                specific document you need and have its availability confirmed before ordering.
              </p>
            </article>
          </div>
          <div className="rounded-2xl border border-border bg-muted/40 p-6">
            <h2 className="text-xl font-bold">What to include in your request</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>Product format and approximate dimensions</li>
              <li>What the packaging will contain and how it will be used</li>
              <li>The material information or document you need reviewed</li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">Ask about materials</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/products">Browse products</Link>
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Do not assume a certification or food-contact approval based on a general product
            description. Confirm the specific material and documentation for your application.
          </p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-secondary hover:underline"
          >
            <WhatsAppIcon aria-hidden="true" />
            Ask on WhatsApp
          </a>
        </div>
      </section>
      <QuoteCTA />
    </>
  );
}
