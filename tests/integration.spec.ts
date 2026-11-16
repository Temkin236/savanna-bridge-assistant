import { expect, test } from "@playwright/test";

const demoBase = process.env.DEMO_BASE_URL ?? "http://localhost:4173";
const apiBase = process.env.PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const consoleBase =
  process.env.CONSOLE_BASE_URL ??
  (process.env.CONSOLE_PORT
    ? `http://localhost:${process.env.CONSOLE_PORT}`
    : "http://localhost:8090");

async function configureWidget(page: import("@playwright/test").Page, path = "/savanna/") {
  await page.goto(`${demoBase}${path}?api=${encodeURIComponent(apiBase)}`);
  await page.evaluate(() => customElements.whenDefined("bridge-assistant"));
  await page.locator("bridge-assistant").evaluate((element, api) => {
    element.setAttribute("data-api", api);
  }, apiBase);
  await page.locator("bridge-assistant #launcher-btn").click();
  const skipOnboarding = page.locator("bridge-assistant #btn-onboard-skip");
  if (await skipOnboarding.isVisible()) {
    await skipOnboarding.click();
  }
}

test.describe("Savanna Bridge integration", () => {
  test("widget answers, cites, refuses safely, switches language, and saves preferences", async ({
    page,
  }) => {
    await configureWidget(page);
    const dialog = page.locator("bridge-assistant #assistant-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("#dialog-title")).toContainText("Savanna Bridge Assistant");

    const input = page.locator("bridge-assistant #chat-input");
    await input.fill("Explain Module 2");
    await page.locator("bridge-assistant #btn-send").click();
    await expect(page.locator("bridge-assistant .source-link").first()).toBeVisible({
      timeout: 10_000,
    });

    await input.fill("Who won the football match on Mars?");
    await page.locator("bridge-assistant #btn-send").click();
    await expect(page.locator("bridge-assistant .not-verified-box").first()).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("bridge-assistant .btn-talk-person").first()).toBeVisible();

    await page.locator("bridge-assistant #btn-lang-ar").click();
    await expect(page.locator("bridge-assistant #assistant-dialog")).toHaveAttribute("dir", "rtl");
    await page.locator("bridge-assistant #btn-lang-en").click();

    await page.locator("bridge-assistant #tab-support").click();
    const supportForm = page.locator("bridge-assistant #support-form");
    const written = supportForm.locator('input[name="need"][value="written_instructions"]');
    await written.check();
    await supportForm.locator('button[type="submit"]').click();
    await expect(page.locator("bridge-assistant #support-saved-notice")).toBeVisible();

    await page.locator("bridge-assistant #tab-chat").click();
    await expect(page.locator("bridge-assistant #tg-deep-link")).toHaveAttribute(
      "href",
      /t\.me/,
    );
  });

  test("consented live-help request reaches the agent console and can be claimed", async ({
    page,
    request,
  }) => {
    await configureWidget(page);
    page.once("dialog", (dialog) => dialog.accept());
    await page.locator("bridge-assistant #btn-footer-handoff").click();
    await page.locator("bridge-assistant #btn-submit-handoff").click();
    const roomLink = page.locator("bridge-assistant #handoff-room-box .room-link");
    await expect(roomLink).toBeVisible({ timeout: 10_000 });
    await expect(roomLink).toHaveAttribute("href", /meet\.jit\.si/);

    const response = await request.get(`${apiBase}/handoff/queue`);
    expect(response.ok()).toBeTruthy();
    const queue = await response.json();
    const handoff =
      queue.items
        .filter(
          (item: { status: string; room_url: string }) =>
            item.status === "waiting" && item.room_url.includes("savanna-bridge-demo"),
        )
        .slice(-1)[0] ??
      queue.items.find((item: { room_url: string }) =>
        item.room_url.includes("savanna-bridge-demo"),
      );
    expect(handoff).toBeTruthy();

    await page.goto(consoleBase);
    await page.locator("#apiEndpoint").fill(apiBase);
    await page.getByRole("button", { name: "Refresh Queue" }).click();
    const card = page.locator("article", { hasText: handoff.id });
    await expect(card).toBeVisible({ timeout: 10_000 });
    await card.getByRole("button", { name: "Claim this Request" }).click();
    await expect(page.locator("#actionStatus")).toContainText("Claimed request #", {
      timeout: 10_000,
    });

    const closeResponse = await request.post(`${apiBase}/handoff/${handoff.id}/close`);
    expect(closeResponse.ok()).toBeTruthy();
  });

  test("generic job board loads the portable widget", async ({ page }) => {
    await configureWidget(page, "/jobboard/");
    await expect(page.locator("bridge-assistant #assistant-dialog")).toBeVisible();
  });
});
