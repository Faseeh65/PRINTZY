import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  Check,
  Palette,
  Truck,
  BadgeCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
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
import { faqs } from "@/data/faqs";
import { clientReviews, clientLogos, caseStudies } from "@/data/proof";
import { images, gallery, responsiveImageProps } from "@/data/images";
import { trackGtmWhatsAppClick } from "@/lib/gtm";
import { buildWhatsAppUrl } from "@/config/business-facts";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

/* ───────── Shared helpers ───────── */
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

/* ───────── 1. HERO — layered product composition ───────── */
export function Hero() {
  return (
    <section className="relative bg-hero section-pad overflow-hidden bg-grain">
      {/* Decorative ambient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-peach/30 blur-3xl animate-blob"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-secondary/12 blur-3xl animate-blob-delayed"
      />

      <div className="container-site relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <Reveal delay={150}>
            <h1 className="tracking-tight">
              Custom Printed Packaging for Food Brands and Growing Businesses in Pakistan
            </h1>
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

        {/* Layered product composition — cup + box + bag */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-[4/3]">
            {/* Main hero image — largest, background */}
            <img
              src={images.food}
              {...responsiveImageProps(images.food, "(min-width: 1024px) 50vw, 100vw")}
              alt="Branded pizza box, takeaway food packaging and paper cup with custom logo"
              width={1024}
              height={768}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-soft"
            />
            {/* Overlapping cup image — floats top-left */}
            <img
              src={images.cups}
              {...responsiveImageProps(images.cups, "(min-width: 1024px) 20vw, 35vw")}
              alt="Custom printed coffee and tea cups for Pakistani cafes"
              width={400}
              height={400}
              loading="lazy"
              className="animate-float-slow absolute -left-4 -top-4 w-[38%] rounded-xl border-4 border-card object-cover shadow-lift md:-left-8 md:-top-6"
            />
            {/* Overlapping bag image — floats bottom-right */}
            <img
              src={images.bags}
              {...responsiveImageProps(images.bags, "(min-width: 1024px) 20vw, 35vw")}
              alt="Kraft and white paper bags with printed logo"
              width={400}
              height={400}
              loading="lazy"
              className="animate-float-delayed absolute -bottom-4 -right-4 w-[35%] rounded-xl border-4 border-card object-cover shadow-lift md:-bottom-6 md:-right-8"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── 2. TRUST STRIP — infinite industry marquee ───────── */
const marqueeItems = [
  "Cafes",
  "Restaurants",
  "Bakeries",
  "Cloud Kitchens",
  "Retail & E-commerce",
  "Corporate Gifting",
  "Events & Weddings",
];

export function TrustBar() {
  return (
    <section
      aria-label="Industries we print for"
      className="border-y border-border bg-card py-4 overflow-hidden"
    >
      <div className="relative">
        {/* Fade edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-card to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-card to-transparent"
        />
        {/* Marquee track — duplicated content for seamless loop */}
        <div className="animate-marquee flex w-max items-center gap-12">
          {[...marqueeItems, ...marqueeItems].map((label, idx) => (
            <span
              key={`${label}-${idx}`}
              className="inline-flex shrink-0 items-center text-sm font-semibold tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 3. ONE SUPPLIER — scroll storytelling ───────── */
export function OneSupplierSection() {
  const journeys = [
    {
      title: "1. Handheld & Counter",
      desc: "Single & double-wall paper cups and heat sleeves that leave a premium impression.",
      slug: "custom-paper-cups",
      img: images.cups,
    },
    {
      title: "2. Kitchen to Table",
      desc: "Sturdy pizza boxes and grease-resistant food cartons that keep meals hot and intact.",
      slug: "custom-pizza-boxes",
      img: images.boxes,
    },
    {
      title: "3. Doorstep & Takeaway",
      desc: "Reinforced kraft paper bags that carry your full menu safely into customer homes.",
      slug: "custom-paper-bags",
      img: images.bags,
    },
    {
      title: "4. The Finishing Touch",
      desc: "Custom printed napkins and packaging seal stickers that complete the dining experience.",
      slug: "custom-napkins-tissues",
      img: images.napkins,
    },
  ];

  return (
    <section className="section-pad bg-muted/50 bg-grain">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="mt-3">One supplier for the whole customer journey</h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Most food brands buy cups from one vendor, boxes from another and bags from a third,
              and the colours never quite match. At Printzy you can order cups, pizza boxes, food
              boxes, takeaway sets, paper bags, napkins and cup sleeves in one brand-consistent run.
              One artwork approval, one delivery, one reorder.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journeys.map((j, idx) => (
            <Reveal key={j.title} delay={CARD_DELAYS[idx % CARD_DELAYS.length]}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                {/* Product image for visual rhythm */}
                <div className="aspect-[16/10] overflow-hidden bg-muted/30">
                  <img
                    src={j.img}
                    {...responsiveImageProps(
                      j.img,
                      "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
                    )}
                    alt={`${j.title} — Printzy custom packaging`}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold text-foreground">{j.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {j.desc}
                  </p>
                  <Link
                    to="/products/$slug"
                    params={{ slug: j.slug }}
                    className="mt-4 inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-secondary hover:underline"
                  >
                    View specifications
                    <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const CARD_DELAYS = [100, 150, 200, 250] as const;

/* ───────── 4. PRODUCTS — bento grid with varied sizes ───────── */
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
        {/* Bento grid: first 2 large, rest normal */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, idx) => (
            <div
              key={p.slug}
              className={
                idx < 2
                  ? "h-full flex flex-col sm:col-span-1 lg:col-span-2"
                  : "h-full flex flex-col sm:col-span-1"
              }
            >
              <ProductCard {...p} delay={CARD_DELAYS[idx % CARD_DELAYS.length]} />
            </div>
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

/* ───────── 5. HOW IT WORKS — 4 steps with animated progress line ───────── */
const steps = [
  {
    title: "Send Your Requirement",
    text: "Share your target product, sizes, estimated quantities, and logo file via WhatsApp or our instant quote form.",
  },
  {
    title: "Mockup & Quote",
    text: "Review a digital mockup and itemised price breakdown based on your requirements.",
  },
  {
    title: "Approve Your Proof",
    text: "Review your high-resolution digital proof or printed sample. We adjust until your team is 100% satisfied.",
  },
  {
    title: "Print & Doorstep Delivery",
    text: "We confirm production and delivery timing with your order details before you proceed.",
  },
];

const STEP_DELAYS = [100, 200, 300, 400] as const;

export function HowItWorksSection({ heading = "h2" as "h1" | "h2" }) {
  const lineRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = lineRef.current;
    const section = sectionRef.current;
    if (!path || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          path.style.transition = "stroke-dashoffset 1.5s ease-out";
          path.style.strokeDashoffset = "0";
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section-pad bg-grain">
      <div className="container-site" ref={sectionRef}>
        <SectionHeader
          as={heading}
          eyebrow="Process"
          title="How Ordering Works"
          text="Four clear steps from initial artwork check to delivered packaging."
        />
        <div className="relative">
          {/* Animated progress line — desktop only */}
          <svg
            aria-hidden="true"
            className="absolute left-0 top-6 hidden h-1 w-full md:block"
            viewBox="0 0 1000 4"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              ref={lineRef}
              d="M0,2 L1000,2"
              stroke="var(--teal)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <ol className="relative grid gap-8 md:grid-cols-4">
            {/* Mobile vertical line */}
            <span aria-hidden className="absolute left-6 top-0 h-full w-0.5 bg-border md:hidden" />
            {steps.map((s, i) => (
              <StepCard
                key={s.title}
                n={i + 1}
                {...s}
                delay={STEP_DELAYS[i % STEP_DELAYS.length]}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ───────── 6. WHY PRINTZY — consolidated to 4 points ───────── */
const features = [
  {
    icon: BadgeCheck,
    title: "Transparent pricing",
    text: "Review quantities, pricing, and timing in your quotation before committing — no hidden costs.",
  },
  {
    icon: Palette,
    title: "Brand colour consistency",
    text: "Precise ink matching ensures your cups, boxes, bags, and napkins match perfectly across every product.",
  },
  {
    icon: Clock,
    title: "Frictionless reorders",
    text: "We keep your approved production artwork on file. Reorders take just a quick WhatsApp confirmation.",
  },
  {
    icon: Truck,
    title: "Nationwide delivery",
    text: "Reliable shipping to Lahore, Karachi, Islamabad, Faisalabad, and all commercial centres across Pakistan.",
  },
];

export function WhySection() {
  return (
    <section className="section-pad bg-card">
      <div className="container-site">
        <SectionHeader eyebrow="Why Printzy" title="Why Brands Choose Printzy" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <IndustryCard key={f.title} {...f} delay={CARD_DELAYS[idx % CARD_DELAYS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── 7. GALLERY — masonry with lightbox ───────── */
export function GalleryGrid({ items = gallery }: { items?: typeof gallery }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const GALLERY_DELAYS = [100, 200, 300] as const;

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight")
        setLightbox((prev) => (prev !== null ? (prev + 1) % items.length : null));
      if (e.key === "ArrowLeft")
        setLightbox((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, items.length, closeLightbox]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((g, idx) => (
          <Reveal
            key={g.alt}
            delay={GALLERY_DELAYS[idx % GALLERY_DELAYS.length]}
            className="group mb-4 break-inside-avoid overflow-hidden rounded-2xl shadow-sm cursor-pointer"
          >
            <button
              type="button"
              onClick={() => setLightbox(idx)}
              className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
              aria-label={`View ${g.alt} fullscreen`}
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
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox overlay */}
      {lightbox !== null && items[lightbox] != null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image lightbox"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-card/90 p-2 text-foreground shadow-soft hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          {items.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 text-foreground shadow-soft hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((lightbox - 1 + items.length) % items.length);
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card/90 p-2 text-foreground shadow-soft hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((lightbox + 1) % items.length);
                }}
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
          <img
            src={items[lightbox]!.src}
            alt={items[lightbox]!.alt}
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-lift animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export function FeaturedWork() {
  return (
    <section className="section-pad bg-muted/30">
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

/* ───────── Proof / Testimonials (unchanged — strict authenticity guard) ───────── */
export function ProofSection() {
  const [i, setI] = useState(0);
  const n = clientReviews.length;

  if (n === 0 && clientLogos.length === 0 && caseStudies.length === 0) {
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setI((i - 1 + n) % n);
    else if (e.key === "ArrowRight") setI((i + 1) % n);
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

export const Testimonials = ProofSection;

/* ───────── 8. FAQ — smooth accordion ───────── */
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
        <SectionHeader title="Frequently asked questions" />
        <Accordion
          type="single"
          collapsible
          className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card px-6 shadow-sm"
        >
          {faqs.map((f, k) => (
            <AccordionItem key={f.q} value={`f${k}`} className="border-0">
              <AccordionTrigger className="min-h-14 text-left font-display text-base font-semibold text-foreground">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ───────── 9. FINAL CTA BAND ───────── */
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

/* ───────── PageHero (shared) ───────── */
export function PageHero({ title, text }: { title: string; text: string }) {
  return (
    <section className="bg-hero py-12 sm:py-14 md:py-16 bg-grain">
      <div className="container-site max-w-3xl text-center relative z-10">
        <h1 className="text-balance">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{text}</p>
      </div>
    </section>
  );
}
