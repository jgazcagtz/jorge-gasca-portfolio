import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const slugs = [
  "zentix",
  "hablaya",
  "minitiendai",
  "ordenai",
  "zentix-office",
  "tonalli-ai",
] as const;

const auditedRoutes = [
  "/",
  "/es",
  ...slugs.flatMap((slug) => [`/work/${slug}`, `/es/work/${slug}`]),
];

const wcagTags = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
];

function relativeLuminance(color: string) {
  const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  expect(channels, color).toHaveLength(3);
  const [red, green, blue] = (channels ?? [0, 0, 0]).map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground: string, background: string) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  return (
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
  );
}

async function expectSolidTextContrast(page: Page, selector: string) {
  const colorPairs = await page.locator(selector).evaluateAll((elements) =>
    elements.map((element) => {
      const styles = getComputedStyle(element);
      return {
        label: element.textContent?.trim() || element.outerHTML,
        foreground: styles.color,
        background: styles.backgroundColor,
      };
    }),
  );

  expect(colorPairs.length, selector).toBeGreaterThan(0);
  for (const pair of colorPairs) {
    expect(pair.background, pair.label).not.toBe("rgba(0, 0, 0, 0)");
    expect(
      contrastRatio(pair.foreground, pair.background),
      `${pair.label}: ${pair.foreground} on ${pair.background}`,
    ).toBeGreaterThanOrEqual(4.5);
  }
}

for (const route of auditedRoutes) {
  test(`${route} has no automatically detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const results = await new AxeBuilder({ page })
      .withTags(wcagTags)
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
    .withTags(wcagTags)
    .analyze();
  expect(results.violations).toEqual([]);
});

test("open mobile menu in dark theme meets automated and explicit WCAG 2.2 AA checks", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.setItem("jorge-theme", "dark"));
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Menu" }).click();

  const results = await new AxeBuilder({ page })
    .withTags(wcagTags)
    .analyze();
  expect(results.violations).toEqual([]);
  await expectSolidTextContrast(
    page,
    '[class*="cardIndex"], [class*="cardStage"], a[data-variant="inverse"]',
  );
});
