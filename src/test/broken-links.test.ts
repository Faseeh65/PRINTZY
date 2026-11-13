import { describe, it, expect } from "vitest";
import { navLinks, site } from "@/data/site";
import { products } from "@/data/products";
import { industryDetails } from "@/data/industry-details";
import { cityDetails } from "@/data/city-details";
import { blogPosts } from "@/data/blog";
import { routeTree } from "../routeTree.gen";
import fs from "node:fs";
import path from "node:path";

const normalizePath = (routePath: string) =>
  routePath === "/" ? routePath : routePath.replace(/\/+$/, "");

const routeTemplates = new Set(
  Object.values(routeTree.children ?? {})
    .map((route) => route.options.path)
    .filter((routePath): routePath is string => typeof routePath === "string")
    .map(normalizePath),
);

const REGISTERED_ROUTES = new Set([
  ...routeTemplates,
  ...(routeTemplates.has("/blog/$slug") ? blogPosts.map((post) => `/blog/${post.slug}`) : []),
  ...(routeTemplates.has("/cities/$slug")
    ? Object.keys(cityDetails).map((slug) => `/cities/${slug}`)
    : []),
  ...(routeTemplates.has("/industries/$slug")
    ? Object.keys(industryDetails).map((slug) => `/industries/${slug}`)
    : []),
  ...(routeTemplates.has("/products/$slug")
    ? products.map((product) => `/products/${product.slug}`)
    : []),
]);

describe("Link Integrity & Broken Link Verification", () => {
  it("verifies all navigation links match registered valid routes", () => {
    for (const link of navLinks) {
      expect(REGISTERED_ROUTES.has(link.to)).toBe(true);
    }
  });

  it("verifies sitemap.xml URLs map to registered routes without 404s", () => {
    const sitemapPath = path.resolve(__dirname, "../../public/sitemap.xml");
    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");

    // Extract all <loc> elements
    const locMatches = sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g);
    const urls = Array.from(locMatches, (m) => m[1]);

    expect(urls.length).toBeGreaterThan(0);

    for (const rawUrl of urls) {
      if (!rawUrl) continue;
      const parsed = new URL(rawUrl);
      const pathname = parsed.pathname;
      expect(REGISTERED_ROUTES.has(pathname)).toBe(true);
    }
  });

  it("verifies WhatsApp and phone links in site configuration are well-formed", () => {
    expect(site.whatsapp).toMatch(/^https:\/\/wa\.me\/92\d{10}/);
    expect(site.phoneHref).toMatch(/^tel:\+92\d{10}$/);
    expect(site.email).toMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  });

  it("verifies all product slugs are unique and valid target parameters", () => {
    const slugs = new Set<string>();
    for (const p of products) {
      expect(slugs.has(p.slug)).toBe(false);
      slugs.add(p.slug);
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });
});
