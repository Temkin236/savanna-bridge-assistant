import { expect, test } from "@playwright/test";

const demoBase = process.env.DEMO_BASE_URL ?? "http://localhost:4173";

test.describe("screen-reader and non-visual interaction contract", () => {
  test("dialog has semantic navigation, trapped focus, and restored focus", async ({ page }) => {
    await page.goto(`${demoBase}/savanna/`);
    const launcher = page.locator("bridge-assistant #launcher-btn");
    await expect(launcher).toHaveAccessibleName(/help|assistant/i);
    await launcher.click();

    const dialog = page.locator("bridge-assistant #assistant-dialog");
    await expect(dialog).toHaveAttribute("role", "dialog");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(page.locator("bridge-assistant #chat-input")).toBeFocused();
    await expect(page.locator("bridge-assistant #chat-log")).toHaveAttribute("role", "log");

    const focusables = dialog.locator(
      'button:visible, a[href]:visible, input:visible, select:visible, textarea:visible'
    );
    const last = focusables.last();
    await last.focus();
    await page.keyboard.press("Tab");
    await expect(focusables.first()).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(launcher).toBeFocused();
  });

  test("all languages are selectable and Arabic uses RTL", async ({ page }) => {
    await page.goto(`${demoBase}/savanna/`);
    await page.locator("bridge-assistant #launcher-btn").click();
    const language = page.locator("bridge-assistant #language-select");
    await expect(language.locator("option")).toHaveCount(5);

    await language.selectOption("ar");
    const dialog = page.locator("bridge-assistant #assistant-dialog");
    await expect(dialog).toHaveAttribute("lang", "ar");
    await expect(dialog).toHaveAttribute("dir", "rtl");

    await page.locator("bridge-assistant #language-select").selectOption("om");
    await expect(page.locator("bridge-assistant #assistant-dialog")).toHaveAttribute("lang", "om");
  });

  test("mocked audio uses browser speech while the written answer remains visible", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "speechSynthesis", {
        configurable: true,
        value: {
          cancel: () => undefined,
          speak: (utterance: SpeechSynthesisUtterance) => {
            (window as typeof window & { __spoken?: string }).__spoken = utterance.text;
          },
        },
      });
    });
    await page.route("**/api/v1/ask", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          answer: "The written answer stays available.",
          citations: [],
          language: "en",
          offer_human: false,
          reason: "grounded",
          mocked: true,
        }),
      });
    });
    await page.route("**/api/v1/speech/synthesize", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          audio_url: "/media/tts/demo.ogg",
          text: "The written answer stays available.",
          language: "en",
          provider: "offline",
          mocked: true,
        }),
      });
    });

    await page.goto(`${demoBase}/savanna/`);
    await page.locator("bridge-assistant #launcher-btn").click();
    await page.locator("bridge-assistant #chat-input").fill("Explain the lesson");
    await page.locator("bridge-assistant #btn-send").click();
    const answer = page.getByText("The written answer stays available.");
    await expect(answer).toBeVisible();
    await page.locator("bridge-assistant .btn-listen").click();
    await expect
      .poll(() =>
        page.evaluate(() => (window as typeof window & { __spoken?: string }).__spoken)
      )
      .toBe("The written answer stays available.");
    await expect(answer).toBeVisible();
  });

  test("UI controls do not use emoji as icons", async ({ page }) => {
    await page.goto(`${demoBase}/savanna/`);
    await page.locator("bridge-assistant #launcher-btn").click();
    const controlText = await page
      .locator("bridge-assistant button, bridge-assistant a")
      .allInnerTexts();
    expect(controlText.join(" ")).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
    const decorativeIcons = page.locator("bridge-assistant svg.icon");
    await expect(decorativeIcons.first()).toHaveAttribute("aria-hidden", "true");
  });
});
