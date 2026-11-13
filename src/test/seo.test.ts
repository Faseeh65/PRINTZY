import { describe, expect, it } from "vitest";
import { getCanonicalRedirectUrl, seo } from "@/lib/seo";
import { site } from "@/data/site";

describe("SEO Meta Generator", () => {
  it("generates correct title, description, and canonical URL", () => {
    const metaObj = seo({
      title: "Test Title",
      description: "Test Description",
      path: "/about",
    });

    const metaArray = metaObj.meta;
    expect(metaArray).toContainEqual({ title: "Test Title" });
    expect(metaArray).toContainEqual({ name: "description", content: "Test Description" });
    expect(metaArray).toContainEqual({ property: "og:url", content: `${site.url}/about` });
    expect(metaArray).toContainEqual({ property: "og:title", content: "Test Title" });
    expect(metaArray).toContainEqual({ name: "twitter:card", content: "summary_large_image" });
    expect(metaArray).toContainEqual({ name: "twitter:description", content: "Test Description" });
    expect(metaArray).toContainEqual({ property: "og:image", content: `${site.url}/og-image.jpg` });

    const linkArray = metaObj.links;
    expect(linkArray).toContainEqual({ rel: "canonical", href: `${site.url}/about` });
    expect(metaObj.scripts).toHaveLength(1);
    expect(metaObj.scripts[0]?.children).toContain('"@type":"BreadcrumbList"');
  });

  it("supports noindex metadata and additional page structured data", () => {
    const metaObj = seo({
      title: "Private page",
      description: "Not for search results.",
      path: "/quote",
      robots: "noindex, follow",
      structuredData: { "@type": "Product", name: "Custom box" },
    });

    expect(metaObj.meta).toContainEqual({ name: "robots", content: "noindex, follow" });
    expect(metaObj.scripts).toHaveLength(2);
    expect(metaObj.scripts[1]?.children).toContain('"@type":"Product"');
  });

  it("generates 3-tier BreadcrumbList for /products/[slug] routes", () => {
    const metaObj = seo({
      title: "Custom Printed Paper Cups with Logo Pakistan | Printzy",
      description: "Custom paper cups",
      path: "/products/custom-paper-cups",
    });

    expect(metaObj.scripts).toHaveLength(1);
    const breadcrumb = JSON.parse(metaObj.scripts[0]?.children ?? "{}");
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement).toHaveLength(3);
    expect(breadcrumb.itemListElement[0].name).toBe("Home");
    expect(breadcrumb.itemListElement[1].name).toBe("Products");
    expect(breadcrumb.itemListElement[2].name).toBe("Custom Printed Paper Cups with Logo Pakistan");
  });
});

describe("Canonical redirects", () => {
  it("redirects www to apex canonical host and preserves path and query", () => {
    const redirect = getCanonicalRedirectUrl(
      new Request("https://www.printzy.site/quote?product=cups&qty=500"),
    );

    expect(redirect).toBe("https://printzy.site/quote?product=cups&qty=500");
  });

  it("redirects legacy printzy.pk domains to printzy.site and preserves path and query", () => {
    const redirectApex = getCanonicalRedirectUrl(
      new Request("https://printzy.pk/quote?product=cups"),
    );
    expect(redirectApex).toBe("https://printzy.site/quote?product=cups");

    const redirectWww = getCanonicalRedirectUrl(new Request("https://www.printzy.pk/about"));
    expect(redirectWww).toBe("https://printzy.site/about");
  });

  it("redirects http to https on canonical host", () => {
    const redirect = getCanonicalRedirectUrl(new Request("http://printzy.site/products"));

    expect(redirect).toBe("https://printzy.site/products");
  });

  it("does not redirect canonical HTTPS or local/preview development requests", () => {
    expect(getCanonicalRedirectUrl(new Request("https://printzy.site/products"))).toBeUndefined();
    expect(getCanonicalRedirectUrl(new Request("http://localhost:5173/products"))).toBeUndefined();
    expect(getCanonicalRedirectUrl(new Request("http://127.0.0.1:3000/products"))).toBeUndefined();
    expect(
      getCanonicalRedirectUrl(new Request("https://printzy.workers.dev/products")),
    ).toBeUndefined();
    expect(
      getCanonicalRedirectUrl(new Request("https://branch.pages.dev/products")),
    ).toBeUndefined();
    expect(
      getCanonicalRedirectUrl(new Request("https://deploy-preview-1.netlify.app/products")),
    ).toBeUndefined();
  });
});
