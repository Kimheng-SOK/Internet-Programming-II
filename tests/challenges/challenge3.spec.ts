import { test, expect } from "@playwright/test";

test("logout user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: /login/i }).click();

  // logout
  await page.click("#react-burger-menu-btn");

  await page.click('[data-test="logout-sidebar-link"]');

  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
