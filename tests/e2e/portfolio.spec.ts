import { expect, test } from "@playwright/test";

const slugs = [
  "zentix",
  "hablaya",
  "minitiendai",
  "ordenai",
  "zentix-office",
  "tonalli-ai",
];

const localizedRoutes = [
  "/",
  "/es",
  ...slugs.flatMap((slug) => [`/work/${slug}`, `/es/work/${slug}`]),
];

for (const route of localizedRoutes) {
  test(`${route} renders without browser errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });
}

const responsiveViewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];

for (const route of ["/", "/es"]) {
  for (const viewport of responsiveViewports) {
    test(`${route} has no overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(route, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
}

test("locale links mirror the current route and document language", async ({ page }) => {
  await page.goto("/work/zentix");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "Ver en español" }).click();
  await expect(page).toHaveURL(/\/es\/work\/zentix$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("locale mirroring stays current after case-study navigation", async ({ page }) => {
  await page.goto("/work/zentix");
  await page.getByRole("link", { name: /Next case study/ }).click();
  await expect(page).toHaveURL(/\/work\/hablaya$/);
  await page.getByRole("link", { name: "Ver en español" }).click();
  await expect(page).toHaveURL(/\/es\/work\/hablaya$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("theme choice persists across navigation", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByTestId("theme-toggle");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(toggle).toHaveAccessibleName("Switch to dark theme");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(toggle).toHaveAccessibleName("Switch to light theme");
  await page.goto("/work/hablaya");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByTestId("theme-toggle")).toHaveAttribute("aria-pressed", "true");
});

test("mobile menu opens and exposes navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.locator("details.mobileNav");
  await menu.locator("summary").click();
  await expect(menu).toHaveAttribute("open", "");
  const selectedWork = menu.getByRole("link", { name: "Selected work" });
  await expect(selectedWork).toBeVisible();
  await selectedWork.click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(menu).not.toHaveAttribute("open", "");
});

test("unknown case studies return localized 404 pages", async ({ page }) => {
  const english = await page.goto("/work/not-a-case");
  expect(english?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Case study not found.");

  const spanish = await page.goto("/es/work/not-a-case");
  expect(spanish?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Caso de estudio no encontrado.",
  );
});

test("homepage exposes factual profile and agent-discovery data", async ({ page, request }) => {
  await page.goto("/");
  const rawJsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  expect(rawJsonLd).toBeTruthy();
  const jsonLd = JSON.parse(rawJsonLd ?? "{}") as {
    "@graph"?: Array<Record<string, unknown>>;
  };
  const graph = jsonLd["@graph"] ?? [];
  expect(graph.some((node) => node["@type"] === "ProfilePage")).toBe(true);
  const person = graph.find((node) => node["@type"] === "Person");
  expect(person?.name).toBe("Jorge Manuel Gasca Gutiérrez");
  expect(person?.jobTitle).toBe("SaaS Onboarding & Product Builder");
  expect(person?.contactPoint).toMatchObject({
    contactType: "business inquiries",
    email: "gascagtz@gmail.com",
  });

  const discovery = await request.get("/llms.txt");
  expect(discovery.status()).toBe(200);
  expect(discovery.headers()["content-type"]).toContain("text/plain");
  expect(await discovery.text()).toContain("Contact for legitimate business inquiries");
});

test("private sources never render a GitHub source link", async ({ page }) => {
  await page.goto("/work/zentix");
  await expect(page.getByTestId("private-source")).toHaveText("Private source");
  await expect(page.getByTestId("source-link")).toHaveCount(0);

  await page.goto("/work/zentix-office");
  await expect(page.getByTestId("source-link")).toHaveAttribute(
    "href",
    "https://github.com/jgazcagtz/zentix-office",
  );
});

test("walkthrough media is click-to-play and lazy", async ({ page }) => {
  await page.goto("/work/zentix");
  await expect(page.getByTestId("walkthrough-video")).toHaveCount(0);
  await page.getByTestId("walkthrough-play").click();
  await expect(page.getByTestId("walkthrough-video")).toBeVisible();
  await expect(page.getByTestId("walkthrough-video")).toHaveAttribute("preload", "none");
});
