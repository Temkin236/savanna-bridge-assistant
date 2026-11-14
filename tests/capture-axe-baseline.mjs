import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const url = process.env.SAVANNA_BASELINE_URL ?? "http://localhost:4173/savanna/";
const channel = process.env.PLAYWRIGHT_CHANNEL || undefined;
const browser = await chromium.launch({ channel, headless: true });
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle" });
const results = await new AxeBuilder({ page }).analyze();
await browser.close();

const evidence = {
  schema_version: 1,
  target: url,
  captured_at: new Date().toISOString(),
  tool: {
    name: "axe-core via @axe-core/playwright",
    version: results.testEngine.version,
  },
  page: results.testEnvironment,
  summary: {
    violations: results.violations.length,
    critical: results.violations.filter((item) => item.impact === "critical").length,
    serious: results.violations.filter((item) => item.impact === "serious").length,
    passes: results.passes.length,
    incomplete: results.incomplete.length,
  },
  violations: results.violations,
  note: "Baseline fixture captured before integrated widget interaction testing. Re-capture when approved Savanna source pages replace this local fixture.",
};

process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`);
