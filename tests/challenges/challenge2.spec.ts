import { test, expect } from "@playwright/test";

test("Products are sort from low to high", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: /login/i }).click();

  // Verify login succeeded
  await expect(page).toHaveURL(/inventory.html/);

  // Verify dropdown is present
  const sortDropdown = page.locator('[data-test="product-sort-container"]');

  await sortDropdown.selectOption("lohi");

  const prices = await page.locator(".inventory_item_price").allTextContents();

  const priceValues = prices.map((p) => Number(p.replace("$", "")));

  expect(priceValues[0]).toBe(Math.min(...priceValues));
});
