import { expect, test } from "@playwright/test";

const apiBase = process.env.PUBLIC_API_BASE_URL ?? "http://localhost:8000";
const consoleBase = process.env.CONSOLE_BASE_URL ?? "http://localhost:8080";

test("a consented handoff appears in the agent console and can be claimed", async ({
  page,
  request,
}) => {
  const createdResponse = await request.post(`${apiBase}/handoff`, {
    data: {
      consent: true,
      learner_ref: "playwright_integration",
      card: {
        language: "en",
        context: "Playwright console integration check",
        support_needs: ["written_instructions"],
        contact_mode: "text",
      },
    },
  });
  expect(createdResponse.ok()).toBeTruthy();
  const created = await createdResponse.json();

  await page.goto(consoleBase);
  await page.getByLabel("API Base URL:").fill(apiBase);
  await page.getByRole("button", { name: "Refresh Queue" }).click();
  await expect(page.getByText(`Learner Request #${created.id}`)).toBeVisible();
  await page.getByRole("button", { name: "Claim this Request" }).click();
  await expect(page.getByRole("status")).toContainText(`Claimed request #${created.id}`);

  const closeResponse = await request.post(`${apiBase}/handoff/${created.id}/close`, {
    data: {},
  });
  expect(closeResponse.ok()).toBeTruthy();
});
