import { expect, test } from "@playwright/test";

const demoBase = process.env.DEMO_BASE_URL ?? "http://localhost:4173";

test.describe("screen-reader and non-visual interaction contract", () => {
  test("dialog has semantic navigation, trapped focus, and restored focus", async ({ page }) => {
    await page.goto(`${demoBase}/savanna/`);
    await page.evaluate(() => customElements.whenDefined("bridge-assistant"));
    const launcher = page.locator("bridge-assistant #launcher-btn");
    await expect(launcher).toHaveAccessibleName(/help|assistant/i);
    await launcher.click();

    const dialog = page.locator("bridge-assistant #assistant-dialog");
    await expect(dialog).toHaveAttribute("role", "dialog");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    const focusedId = await page.evaluate(() => {
      const host = document.querySelector("bridge-assistant");
      return host?.shadowRoot?.activeElement?.id;
    });
    expect(["chat-text-input", "dialog-title"]).toContain(focusedId);
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
    await page.evaluate(() => customElements.whenDefined("bridge-assistant"));
    await page.locator("bridge-assistant #launcher-btn").click();
    const languageButtons = page.locator(
      "bridge-assistant .header-actions .lang-group .lang-toggle-btn"
    );
    await expect(languageButtons).toHaveCount(5);

    await page.locator("bridge-assistant #btn-lang-ar").click();
    const dialog = page.locator("bridge-assistant #assistant-dialog");
    await expect(dialog).toHaveAttribute("lang", "ar");
    await expect(dialog).toHaveAttribute("dir", "rtl");

    await page.locator("bridge-assistant #btn-lang-om").click();
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
    await page.evaluate(() => customElements.whenDefined("bridge-assistant"));
    await page.locator("bridge-assistant #launcher-btn").click();
    await page.locator("bridge-assistant #chat-text-input").fill("Explain the lesson");
    await page.locator("bridge-assistant #send-btn").click();
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
    await page.evaluate(() => customElements.whenDefined("bridge-assistant"));
    await page.locator("bridge-assistant #launcher-btn").click();
    const controlText = await page
      .locator("bridge-assistant button, bridge-assistant a")
      .allInnerTexts();
    expect(controlText.join(" ")).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
    const decorativeIcons = page.locator("bridge-assistant svg.icon-inline");
    await expect(decorativeIcons.first()).toHaveAttribute("aria-hidden", "true");
  });

  test("spoken setup is opt-in and primary controls meet target size", async ({ page }) => {
    await page.addInitScript(() => {
      (window as typeof window & { __micRequests?: number }).__micRequests = 0;
      Object.defineProperty(navigator, "mediaDevices", {
        configurable: true,
        value: {
          getUserMedia: async () => {
            (window as typeof window & { __micRequests?: number }).__micRequests = 1;
            throw new Error("test microphone disabled");
          },
        },
      });
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

    await page.goto(`${demoBase}/savanna/`);
    await page.evaluate(() => customElements.whenDefined("bridge-assistant"));
    await expect
      .poll(() =>
        page.evaluate(() => (window as typeof window & { __micRequests?: number }).__micRequests)
      )
      .toBe(0);

    await page.locator("bridge-assistant #launcher-btn").click();
    const spokenSetup = page.locator("bridge-assistant #btn-spoken-onboarding");
    await expect(spokenSetup).toHaveAccessibleName(/spoken setup/i);
    await spokenSetup.click();
    await expect
      .poll(() => page.evaluate(() => (window as typeof window & { __spoken?: string }).__spoken))
      .toContain("voice assistance");

    for (const selector of ["#launcher-btn", "#send-btn", "#mic-btn", "#btn-onboard-skip"]) {
      const box = await page.locator(`bridge-assistant ${selector}`).boundingBox();
      expect(box, `${selector} must be visible`).not.toBeNull();
      expect(box!.height, `${selector} target height`).toBeGreaterThanOrEqual(44);
      expect(box!.width, `${selector} target width`).toBeGreaterThanOrEqual(44);
    }
  });
});
