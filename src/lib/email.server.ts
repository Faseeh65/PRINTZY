import { Resend } from "resend";
import { z } from "zod";
import { getServerEnv } from "@/lib/db";

const FROM_ADDRESS = "Printzy <sales@printzy.site>";
const OWNER_ADDRESS = "sales.printzy@gmail.com";
const CUSTOMER_SUBJECT = "We received your inquiry – Printzy";

export interface QuoteEmailDetails {
  name: string;
  email: string | null;
  business: string | null;
  phone: string;
  product: string;
  quantity: number;
  details: string | null;
}

function describeError(error: unknown): { name: string; message: string } {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return { name: "UnknownError", message: String(error) };
}

export async function sendQuoteEmails(lead: QuoteEmailDetails): Promise<void> {
  const apiKey = getServerEnv("RESEND_API_KEY");
  if (!apiKey?.trim()) {
    console.error("[quote-email] RESEND_API_KEY is not configured; skipping email notifications.");
    return;
  }

  const resend = new Resend(apiKey.trim());
  const templateId = getServerEnv("RESEND_TEMPLATE_ID")?.trim();
  const email = lead.email?.trim() ?? "";
  const validCustomerEmail = z.email().safeParse(email).success;
  const tasks: Promise<void>[] = [];

  if (!templateId) {
    console.error("[quote-email] RESEND_TEMPLATE_ID is not configured; skipping confirmation.");
  } else if (!validCustomerEmail) {
    console.error("[quote-email] Customer email is invalid; skipping confirmation.");
  } else {
    tasks.push(
      (async () => {
        try {
          const { error } = await resend.emails.send({
            from: FROM_ADDRESS,
            to: email,
            replyTo: OWNER_ADDRESS,
            subject: CUSTOMER_SUBJECT,
            template: {
              id: templateId,
              variables: {
                NAME: lead.name.trim() || "there",
                PRODUCT: lead.product.trim() || "custom packaging",
              },
            },
          });
          if (error) {
            console.error("[quote-email] Customer confirmation failed:", describeError(error));
          }
        } catch (error) {
          console.error("[quote-email] Customer confirmation failed:", describeError(error));
        }
      })(),
    );
  }

  tasks.push(
    (async () => {
      const text = [
        "New quote inquiry from printzy.site",
        `Name: ${lead.name.trim() || "there"}`,
        `Email: ${email || "Not provided"}`,
        `Business: ${lead.business?.trim() || "Not provided"}`,
        `Phone: ${lead.phone}`,
        `Product: ${lead.product.trim() || "custom packaging"}`,
        `Quantity: ${lead.quantity}`,
        `Message: ${lead.details?.trim() || "Not provided"}`,
      ].join("\n");

      try {
        const { error } = await resend.emails.send({
          from: FROM_ADDRESS,
          to: OWNER_ADDRESS,
          ...(validCustomerEmail ? { replyTo: email } : {}),
          subject: "New quote inquiry – Printzy",
          text,
        });
        if (error) {
          console.error("[quote-email] Owner notification failed:", describeError(error));
        }
      } catch (error) {
        console.error("[quote-email] Owner notification failed:", describeError(error));
      }
    })(),
  );

  await Promise.all(tasks);
}
