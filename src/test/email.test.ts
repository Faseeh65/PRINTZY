import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendQuoteEmails } from "@/lib/email.server";

describe("quote email notifications", () => {
  const originalEnv = process.env;
  const originalFetch = globalThis.fetch;
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      RESEND_API_KEY: "re_test_key",
      RESEND_TEMPLATE_ID: "quote-confirmation-template",
    };
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ id: "email_test_id" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    globalThis.fetch = fetchMock;
  });

  afterEach(() => {
    process.env = originalEnv;
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("sends a template confirmation and a plain-text owner notification", async () => {
    await sendQuoteEmails({
      name: "Ayesha Khan",
      email: "ayesha@example.com",
      business: "Cafe Ayesha",
      phone: "+92 321 1234567",
      product: "Custom Paper Cups",
      quantity: 1000,
      details: "Double-wall, matte finish",
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const payloads = fetchMock.mock.calls.map(
      ([, init]) => JSON.parse(String(init?.body)) as Record<string, unknown>,
    );
    const customerEmail = payloads.find((payload) => payload["to"] === "ayesha@example.com");
    const ownerEmail = payloads.find((payload) => payload["to"] === "sales.printzy@gmail.com");

    expect(customerEmail).toMatchObject({
      from: "Printzy <sales@printzy.site>",
      reply_to: "sales.printzy@gmail.com",
      subject: "We received your inquiry – Printzy",
      template: {
        id: "quote-confirmation-template",
        variables: { NAME: "Ayesha Khan", PRODUCT: "Custom Paper Cups" },
      },
    });
    expect(ownerEmail).toMatchObject({
      to: "sales.printzy@gmail.com",
      subject: "New quote inquiry – Printzy",
      text: expect.stringContaining("Double-wall, matte finish"),
    });
    expect(ownerEmail?.["text"]).toContain("ayesha@example.com");
  });

  it("keeps the lead flow non-blocking when Resend returns an error", async () => {
    const logError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ name: "validation_error", message: "Send failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await expect(
      sendQuoteEmails({
        name: "Ayesha Khan",
        email: "ayesha@example.com",
        business: null,
        phone: "+92 321 1234567",
        product: "Custom Paper Cups",
        quantity: 1000,
        details: null,
      }),
    ).resolves.toBeUndefined();

    expect(logError).toHaveBeenCalled();
  });

  it("does not attempt email delivery when the API key is missing", async () => {
    process.env["RESEND_API_KEY"] = "";
    const logError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    await expect(
      sendQuoteEmails({
        name: "Ayesha Khan",
        email: "ayesha@example.com",
        business: null,
        phone: "+92 321 1234567",
        product: "Custom Paper Cups",
        quantity: 1000,
        details: null,
      }),
    ).resolves.toBeUndefined();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(logError).toHaveBeenCalled();
  });

  it("skips customer confirmation for an invalid address", async () => {
    await sendQuoteEmails({
      name: "Ayesha Khan",
      email: "invalid-address",
      business: null,
      phone: "+92 321 1234567",
      product: "Custom Paper Cups",
      quantity: 1000,
      details: null,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body)) as Record<
      string,
      unknown
    >;
    expect(payload["to"]).toBe("sales.printzy@gmail.com");
  });
});
