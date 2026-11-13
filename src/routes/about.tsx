import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  ExternalLink,
  ArrowRight,
  FileText,
  HelpCircle,
} from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHero, WhySection, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { site } from "@/data/site";
import { images, responsiveImageProps } from "@/data/images";
import { businessFacts } from "@/config/business-facts";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Printzy | Custom Packaging Printing in Pakistan",
      description:
        "Printzy works with businesses in Pakistan on custom printed boxes, cups, bags, and napkins. Contact the team to discuss your requirements.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        title="We help food brands look professional in every box, cup and bag"
        text="A dedicated custom packaging partner for cafes, restaurants, bakeries, cloud kitchens, and growing brands across Pakistan."
      />

      {/* Main Story & Purpose */}
      <section className="section-pad">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src={images.press}
              {...responsiveImageProps(images.press, "(min-width: 1024px) 50vw, 100vw")}
              alt="High-precision printing press producing custom packaging sheets at Printzy"
              width={1280}
              height={832}
              loading="lazy"
              className="w-full rounded-2xl object-cover shadow-soft transition-transform duration-500 hover:scale-[1.01]"
            />
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-border bg-card p-4 shadow-lift sm:p-5">
              <div className="font-display text-xl font-bold text-secondary">Artwork Proof</div>
              <div className="text-xs text-muted-foreground">Pre-production approval on every order</div>
            </div>
          </div>

          <div className="space-y-5 text-base sm:text-lg">
            <span className="inline-block rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
              Our Story & Mission
            </span>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Eliminating the barriers to professional custom packaging
            </h2>
            <p className="text-muted-foreground">
              Printzy is based in Lahore, Pakistan, and works with cafes, restaurants, bakeries, cloud
              kitchens, retailers, and other businesses that need custom packaging.
            </p>
            <p className="text-muted-foreground">
              Our process starts with your product, size, quantity, and artwork. We review the
              requirements, prepare a proposal, and share a proof for approval before production.
            </p>
            <div className="pt-2">
              <Button asChild size="lg" shimmer>
                <Link to="/quote" search={{ product: undefined }}>
                  Get Your Free Mockup & Quote
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do & How We Work */}
      <section className="section-pad bg-card">
        <div className="container-site space-y-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
              Complete Capabilities
            </span>
            <h2 className="mt-3 text-3xl font-bold">What We Do & How We Work</h2>
            <p className="mt-4 text-muted-foreground">
              We design, print, and deliver complete branded packaging suites across Pakistan:
              single and double-wall paper cups, rigid pizza boxes, burger cartons, kraft paper bags,
              custom printed napkins, and cup sleeves.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
              <div className="flex size-12 items-center justify-center rounded-xl bg-peach text-navy font-bold text-lg">
                01
              </div>
              <h3 className="mt-4 text-xl font-semibold">1. Requirement & Logo</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Send your product selection, target size, estimated quantity, and brand logo via
                WhatsApp or our quote form. We review resolution, aspect ratio, and print feasibility.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
              <div className="flex size-12 items-center justify-center rounded-xl bg-peach text-navy font-bold text-lg">
                02
              </div>
              <h3 className="mt-4 text-xl font-semibold">2. 3D Mockup & Quote</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Receive an itemised price breakdown and a digital mockup for review. We confirm timing
                and any revisions with your request.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
              <div className="flex size-12 items-center justify-center rounded-xl bg-peach text-navy font-bold text-lg">
                03
              </div>
              <h3 className="mt-4 text-xl font-semibold">3. Proof Approval & Print</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                You approve a high-res digital proof or printed sample before mass printing begins. We
                archive your approved production files so future reorders take just one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Standards & Quality Assurance */}
      <section className="section-pad">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
              Quality Commitment
            </span>
            <h2 className="text-3xl font-bold">Product Materials & Proof Review</h2>
            <p className="text-muted-foreground">
              Food packaging directly touches what your customers consume. We take hygiene, board
              strength, and ink safety seriously.
            </p>

            <ul className="space-y-4 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-1 size-5 shrink-0 text-secondary" />
                <div>
                  <strong className="text-foreground">Product Materials:</strong>
                  <span className="text-muted-foreground">
                    {" "}Material options vary by product. Contact us to confirm the substrate and request
                    any product documentation available for your intended use.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-secondary" />
                <div>
                  <strong className="text-foreground">Proof Review:</strong>
                  <span className="text-muted-foreground">
                    {" "}Review the digital artwork proof and confirm specifications before production
                    begins.
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-1 size-5 shrink-0 text-secondary" />
                <div>
                  <strong className="text-foreground">Responsive Direct Support:</strong>
                  <span className="text-muted-foreground">
                    {" "}Contact the team by WhatsApp. The usual response target is{" "}
                    {businessFacts.contact.responseTime}.
                  </span>
                </div>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to={"/artwork-guide" as any}
                className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:underline"
              >
                <FileText className="size-4" />
                Read our Artwork Guide
              </Link>
              <Link
                to={"/return-and-reprint-policy" as any}
                className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:underline"
              >
                <HelpCircle className="size-4" />
                Reprint & Return Policy
              </Link>
            </div>
          </div>

          {/* Owner / Leadership Card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <User className="size-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{businessFacts.company.founderName}</h3>
                <p className="text-sm text-secondary font-medium">{businessFacts.company.founderRole}</p>
                <p className="text-xs text-muted-foreground">Printzy Custom Packaging</p>
              </div>
            </div>
            <div className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground leading-relaxed">
              <p>Contact our operations team to discuss your packaging requirements and next steps.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="sm" variant="outline">
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  Speak with Operations
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Facility, Location & Contact Details */}
      <section className="section-pad bg-card">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
              Physical Presence & Transparency
            </span>
            <h2 className="mt-3 text-3xl font-bold">Where to Find Us</h2>
            <p className="mt-3 text-muted-foreground">
              We welcome prospective clients for physical sample reviews and paper stock inspections.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="space-y-6 rounded-2xl border border-border bg-background p-8 shadow-soft">
            <h3 className="text-xl font-bold">Operations Location</h3>

              <div className="space-y-4 text-sm sm:text-base">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 size-5 shrink-0 text-secondary" />
                  <div>
                    <div className="font-semibold text-foreground">Service Base</div>
                    <div className="text-muted-foreground">
                      Operations based in Lahore, Pakistan. Contact us before planning an in-person visit.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-1 size-5 shrink-0 text-secondary" />
                  <div>
                    <div className="font-semibold text-foreground">Operating Hours</div>
                    <div className="text-muted-foreground">
                      Monday to Saturday: 9:00 AM to 6:00 PM PKT
                    </div>
                    <div className="text-xs text-muted-foreground">Sunday: Closed (WhatsApp inquiries queued)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 size-5 shrink-0 text-secondary" />
                  <div>
                    <div className="font-semibold text-foreground">Direct Hotline / WhatsApp</div>
                    <a
                      href={site.whatsapp}
                      className="text-secondary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-1 size-5 shrink-0 text-secondary" />
                  <div>
                    <div className="font-semibold text-foreground">Official Communications</div>
                    <a href={`mailto:${site.email}`} className="text-secondary hover:underline">
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button asChild variant="outline">
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="size-4" />
                    Ask for location details
                  </a>
                </Button>
              </div>
            </div>

            {/* Google Maps Embed / Visual Placeholder */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-center">
              <MapPin className="size-12 text-muted-foreground" />
              <h4 className="mt-4 font-display text-lg font-bold">Lahore, Pakistan</h4>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Contact us for location details before arranging a visit.
              </p>
              <div className="mt-6 rounded-lg bg-card px-4 py-2 text-xs font-mono text-muted-foreground border border-border">
                Location details available on request
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhySection />
      <QuoteCTA />
    </>
  );
}
