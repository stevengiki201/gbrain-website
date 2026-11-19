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

  await expect(page.getByRole("heading", { name: "ShuleBomba", exact: true })).toBeVisible();
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

test("PhoneLink product links to the web dashboard", async ({ page }) => {
  await page.goto("/products/phonelink");

  await expect(
    page.getByRole("link", { name: /open web dashboard/i }),
  ).toHaveAttribute("href", "http://phonelink.localhost:7842");
  await expect(
    page.getByRole("heading", { name: /open the PhoneLink web dashboard/i }),
  ).toBeVisible();
});

test("documentation index links to product guides", async ({ page }) => {
  await page.goto("/docs");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "GBrain SMS + AudioLink" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "ShuleBomba" })).toBeVisible();
});

test("admin can open the company console", async ({ page }) => {
  await page.goto("/dashboard/sms/login");
  await page.getByRole("textbox", { name: "Email" }).fill(process.env.E2E_ADMIN_EMAIL ?? "admin@example.com");
  await page.getByLabel("Password", { exact: true }).fill(process.env.E2E_ADMIN_PASSWORD ?? "local-admin-password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  await expect(page).toHaveURL(/\/dashboard\/sms$/);
  await page.getByRole("link", { name: "Admin console" }).click();

  await expect(page).toHaveURL(/\/dashboard\/admin$/);
  await expect(page.getByRole("heading", { name: "Administrator console" })).toBeVisible();
  await expect(page.getByText("Service health")).toBeVisible();

  await page.getByRole("button", { name: "Users", exact: true }).click();
  await expect(page.getByRole("heading", { name: "User access" })).toBeVisible();

  await page.getByRole("button", { name: "Services", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Register service" })).toBeVisible();
});
