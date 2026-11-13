import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, FileText } from "lucide-react";
import { PageHero, QuoteCTA } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { businessFacts } from "@/config/business-facts";

export const Route = createFileRoute("/payment-terms")({
  head: () =>
    seo({
      title: "Payment Terms for Custom Packaging | Printzy",
      description:
        "Review payment methods and milestones in your Printzy quotation before approving a custom packaging order.",
      path: "/payment-terms",
    }),
  component: PaymentTerms,
});

function PaymentTerms() {
  const { advancePercent, balanceMilestone } = businessFacts.commercialPolicies.paymentTerms;
  const paymentSummary =
    advancePercent == null
      ? "Payment methods and milestones are confirmed in writing with each quotation."
      : `The standard split is ${advancePercent}% advance and ${100 - advancePercent}% balance. The balance is due ${balanceMilestone?.toLowerCase() ?? "as stated in your written quotation"}.`;

  return (
    <>
      <PageHero
        title="Payment Terms"
        text={`${paymentSummary} Review the payment details in your written quotation before approving production.`}
      />
      <section className="section-pad">
        <div className="container-site max-w-3xl space-y-6">
          <article className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <CreditCard className="size-8 text-secondary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold">Before you approve an order</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {paymentSummary} Check your quotation for the accepted payment method, production
              start point, and any shipping charges. Contact us if a term is unclear or missing.
            </p>
          </article>
          <div className="rounded-2xl border border-border bg-muted/40 p-6">
            <div className="flex items-start gap-3">
              <FileText className="mt-1 size-5 shrink-0 text-secondary" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-bold">Use the written quotation</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  The quotation for your order is the source for its payment schedule and scope. Do
                  not rely on a general percentage or milestone unless it appears in that quotation.
                </p>
              </div>
            </div>
          </div>
          <Button asChild>
            <Link to="/contact">Ask about payment terms</Link>
          </Button>
        </div>
      </section>
      <QuoteCTA />
    </>
  );
}
