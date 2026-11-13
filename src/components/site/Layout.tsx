import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, Phone, Truck, Menu } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { site, navLinks } from "@/data/site";
import { products } from "@/data/products";
import { trackGtmWhatsAppClick } from "@/lib/gtm";

export function TopBar() {
  return (
    <div className="hidden bg-navy text-sm text-navy-foreground md:block">
      <div className="container-site flex h-10 items-center justify-end gap-6">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-peach"
        >
          <Mail className="size-4" aria-hidden="true" />
          {site.email}
        </a>
        <a
          href={site.phoneHref}
          className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-peach"
        >
          <Phone className="size-4" aria-hidden="true" />
          {site.phoneDisplay}
        </a>
        <span className="inline-flex items-center gap-2">
          <Truck className="size-4" aria-hidden="true" />
          Nationwide delivery
        </span>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 bg-card/95 backdrop-blur transition-all duration-300 ${scrolled ? "shadow-soft py-0" : "py-1"}`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-3 py-2 sm:h-18 sm:gap-4">
        <Link to="/" aria-label="Printzy home" className="flex min-w-0 shrink items-center group">
          <img
            src="/images/logo-removebg-preview.png"
            alt="Printzy Custom Packaging"
            width={1600}
            height={628}
            className="h-10 w-auto max-w-[min(42vw,10rem)] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:max-w-none"
          />
        </Link>
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="rounded-lg px-3 py-2 font-medium text-foreground transition-all duration-200 hover:text-secondary hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  activeProps={{ className: "text-secondary font-semibold bg-accent/30" }}
                  activeOptions={{ exact: true }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex" shimmer>
            <Link to="/quote" search={{ product: undefined }}>
              Get a Free Quote
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(20rem,calc(100vw-1rem))] flex-col bg-card"
            >
              <SheetTitle className="font-display text-foreground">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation menu links</SheetDescription>
              <nav aria-label="Mobile navigation" className="mt-4 flex flex-col">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center border-b font-display font-medium text-foreground hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pb-4">
                <Button asChild size="lg">
                  <Link to="/quote" search={{ product: undefined }} onClick={() => setOpen(false)}>
                    Get a Free Quote
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Deterministic copyright year to prevent SSR/client hydration mismatch
// (Cloudflare Worker SSR system clock can evaluate to 1970 at module load time)
const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer
      className="bg-navy pb-[calc(5rem+env(safe-area-inset-bottom))] text-navy-foreground md:pb-0"
      aria-label="Site footer"
    >
      <h2 className="sr-only">Footer navigation and company information</h2>
      <div className="container-site grid grid-cols-1 gap-x-8 gap-y-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-4 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            to="/"
            aria-label="Printzy home"
            className="inline-block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-display text-2xl md:text-3xl font-black tracking-wider text-white uppercase transition-colors group-hover:text-peach">
                PRINTZY
              </span>
              <span className="size-2 rounded-full bg-peach" />
            </div>
            <p className="mt-1 text-[10px] font-bold tracking-[0.25em] text-peach uppercase">
              Custom Packaging
            </p>
          </Link>
          <p className="mt-4 text-sm text-navy-foreground/85 leading-relaxed">{site.about}</p>
        </div>
        <FooterCol title="Quick links">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/faq"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              to="/request-sample"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Request a Sample
            </Link>
          </li>
          <li>
            <Link
              to="/artwork-guide"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Artwork Guide
            </Link>
          </li>
          <li>
            <Link
              to="/quality-and-compliance"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Materials & Documentation
            </Link>
          </li>
          <li>
            <Link
              to="/export-custom-packaging"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Export Inquiries
            </Link>
          </li>
          <li>
            <Link
              to="/pricing-guide"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Pricing Guide
            </Link>
          </li>
          <li>
            <Link
              to="/shipping-and-delivery"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Shipping & Delivery
            </Link>
          </li>
          <li>
            <Link
              to="/payment-terms"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Payment Terms
            </Link>
          </li>
          <li>
            <Link
              to="/return-and-reprint-policy"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Return & Reprint Policy
            </Link>
          </li>
          <li>
            <Link
              to="/privacy"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/terms"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Terms of Service
            </Link>
          </li>
        </FooterCol>
        <FooterCol title="Products">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </FooterCol>
        <FooterCol title="Contact">
          <li>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phoneIntl}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 break-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <Mail className="size-4" aria-hidden="true" />
              {site.email}
            </a>
          </li>
          <li>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <WhatsAppIcon className="size-4" aria-hidden="true" />
              WhatsApp us
            </a>
          </li>
        </FooterCol>
      </div>
      <div className="border-t border-navy-foreground/15">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-sm text-navy-foreground/80 md:flex-row">
          <div className="space-y-1 text-center md:text-left">
            <p>{`© ${CURRENT_YEAR} Printzy. All rights reserved.`}</p>
            <p className="text-xs text-navy-foreground/65">
              A project made with care by <span className="font-semibold">Devnex Innovation</span>.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs text-navy-foreground/75">
            <Link
              to="/terms"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Large Architectural Wordmark (Image 2 style) */}
      <div
        className="pointer-events-none select-none overflow-hidden px-4 pt-6 pb-2 text-center"
        aria-hidden="true"
      >
        <span className="block font-display text-[15vw] font-black leading-none tracking-widest text-white/[0.07] uppercase">
          PRINTZY
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-base font-semibold text-navy-foreground">{title}</h3>
      <ul className="space-y-2 text-sm text-navy-foreground/85">{children}</ul>
    </div>
  );
}

export function FloatingActions() {
  return (
    <>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackGtmWhatsAppClick("floating_button")}
        aria-label="Chat with Printzy on WhatsApp"
        className="wa-pulse fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-3 z-40 inline-flex size-12 items-center justify-center rounded-full shadow-soft transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lift active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366] sm:right-4 md:bottom-6 md:right-6 md:size-14"
      >
        <WhatsAppIcon className="size-12 md:size-14" aria-hidden="true" />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t bg-card p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden">
        <Button asChild variant="outline" className="min-h-11">
          <a href={site.phoneHref} aria-label={`Call Printzy at ${site.phoneDisplay}`}>
            <Phone aria-hidden="true" />
            Call
          </a>
        </Button>
        <Button asChild className="min-h-11">
          <Link
            to="/quote"
            search={{ product: undefined }}
            aria-label="Get a custom packaging quote"
          >
            Get Quote
          </Link>
        </Button>
      </div>
    </>
  );
}
