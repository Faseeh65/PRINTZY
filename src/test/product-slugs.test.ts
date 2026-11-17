import { describe, expect, it } from "vitest";
import { resolveDatabaseProductSlug } from "@/data/products";

describe("database product slug resolution", () => {
  it.each([
    ["custom-paper-cups", "cups"],
    ["custom-pizza-boxes", "pizza-food-boxes"],
    ["custom-takeaway-packaging", "takeaway"],
    ["custom-paper-bags", "paper-bags"],
    ["custom-napkins-tissues", "tissues"],
    ["cup-sleeves-stickers", "sleeves-stickers"],
  ])("resolves %s to the database slug %s", (frontendSlug, databaseSlug) => {
    expect(resolveDatabaseProductSlug(frontendSlug)).toBe(databaseSlug);
  });

  it.each(["custom-mailer-gift-boxes", "custom-food-boxes"])(
    "leaves unconfirmed slug %s unresolved",
    (frontendSlug) => {
      expect(resolveDatabaseProductSlug(frontendSlug)).toBe(frontendSlug);
    },
  );
});
