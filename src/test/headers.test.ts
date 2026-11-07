import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { addResponseHeaders, isHashedAsset, SECURITY_HEADERS } from "../server";

describe("Worker Response Headers & Caching", () => {
  it("includes all security headers on responses", () => {
    const request = new Request("https://printzy.site/");
    const initialResponse = new Response("<h1>Home</h1>", {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });

    const response = addResponseHeaders(initialResponse, request);

    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      expect(response.headers.get(key)).toBe(value);
    }
  });

  it("applies public HTML cache policy for SSR HTML GET requests", () => {
    const request = new Request("https://printzy.site/products");
    const initialResponse = new Response("<h1>Products</h1>", {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });

    const response = addResponseHeaders(initialResponse, request);

    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    );
  });

  it("sets immutable 1-year cache for hashed assets under /assets/*", () => {
    const request = new Request("https://printzy.site/assets/index-DQyM6KKK.js");
    const initialResponse = new Response("console.log('test')", {
      status: 200,
      headers: { "Content-Type": "application/javascript" },
    });

    const response = addResponseHeaders(initialResponse, request);

    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=31536000, immutable",
    );
  });

  it("identifies hashed asset paths correctly with isHashedAsset", () => {
    expect(isHashedAsset("/assets/index-DQyM6KKK.js")).toBe(true);
    expect(isHashedAsset("/assets/styles-DQQmY9u_.css")).toBe(true);
    expect(isHashedAsset("/assets/font-Abc123_4.woff2")).toBe(true);
    // Non-hashed assets must return false
    expect(isHashedAsset("/images/logo.png")).toBe(false);
    expect(isHashedAsset("/favicon.ico")).toBe(false);
    expect(isHashedAsset("/sitemap.xml")).toBe(false);
    expect(isHashedAsset("/assets/logo.png")).toBe(false); // No hash
  });

  it("sets no-store for error responses (400, 404, 500)", () => {
    const notFoundRequest = new Request("https://printzy.site/non-existent");
    const notFoundResponse = addResponseHeaders(
      new Response("Not Found", { status: 404, headers: { "Content-Type": "text/html" } }),
      notFoundRequest,
    );
    expect(notFoundResponse.headers.get("Cache-Control")).toBe("no-store");

    const errorRequest = new Request("https://printzy.site/server-error");
    const errorResponse = addResponseHeaders(
      new Response("Internal Error", { status: 500, headers: { "Content-Type": "text/html" } }),
      errorRequest,
    );
    expect(errorResponse.headers.get("Cache-Control")).toBe("no-store");
  });

  it("sets no-store for mutations (POST, PUT, DELETE, PATCH)", () => {
    const postRequest = new Request("https://printzy.site/api/quote", { method: "POST" });
    const postResponse = addResponseHeaders(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
      postRequest,
    );
    expect(postResponse.headers.get("Cache-Control")).toBe("no-store");
  });

  it("sets no-store when Set-Cookie header is present", () => {
    const request = new Request("https://printzy.site/login");
    const initialResponse = new Response("<h1>Login</h1>", {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Set-Cookie": "session=abc; HttpOnly; Secure",
      },
    });

    const response = addResponseHeaders(initialResponse, request);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });
});

describe("Static Assets _headers Configuration", () => {
  const headersFilePath = resolve(__dirname, "../../public/_headers");

  it("contains public/_headers configuration file", () => {
    expect(existsSync(headersFilePath)).toBe(true);
  });

  it("defines cache policies for static non-hashed assets and security headers", () => {
    const content = readFileSync(headersFilePath, "utf-8");

    // Global security headers
    expect(content).toContain("X-Frame-Options: DENY");
    expect(content).toContain("X-Content-Type-Options: nosniff");
    expect(content).toContain("Content-Security-Policy:");

    // Static asset rules
    expect(content).toContain("/images/*");
    expect(content).toContain("Cache-Control: public, max-age=86400, stale-while-revalidate=604800");

    expect(content).toContain("/favicon.ico");
    expect(content).toContain("/sitemap.xml");
    expect(content).toContain("Cache-Control: public, max-age=3600, must-revalidate");
    expect(content).toContain("/robots.txt");

    // Ensure /assets/* is NOT duplicated in public/_headers (Nitro appends it automatically)
    expect(content).not.toContain("/assets/*");
  });
});

