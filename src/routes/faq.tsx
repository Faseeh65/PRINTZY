import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, MessageCircle, HelpCircle, ArrowRight } from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { site } from "@/data/site";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo({
      title: "Frequently Asked Questions | Printzy Custom Packaging",
      description:
        "Clear answers on custom packaging in Pakistan: minimum order quantities, pricing, production times, samples, and food-grade materials.",
      path: "/faq",
    }),
  component: FAQPage,
});

const faqItems = [
  {
    q: "What is your minimum order quantity (MOQ)?",
    a: "Minimum order quantities vary by product category to accommodate small businesses: custom paper cups [MOQ: confirm, e.g. 500 – 1,000 pcs], pizza boxes [MOQ: confirm], custom food boxes [MOQ: confirm], kraft paper bags [MOQ: confirm], and printed napkins [MOQ: confirm]. If you are launching a new brand or testing a menu, reach out on WhatsApp—we will guide you to the most economical run size for your budget.",
  },
  {
    q: "How much does custom printed packaging cost?",
    a: "Packaging prices depend on four primary factors: product type and dimensions, order quantity (larger volumes benefit from significant economies of scale), number of print colours (1-colour vs 4-colour process), and finishing options (matte, gloss, UV, or greaseproof coating). Share your requirements with our team and we will provide an itemised quote with a free 3D digital mockup within 24 hours.",
  },
  {
    q: "How long does production and delivery take?",
    a: "Standard manufacturing takes [X-Y working days: confirm] after you approve your final artwork proof. Nationwide courier delivery typically adds 1-2 working days within Lahore and 2-4 working days to Karachi, Islamabad, Rawalpindi, Faisalabad, and other cities across Pakistan.",
  },
  {
    q: "Do you design the artwork for us?",
    a: "We review your logo, check file resolution, and place your branding onto exact product die-lines with a free 3D digital mockup at zero cost. If you need complete packaging graphic design created from scratch, our design team can build it [free / nominal design fee: confirm].",
  },
  {
    q: "What file format should I send for printing?",
    a: "Vector formats such as Adobe Illustrator (.AI), PDF, EPS, or SVG provide the sharpest, crispest print at any scale. If you only possess bitmap or raster files (PNG, high-resolution JPG), please send the highest resolution file you have (minimum 300 DPI). Our prepress team will verify whether it can be printed cleanly or needs vector tracing.",
  },
  {
    q: "Can I see a sample before placing a bulk order?",
    a: "Yes. Every client receives a photorealistic 3D digital mockup before making any payment. If your brand requires a physical inspection, we offer material swatch packs and custom pre-production printed samples [sample policy: confirm whether sample fee is credited toward bulk invoice]. Learn more on our Request a Sample page.",
  },
  {
    q: "Are your materials safe for direct food and beverage contact?",
    a: "Absolutely. We exclusively employ certified food-grade virgin paperboards, grease-resistant corrugated fluting, and food-safe inks that release no hazardous odours or compounds into food or hot drinks. Technical compliance and safety documentation are readily available upon request.",
  },
  {
    q: "Which cities in Pakistan do you deliver to?",
    a: "We ship nationwide across Pakistan, including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Gujranwala, Sialkot, Peshawar, Quetta, and all surrounding commercial zones using reliable courier and cargo logistics partners [couriers: confirm].",
  },
  {
    q: "What is your policy if the print is wrong or damaged?",
    a: "We back our craftsmanship with a strict quality guarantee. If your order arrives with manufacturing defects, significant colour mismatch against your approved proof, or transit damage, report it within 48 hours and we will arrange an immediate reprint or replacement. Read our Return & Reprint Policy for full details.",
  },
  {
    q: "How do I pay for my packaging order?",
    a: "We accept payments via direct online bank transfer (IBFT) and mobile payment channels including Easypaisa and JazzCash. Standard terms require [50% advance payment to initiate production, with the remaining balance due upon completion/dispatch: confirm].",
  },
  {
    q: "Can I easily reorder the same design later?",
    a: "Yes. We securely archive your approved production-ready artwork, die-lines, and colour profiles. Future reorders take just a single WhatsApp message stating your product and required batch quantity.",
  },
  {
    q: "Do you print custom packaging for export orders?",
    a: "Yes, we support export-grade packaging orders for regional and international clients [export terms & shipping arrangements: confirm]. Contact our team with your volume and destination port for tailored export logistics.",
  },
];

function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
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
              <h2 className="text-xl font-bold text-foreground">Have a question not listed here?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Our packaging specialists are active on WhatsApp to answer your custom sizing, material,
                or quote queries.
              </p>
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
