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
    expect(["chat-input", "dialog-title", "onboard-title"]).toContain(focusedId);
    await expect(page.locator("bridge-assistant #chat-log")).toHaveAttribute("role", "log");

    const onboarding = dialog.locator("#onboarding-overlay");
    const focusScope = (await onboarding.isVisible()) ? onboarding : dialog;
    const focusables = focusScope.locator(
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

    await page.locator("bridge-assistant #onboard-lang-ar").click();
    const dialog = page.locator("bridge-assistant #assistant-dialog");
    await expect(dialog).toHaveAttribute("lang", "ar");
    await expect(dialog).toHaveAttribute("dir", "rtl");

    await page.locator("bridge-assistant #onboard-lang-om").click();
    await expect(page.locator("bridge-assistant #assistant-dialog")).toHaveAttribute("lang", "om");
  });

  test("mocked audio uses browser speech while the written answer remains visible", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "speechSynthesis", {
        configurable: true,
        value: {
          cancel: () => undefined,
          getVoices: () => [],
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
    await page.locator("bridge-assistant #btn-onboard-skip").click();
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
          getVoices: () => [],
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
    await page.locator("bridge-assistant").evaluate((element) => {
      const assistant = element as HTMLElement & { readPageAloud: () => void };
      (window as typeof window & { __pageReadCount?: number }).__pageReadCount = 0;
      assistant.readPageAloud = () => {
        (window as typeof window & { __pageReadCount?: number }).__pageReadCount! += 1;
      };
    });
    const spokenSetup = page.locator("bridge-assistant #btn-spoken-onboarding");
    await expect(spokenSetup).toHaveAccessibleName(/spoken setup/i);
    await spokenSetup.click();
    await expect
      .poll(() => page.evaluate(() => (window as typeof window & { __spoken?: string }).__spoken))
      .toContain("English is selected");

    const answerOnboarding = async (answer: string) => {
      await page.locator("bridge-assistant").evaluate((element, spokenAnswer) => {
        const assistant = element as HTMLElement & {
          handleVoiceTranscript: (value: string, input: HTMLInputElement) => Promise<void>;
        };
        const input = element.shadowRoot?.querySelector<HTMLInputElement>("#chat-input");
        if (!input) throw new Error("Chat input not found for spoken onboarding test");
        return assistant.handleVoiceTranscript(spokenAnswer, input);
      }, answer);
    };

    await answerOnboarding("yes");
    await expect(page.locator("bridge-assistant .wizard-step-label")).toHaveText("Step 2 of 4");
    await expect.poll(() => page.evaluate(() => (window as typeof window & { __spoken?: string }).__spoken)).toContain("screen reader");

    await answerOnboarding("yes");
    await expect(page.locator("bridge-assistant #onboard-chk-screen-reader")).toBeChecked();
    await expect.poll(() => page.evaluate(() => (window as typeof window & { __spoken?: string }).__spoken)).toContain("keyboard focus");

    await answerOnboarding("no");
    await expect(page.locator("bridge-assistant .wizard-step-label")).toHaveText("Step 3 of 4");
    await expect.poll(() => page.evaluate(() => (window as typeof window & { __pageReadCount?: number }).__pageReadCount)).toBe(0);

    for (const selector of ["#launcher-btn", "#btn-send", "#mic-btn", "#btn-onboard-skip"]) {
      const box = await page.locator(`bridge-assistant ${selector}`).boundingBox();
      expect(box, `${selector} must be visible`).not.toBeNull();
      expect(box!.height, `${selector} target height`).toBeGreaterThanOrEqual(44);
      expect(box!.width, `${selector} target width`).toBeGreaterThanOrEqual(44);
    }

    await answerOnboarding("yes");
    await expect(page.locator("bridge-assistant #onboard-chk-contrast")).toBeChecked();
    await answerOnboarding("no");
    await expect(page.locator("bridge-assistant .wizard-step-label")).toHaveText("Step 4 of 4");
    await answerOnboarding("yes");
    await expect(page.locator("bridge-assistant #onboard-chk-voice")).toBeChecked();
    await answerOnboarding("no");
    await expect(page.locator("bridge-assistant #onboarding-overlay")).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => (window as typeof window & { __pageReadCount?: number }).__pageReadCount)).toBe(0);
  });

  test("onboarding is sequential and the desktop panel is large and resizable", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`${demoBase}/savanna/`);
    await page.evaluate(() => customElements.whenDefined("bridge-assistant"));
    await page.locator("bridge-assistant #launcher-btn").click();

    const panel = page.locator("bridge-assistant .panel");
    const panelBox = await panel.boundingBox();
    expect(panelBox).not.toBeNull();
    expect(panelBox!.width).toBeGreaterThanOrEqual(700);
    expect(panelBox!.height).toBeGreaterThanOrEqual(700);
    await expect(panel).toHaveCSS("resize", "both");

    await expect(page.locator("bridge-assistant .wizard-step-label")).toHaveText("Step 1 of 4");
    await page.locator("bridge-assistant #btn-onboard-next").click();
    await expect(page.locator("bridge-assistant .wizard-step-label")).toHaveText("Step 2 of 4");
    await expect(page.locator("bridge-assistant #onboard-chk-screen-reader")).toBeVisible();
    await page.locator("bridge-assistant #btn-onboard-back").click();
    await expect(page.locator("bridge-assistant .wizard-step-label")).toHaveText("Step 1 of 4");
  });

  test("keyboard shortcuts: Alt+Shift+A opens dialog without activating mic, Alt+Shift+V triggers mic", async ({ page }) => {
    await page.goto(`${demoBase}/savanna/`);
    await page.evaluate(() => customElements.whenDefined("bridge-assistant"));

    const dialog = page.locator("bridge-assistant #assistant-dialog");
    const launcher = page.locator("bridge-assistant #launcher-btn");
    await expect(dialog).toBeHidden();

    // 1. Press Alt+Shift+A: dialog opens, mic is NOT recording
    await page.keyboard.press("Alt+Shift+KeyA");
    await expect(dialog).toBeVisible();
    const stateAfterOpen = await page.evaluate(() => {
      const host = document.querySelector("bridge-assistant") as any;
      return {
        isOpen: host?.isOpen,
        isRecording: host?.isRecording,
      };
    });
    expect(stateAfterOpen.isOpen).toBe(true);
    expect(stateAfterOpen.isRecording).toBe(false);

    // 2. Press Alt+Shift+A again: dialog closes
    await page.keyboard.press("Alt+Shift+KeyA");
    await expect(dialog).toBeHidden();
    const stateAfterClose = await page.evaluate(() => {
      const host = document.querySelector("bridge-assistant") as any;
      return {
        isOpen: host?.isOpen,
        isRecording: host?.isRecording,
      };
    });
    expect(stateAfterClose.isOpen).toBe(false);
    expect(stateAfterClose.isRecording).toBe(false);
  });
});
