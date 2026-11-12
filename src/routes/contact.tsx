import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, CreditCard, ShieldCheck, FileCheck, ArrowRight, Clock, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { seo } from "@/lib/seo";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/sections";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact Printzy | WhatsApp, Phone, Email & Location",
      description:
        "Speak with Printzy about custom packaging printing across Pakistan. WhatsApp or call 0321 9091707, or email sales.printzy@gmail.com.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const items = [
    {
      icon: WhatsAppIcon,
      title: "WhatsApp Direct",
      text: "Fastest response for quotes & file reviews",
      href: site.whatsapp,
      label: site.phoneDisplay,
      ext: true,
    },
    {
      title: "Phone Support",
      icon: Phone,
      text: "Available Mon–Sat: 9am – 6pm",
      href: site.phoneHref,
      label: site.phoneIntl,
    },
    {
      icon: Mail,
      title: "Official Email",
      text: "For briefs, tender inquiries & artwork",
      href: `mailto:${site.email}`,
      label: site.email,
    },
  ];

  return (
    <>
      <PageHero
        title="Contact Printzy"
        text="Whether you need sizing advice, file verification, or an instant price breakdown, our packaging specialists are ready to assist."
      />

      {/* Direct Contact Channels */}
      <section className="section-pad">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((i) => (
              <a
                key={i.title}
                href={i.href}
                {...(i.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group rounded-2xl bg-card p-8 border border-border/40 hover:border-secondary/30 card-lift"
              >
                <i.icon aria-hidden className="mb-4 size-8 text-secondary transition-transform duration-300 group-hover:scale-110" />
                <h2 className="text-xl font-semibold text-foreground transition-colors duration-200 group-hover:text-secondary">
                  {i.title}
                </h2>
                <p className="text-sm text-muted-foreground">{i.text}</p>
                <p className="mt-3 break-all font-display font-semibold text-foreground">{i.label}</p>
              </a>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" shimmer>
              <Link to="/quote" search={{ product: undefined }}>
                Get a Free Quote & 3D Mockup
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Payment Terms & Commercial Policies Section */}
      <section className="section-pad bg-card">
        <div className="container-site max-w-4xl space-y-10">
          <div>
            <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
              Commercial Terms
            </span>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              Payment Terms & Commercial Guidelines
            </h2>
            <p className="mt-2 text-muted-foreground">
              Transparent terms designed to protect both your brand and production timelines.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <CreditCard className="size-6 text-secondary" />
                <h3 className="font-bold text-lg text-foreground">Accepted Payment Methods</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>&bull; Direct Online Bank Transfer (IBFT to company account)</li>
                <li>&bull; Corporate Cheque / Pay Order (subject to clearance)</li>
                <li>&bull; Local mobile accounts: Easypaisa & JazzCash</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <Clock className="size-6 text-secondary" />
                <h3 className="font-bold text-lg text-foreground">Payment Milestones</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  &bull; <strong className="text-foreground">[50% advance: confirm]</strong> upon final artwork proof approval to begin production.
                </li>
                <li>
                  &bull; <strong className="text-foreground">[50% balance: confirm]</strong> upon completion prior to nationwide courier dispatch.
                </li>
              </ul>
            </div>
          </div>

          {/* Quick links to policy documents */}
          <div className="rounded-2xl border border-border bg-accent p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-bold text-foreground">Review Our Dedicated Policies</div>
              <div className="text-xs text-muted-foreground">
                Understand our defect reporting window, sample policy, and file requirements.
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-secondary">
              <Link to="/return-and-reprint-policy" className="hover:underline">
                Return & Reprint Policy &rarr;
              </Link>
              <Link to="/request-sample" className="hover:underline">
                Request a Sample &rarr;
              </Link>
              <Link to="/artwork-guide" className="hover:underline">
                Artwork Guide &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
