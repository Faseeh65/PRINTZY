import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

// Mock @neondatabase/serverless before importing db module
const mockSql = vi.fn();
vi.mock("@neondatabase/serverless", () => ({
  neon: vi.fn(() => mockSql),
}));

import { createQuoteRequest, serverQuoteSchema } from "@/lib/db";
import { getEnvConfig } from "@/lib/env";
import { QUOTE_TURNSTILE_ACTION } from "@/config/security";

describe("Database Quote Operations (Mocked)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      DATABASE_URL_POOLED: "postgres://mock_user:mock_pass@mock-host.neondb/db?sslmode=require",
      TURNSTILE_SECRET_KEY: "mock_turnstile_secret_key",
    };

    // Default global fetch mock for Turnstile siteverify
    const expectedHostname = new URL(getEnvConfig().siteUrl).hostname;
    global.fetch = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            success: true,
            hostname: expectedHostname,
            action: QUOTE_TURNSTILE_ACTION,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("fails server-side validation on invalid phone format", async () => {
    const invalidInput = {
      customer_name: "John Doe",
      phone: "invalid!phone!1234", // fails regex ^[0-9 +()-]{7,30}$
      email: "john@example.com",
      product_id: "custom-boxes",
      quantity: 500,
      turnstileToken: "valid_token",
    };

    await expect(createQuoteRequest(invalidInput)).rejects.toThrow("Invalid phone number format.");
  });

  it("fails server-side validation on missing customer name", async () => {
    const invalidInput = {
      customer_name: "   ",
      phone: "+92 300 1234567",
      email: "jane@example.com",
      product_id: "custom-boxes",
      quantity: 500,
      turnstileToken: "valid_token",
    };

    await expect(createQuoteRequest(invalidInput)).rejects.toThrow("Name is required.");
  });

  it("rejects quote submission when Turnstile verification fails", async () => {
    global.fetch = vi.fn(
      async () =>
        new Response(
          JSON.stringify({ success: false, "error-codes": ["invalid-input-response"] }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
    ) as unknown as typeof fetch;

    const input = {
      customer_name: "John Doe",
      phone: "+92 300 1234567",
      email: "john@example.com",
      product_id: "custom-boxes",
      quantity: 500,
      turnstileToken: "bad_token",
    };

    await expect(createQuoteRequest(input)).rejects.toThrow(
      "Security verification failed. Please complete the CAPTCHA and try again.",
    );
  });

  it.each([
    { hostname: "attacker.example", action: QUOTE_TURNSTILE_ACTION },
    { hostname: new URL(getEnvConfig().siteUrl).hostname, action: "other_action" },
  ])("rejects Turnstile tokens issued for the wrong host or action", async (responseData) => {
    global.fetch = vi.fn(
      async () =>
        new Response(JSON.stringify({ success: true, ...responseData }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
    ) as unknown as typeof fetch;

    const input = {
      customer_name: "John Doe",
      phone: "+92 300 1234567",
      email: "john@example.com",
      product_id: "custom-boxes",
      quantity: 500,
      turnstileToken: "wrong-context-token",
    };

    await expect(createQuoteRequest(input)).rejects.toThrow(
      "Security verification failed. Please complete the CAPTCHA and try again.",
    );
    expect(mockSql).not.toHaveBeenCalled();
  });

  it("rejects quote submission when product is not found in database", async () => {
    // Mock SQL lookup returning no rows
    mockSql.mockResolvedValueOnce([]);

    const input = {
      customer_name: "Jane Smith",
      phone: "+92 321 9876543",
      email: "jane@example.com",
      product_id: "non-existent-product",
      quantity: 500,
      turnstileToken: "token_abc",
    };

    await expect(createQuoteRequest(input)).rejects.toThrow(
      "The selected product could not be found.",
    );
  });

  it("resolves the Custom Paper Cups frontend slug before querying the database", async () => {
    mockSql.mockResolvedValueOnce([
      {
        id: "77777777-7777-7777-7777-777777777777",
        slug: "cups",
        title: "Cups & Glasses",
        min_quantity: 100,
        is_active: true,
      },
    ]);
    mockSql.mockResolvedValueOnce([
      {
        id: "88888888-8888-8888-8888-888888888888",
        customer_name: "Jane Smith",
        business_name: null,
        phone: "+92 321 9876543",
        email: "jane@example.com",
        product_id: "77777777-7777-7777-7777-777777777777",
        quantity: 500,
        details: null,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    await createQuoteRequest({
      customer_name: "Jane Smith",
      phone: "+92 321 9876543",
      email: "jane@example.com",
      product_id: "custom-paper-cups",
      quantity: 500,
      turnstileToken: "valid_token",
    });

    expect(mockSql.mock.calls[0]?.[1]).toBe("cups");
    expect(mockSql).toHaveBeenCalledTimes(2);
  });

  it("rejects quote submission when product is marked inactive", async () => {
    mockSql.mockResolvedValueOnce([
      {
        id: "11111111-1111-1111-1111-111111111111",
        slug: "discontinued-cups",
        title: "Discontinued Cups",
        min_quantity: 100,
        is_active: false,
      },
    ]);

    const input = {
      customer_name: "Jane Smith",
      phone: "+92 321 9876543",
      email: "jane@example.com",
      product_id: "discontinued-cups",
      quantity: 500,
      turnstileToken: "token_abc",
    };

    await expect(createQuoteRequest(input)).rejects.toThrow(
      'The product "Discontinued Cups" is currently not available.',
    );
  });

  it("rejects quote submission when requested quantity is below product minimum", async () => {
    mockSql.mockResolvedValueOnce([
      {
        id: "22222222-2222-2222-2222-222222222222",
        slug: "custom-boxes",
        title: "Custom Boxes",
        min_quantity: 500,
        is_active: true,
      },
    ]);

    const input = {
      customer_name: "Jane Smith",
      phone: "+92 321 9876543",
      email: "jane@example.com",
      product_id: "custom-boxes",
      quantity: 100, // below min 500
      turnstileToken: "token_abc",
    };

    await expect(createQuoteRequest(input)).rejects.toThrow(
      "Minimum order quantity for Custom Boxes is 500. You requested 100.",
    );
  });

  it("successfully creates quote request and returns persisted row", async () => {
    const mockProduct = {
      id: "33333333-3333-3333-3333-333333333333",
      slug: "printed-cups",
      title: "Printed Cups",
      min_quantity: 250,
      is_active: true,
    };

    const mockCreatedQuote = {
      id: "44444444-4444-4444-4444-444444444444",
      customer_name: "Alice Johnson",
      business_name: "Alice Coffee Co.",
      phone: "+92 300 5556677",
      email: "alice@example.com",
      product_id: mockProduct.id,
      quantity: 1000,
      details: "Need double-wall cups with matte finish.",
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // 1st query: product lookup
    mockSql.mockResolvedValueOnce([mockProduct]);
    // 2nd query: insert quote request
    mockSql.mockResolvedValueOnce([mockCreatedQuote]);

    const input = {
      customer_name: "Alice Johnson",
      business_name: "Alice Coffee Co.",
      phone: "+92 300 5556677",
      email: "alice@example.com",
      product_id: "printed-cups",
      quantity: 1000,
      details: "Need double-wall cups with matte finish.",
      turnstileToken: "valid_turnstile_token",
    };

    const result = await createQuoteRequest(input);

    expect(result).toEqual(mockCreatedQuote);
    expect(mockSql).toHaveBeenCalledTimes(2);
  });

  it("rejects more than the per-email quote request limit", async () => {
    mockSql.mockResolvedValueOnce([
      {
        id: "33333333-3333-3333-3333-333333333333",
        slug: "printed-cups",
        title: "Printed Cups",
        min_quantity: 250,
        is_active: true,
      },
    ]);
    mockSql.mockResolvedValueOnce([]);

    const input = {
      customer_name: "Alice Johnson",
      phone: "+92 300 5556677",
      email: "alice@example.com",
      product_id: "printed-cups",
      quantity: 1000,
      turnstileToken: "valid_turnstile_token",
    };

    await expect(createQuoteRequest(input)).rejects.toThrow(
      "Too many quote requests for this email. Please try again later.",
    );
  });
});
