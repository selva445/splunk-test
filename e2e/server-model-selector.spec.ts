import { test, expect } from "@playwright/test";

test.describe("Server Composer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");//local server hardcoded but will be process.env in production
  });

  test("should display the main title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Server Composer" })
    ).toBeVisible();
  });

  test('should show "No Options" when submitting empty form', async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("No Options")).toBeVisible();
  });

  test("should show error for invalid memory format", async ({ page }) => {
    await page.getByLabel("Memory Size (MB, comma-separated)").fill("abc,def");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page.getByText("Invalid memory format. Use comma separated integers.")
    ).toBeVisible();
    await expect(page.getByText("No Options")).toBeVisible();
  });


  test("should show nothing when memory validation fails", async ({ page }) => {
    await page
      .getByLabel("Memory Size (MB, comma-separated)")
      .fill("1000, 2000");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("No Options")).toBeVisible();
  });
});
