import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Palette,
  Layers,
  Truck,
  BadgeCheck,
  Clock,
  Leaf,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  PackageCheck,
  Coffee,
  Box,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Reveal,
  SectionHeader,
  ProductCard,
  IndustryCard,
  StepCard,
  StatCounter,
} from "./primitives";
import { site } from "@/data/site";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { stats } from "@/data/stats";
import { faqs } from "@/data/faqs";
import { clientReviews, clientLogos, caseStudies, ClientReview } from "@/data/proof";
import { images, gallery, responsiveImageProps } from "@/data/images";
import { trackGtmWhatsAppClick } from "@/lib/gtm";
import { buildWhatsAppUrl } from "@/config/business-facts";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function WhatsAppButton({
  variant = "outline" as const,
  label = "Chat on WhatsApp",
}: {
  variant?: "outline" | "outlineLight";
  label?: string;
}) {
  return (
    <Button asChild size="lg" variant={variant}>
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackGtmWhatsAppClick("section_button")}
      >
        <WhatsAppIcon />
        {label}
      </a>
    </Button>
  );
}

export function Hero() {
  return (
    <section className="relative bg-hero section-pad overflow-hidden">
      {/* Decorative ambient glowing blurred blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 size-80 rounded-full bg-peach/35 blur-3xl animate-blob"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -bottom-24 size-96 rounded-full bg-secondary/15 blur-3xl animate-blob-delayed"
      />

      <div className="container-site relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal delay={100}>
            <span className="mb-4 inline-block rounded-full bg-peach px-3 py-1 text-sm font-semibold text-navy transition-transform duration-200 hover:scale-105">
              Custom packaging for growing brands
            </span>
          </Reveal>
          <Reveal delay={150}>
            <h1>Custom Printed Packaging for Food Brands and Growing Businesses in Pakistan</h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">
              From your first cup to your hundredth branch, Printzy prints packaging that looks the
              same everywhere your customer meets your brand. Share your logo, get a free mockup,
              approve a proof, and we print and deliver.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" shimmer>
                <Link to="/quote" search={{ product: undefined }}>
                  Get a Free Quote
                </Link>
              </Button>
              <WhatsAppButton />
            </div>
          </Reveal>
          <Reveal delay={300}>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-foreground">
              {[
                "Free mockup before you pay",
                "Printed proof approval",
                "Order quantities confirmed by product",
                "Delivery across Pakistan",
              ].map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2 transition-transform duration-200 hover:translate-x-1"
                >
                  <Check className="size-4 text-secondary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={200} className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
          <img
            src={images.food}
            {...responsiveImageProps(images.food, "(min-width: 1024px) 50vw, 100vw")}
            alt="Branded pizza box, takeaway food packaging and paper cup with custom logo"
            width={1024}
            height={1024}
            fetchPriority="high"
            className="col-span-2 aspect-[16/10] w-full rounded-2xl object-cover shadow-soft transition-transform duration-500 hover:scale-[1.02]"
          />
          <img
            src={images.cups}
            {...responsiveImageProps(images.cups, "(min-width: 1024px) 25vw, 50vw")}
            alt="Custom printed coffee and tea cups for Pakistani cafes"
            width={1024}
            height={1024}
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover shadow-soft transition-transform duration-500 hover:scale-[1.03]"
          />
          <img
            src={images.boxes}
            {...responsiveImageProps(images.boxes, "(min-width: 1024px) 25vw, 50vw")}
            alt="Printed kraft pizza and shipping boxes with brand artwork"
            width={1024}
            height={1024}
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover shadow-soft transition-transform duration-500 hover:scale-[1.03]"
          />
          <div className="animate-float-slow absolute -left-3 top-6 rounded-xl bg-card border border-border/40 px-4 py-3 shadow-soft transition-all duration-300 hover:shadow-lift md:-left-8">
            <div className="font-display text-sm font-semibold text-foreground">
              Quote tailored to you
            </div>
            <div className="text-xs text-muted-foreground">Free 3D digital mockup</div>
          </div>
          <div className="animate-float-delayed absolute -right-3 bottom-8 rounded-xl bg-navy border border-white/10 px-4 py-3 text-navy-foreground shadow-soft transition-all duration-300 hover:shadow-lift md:-right-6">
            <div className="font-display text-sm font-semibold">Brand Consistency</div>
            <div className="text-xs text-navy-foreground/85">Boxes, cups, bags & tissues</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TrustBar() {
  return (
    <section aria-label="Printzy at a glance" className="bg-secondary py-10">
      <div className="container-site grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <StatCounter key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}

export function OneSupplierSection() {
  const journeys = [
    {
      icon: Coffee,
      title: "1. Handheld & Counter",
      desc: "Single & double-wall paper cups and heat sleeves that leave a premium impression.",
      link: "/products/custom-paper-cups",
    },
    {
      icon: Box,
      title: "2. Kitchen to Table",
      desc: "Sturdy pizza boxes and grease-resistant food cartons that keep meals hot and intact.",
      link: "/products/custom-pizza-boxes",
    },
    {
      icon: ShoppingBag,
      title: "3. Doorstep & Takeaway",
      desc: "Reinforced kraft paper bags that carry your full menu safely into customer homes.",
      link: "/products/custom-paper-bags",
    },
    {
      icon: Sparkles,
      title: "4. The Finishing Touch",
      desc: "Custom printed napkins and packaging seal stickers that complete the dining experience.",
      link: "/products/custom-napkins-tissues",
    },
  ];

  return (
    <section className="section-pad bg-accent">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
            Unified Brand Identity
          </span>
          <h2 className="mt-3 text-3xl font-bold">One supplier for the whole customer journey</h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Most food brands buy cups from one vendor, boxes from another and bags from a third, and
            the colours never quite match. At Printzy you can order cups, pizza boxes, food boxes,
            takeaway sets, paper bags, napkins and cup sleeves in one brand-consistent run. One
            artwork approval, one delivery, one reorder.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journeys.map((j, idx) => {
            const Icon = j.icon;
            return (
              <Reveal key={j.title} delay={CARD_DELAYS[idx % CARD_DELAYS.length]}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="journey-icon flex size-12 items-center justify-center rounded-xl bg-peach text-navy transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{j.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{j.desc}</p>
                  <Link
                    to={j.link as any}
                    className="mt-4 inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-secondary hover:underline"
                  >
                    View specifications
                    <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const CARD_DELAYS = [100, 150, 200, 250] as const;

export function ProductsSection({ heading = "h2" as "h1" | "h2" }) {
  return (
    <section id="products" className="section-pad">
      <div className="container-site">
        <SectionHeader
          as={heading}
          eyebrow="Packaging We Print"
          title="Engineered for Food Brands & Growing Retailers"
          text="Select a category to view full material specifications, print options, and request a tailored quote."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, idx) => (
            <ProductCard key={p.slug} {...p} delay={CARD_DELAYS[idx % CARD_DELAYS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection({ heading = "h2" as "h1" | "h2" }) {
  return (
    <section className="section-pad bg-card">
      <div className="container-site">
        <SectionHeader
          as={heading}
          eyebrow="Industries"
          title="Who We Print For"
          text="We understand the operational demands of each trade, from fast-paced cafe counters to grease-proof delivery fleets."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((i, idx) => (
            <IndustryCard key={i.title} {...i} delay={CARD_DELAYS[idx % CARD_DELAYS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "1. Send Your Requirement",
    text: "Share your target product, sizes, estimated quantities, and logo file via WhatsApp or our instant quote form.",
  },
  {
    title: "2. Mockup & Quote",
    text: "Review a digital mockup and itemised price breakdown based on your requirements.",
  },
  {
    title: "3. Approve Your Proof",
    text: "Review your high-resolution digital proof or printed sample. We adjust until your team is 100% satisfied.",
  },
  {
    title: "4. Print & Doorstep Delivery",
    text: "We confirm production and delivery timing with your order details before you proceed.",
  },
];

const STEP_DELAYS = [100, 200, 300, 400] as const;

export function HowItWorksSection({ heading = "h2" as "h1" | "h2" }) {
  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionHeader
          as={heading}
          eyebrow="Process"
          title="How Ordering Works"
          text="Four clear steps from initial artwork check to delivered packaging."
        />
        <ol className="relative grid gap-8 md:grid-cols-4">
          <span
            aria-hidden
            className="absolute left-6 top-0 h-full w-0.5 bg-border md:left-0 md:top-6 md:h-0.5 md:w-full"
          />
          {steps.map((s, i) => (
            <StepCard key={s.title} n={i + 1} {...s} delay={STEP_DELAYS[i % STEP_DELAYS.length]} />
          ))}
        </ol>
      </div>
    </section>
  );
}

const features = [
  {
    icon: BadgeCheck,
    title: "Honest, upfront pricing",
    text: "Review quantities, pricing, and timing in your quotation before committing.",
  },
  {
    icon: PackageCheck,
    title: "Approve before production",
    text: "Free 3D digital mockup and proof verification before mass production begins.",
  },
  {
    icon: Palette,
    title: "Brand colour consistency",
    text: "Precise ink matching ensures your cups, boxes, bags, and napkins match perfectly.",
  },
  {
    icon: Clock,
    title: "Frictionless reorders",
    text: "We keep your approved production artwork on file. Reorders take just a quick WhatsApp confirmation.",
  },
  {
    icon: Leaf,
    title: "Product material options",
    text: "Ask us to confirm material specifications and any supporting documents available for your intended use.",
  },
  {
    icon: Truck,
    title: "Nationwide delivery",
    text: "Reliable shipping to Lahore, Karachi, Islamabad, Faisalabad, and all commercial centers across Pakistan.",
  },
];

const FEATURE_DELAYS = [100, 200, 300] as const;

export function WhySection() {
  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionHeader eyebrow="Why Printzy" title="Why Brands Choose Printzy" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <IndustryCard
              key={f.title}
              {...f}
              delay={FEATURE_DELAYS[idx % FEATURE_DELAYS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryGrid({ items = gallery }: { items?: typeof gallery }) {
  const GALLERY_DELAYS = [100, 200, 300] as const;
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((g, idx) => (
        <Reveal
          key={g.alt}
          delay={GALLERY_DELAYS[idx % GALLERY_DELAYS.length]}
          className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl shadow-soft"
        >
          <img
            src={g.src}
            {...responsiveImageProps(
              g.src,
              "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
            )}
            alt={g.alt}
            width={g.w}
            height={g.h}
            loading="lazy"
            className="w-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Reveal>
      ))}
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section className="section-pad bg-card">
      <div className="container-site">
        <SectionHeader eyebrow="Our work" title="Featured Work" />
        <GalleryGrid />
        <div className="mt-8 text-center">
          <Link
            to="/gallery"
            className="group inline-flex min-h-11 items-center gap-1 font-display font-semibold text-secondary hover:text-secondary-hover"
          >
            <span>View Full Gallery</span>
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * ProofSection - Authentic Social Proof
 * Strictly respects Rule 1 of SEO guidelines: Never publish fabricated claims, ratings, or fake client reviews.
 * If clientReviews and clientLogos are empty, renders NOTHING (returns null).
 */
export function ProofSection() {
  const [i, setI] = useState(0);
  const n = clientReviews.length;

  // Strict authenticity guard: if no verified reviews exist, render nothing
  if (n === 0 && clientLogos.length === 0 && caseStudies.length === 0) {
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setI((i - 1 + n) % n);
    } else if (e.key === "ArrowRight") {
      setI((i + 1) % n);
    }
  };

  return (
    <section className="section-pad bg-accent">
      <div className="container-site">
        <SectionHeader eyebrow="Verified Proof" title="Trusted by Food Brands in Pakistan" />

        {clientLogos.length > 0 && (
          <div className="mb-12 flex flex-wrap items-center justify-center gap-8 opacity-80">
            {clientLogos.map((logo) => (
              <img
                key={logo.name}
                src={logo.logoUrl}
                alt={`${logo.name} custom packaging`}
                className="h-10 max-w-[140px] object-contain grayscale transition hover:grayscale-0"
              />
            ))}
          </div>
        )}

        {n > 0 && (
          <div
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label="Verified client testimonials"
            role="region"
            className="mx-auto max-w-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl p-2"
          >
            <div aria-live="polite" className="overflow-hidden min-h-[220px]">
              {clientReviews[i] && (
                <div
                  key={i}
                  className="animate-fade-in rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <p className="text-base sm:text-lg italic text-foreground">
                    &ldquo;{clientReviews[i].reviewText}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <div className="font-bold text-foreground">{clientReviews[i].clientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {clientReviews[i].businessName} &bull; {clientReviews[i].city}
                      </div>
                    </div>
                    {clientReviews[i].verifiedOrder && (
                      <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold text-navy">
                        {clientReviews[i].verifiedOrder}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {n > 1 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Previous review"
                  onClick={() => setI((i - 1 + n) % n)}
                >
                  <ChevronLeft />
                </Button>
                {clientReviews.map((_, k) => (
                  <button
                    key={k}
                    aria-label={`Show review ${k + 1}`}
                    aria-current={k === i ? "true" : "false"}
                    onClick={() => setI(k)}
                    className="flex size-11 items-center justify-center"
                  >
                    <span
                      className={`block rounded-full transition-all ${
                        k === i ? "h-2.5 w-6 bg-navy" : "size-2.5 bg-border"
                      }`}
                    />
                  </button>
                ))}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Next review"
                  onClick={() => setI((i + 1) % n)}
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Backward compatibility alias for any older component references
export const Testimonials = ProofSection;

export function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
    <section className="section-pad">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd }} />
      <div className="container-site">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <Accordion
          type="single"
          collapsible
          className="mx-auto max-w-3xl rounded-2xl bg-card px-6 shadow-soft"
        >
          {faqs.map((f, k) => (
            <AccordionItem key={f.q} value={`f${k}`}>
              <AccordionTrigger className="min-h-14 text-left font-display text-base font-semibold text-foreground">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function QuoteCTA() {
  return (
    <section className="relative bg-navy section-pad text-navy-foreground overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 size-72 rounded-full bg-secondary/25 blur-3xl animate-blob"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-16 size-72 rounded-full bg-primary/20 blur-3xl animate-blob-delayed"
      />
      <Reveal className="container-site relative z-10 text-center">
        <h2 className="text-navy-foreground">Ready to see your logo on your packaging?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-navy-foreground/85">
          Send your required product, size, and estimated quantity. Get a complimentary 3D mockup
          and itemised quote based on your requirements.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" shimmer>
            <Link to="/quote" search={{ product: undefined }}>
              Get a Free Quote
            </Link>
          </Button>
          <WhatsAppButton variant="outlineLight" />
        </div>
      </Reveal>
    </section>
  );
}

export function PageHero({ title, text }: { title: string; text: string }) {
  return (
    <section className="bg-hero py-14 md:py-20">
      <div className="container-site max-w-3xl text-center">
        <h1>{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{text}</p>
      </div>
    </section>
  );
}
