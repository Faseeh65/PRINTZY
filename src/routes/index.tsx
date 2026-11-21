import { createFileRoute } from "@tanstack/react-router";
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
import { InternationalGlobeShowcase } from "@/components/site/international-globe";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Custom Printed Packaging Pakistan | Printzy",
      description:
        "Custom printed cups, pizza boxes, food boxes, paper bags and napkins for businesses in Pakistan. Share your requirements for a tailored quote.",
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
      <section className="section-pad bg-muted/40">
        <div className="container-site max-w-7xl">
          <InternationalGlobeShowcase />
        </div>
      </section>
      <FeaturedWork />
      <Testimonials />
      <FAQ />
      <QuoteCTA />
    </>
  );
}
