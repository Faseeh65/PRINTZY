import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardList, FileText, Globe2, PackageCheck, Ship } from "lucide-react";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { seo } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/config/business-facts";

export const Route = createFileRoute("/export-custom-packaging")({
  head: () =>
    seo({
      title: "Custom Packaging Manufacturer in Pakistan for Export | Printzy",
      description:
        "Plan a custom packaging order from Lahore, Pakistan. Share product specifications, artwork and destination to receive an itemised export quote.",
      path: "/export-custom-packaging",
    }),
  component: ExportCustomPackaging,
});

const exportSteps = [
  {
    title: "Send an inquiry",
    text: "Tell us your business type, packaging product, intended use and destination country or port.",
  },
  {
    title: "Share specifications",
    text: "Provide dimensions, expected quantity, material preferences, print coverage, artwork and target delivery window.",
  },
  {
    title: "Review a mockup and quote",
    text: "We provide a free 3D mockup and itemised quotation for the request. Export MOQ, lead time and currency are confirmed per inquiry.",
  },
  {
    title: "Approve the proof",
    text: "Review and approve the artwork proof and written product specification before production.",
  },
  {
    title: "Agree shipment details",
    text: "Packing, documents, payment terms, shipping mode and delivery arrangements are confirmed per inquiry before the order proceeds.",
  },
];

const exportFaqs = [
  {
    question: "What is the export MOQ?",
    answer:
      "Export MOQ depends on the product and specification. The quantity for your product is confirmed per inquiry; include your target run size in the request.",
  },
  {
    question: "Which countries can you ship to?",
    answer:
      "Countries open to export inquiries are confirmed per inquiry. Send the destination country and port so the team can review your request.",
  },
  {
    question: "Which shipping mode and Incoterms are available?",
    answer:
      "Available shipping modes and Incoterms are confirmed per inquiry. Include your preferred mode and any required trade term in your inquiry.",
  },
  {
    question: "What is the export production lead time?",
    answer:
      "Export production lead time depends on the product and order specification and is confirmed per inquiry. Include your target delivery window.",
  },
  {
    question: "Can overseas buyers request a physical sample?",
    answer:
      "A free 3D mockup is available. Physical sample availability, fee and courier cost for overseas buyers are confirmed per inquiry.",
  },
  {
    question: "Which payment methods and currency do you accept for export?",
    answer:
      "Export payment methods and quote currency are confirmed per inquiry. Ask for the payment terms and currency to be stated in your written quotation.",
  },
  {
    question: "Can you provide certificates or test reports?",
    answer:
      "No certificates or test reports are stated as available in the published business information. List the exact document you need; availability is confirmed per inquiry.",
  },
  {
    question: "Can I send my own dieline and artwork?",
    answer:
      "Yes. Share the artwork and dieline you want reviewed. Printzy checks artwork files and shares a proof for approval before production.",
  },
  {
    question: "Do you offer private-label or OEM packaging?",
    answer:
      "Private-label and OEM availability are confirmed per inquiry. Include the product, branding requirements and target quantity so the team can review the scope.",
  },
];

function ExportCustomPackaging() {
  const quoteDetails =
    "International export inquiry. Please add the destination country or port, product specifications, target quantity and delivery window.";

  return (
    <>
      <PageHero
        title="Custom Packaging Manufacturer in Pakistan for Export"
        text="Printzy is based in Lahore, Pakistan. International buyers can share a packaging brief for review, receive a free 3D mockup and itemised quote, and approve a proof before production."
      />

      <section className="section-pad">
        <div className="container-site max-w-5xl space-y-14">
          <section aria-labelledby="buyers-abroad">
            <h2 id="buyers-abroad" className="text-2xl font-bold text-foreground sm:text-3xl">
              For importers, distributors and growing brands
            </h2>
            <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
              This export inquiry path is for importers, distributors, café and restaurant groups,
              e-commerce businesses, and brands exploring private-label packaging. If you are
              evaluating an OEM packaging supplier, describe the requested scope; availability and
              terms are confirmed per inquiry. Product range, quantities, shipping and documents are
              reviewed for each request rather than assumed in advance.
            </p>
          </section>

          <section aria-labelledby="export-products">
            <h2 id="export-products" className="text-2xl font-bold text-foreground sm:text-3xl">
              Packaging formats to discuss
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    to="/products/$slug"
                    params={{ slug: product.slug }}
                    className="group flex min-h-14 items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 font-medium text-foreground transition hover:border-secondary/50"
                  >
                    <span>{product.title}</span>
                    <ArrowRight
                      className="size-4 shrink-0 text-secondary transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="export-process">
            <h2 id="export-process" className="text-2xl font-bold text-foreground sm:text-3xl">
              How an export order moves forward
            </h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {exportSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <span className="text-sm font-bold text-secondary">STEP {index + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-6">
              <ClipboardList className="size-8 text-secondary" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold">What to include in your brief</h2>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">
                <li>Product format, dimensions and intended use</li>
                <li>Target quantity for each format or design</li>
                <li>Material preference and any application requirements</li>
                <li>Logo/artwork files, existing dieline and print references</li>
                <li>Destination country, port and target delivery window</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6">
              <FileText className="size-8 text-secondary" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold">Documents and specifications</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                List the exact documents your procurement or import process requires, such as a
                commercial invoice, packing list or test report. Document availability and the
                product specification are confirmed per inquiry; no certification or test report is
                stated as a standing offer.
              </p>
            </article>
          </section>

          <section aria-labelledby="commercial-details">
            <div className="flex items-start gap-4">
              <Ship className="mt-1 size-8 shrink-0 text-secondary" aria-hidden="true" />
              <div>
                <h2 id="commercial-details" className="text-2xl font-bold text-foreground">
                  MOQ, lead time, payment and shipping
                </h2>
                <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">
                  Export MOQ, production lead time, payment methods, quote currency, shipping mode,
                  Incoterms, packing and delivery arrangements are confirmed per inquiry. Ask for
                  each item to be recorded in the itemised written quotation before approving an
                  order.
                </p>
                <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">
                  A free 3D mockup is available. Physical sample availability, fees and overseas
                  courier costs are confirmed per inquiry.
                </p>
              </div>
            </div>
          </section>

          <nav
            aria-label="Export order resources"
            className="rounded-2xl border border-border bg-muted/40 p-6"
          >
            <h2 className="text-xl font-bold text-foreground">Plan the order details</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { to: "/faq", label: "Packaging and export FAQs" },
                { to: "/shipping-and-delivery", label: "Shipping and delivery planning" },
                { to: "/payment-terms", label: "Payment terms" },
                { to: "/pricing-guide", label: "How a quote is prepared" },
                { to: "/quality-and-compliance", label: "Materials and documentation" },
                { to: "/request-sample", label: "Mockups and sample inquiries" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="font-medium text-secondary hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="export-faq">
            <h2 id="export-faq" className="text-2xl font-bold text-foreground sm:text-3xl">
              Export packaging questions
            </h2>
            <div className="mt-6 space-y-3">
              {exportFaqs.map(({ question, answer }) => (
                <details
                  key={question}
                  className="group rounded-xl border border-border bg-card p-5"
                >
                  <summary className="cursor-pointer font-semibold text-foreground">
                    {question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-accent p-6 sm:p-8">
            <Globe2 className="size-8 text-secondary" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">
              Start an export packaging inquiry
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Add the destination and delivery window in the request details. The quote form opens
              with an export brief starter, or message the team directly on WhatsApp.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/quote" search={{ product: undefined, details: quoteDetails }}>
                  Request an export quote
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={buildWhatsAppUrl(
                    "Hello Printzy, I am enquiring about export packaging. I will share my destination country or port, product specifications, target quantity and delivery window.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discuss on WhatsApp
                </a>
              </Button>
              <Link
                to="/shipping-and-delivery"
                className="inline-flex min-h-11 items-center font-medium text-secondary hover:underline"
              >
                Shipping details
              </Link>
            </div>
          </section>
        </div>
      </section>
      <QuoteCTA />
    </>
  );
}
