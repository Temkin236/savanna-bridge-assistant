import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: ["**/*.spec.ts"],
  timeout: 30_000,
  use: {
    browserName: "chromium",
    headless: true,
  },
  reporter: [["list"], ["html", { open: "never" }]],
});

