import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, PackageCheck, Truck } from "lucide-react";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/shipping-and-delivery")({
  head: () =>
    seo({
      title: "Packaging Shipping & Delivery | Printzy Pakistan",
      description:
        "Learn what destination and order details to share so Printzy can confirm packaging delivery options and timing.",
      path: "/shipping-and-delivery",
    }),
  component: ShippingAndDelivery,
});

function ShippingAndDelivery() {
  return (
    <>
      <PageHero
        title="Shipping & Delivery Planning"
        text="Delivery options and timing depend on the finished order, destination, and available carrier service. Share the delivery details when requesting a quote."
      />
      <section className="section-pad">
        <div className="container-site max-w-4xl space-y-6">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <Truck className="size-8 text-secondary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">What we confirm with the order</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Before production is approved, ask for the expected dispatch window, delivery method,
              destination coverage, and any delivery charges applicable to your order.
            </p>
          </article>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <MapPin className="size-7 text-secondary" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold">Destination details</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Include the city, delivery address type, and any access or receiving-hour
                requirements. International inquiries should include the destination country and
                port when known.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <PackageCheck className="size-7 text-secondary" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold">Receiving the shipment</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Confirm the shipment count and packaging condition at receipt. If there is an issue,
                contact the team and follow the reporting steps in the return and reprint policy.
              </p>
            </article>
          </div>
          <Button asChild>
            <Link to="/quote" search={{ product: undefined }}>
              Include delivery in my quote
            </Link>
          </Button>
        </div>
      </section>
      <QuoteCTA />
    </>
  );
}
