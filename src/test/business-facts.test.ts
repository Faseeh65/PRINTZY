import { describe, it, expect } from "vitest";
import {
  businessFacts,
  buildWhatsAppUrl,
  getProductMoqDisplay,
  getProductLeadTimeDisplay,
} from "@/config/business-facts";

describe("Business Facts & WhatsApp Deep Link Safety", () => {
  it("builds a WhatsApp URL with exactly ONE well-formed ?text= parameter", () => {
    const url = buildWhatsAppUrl("Hi Printzy, I am interested in custom printed paper cups.");
    expect(url).toMatch(/^https:\/\/wa\.me\/923219091707\?text=/);

    // Verify there is only one '?' in the entire URL
    const questionMarks = (url.match(/\?/g) || []).length;
    expect(questionMarks).toBe(1);

    // Verify there are no double text= parameters
    const textMatches = (url.match(/\?text=|\&text=/g) || []).length;
    expect(textMatches).toBe(1);

    // Verify properly URL-encoded
    expect(url).toContain(encodeURIComponent("Hi Printzy, I am interested in custom printed paper cups."));
  });

  it("uses default message when no custom text is provided", () => {
    const url = buildWhatsAppUrl();
    expect(url).toBe(
      "https://wa.me/923219091707?text=Hello%20Printzy%2C%20I%20would%20like%20a%20quote%20for%20custom%20packaging."
    );
  });

  it("provides honest fallback MOQ copy when value is null without leaking raw placeholders", () => {
    const moqText = getProductMoqDisplay("custom-paper-cups");
    expect(moqText).not.toContain("[");
    expect(moqText).not.toContain("confirm");
    expect(moqText).not.toContain("TODO");
    expect(typeof moqText).toBe("string");
    expect(moqText.length).toBeGreaterThan(10);
  });

  it("provides clean lead time display without placeholders", () => {
    const leadTime = getProductLeadTimeDisplay("custom-pizza-boxes");
    expect(leadTime).not.toContain("[");
    expect(leadTime).not.toContain("confirm");
  });

  it("ensures unverified social proof counts remain null rather than displaying fabricated metrics", () => {
    expect(businessFacts.proofStats.brandsServed).toBeNull();
  });
});

