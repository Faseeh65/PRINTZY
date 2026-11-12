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

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Custom Printed Packaging Pakistan | Printzy",
      description:
        "Custom printed cups, pizza boxes, food boxes, paper bags and napkins with your logo. Free mockup, low minimums, delivery across Pakistan. Get a quote in 24h.",
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
      <QuoteCTA />
    </>
  );
}
