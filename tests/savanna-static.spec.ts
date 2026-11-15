import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const staticBase = process.env.SAVANNA_STATIC_BASE_URL ?? "http://127.0.0.1:4173";

for (const path of [
  "/",
  "/pages/homepage-v1-paced.html",
  "/pages/homepage-v1-self-paced.html",
  "/pages/concept-with-navigation.html",
]) {
  test(`Savanna static page ${path} displays the accessibility widget`, async ({ page }) => {
    await page.goto(`${staticBase}${path}`);
    await page.evaluate(() => customElements.whenDefined("bridge-assistant"));

    const widget = page.locator("bridge-assistant");
    await expect(widget).toHaveAttribute("data-platform", "savanna-static");
    const launcher = widget.locator("#launcher-btn");
    await expect(launcher).toBeVisible();
    await expect(launcher).toHaveAccessibleName(/accessibility.*assistant/i);

    await launcher.click();
    await expect(widget.locator("#assistant-dialog")).toBeVisible();

    // The frozen Savanna captures have their own historical accessibility debt.
    // This integration test scopes the assertion to the newly embedded widget.
    const results = await new AxeBuilder({ page }).include("bridge-assistant").analyze();
    const blockers = results.violations.filter(
      (item) => item.impact === "critical" || item.impact === "serious",
    );
    expect(blockers, JSON.stringify(blockers, null, 2)).toEqual([]);
  });
}
