import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Layers,
  Palette,
  Maximize2,
  Type,
  ArrowRight,
} from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export const Route = createFileRoute("/artwork-guide")({
  head: () =>
    seo({
      title: "Packaging Artwork Guide | File Preparation | Printzy",
      description:
        "How to prepare your logo and packaging design for flawless printing. Vector vs raster, 300 DPI resolution, bleed, CMYK colours, and font outlining.",
      path: "/artwork-guide",
    }),
  component: ArtworkGuide,
});

function ArtworkGuide() {
  const checklist = [
    {
      title: "1. Vector Format Preferred",
      desc: "Send source vector files (.AI, .EPS, .PDF, .SVG). Vectors scale infinitely without pixelation or blurred edges.",
    },
    {
      title: "2. CMYK Colour Mode",
      desc: "Ensure your document colour space is set to CMYK rather than RGB to avoid unexpected shifts from screen to paper.",
    },
    {
      title: "3. Minimum 300 DPI Resolution",
      desc: "Any embedded raster images or textures must be at least 300 DPI at 100% final printed dimensions.",
    },
    {
      title: "4. Add 3mm Bleed",
      desc: "Extend background artwork and colours 3mm beyond the final cut line to avoid unprinted white edges during die-cutting.",
    },
    {
      title: "5. Respect 5mm Safe Margin",
      desc: "Keep all critical text, phone numbers, and logos at least 5mm inside the trim line to prevent accidental trimming.",
    },
    {
      title: "6. Convert Fonts to Outlines / Curves",
      desc: "Convert all typography into vector paths (outlines) so fonts never revert or distort on prepress computers.",
    },
  ];

  return (
    <>
      <PageHero
        title="Packaging Artwork & File Preparation Guide"
        text="A clear, practical guide to preparing your branding files for commercial offset, flexo, and digital packaging printing."
      />

      <section className="section-pad">
        <div className="container-site max-w-4xl space-y-12">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumbs" className="text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-medium text-foreground">Artwork Guide</li>
            </ol>
          </nav>

          {/* Intro Box */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
            <div className="flex items-center gap-3">
              <FileText className="size-8 text-secondary" />
              <h2 className="text-2xl font-bold text-foreground">
                Getting the Sharpest Print on Every Run
              </h2>
            </div>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              When packaging is printed on high-speed industrial presses, small file issues (like
              low-res logos or RGB colour shifts) become visibly amplified. Follow these guidelines
              so your cups, boxes, bags, and napkins print crisply with accurate brand colours.
            </p>
          </div>

          {/* Section 1: Vector vs Raster */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Layers className="size-6 text-secondary" />
              <h2 className="text-xl font-bold text-foreground">
                1. Vector vs Raster: What to Send
              </h2>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-muted/50 font-semibold text-foreground">
                  <tr>
                    <th className="p-4">File Type</th>
                    <th className="p-4">Formats</th>
                    <th className="p-4">Suitability</th>
                    <th className="p-4">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-muted-foreground">
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Vector</td>
                    <td className="p-4">.AI, .EPS, .PDF, .SVG</td>
                    <td className="p-4 text-secondary font-medium">Ideal (100% Crisp)</td>
                    <td className="p-4">
                      Always send vector source files if your designer created one.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">High-Res Raster</td>
                    <td className="p-4">.PNG, .TIFF, .PSD</td>
                    <td className="p-4 text-amber-600 font-medium">Acceptable (≥300 DPI)</td>
                    <td className="p-4">Must be high resolution with transparent background.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Low-Res Raster</td>
                    <td className="p-4">WhatsApp JPG, Web screenshot</td>
                    <td className="p-4 text-destructive font-medium">Not Recommended (Blurry)</td>
                    <td className="p-4">Needs vector reconstruction before commercial printing.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: CMYK vs RGB */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Palette className="size-6 text-secondary" />
              <h2 className="text-xl font-bold text-foreground">2. Colour Modes: CMYK vs RGB</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Computer screens, smartphones, and Instagram display images in <strong>RGB</strong>{" "}
              (Red, Green, Blue light). Commercial printing presses, however, apply physical liquid
              inks in <strong>CMYK</strong> (Cyan, Magenta, Yellow, Key Black) or Pantone spot inks.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">Why Does This Matter?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Extremely vibrant electric neon blues or bright greens in RGB cannot be reproduced
                  with standard 4-colour process ink and will appear slightly darker or muted.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground">Printzy Prepress Check</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our team converts your file into a calibrated CMYK proof so you can review and
                  sign off on the realistic ink appearance before we start printing.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Bleed and Safe Margins */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Maximize2 className="size-6 text-secondary" />
              <h2 className="text-xl font-bold text-foreground">3. Bleed and Safe Margins</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              When industrial blades die-cut thousands of pizza boxes or paper cup blanks,
              microscopic paper shifting can occur. To ensure seamless edges:
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                <strong>3mm Bleed:</strong> If your cup has a solid background colour, extend the
                artwork 3mm past the die-line.
              </li>
              <li>
                <strong>5mm Safe Zone:</strong> Keep critical text (ingredients, contact details,
                barcode, and social handles) at least 5mm away from fold lines and cut borders.
              </li>
            </ul>
          </div>

          {/* Section 4: Font Outlines */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Type className="size-6 text-secondary" />
              <h2 className="text-xl font-bold text-foreground">4. Converting Fonts to Outlines</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              If your design uses a custom font that our press computers don't have installed, the
              system might substitute a generic default font. To prevent this, in Adobe Illustrator,
              select all text and click:
            </p>
            <div className="rounded-xl bg-muted/60 p-4 font-mono text-xs sm:text-sm text-foreground">
              Type &gt; Create Outlines (or press Ctrl + Shift + O / Cmd + Shift + O)
            </div>
          </div>

          {/* Pre-Flight Checklist */}
          <div className="rounded-2xl border border-border bg-accent p-8">
            <h2 className="text-xl font-bold text-foreground">
              6-Point Pre-Flight Artwork Checklist
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {checklist.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Free Prepress Review CTA */}
          <div className="rounded-2xl border border-border bg-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-foreground">Not sure if your file is ready?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Send your current logo or PDF to our design team via WhatsApp. We will inspect
                resolution, bleed, and colours free of charge.
              </p>
            </div>
            <Button asChild size="lg" variant="outline">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Free Artwork Check
              </a>
            </Button>
          </div>
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
