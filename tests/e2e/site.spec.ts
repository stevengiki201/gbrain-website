import { expect, test } from "@playwright/test";

test("home page renders the primary navigation and hero", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("navigation", { name: /main navigation/i }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /products/i }).first(),
  ).toBeVisible();
});

test("products page lists GBrain products", async ({ page }) => {
  await page.goto("/products");

  await expect(
    page.getByRole("heading", { name: /our products/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "GBrain Media Player" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "GBrain Neural System" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "ShuleBomba" })).toBeVisible();
});

test("ShuleBomba product links to Google Play and documentation", async ({
  page,
}) => {
  await page.goto("/products/shulebomba");

  await expect(page.getByRole("heading", { name: "ShuleBomba" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /get on google play/i }).first(),
  ).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en",
  );

  await page.goto("/docs/shulebomba/getting-started");
  await expect(
    page.getByRole("heading", { name: /getting started/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /download from google play/i }),
  ).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en",
  );
});

test("documentation index links to product guides", async ({ page }) => {
  await page.goto("/docs");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "GBrain SMS + AudioLink" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "ShuleBomba" })).toBeVisible();
});
