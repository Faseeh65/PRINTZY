import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import {
  pushToDataLayer,
  trackGtmPageView,
  trackGtmQuoteSubmit,
  trackGtmWhatsAppClick,
} from "@/lib/gtm";
import * as fs from "fs";
import * as path from "path";

// Mock TanStack Router's Link for isolated component tests
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({
      children,
      to,
      href,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to?: string }) => (
      <a href={to || href} {...props}>
        {children}
      </a>
    ),
  };
});

import { Footer } from "@/components/site/Layout";

describe("Hydration & SSR Consistency", () => {
  describe("Footer Copyright Year", () => {
    it("renders deterministic year 2026 in client DOM", () => {
      const { container } = render(<Footer />);
      const copyright = container.querySelector("footer .border-t p");
      expect(copyright?.textContent).toContain("© 2026 Printzy. All rights reserved.");
      expect(copyright?.textContent).not.toContain("1970");
    });

    it("renders deterministic year 2026 in SSR HTML (renderToString)", () => {
      const html = renderToString(<Footer />);
      expect(html).toContain("2026");
      expect(html).not.toContain("1970");
      expect(html).toContain("© 2026 Printzy. All rights reserved.");
    });

    it("verifies Layout.tsx source declares a deterministic year constant rather than new Date()", () => {
      const layoutPath = path.resolve(__dirname, "../components/site/Layout.tsx");
      const layoutContent = fs.readFileSync(layoutPath, "utf-8");

      expect(layoutContent).not.toMatch(/CURRENT_YEAR\s*=\s*new\s+Date\(\)\.getFullYear\(\)/);
      expect(layoutContent).toMatch(/CURRENT_YEAR\s*=\s*2026/);
    });
  });

  describe("GTM Noscript & RootShell Hydration Safety", () => {
    it("ensures __root.tsx uses dangerouslySetInnerHTML for noscript to avoid #418", () => {
      const rootPath = path.resolve(__dirname, "../routes/__root.tsx");
      const rootContent = fs.readFileSync(rootPath, "utf-8");

      // Verify <noscript> does NOT contain nested JSX <iframe
      expect(rootContent).not.toMatch(/<noscript>\s*<iframe/i);

      // Verify <noscript> uses dangerouslySetInnerHTML
      expect(rootContent).toMatch(
        /<noscript\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*`<iframe[^>]+googletagmanager\.com\/ns\.html/,
      );
    });

    it("ensures __root.tsx includes suppressHydrationWarning on html and body", () => {
      const rootPath = path.resolve(__dirname, "../routes/__root.tsx");
      const rootContent = fs.readFileSync(rootPath, "utf-8");

      expect(rootContent).toMatch(/<html[^>]*\ssuppressHydrationWarning/);
      expect(rootContent).toMatch(/<body[^>]*\ssuppressHydrationWarning/);
    });
  });

  describe("GTM dataLayer Buffering & Tracking", () => {
    beforeEach(() => {
      // @ts-expect-error Reset dataLayer for testing
      delete window.dataLayer;
    });

    afterEach(() => {
      // @ts-expect-error Cleanup
      delete window.dataLayer;
    });

    it("initializes window.dataLayer when pushing custom events", () => {
      expect(window.dataLayer).toBeUndefined();
      pushToDataLayer({ event: "custom_quote_click", quoteId: "123" });
      expect(window.dataLayer).toBeDefined();
      expect(window.dataLayer.length).toBe(1);
      expect(window.dataLayer[0]).toEqual({ event: "custom_quote_click", quoteId: "123" });
    });

    it("pushes virtual page_view event on route changes", () => {
      document.title = "Printzy - Custom Packaging";
      trackGtmPageView("/custom-boxes", "Custom Boxes Page");

      expect(window.dataLayer).toBeDefined();
      expect(window.dataLayer.length).toBe(1);
      expect(window.dataLayer[0]).toEqual({
        event: "page_view",
        page_path: "/custom-boxes",
        page_title: "Custom Boxes Page",
      });
    });

    it("preserves pre-existing events in dataLayer", () => {
      window.dataLayer = [{ event: "gtm.js" }];
      trackGtmPageView("/pricing");

      expect(window.dataLayer.length).toBe(2);
      expect(window.dataLayer[0]).toEqual({ event: "gtm.js" });
      expect(window.dataLayer[1]?.["event"]).toBe("page_view");
    });

    it("pushes quote_submit conversion event to dataLayer", () => {
      trackGtmQuoteSubmit({ product: "custom-pizza-boxes", quantity: "1000" });

      expect(
        window.dataLayer.some(
          (e) => e["event"] === "quote_submit" && e["product"] === "custom-pizza-boxes",
        ),
      ).toBe(true);
    });

    it("pushes whatsapp_click event to dataLayer", () => {
      trackGtmWhatsAppClick("hero_button");

      expect(
        window.dataLayer.some(
          (e) => e["event"] === "whatsapp_click" && e["click_location"] === "hero_button",
        ),
      ).toBe(true);
    });
  });
});
