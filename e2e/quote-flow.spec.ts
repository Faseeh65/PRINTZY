import { test, expect, type Page } from "@playwright/test";

async function openQuotePage(page: Page, turnstileMode?: "pending" | "verified") {
  if (turnstileMode) {
    await page.addInitScript((mode) => {
      window.turnstile = {
        render: (_container, options) => {
          const callback = options["callback"];
          if (mode === "verified" && typeof callback === "function") {
            (callback as (token: string) => void)("test-turnstile-token");
          }
          document.documentElement.dataset["quoteTurnstileTestToken"] = "ready";
          return "test-widget";
        },
        reset: () => undefined,
      };
    }, turnstileMode);
  }

  await page.goto("/quote");
  await expect(page.locator("h1")).toBeVisible();
  if (turnstileMode) {
    await page.waitForFunction(
      () => document.documentElement.dataset["quoteTurnstileTestToken"] === "ready",
    );
  }
}

test.describe("Quote Request Critical Flow", () => {
  test("displays the current quote request form", async ({ page }) => {
    await openQuotePage(page);

    await expect(page.locator("h1")).toContainText(/Get a Free Quote/i);
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="business"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="quantity"]')).toBeVisible();
    await expect(page.locator('select[name="product"]')).toBeVisible();
    await expect(page.locator('textarea[name="details"]')).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit Quote Request" })).toBeVisible();
  });

  test("requires CAPTCHA verification before processing a submission", async ({ page }) => {
    await openQuotePage(page, "pending");

    await page.getByRole("button", { name: "Submit Quote Request" }).click();

    await expect(page.locator('p[role="alert"]')).toContainText(
      /complete the security verification/i,
    );
  });

  test("shows validation error when required fields are missing", async ({ page }) => {
    await openQuotePage(page, "verified");

    await page.getByRole("button", { name: "Submit Quote Request" }).click();

    await expect(page.locator('p[role="alert"]')).toContainText(/Please enter your name/i);
  });

  test("shows validation error when invalid phone is provided", async ({ page }) => {
    await openQuotePage(page, "verified");
    await page.locator('input[name="name"]').fill("Test Buyer");
    await page.locator('input[name="email"]').fill("buyer@example.com");
    await page.locator('input[name="phone"]').fill("123");
    await page.locator('input[name="quantity"]').fill("2500");
    await page.locator('select[name="product"]').selectOption({ index: 1 });

    await page.getByRole("button", { name: "Submit Quote Request" }).click();

    await expect(page.locator('p[role="alert"]')).toContainText(/Please enter a valid phone/i);
  });
});
