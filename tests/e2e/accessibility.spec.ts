import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const auditedRoutes = [
  "/",
  "/es",
  "/work/minitiendai",
  "/es/work/minitiendai",
  "/work/zentix-office",
  "/es/work/zentix-office",
];

for (const route of auditedRoutes) {
  test(`${route} has no automatically detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("activated walkthrough has no automatically detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/work/zentix", { waitUntil: "networkidle" });
  await page.getByTestId("walkthrough-play").click();
  await expect(
    page
      .getByTestId("walkthrough-video")
      .or(page.getByTestId("walkthrough-fallback")),
  ).toBeFocused();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
