import { expect, test } from "@playwright/test";

const demoBase = process.env.DEMO_BASE_URL ?? "http://localhost:4173";
const apiBase = process.env.PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const consoleBase = process.env.CONSOLE_BASE_URL ?? "http://localhost:8080";

test.describe("Widget testing on demo-host", () => {
  test("widget on demo-host provides grounded answers with citations, refusal, language toggle, and support preferences", async ({
    page,
  }) => {
    // 1. Load the Savanna demo host page
    await page.goto(`${demoBase}/savanna/?api=${encodeURIComponent(apiBase)}`);
    await page.locator("bridge-assistant").evaluate((el, api) => {
      el.setAttribute("data-api", api);
    }, apiBase);

    // 2. Open the assistant widget via the launcher button
    const launcher = page.locator("bridge-assistant .launcher");
    await expect(launcher).toBeVisible();
    await launcher.click();

    const dialog = page.locator("bridge-assistant [role=dialog]");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("#bridge-title")).toHaveText(/Savanna Bridge Assistant/);

    // 3. Ask a grounded question
    const chatInput = page.locator("bridge-assistant #chat-text-input");
    await chatInput.fill("What does Module 2 teach?");
    await page.locator("bridge-assistant #send-btn").click();

    // Verify grounded response with citations
    const citation = page.locator("bridge-assistant .citation-link");
    await expect(citation.first()).toBeVisible({ timeout: 10_000 });
    await expect(citation.first()).toContainText("Module 2");

    // 4. Ask an unrelated question to verify low-confidence refusal
    await chatInput.fill("Who won the football match on Mars?");
    await page.locator("bridge-assistant #send-btn").click();

    // Verify refusal box and human mentor offer
    const refusalBox = page.locator("bridge-assistant .refusal-box");
    await expect(refusalBox.first()).toBeVisible({ timeout: 10_000 });
    const talkToPersonBtn = page.locator("bridge-assistant .btn-talk-person");
    await expect(talkToPersonBtn.first()).toBeVisible();

    // 5. Test language switch to Amharic and back
    const langBtn = page.locator("bridge-assistant .lang-btn");
    await langBtn.click();
    await expect(dialog.locator("#bridge-title")).toHaveText(/የሳቫና ብሪጅ ረዳት/);
    await langBtn.click();
    await expect(dialog.locator("#bridge-title")).toHaveText(/Savanna Bridge Assistant/);

    // 6. Test support preferences panel (Zero proof required)
    await page.locator("bridge-assistant #tab-support").click();
    const supportForm = page.locator("bridge-assistant #support-form");
    await expect(supportForm).toBeVisible();
    const writtenBox = page.locator('bridge-assistant input[name="need"][value="written_instructions"]');
    await writtenBox.check();
    await supportForm.locator('button[type="submit"]').click();
    const savedNotice = page.locator("bridge-assistant .support-saved-notice");
    await expect(savedNotice).toBeVisible();

    // 7. Test Continue on Telegram button in footer
    await page.locator("bridge-assistant #tab-chat").click();
    const tgLink = page.locator("bridge-assistant #tg-deep-link");
    await expect(tgLink).toBeVisible();
    const tgHref = await tgLink.getAttribute("href");
    expect(tgHref).toContain("t.me");
  });

  test("widget on demo-host initiates a consented handoff that appears in the agent console and can be claimed", async ({
    page,
    request,
  }) => {
    const handoffReason = `Learner handoff check ${Date.now()}`;

    // 1. Open the widget on the demo-host
    await page.goto(`${demoBase}/savanna/?api=${encodeURIComponent(apiBase)}`);
    await page.locator("bridge-assistant").evaluate((el, api) => {
      el.setAttribute("data-api", api);
    }, apiBase);

    await page.locator("bridge-assistant .launcher").click();
    await page.locator("bridge-assistant #tab-handoff").click();

    // 2. Complete explicit consent and submit handoff request from the widget
    const consentCheck = page.locator("bridge-assistant #handoff-consent");
    await consentCheck.check();
    await page.locator("bridge-assistant #handoff-reason").fill(handoffReason);
    await page.locator("bridge-assistant #handoff-request-form button[type=submit]").click();

    // 3. Confirm widget shows Jitsi meeting room ready
    const roomLink = page.locator('bridge-assistant a[href*="meet.jit.si"]');
    await expect(roomLink).toBeVisible({ timeout: 10_000 });
    const roomUrl = await roomLink.getAttribute("href");
    expect(roomUrl).toContain("meet.jit.si");

    // 4. Open the agent console and claim the handoff ticket
    await page.goto(consoleBase);
    const apiInput = page.locator("#apiEndpoint");
    if (await apiInput.isVisible()) {
      await apiInput.fill(apiBase);
    }
    await page.getByRole("button", { name: "Refresh Queue" }).click();

    // 5. Verify the handoff request initiated by the widget appears in console
    const handoffCard = page.locator("article", { hasText: handoffReason });
    await expect(handoffCard).toBeVisible({ timeout: 10_000 });

    // 6. Claim the request
    await handoffCard.getByRole("button", { name: "Claim this Request" }).click();
    await expect(page.locator("#actionStatus")).toContainText("Claimed request #", { timeout: 10_000 });

    // Extract handoff id from card header to close it cleanly
    const cardTitle = await handoffCard.locator("h3").innerText();
    const handoffIdMatch = cardTitle.match(/#(handoff_[a-f0-9]+)/);
    if (handoffIdMatch) {
      const handoffId = handoffIdMatch[1];
      const closeResponse = await request.post(`${apiBase}/handoff/${handoffId}/close`, {
        data: {},
      });
      expect(closeResponse.ok()).toBeTruthy();
    }
  });

  test("generic job board on demo-host loads the widget and opens properly", async ({
    page,
  }) => {
    await page.goto(`${demoBase}/jobboard/?api=${encodeURIComponent(apiBase)}`);
    await page.locator("bridge-assistant").evaluate((el, api) => {
      el.setAttribute("data-api", api);
    }, apiBase);

    const launcher = page.locator("bridge-assistant .launcher");
    await expect(launcher).toBeVisible();
    await launcher.click();

    const dialog = page.locator("bridge-assistant [role=dialog]");
    await expect(dialog).toBeVisible();
  });
});
