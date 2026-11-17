import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, HelpCircle } from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { site } from "@/data/site";
import { businessFacts } from "@/config/business-facts";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo({
      title: "Frequently Asked Questions | Printzy Custom Packaging",
      description:
        "Answers about custom packaging, order quantities, samples, delivery and international inquiries to Printzy in Pakistan.",
      path: "/faq",
    }),
  component: FaqPage,
});

const faqItems = [
  {
    q: "What is your minimum order quantity (MOQ)?",
    a: "Minimum order quantities depend on the product, dimensions, and print requirements. Share your product and planned quantity on WhatsApp and we will confirm the available run size.",
  },
  {
    q: "How much does custom printed packaging cost?",
    a: "Packaging prices depend on product type and dimensions, order quantity, print requirements, and finishing options. Share your requirements with our team to request an itemised quote and digital mockup.",
  },
  {
    q: "How long does production and delivery take?",
    a: "Production timing depends on the product and order details. We will confirm the schedule with your quote after reviewing your requirements and approved artwork. Delivery time depends on the destination and courier service.",
  },
  {
    q: "Do you design the artwork for us?",
    a: "We can review your logo and prepare a digital mockup for your packaging. If you need a new design created from scratch, contact us to discuss the scope and any applicable design fee.",
  },
  {
    q: "What file format should I send for printing?",
    a: "Vector formats such as Adobe Illustrator (.AI), PDF, EPS, or SVG provide the sharpest, crispest print at any scale. If you only possess bitmap or raster files (PNG, high-resolution JPG), please send the highest resolution file you have (minimum 300 DPI). Our prepress team will verify whether it can be printed cleanly or needs vector tracing.",
  },
  {
    q: "Can I see a sample before placing a bulk order?",
    a: "A digital mockup can help you review the proposed artwork. Physical sample availability, cost, and delivery can vary by product. Contact us to discuss options before placing an order. Learn more on our Request a Sample page.",
  },
  {
    q: "Are your materials safe for direct food and beverage contact?",
    a: "Material suitability depends on the product and its intended use. Ask us about the substrate and any supporting documentation available for the specific packaging you need.",
  },
  {
    q: "Which cities in Pakistan do you deliver to?",
    a: "We arrange delivery across Pakistan. Share your destination with your quote request so we can confirm the available delivery option and timing.",
  },
  {
    q: "What is your policy if the print is wrong or damaged?",
    a: "If an order arrives with a manufacturing defect or transit damage, contact us with photos and your order details. We will review the issue under our Return & Reprint Policy.",
  },
  {
    q: "How do I pay for my packaging order?",
    a:
      businessFacts.commercialPolicies.paymentTerms.advancePercent != null
        ? `Our current payment split is ${businessFacts.commercialPolicies.paymentTerms.advancePercent}% advance and ${100 - businessFacts.commercialPolicies.paymentTerms.advancePercent}% balance. The balance is due ${businessFacts.commercialPolicies.paymentTerms.balanceMilestone?.toLowerCase() ?? "as stated in your written quotation"}. Review your quotation for the order details.`
        : "Payment methods and milestones are confirmed in your written quotation. Please review the terms before approving production.",
  },
  {
    q: "Can I easily reorder the same design later?",
    a: "Yes. We securely archive your approved production-ready artwork, die-lines, and colour profiles. Future reorders take just a single WhatsApp message stating your product and required batch quantity.",
  },
  {
    q: "Do you print custom packaging for export orders?",
    a: "Send your product, quantity, destination country or port, and target delivery window. Export availability and applicable terms are confirmed per inquiry.",
  },
  {
    q: "What is the minimum order quantity for an export order?",
    a: "Export MOQ depends on the product and specification and is confirmed per inquiry. Include the quantity you are considering so it can be reviewed for your requested format.",
  },
  {
    q: "Which shipping modes and Incoterms can you offer?",
    a: "Shipping modes and Incoterms are confirmed per inquiry. Include your preferred mode and trade term, if any, in the request.",
  },
  {
    q: "Can overseas buyers receive physical samples?",
    a: "A free 3D mockup is available. Physical sample availability, fee and overseas courier cost are confirmed per inquiry.",
  },
  {
    q: "Which payment methods and currencies are available for export?",
    a: "Export payment methods and quote currency are confirmed per inquiry. Ask for the details to be included in the written quotation.",
  },
  {
    q: "Can you provide documents or certificates for an import order?",
    a: "List the exact documents your process requires. Document availability is confirmed per inquiry; no export certificate or test report is stated as a standing offer.",
  },
  {
    q: "Can I submit my own dieline or request private-label packaging?",
    a: "You can share your artwork or dieline for file checking and proof preparation. Private-label availability is confirmed per inquiry.",
  },
];

function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        text="Everything you need to know about minimum orders, artwork preparation, pricing, food safety, and delivery across Pakistan."
      />

      <section className="section-pad">
        <div className="container-site max-w-4xl">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-medium text-foreground">FAQ</li>
            </ol>
          </nav>

          {/* 100% Crawlable Server-Rendered HTML Details Elements */}
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <details
                key={item.q}
                open={idx < 3}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:border-secondary/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="size-5 shrink-0 text-secondary" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="mt-4 border-t border-border pt-4 text-base text-muted-foreground leading-relaxed">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>

          {/* Quick Help Box */}
          <div className="mt-12 rounded-2xl border border-border bg-accent p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Have a question not listed here?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Our packaging specialists are active on WhatsApp to answer your custom sizing,
                material, or quote queries.
              </p>
              <Link
                to="/export-custom-packaging"
                className="mt-2 inline-flex min-h-11 items-center font-semibold text-secondary hover:underline"
              >
                Review international order details
              </Link>
            </div>
            <div className="mt-4 sm:mt-0 shrink-0 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" variant="outline">
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  Ask on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
