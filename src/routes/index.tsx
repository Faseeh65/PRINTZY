import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import {
  Hero,
  TrustBar,
  OneSupplierSection,
  ProductsSection,
  IndustriesSection,
  HowItWorksSection,
  WhySection,
  FeaturedWork,
  Testimonials,
  FAQ,
  QuoteCTA,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Custom Printed Packaging Pakistan | Printzy",
      description:
        "Custom printed cups, boxes, bags and napkins for businesses in Pakistan. Lahore-based Printzy also reviews international packaging inquiries.",
      path: "/",
    }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <TrustBar />
      <OneSupplierSection />
      <ProductsSection />
      <IndustriesSection />
      <HowItWorksSection />
      <WhySection />
      <FeaturedWork />
      <Testimonials />
      <FAQ />
      <section className="section-pad bg-muted/30">
        <div className="container-site rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">Export and international orders</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
            Printzy is based in Lahore, Pakistan and can review packaging inquiries from overseas
            buyers. Product availability, export quantities, shipping, documents and terms are
            confirmed per inquiry.
          </p>
          <Link
            to="/export-custom-packaging"
            className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-secondary hover:underline"
          >
            Explore export packaging from Pakistan
          </Link>
        </div>
      </section>
      <QuoteCTA />
    </>
  );
}
