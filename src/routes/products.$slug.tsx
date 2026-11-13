import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { seo } from "@/lib/seo";
import { site } from "@/data/site";
import { getProductBySlug, products, type Product, type ProductFaq } from "@/data/products";
import { responsiveImageProps } from "@/data/images";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { QuoteCTA } from "@/components/site/sections";
import { buildWhatsAppUrl } from "@/config/business-facts";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) {
      throw notFound();
    }
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.product) return {};
    const p = loaderData.product;
    return seo({
      title: p.metaTitle,
      description: p.metaDescription,
      path: `/products/${p.slug}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.title,
        description: p.intro,
        image: new URL(p.image, site.url).href,
        brand: {
          "@type": "Brand",
          name: site.name,
        },
      },
    });
  },
  component: ProductDetailPage,
  notFoundComponent: ProductNotFound,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData() as { product: Product };

  // Structured FAQ JSON-LD for rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((f: ProductFaq) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const safeFaqJson = JSON.stringify(faqSchema).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");

  // Lookup related products
  const relatedProducts = product.relatedSlugs
    .map((slug: string) => products.find((p: Product) => p.slug === slug))
    .filter((p: Product | undefined): p is Product => p !== undefined);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeFaqJson }} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-muted/40 border-b border-border/40 py-3">
        <div className="container-site flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <Link to="/products" className="hover:text-foreground transition-colors">
            Products
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span className="font-medium text-foreground truncate" aria-current="page">
            {product.title}
          </span>
        </div>
      </nav>

      {/* Product Hero Header */}
      <section className="bg-hero section-pad pb-12 overflow-hidden">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-block rounded-full bg-peach px-3.5 py-1 text-sm font-semibold text-navy">
              Custom Packaging Pakistan
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {product.h1}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{product.intro}</p>

            {/* Quick Proof Strip */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-medium text-foreground sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-secondary shrink-0" aria-hidden="true" />
                <span>Free 3D digital mockup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-secondary shrink-0" aria-hidden="true" />
                <span>Run size confirmed with your quote</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-secondary shrink-0" aria-hidden="true" />
                <span>Nationwide Pakistan delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-secondary shrink-0" aria-hidden="true" />
                <span>Proof approved before print</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" shimmer>
                <Link to="/quote" search={{ product: product.slug }}>
                  Get a Free Quote
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={buildWhatsAppUrl(
                    `Hi Printzy, I am interested in custom printed ${product.title}. Please share pricing and mockup details.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Product Hero Image */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="overflow-hidden rounded-2xl bg-card border border-border/40 shadow-soft card-lift">
              <img
                src={product.image}
                {...responsiveImageProps(product.image, "(min-width: 1024px) 50vw, 100vw")}
                alt={product.imageAlt}
                width={1024}
                height={768}
                fetchPriority="high"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Table */}
      <section className="section-pad bg-background">
        <div className="container-site max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Technical Specifications & Order Details
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Material and print options vary by product. Ask us to confirm details for your
              intended use.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
            <dl className="divide-y divide-border/60">
              <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                <dt className="font-display font-semibold text-foreground text-sm sm:text-base">
                  Available Sizes
                </dt>
                <dd className="sm:col-span-2 text-muted-foreground text-sm sm:text-base mt-1 sm:mt-0">
                  {product.specs.sizes}
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                <dt className="font-display font-semibold text-foreground text-sm sm:text-base">
                  Material & Quality
                </dt>
                <dd className="sm:col-span-2 text-muted-foreground text-sm sm:text-base mt-1 sm:mt-0">
                  {product.specs.material}
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                <dt className="font-display font-semibold text-foreground text-sm sm:text-base">
                  Print Technology
                </dt>
                <dd className="sm:col-span-2 text-muted-foreground text-sm sm:text-base mt-1 sm:mt-0">
                  {product.specs.printMethod}
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                <dt className="font-display font-semibold text-foreground text-sm sm:text-base">
                  Colour Options
                </dt>
                <dd className="sm:col-span-2 text-muted-foreground text-sm sm:text-base mt-1 sm:mt-0">
                  {product.specs.colours}
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                <dt className="font-display font-semibold text-foreground text-sm sm:text-base">
                  Surface Finish
                </dt>
                <dd className="sm:col-span-2 text-muted-foreground text-sm sm:text-base mt-1 sm:mt-0">
                  {product.specs.finish}
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                <dt className="font-display font-semibold text-foreground text-sm sm:text-base">
                  Minimum Order (MOQ)
                </dt>
                <dd className="sm:col-span-2 text-foreground font-semibold text-sm sm:text-base mt-1 sm:mt-0">
                  {product.specs.moq}
                </dd>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                <dt className="font-display font-semibold text-foreground text-sm sm:text-base">
                  Standard Production Time
                </dt>
                <dd className="sm:col-span-2 text-muted-foreground text-sm sm:text-base mt-1 sm:mt-0">
                  {product.specs.leadTime}
                </dd>
              </div>
              {product.specs.packing && (
                <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-4 hover:bg-muted/20 transition-colors">
                  <dt className="font-display font-semibold text-foreground text-sm sm:text-base">
                    Carton Packing
                  </dt>
                  <dd className="sm:col-span-2 text-muted-foreground text-sm sm:text-base mt-1 sm:mt-0">
                    {product.specs.packing}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* Print Options & Technical Guide */}
      <section className="section-pad bg-muted/30">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="mb-3 inline-block rounded-full bg-peach px-3 py-1 text-sm font-semibold text-navy">
              Printing & Materials Guide
            </span>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {product.slug === "custom-mailer-gift-boxes"
                ? "Options Tailored to Your Products & Unboxing Experience"
                : product.slug === "cup-sleeves-stickers"
                  ? "Custom Branding & Size Formats"
                  : product.slug === "custom-paper-bags"
                    ? "Options Tailored to Your Retail Store & Budget"
                    : "Options Tailored to Your Menu & Budget"}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {product.printOptions.map((opt: { title: string; description: string }, i: number) => (
              <div
                key={opt.title}
                className="rounded-2xl bg-card p-6 border border-border/40 shadow-soft card-lift"
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-accent text-secondary font-display font-bold">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{opt.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {opt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Industries */}
      <section className="section-pad bg-background">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="mb-3 inline-block rounded-full bg-peach px-3 py-1 text-sm font-semibold text-navy">
              Who We Print For
            </span>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {product.slug === "custom-mailer-gift-boxes"
                ? "Trusted by E-Commerce, Retailers & Growing Brands"
                : product.slug === "custom-paper-bags"
                  ? "Trusted by Retail Stores, Boutiques & Restaurants"
                  : "Packaging Options for Growing Businesses"}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {product.industries.map((ind: { name: string; slug: string; useCase: string }) => (
              <div
                key={ind.name}
                className="rounded-2xl bg-card p-6 border border-border/40 shadow-soft hover:border-secondary/40 card-lift"
              >
                <Sparkles className="size-6 text-secondary mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-foreground">{ind.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{ind.useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Logic Section */}
      <section className="section-pad bg-muted/40">
        <div className="container-site max-w-3xl">
          <div className="rounded-2xl bg-card p-8 border border-border/60 shadow-soft text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Transparent Pricing & Volume Tiers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {product.pricingGuidance}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" shimmer>
                <Link to="/quote" search={{ product: product.slug }}>
                  Get Custom Quote
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={buildWhatsAppUrl(
                    `Hi Printzy, please share a price estimate for ${product.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  WhatsApp for Fast Rates
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Ordering Workflow */}
      <section className="section-pad bg-background">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="mb-3 inline-block rounded-full bg-peach px-3 py-1 text-sm font-semibold text-navy">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              How Ordering Works with Printzy
            </h2>
          </div>

          <ol className="grid gap-6 md:grid-cols-4 list-none p-0">
            {product.orderingSteps.map(
              (s: { step: number; title: string; description: string }) => (
                <li
                  key={s.step}
                  className="group relative flex flex-col rounded-2xl bg-card p-6 border border-border/40 shadow-soft card-lift"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-navy font-display text-base font-bold text-navy-foreground mb-4 group-hover:bg-secondary transition-colors">
                    {s.step}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </li>
              ),
            )}
          </ol>
        </div>
      </section>

      {/* Product-Specific FAQ (100% Crawlable in SSR HTML) */}
      <section className="section-pad bg-muted/30">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <span className="mb-3 inline-block rounded-full bg-peach px-3 py-1 text-sm font-semibold text-navy">
              Questions & Answers
            </span>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything you need to know about ordering {product.title.toLowerCase()}.
            </p>
          </div>

          <div className="space-y-4">
            {product.faqs.map((f: ProductFaq, idx: number) => (
              <details
                key={idx}
                className="group rounded-2xl bg-card border border-border/60 p-6 shadow-soft open:border-secondary/40 transition-colors"
                open={idx === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between font-display text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg">
                  <span>{f.q}</span>
                  <span className="ml-4 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted/60 text-foreground transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground border-t border-border/40 pt-4">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Packaging Products */}
      {relatedProducts.length > 0 && (
        <section className="section-pad bg-background border-t border-border/40">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Complementary Packaging Solutions
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Bundle your order with matching packaging runs to reduce total cost.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel: Product) => (
                <Link
                  key={rel.slug}
                  to="/products/$slug"
                  params={{ slug: rel.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border/40 hover:border-secondary/40 shadow-soft card-lift"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted/30">
                    <img
                      src={rel.image}
                      {...responsiveImageProps(rel.image, "(min-width: 640px) 33vw, 100vw")}
                      alt={rel.imageAlt}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-1 flex-col">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors">
                      {rel.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground flex-1">{rel.benefit}</p>
                    <div className="mt-4 inline-flex items-center gap-1 font-display font-semibold text-sm text-secondary">
                      <span>View Specifications</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing Quote CTA */}
      <QuoteCTA />

      {/* Mobile Sticky Action Bar */}
      <div className="sticky bottom-0 z-30 flex items-center justify-between gap-3 border-t border-border/60 bg-card/95 p-3 backdrop-blur md:hidden">
        <div className="truncate">
          <div className="font-display font-semibold text-sm text-foreground truncate">
            {product.title}
          </div>
          <div className="text-xs text-muted-foreground">Free 3D Mockup</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild size="sm">
            <Link to="/quote" search={{ product: product.slug }}>
              Get Quote
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a
              href={buildWhatsAppUrl(`Hi Printzy, I need a quote for ${product.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon />
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}

function ProductNotFound() {
  return (
    <div className="container-site section-pad text-center max-w-xl">
      <h1 className="text-4xl font-bold text-foreground">Product Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The packaging product you are looking for may have moved or been updated.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link to="/products">Browse All Products</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/quote" search={{ product: undefined }}>
            Request Custom Quote
          </Link>
        </Button>
      </div>
    </div>
  );
}
