import { expect, test, type Page } from "@playwright/test";

const variants = [
  "gtm-revops",
  "product-implementation",
  "ai-automation",
  "customer-solutions",
] as const;

const cvRoutes = [
  "/cv",
  "/es/cv",
  ...variants.flatMap((variant) => [`/cv/${variant}`, `/es/cv/${variant}`]),
];

const cvViewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
] as const;

async function jsonLdNodes(page: Page) {
  return page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((script) => {
      const parsed = JSON.parse(script.textContent ?? "{}") as {
        "@graph"?: Array<Record<string, unknown>>;
      };
      return parsed["@graph"] ?? [parsed];
    }),
  );
}

test("@cross-browser CV hubs and focused profiles render server content", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/cv", "/es/cv", "/cv/gtm-revops", "/es/cv/ai-automation"]) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
  }
});

for (const viewport of cvViewports) {
  test(`all CV routes avoid overflow in both themes at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const theme of ["light", "dark"] as const) {
      for (const route of cvRoutes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.evaluate((value) => {
          localStorage.setItem("jorge-theme", value);
          document.documentElement.dataset.theme = value;
        }, theme);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `${route} ${theme}`).toBeLessThanOrEqual(1);
      }
    }
  });
}

test("CV metadata, hreflang, structured data, and best-fit labeling remain truthful", async ({ page }) => {
  for (const locale of ["en", "es"] as const) {
    for (const variant of variants) {
      const route = locale === "en" ? `/cv/${variant}` : `/es/cv/${variant}`;
      const alternate = locale === "en" ? `/es/cv/${variant}` : `/cv/${variant}`;
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://jgasca.io${route}`);
      await expect(page.locator(`link[rel="alternate"][hreflang="${locale === "en" ? "es" : "en"}"]`)).toHaveAttribute("href", `https://jgasca.io${alternate}`);
      await expect(page.getByRole("heading", { name: locale === "en" ? "Best-fit roles" : "Puestos con mejor encaje" })).toBeVisible();
      await expect(page.getByText(locale === "en" ? "Matching titles describe role fit, not past employment." : "Los puestos sugeridos describen encaje, no empleos anteriores.")).toBeVisible();

      const nodes = await jsonLdNodes(page);
      const profile = nodes.find((node) => node["@type"] === "ProfilePage");
      const person = nodes.find((node) => node["@type"] === "Person");
      expect(profile?.url).toBe(`https://jgasca.io${route}`);
      expect(person?.jobTitle).toBe("Product Specialist");
      expect(person?.worksFor).toMatchObject({ name: "Apollo.io" });
      expect(JSON.stringify(person)).not.toContain("GTM Engineer");
    }
  }
});

test("CV routes render with JavaScript disabled and unknown variants return 404", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of cvRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
  }
  await context.close();

  const regular = await browser.newPage();
  expect((await regular.goto("/cv/not-a-real-version"))?.status()).toBe(404);
  expect((await regular.goto("/es/cv/not-a-real-version"))?.status()).toBe(404);
  await regular.close();
});

test("redirects, sitemap, crawler policy, and PDF headers support canonical discovery", async ({ request }) => {
  const resume = await request.get("/resume", { maxRedirects: 0 });
  const curriculum = await request.get("/es/curriculum", { maxRedirects: 0 });
  expect(resume.status()).toBe(308);
  expect(resume.headers().location).toBe("/cv");
  expect(curriculum.status()).toBe(308);
  expect(curriculum.headers().location).toBe("/es/cv");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const route of cvRoutes) expect(sitemap).toContain(`https://jgasca.io${route}`);

  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("User-Agent: *");
  expect(robots).toContain("Allow: /");
  for (const crawler of ["Googlebot", "Bingbot", "OAI-SearchBot", "PerplexityBot"]) {
    expect(robots, `${crawler} is covered by the wildcard rule`).toContain("User-Agent: *");
  }

  const llms = await (await request.get("/llms.txt")).text();
  for (const route of cvRoutes) expect(llms).toContain(`https://jgasca.io${route}`);

  for (const locale of ["en", "es"] as const) {
    for (const variant of variants) {
      const pdf = await request.get(`/cv/downloads/jorge-gasca-${variant}-${locale}.pdf`);
      expect(pdf.status()).toBe(200);
      expect(pdf.headers()["content-type"]).toContain("application/pdf");
      expect(pdf.headers()["x-robots-tag"]).toBe("noindex, follow");
      expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
    }
  }
});

test("navigation, homepage experience, footer, and hubs expose CV paths", async ({ page }) => {
  for (const route of ["/", "/es"]) {
    const isSpanish = route === "/es";
    const hub = isSpanish ? "/es/cv" : "/cv";
    await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(await page.locator(`a[href="${hub}"]`).count()).toBeGreaterThanOrEqual(3);
  }

  await page.goto("/cv", { waitUntil: "domcontentloaded" });
  for (const variant of variants) {
    await expect(page.locator(`a[href="/cv/${variant}"]`)).toBeVisible();
    await expect(page.locator(`a[href="/cv/downloads/jorge-gasca-${variant}-en.pdf"]`)).toBeVisible();
  }
});
