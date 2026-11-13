import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Truck,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const Route = createFileRoute("/return-and-reprint-policy")({
  head: () =>
    seo({
      title: "Return & Reprint Policy | Printzy Custom Packaging",
      description:
        "Printzy's return, reprint, and replacement policy. Clear guidelines on proof approval, quality inspection, defect reporting, and transit damage.",
      path: "/return-and-reprint-policy",
    }),
  component: ReturnAndReprintPolicy,
});

function ReturnAndReprintPolicy() {
  return (
    <>
      <PageHero
        title="Return & Reprint Policy"
        text="Our commitment to delivering reliable, brand-consistent custom packaging. Clear terms, fair resolutions, and no hidden fine print."
      />

      <section className="section-pad">
        <div className="container-site max-w-4xl space-y-10">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumbs" className="text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-medium text-foreground">Return & Reprint Policy</li>
            </ol>
          </nav>

          {/* Policy Overview Summary */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-8 text-secondary" />
              <h2 className="text-2xl font-bold text-foreground">Our 100% Quality Commitment</h2>
            </div>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Because custom packaging is manufactured specifically with your unique logo, brand
              colours, and bespoke dimensions, items cannot be restocked or resold once printed.
              However, we stand firmly behind our craftsmanship. If your order contains
              manufacturing flaws or departs measurably from your approved proof, Printzy will
              reprint the affected units or issue a credit.
            </p>
          </div>

          {/* Section 1: Pre-Production Proof Approval */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FileCheck className="size-6 text-secondary" />
              <h2 className="text-xl font-bold text-foreground">
                1. Pre-Production Proof Approval
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Before full-scale production begins, our team submits a digital proof (and where
              requested, a physical pre-production sample) detailing:
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>Exact artwork placement, scale, and orientation on the product die-line.</li>
              <li>Target colour specifications (CMYK / Pantone matching references).</li>
              <li>Material substrate and paperboard weight/thickness.</li>
              <li>Box dimensions, crease lines, and cup rim dimensions.</li>
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Note: Mass production only commences after your written sign-off via WhatsApp or
              email. Please inspect spellings, phone numbers, social handles, and QR codes
              thoroughly prior to approval.
            </p>
          </div>

          {/* Section 2: Grounds for Free Reprint */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="size-6 text-secondary" />
              <h2 className="text-xl font-bold text-foreground">
                2. When You Qualify for a Free Reprint
              </h2>
            </div>
            <p className="text-muted-foreground">
              Printzy will arrange a complimentary reprint or replacement under the following
              verified conditions:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-secondary" />
                  Significant Colour Deviation
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  The printed colour departs significantly beyond standard commercial printing
                  tolerances from your approved proof.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-secondary" />
                  Structural & Seam Defects
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Paper cups exhibit seam leakage, boxes fail along glue joints, or paper bag
                  handles detach under standard weight loads.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-secondary" />
                  Dimensional Discrepancy
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  The finished boxes or cups do not match the size and capacity specifications
                  confirmed in your production order.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-secondary" />
                  Print Smudging or Misregistration
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Artwork exhibits severe misalignment, ghosting, streaking, or ink smudging caused
                  by press errors.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: What Does Not Qualify */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="size-6 text-amber-500" />
              <h2 className="text-xl font-bold text-foreground">
                3. What Does Not Qualify for Reprint
              </h2>
            </div>
            <p className="text-muted-foreground">
              Because custom products cannot be reused, the following circumstances are outside our
              free reprint guarantee:
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                <strong>Errors present in approved artwork:</strong> Typographical mistakes,
                misspelled words, incorrect phone numbers, invalid QR codes, or wrong addresses that
                were present in the artwork proof approved by the client.
              </li>
              <li>
                <strong>Screen vs Print Colour Differences:</strong> Slight colour differences
                between illuminated RGB phone/laptop monitors and physical CMYK ink on porous
                paperboards.
              </li>
              <li>
                <strong>Natural Material Variations:</strong> Minor natural tone and texture
                variations inherent to unbleached recycled kraft paperboards.
              </li>
              <li>
                <strong>Client Change of Mind:</strong> Alterations to brand colours, logo
                placement, or quantity after production has commenced.
              </li>
            </ul>
          </div>

          {/* Section 4: Inspection Window & Claims Process */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="size-6 text-secondary" />
              <h2 className="text-xl font-bold text-foreground">
                4. Reporting Window & Claims Process
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Upon receiving your shipment, please inspect the cartons. To lodge a quality claim:
            </p>
            <ol className="list-inside list-decimal space-y-3 text-muted-foreground">
              <li>
                <strong>Notification Window:</strong> Report any defect or transit damage within{" "}
                <strong className="text-foreground">48 hours</strong> of parcel delivery.
              </li>
              <li>
                <strong>Evidence Submission:</strong> Send clear photos and a brief video clip of
                the affected pieces, showing the issue and the carton packing label, via WhatsApp to{" "}
                <a href={site.whatsapp} className="text-secondary font-semibold hover:underline">
                  {site.phoneDisplay}
                </a>
                .
              </li>
              <li>
                <strong>Review & Resolution:</strong> Our production team assesses the batch logs
                within 24 working hours. If verified, we prioritize an expedited reprint run or
                issue an agreed credit adjustment.
              </li>
            </ol>
          </div>

          {/* Quick Contact & Action */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-foreground">Need help with an existing order?</h3>
              <p className="text-sm text-muted-foreground">
                Our support team is available on WhatsApp during standard working hours.
              </p>
            </div>
            <Button asChild size="lg" variant="outline">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
