import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const demoBase = process.env.DEMO_BASE_URL ?? "http://localhost:4173";
const consoleBase = process.env.CONSOLE_BASE_URL ?? "http://localhost:8080";

for (const target of [
  { name: "Savanna demo", url: `${demoBase}/savanna/` },
  { name: "generic job board", url: `${demoBase}/jobboard/` },
  { name: "agent console", url: consoleBase },
]) {
  test(`${target.name} has no critical or serious axe findings`, async ({ page }) => {
    await page.goto(target.url);
    const results = await new AxeBuilder({ page }).analyze();
    const blockers = results.violations.filter((item) =>
      item.impact === "critical" || item.impact === "serious"
    );
    expect(blockers, JSON.stringify(blockers, null, 2)).toEqual([]);
  });
}

