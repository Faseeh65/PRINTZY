import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog";
import { getProductExportBrief, products } from "@/data/products";

const exportGuideSlugs = [
  "import-custom-printed-packaging-from-pakistan",
  "private-label-paper-cups-food-boxes-artwork-proofing",
  "custom-packaging-moq-quotes-overseas-buyers",
];

function getVisibleWordCount(post: (typeof blogPosts)[number]): number {
  const content = [
    post.title,
    post.summary,
    ...post.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.checklist?.items ?? []),
    ]),
  ].join(" ");

  return content.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

describe("international export content", () => {
  it("provides product-specific export guidance for every product", () => {
    for (const product of products) {
      const brief = getProductExportBrief(product.slug);

      expect(brief?.heading).toContain(product.title.split(" ")[0]);
      expect(brief?.introduction.trim().length).toBeGreaterThan(0);
      expect(brief?.checklist.length).toBeGreaterThanOrEqual(3);
    }

    const introductions = products.map(
      (product) => getProductExportBrief(product.slug)?.introduction,
    );
    expect(new Set(introductions).size).toBe(products.length);
  });

  it("includes three substantial export guides with an identified author and reviewer", () => {
    const guides = exportGuideSlugs.map((slug) => blogPosts.find((post) => post.slug === slug));

    expect(guides.every(Boolean)).toBe(true);
    for (const post of guides) {
      if (!post) continue;

      expect(getVisibleWordCount(post), post.slug).toBeGreaterThanOrEqual(900);
      expect(getVisibleWordCount(post), post.slug).toBeLessThanOrEqual(1400);
      expect(post.author).toEqual({ name: "Faizan Ali", role: "Owner" });
      expect(post.reviewer).toEqual({ name: "Faizan Ali", role: "Owner" });
      expect(post.publishedDate).toBe("2026-11-17");
      expect(post.updatedDate).toBe("2026-11-17");
      expect(post.sections.some((section) => section.exportHubLink)).toBe(true);
      expect(post.relatedProductSlugs.length).toBeGreaterThan(0);
    }
  });

  it("keeps product and blog SEO titles and descriptions unique", () => {
    const seoEntries = [
      ...products.map(({ metaTitle, metaDescription }) => ({
        title: metaTitle,
        description: metaDescription,
      })),
      ...blogPosts.map(({ seoTitle, metaDescription }) => ({
        title: seoTitle,
        description: metaDescription,
      })),
    ];

    expect(new Set(seoEntries.map(({ title }) => title)).size).toBe(seoEntries.length);
    expect(new Set(seoEntries.map(({ description }) => description)).size).toBe(seoEntries.length);
  });

  it("lists all new guides in the sitemap", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");

    for (const slug of exportGuideSlugs) {
      expect(sitemap).toContain(`https://printzy.site/blog/${slug}`);
    }
  });
});
