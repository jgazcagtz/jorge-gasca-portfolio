import { expect, test, type Locator, type Page } from "@playwright/test";

const slugs = [
  "zentix",
  "hablaya",
  "minitiendai",
  "ordenai",
  "zentix-office",
  "tonalli-ai",
] as const;

const localizedRoutes = [
  "/",
  "/es",
  ...slugs.flatMap((slug) => [`/work/${slug}`, `/es/work/${slug}`]),
];

const responsiveViewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];

const productNames = {
  zentix: "Zentix",
  hablaya: "HablaYa",
  minitiendai: "MiniTiendAI",
  ordenai: "OrdenAI",
  "zentix-office": "Zentix Office",
  "tonalli-ai": "Tonalli AI",
} as const;

const chapterIds = [
  "overview",
  "context",
  "contribution",
  "decision",
  "result",
  "evidence",
  "limitations",
  "technology",
  "contact",
] as const;

const chapterNames = {
  en: [
    "Overview",
    "Context",
    "Contribution",
    "Key decision",
    "Result and current status",
    "Evidence",
    "Limitations",
    "Technology",
    "Contact",
  ],
  es: [
    "Resumen",
    "Contexto",
    "Contribución",
    "Decisión clave",
    "Resultado y estado actual",
    "Evidencia",
    "Limitaciones",
    "Tecnología",
    "Contacto",
  ],
} as const;

async function expectMinimumTarget(locator: Locator, minimum = 44) {
  const box = await locator.boundingBox();
  expect(box, "interactive control should have a rendered box").not.toBeNull();
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(minimum);
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(minimum);
}

async function expectInsideViewport(locator: Locator, page: Page) {
  const box = await locator.boundingBox();
  const viewport = page.viewportSize();
  expect(box, "focused control should have a rendered box").not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(box?.x ?? -1).toBeGreaterThanOrEqual(0);
  expect(box?.y ?? -1).toBeGreaterThanOrEqual(0);
  expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(
    viewport?.width ?? 0,
  );
  expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(
    viewport?.height ?? 0,
  );
}

async function structuredNodes(page: Page): Promise<Array<Record<string, unknown>>> {
  return page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((script) => {
      const parsed = JSON.parse(script.textContent ?? "{}") as {
        "@graph"?: Array<Record<string, unknown>>;
      };
      return parsed["@graph"] ?? [parsed as Record<string, unknown>];
    }),
  );
}

test("@cross-browser localized home and flagship case smoke", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/es", "/work/zentix", "/es/work/ordenai"]) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, route).toBeLessThanOrEqual(1);
  }
});

for (const route of localizedRoutes) {
  test(`${route} renders without browser errors`, async ({ page }) => {
    const browserErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") browserErrors.push(message.text());
    });
    page.on("pageerror", (error) => browserErrors.push(error.message));

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("main#main-content")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    expect(browserErrors).toEqual([]);
  });
}

for (const viewport of responsiveViewports) {
  test(`all localized routes avoid overflow in both themes at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    test.setTimeout(180_000);
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    for (const theme of ["light", "dark"] as const) {
      await page.evaluate(
        ([key, value]) => localStorage.setItem(key, value),
        ["jorge-theme", theme] as const,
      );

      for (const route of localizedRoutes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(overflow, `${route} in ${theme}`).toBeLessThanOrEqual(1);
      }
    }
  });
}

test("mobile opening presents one portrait and reaches signature work within 1.5 viewports", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const importantElements = [
    page.locator("main").getByText("Jorge Gasca", { exact: true }).first(),
    page.getByRole("heading", {
      level: 1,
      name: "I make complex product systems easier to understand, use, and ship.",
    }),
    page.getByRole("link", { name: /Explore signature work/i }),
    page.getByRole("link", { name: /Start a conversation/i }),
  ];
  for (const locator of importantElements) {
    await expect(locator).toBeVisible();
  }

  const visiblePortraits = await page
    .locator('img[src*="jorge-gasca-portrait"]')
    .evaluateAll((images) =>
      images.flatMap((image) => {
        const box = image.getBoundingClientRect();
        const styles = getComputedStyle(image);
        const rendered =
          box.width > 0 &&
          box.height > 0 &&
          styles.display !== "none" &&
          styles.visibility !== "hidden" &&
          Number.parseFloat(styles.opacity) > 0;
        return rendered
          ? [{ width: box.width, height: box.height, top: box.top, bottom: box.bottom }]
          : [];
      }),
    );
  expect(visiblePortraits).toHaveLength(1);
  expect(visiblePortraits[0].top).toBeLessThan(844);
  expect(visiblePortraits[0].bottom).toBeGreaterThan(0);

  const selectedWork = page.locator("#work");
  await expect(selectedWork).toBeVisible();
  const selectedWorkBox = await selectedWork.boundingBox();
  expect(selectedWorkBox).not.toBeNull();
  expect(selectedWorkBox?.y ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(
    844 * 1.5,
  );
});

test("every project card exposes its title as a semantic heading", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#work article")).toHaveCount(slugs.length);

  for (const slug of slugs) {
    const route = `/work/${slug}`;
    const link = page.locator(`#work a[href="${route}"]`).first();
    await expect(link, route).toBeVisible();
    const card = link.locator("xpath=ancestor::article[1]");
    await expect(card).toHaveCount(1);
    await expect(card.getByRole("heading", { level: 3 })).toContainText(
      productNames[slug],
    );
  }
});

for (const slug of slugs) {
  test(`${slug} renders its desktop evidence once`, async ({ page }) => {
    await page.goto(`/work/${slug}`, { waitUntil: "domcontentloaded" });
    const filename = `${slug}-desktop.png`;
    const renderedCopies = await page.locator("img").evaluateAll(
      (images, expectedFilename) =>
        images.filter((image) => {
          const sources = `${image.getAttribute("src") ?? ""} ${(image as HTMLImageElement).currentSrc}`;
          return sources.includes(expectedFilename);
        }).length,
      filename,
    );
    expect(renderedCopies, filename).toBe(1);
  });
}

test("case studies provide linked H2 chapters in both languages", async ({ page }) => {
  for (const [route, locale] of [
    ["/work/zentix", "en"],
    ["/es/work/zentix", "es"],
  ] as const) {
    await page.goto(route, { waitUntil: "domcontentloaded" });

    const chapterNav = page
      .locator("nav")
      .filter({ has: page.locator('a[href="#overview"]') });
    await expect(chapterNav).toHaveCount(1);
    const chapterLinks = chapterNav.locator(
      chapterIds.map((id) => `a[href="#${id}"]`).join(","),
    );
    await expect(chapterLinks).toHaveCount(chapterIds.length);

    for (const [index, id] of chapterIds.entries()) {
      const heading = page.locator(`h2#${id}, #${id} h2`);
      await expect(heading, `${route} #${id}`).toHaveCount(1);
      await expect(heading).toHaveText(chapterNames[locale][index]);
      await expect(chapterNav.locator(`a[href="#${id}"]`)).toHaveAccessibleName(
        new RegExp(`${chapterNames[locale][index]}$`),
      );
    }
  }
});

test("case chapter navigation is sticky on desktop and horizontally usable on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/work/zentix", { waitUntil: "domcontentloaded" });
  const chapterNav = page
    .locator("nav")
    .filter({ has: page.locator('a[href="#overview"]') });
  const hasStickyAncestor = await chapterNav.evaluate((navigation) => {
    let element: Element | null = navigation;
    while (element && element.tagName !== "MAIN") {
      if (["sticky", "fixed"].includes(getComputedStyle(element).position)) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  });
  expect(hasStickyAncestor).toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });
  const horizontalScroller = await chapterNav.evaluate((navigation) => {
    let element: Element | null = navigation;
    while (element && element.tagName !== "MAIN") {
      const styles = getComputedStyle(element);
      if (["auto", "scroll"].includes(styles.overflowX)) {
        return {
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
        };
      }
      element = element.parentElement;
    }
    return null;
  });
  expect(horizontalScroller).not.toBeNull();
  expect(horizontalScroller?.scrollWidth ?? 0).toBeGreaterThan(
    horizontalScroller?.clientWidth ?? Number.POSITIVE_INFINITY,
  );
});

test("locale links mirror the current route and document language", async ({ page }) => {
  await page.goto("/work/zentix", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const localeSwitch = page.locator("[data-locale-switch]");
  await expect(localeSwitch).toHaveAttribute("href", "/es/work/zentix");
  await localeSwitch.click();
  await expect(page).toHaveURL(/\/es\/work\/zentix$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("locale links mirror case-study routes in server HTML without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  const page = await context.newPage();

  try {
    const english = await page.goto("/work/zentix", {
      waitUntil: "domcontentloaded",
    });
    expect(english?.status()).toBe(200);
    const localeSwitch = page.locator("[data-locale-switch]");
    await expect(localeSwitch).toHaveAttribute("href", "/es/work/zentix");
    await localeSwitch.click();
    await expect(page).toHaveURL(/\/es\/work\/zentix$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("[data-locale-switch]")).toHaveAttribute(
      "href",
      "/work/zentix",
    );
  } finally {
    await context.close();
  }
});

test("locale mirroring stays current after case-study navigation", async ({ page }) => {
  await page.goto("/work/zentix", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: /Next case study/ }).click();
  await expect(page).toHaveURL(/\/work\/minitiendai$/);
  await expect(page.locator("[data-locale-switch]")).toHaveAttribute(
    "href",
    "/es/work/minitiendai",
  );
});

test("theme choice persists across localized navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const toggle = page.getByTestId("theme-toggle");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(toggle).toHaveAccessibleName("Switch to dark theme");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await page.goto("/es/work/hablaya", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByTestId("theme-toggle")).toHaveAccessibleName(
    "Cambiar al tema claro",
  );
});

test("mobile menu supports keyboard, outside-click, focus return, and touch targets", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expectInsideViewport(skipLink, page);

  const toggle = page.getByRole("button", { name: "Menu" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toHaveAttribute("aria-controls", /.+/);
  await expectMinimumTarget(toggle);

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const controlledId = await toggle.getAttribute("aria-controls");
  expect(controlledId).toBeTruthy();
  const menu = page.locator(`#${controlledId}`);
  await expect(menu).toBeVisible();
  const selectedWork = menu.getByRole("link", { name: "Selected work" });
  await expect(selectedWork).toBeVisible();
  await expectMinimumTarget(selectedWork);
  await selectedWork.focus();
  await expect(selectedWork).toBeFocused();
  await expectInsideViewport(selectedWork, page);

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await selectedWork.focus();
  await expect(selectedWork).toBeFocused();
  await page.locator("main").click({ position: { x: 2, y: 2 }, force: true });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();

  await toggle.click();
  await selectedWork.click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("unknown case studies return localized 404 pages", async ({ page }) => {
  const english = await page.goto("/work/not-a-case", {
    waitUntil: "domcontentloaded",
  });
  expect(english?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Case study not found.",
  );

  const spanish = await page.goto("/es/work/not-a-case", {
    waitUntil: "domcontentloaded",
  });
  expect(spanish?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Caso de estudio no encontrado.",
  );
});

test("home metadata and JSON-LD expose factual product, Apollo, sales automation, and Marblism data", async ({
  page,
  request,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(
    "Jorge Gasca | Product & Sales Automation Specialist",
  );
  await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://jgasca.io",
  );
  await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute(
    "href",
    "https://jgasca.io/es",
  );

  const nodes = await structuredNodes(page);
  expect(nodes.some((node) => node["@type"] === "ProfilePage")).toBe(true);
  const person = nodes.find((node) => node["@type"] === "Person");
  expect(person?.name).toBe("Jorge Manuel Gasca Gutiérrez");
  expect(person?.jobTitle).toBe("Product Specialist");
  expect(person?.worksFor).toMatchObject({
    "@type": "Organization",
    name: "Apollo.io",
  });
  expect(person?.affiliation).toMatchObject({
    "@type": "Organization",
    name: "Marblism",
    url: "https://marblism.com",
  });
  expect(person?.knowsAbout).toEqual(
    expect.arrayContaining(["CRM workflows", "Sales automation", "Product UX"]),
  );
  expect(person?.contactPoint).toMatchObject({
    contactType: "professional and project inquiries",
    email: "gascagtz@gmail.com",
  });

  const discovery = await request.get("/llms.txt");
  expect(discovery.status()).toBe(200);
  expect(discovery.headers()["content-type"]).toContain("text/plain");
  const llms = await discovery.text();
  expect(llms).toContain("Product Specialist at Apollo.io, May 2025 to present");
  expect(llms.toLowerCase()).toContain("sales automation");
  expect(llms).toContain("https://marblism.com?via=zentixmarblism");
  expect(llms.toLowerCase()).not.toContain("ai-readable");
});

test("Spanish metadata and case structured data stay localized and visible", async ({
  page,
}) => {
  await page.goto("/es", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(
    "Jorge Gasca | Producto y Automatización de Ventas",
  );
  await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);

  await page.goto("/es/work/minitiendai", { waitUntil: "domcontentloaded" });
  const nodes = await structuredNodes(page);
  const work = nodes.find((node) => node["@type"] === "CreativeWork");
  const breadcrumbs = nodes.find((node) => node["@type"] === "BreadcrumbList");
  expect(work).toBeDefined();
  expect(work?.inLanguage).toBe("es");
  expect(work?.creator).toMatchObject({
    "@id": "https://jgasca.io/#jorge-gasca",
  });
  const person = nodes.find((node) => node["@type"] === "Person");
  expect(person?.name).toBe("Jorge Manuel Gasca Gutiérrez");
  await expect(page.locator("h1")).toHaveText(String(work?.name));
  expect(breadcrumbs).toBeDefined();
});

test("Marblism partnership uses the approved local asset and partner URL", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const partner = page.getByRole("link", { name: /Explore Marblism/i });
  await expect(partner).toHaveAttribute(
    "href",
    "https://marblism.com?via=zentixmarblism",
  );
  await expect(partner).toHaveAttribute("rel", /sponsored/);
  await expect(page.getByRole("img", { name: "Marblism" })).toHaveAttribute(
    "src",
    /marblism-wordmark/,
  );
});

test("private sources never render a GitHub source link", async ({ page }) => {
  await page.goto("/work/zentix", { waitUntil: "networkidle" });
  await expect(page.getByTestId("private-source")).toHaveText("Private source");
  await expect(page.getByTestId("source-link")).toHaveCount(0);

  await page.goto("/work/zentix-office", { waitUntil: "domcontentloaded" });
  await expect(page.getByTestId("source-link")).toHaveAttribute(
    "href",
    "https://github.com/jgazcagtz/zentix-office",
  );
});

test("walkthrough is lazy, transfers focus, exposes two formats and a transcript", async ({
  page,
}) => {
  await page.goto("/work/zentix", { waitUntil: "networkidle" });
  await expect(page.getByTestId("walkthrough-video")).toHaveCount(0);
  await expect(page.getByText("Read the visual transcript")).toBeVisible();

  await page.getByTestId("walkthrough-play").click();
  const video = page.getByTestId("walkthrough-video");
  await expect(video).toBeVisible();
  await expect(video).toBeFocused();
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video).not.toHaveAttribute("tabindex", "-1");
  await expect(video.locator('source[type="video/webm"]')).toHaveAttribute(
    "src",
    /\.webm$/,
  );
  await expect(video.locator('source[type="video/mp4"]')).toHaveAttribute(
    "src",
    /\.mp4$/,
  );

  await page.getByText("Read the visual transcript").click();
  await expect(page.locator("details[open] p")).toContainText(
    "The walkthrough opens",
  );
});

test("walkthrough provides a usable MP4 fallback after playback failure", async ({
  page,
}) => {
  await page.goto("/work/zentix", { waitUntil: "networkidle" });
  await page.getByTestId("walkthrough-play").click();
  const video = page.getByTestId("walkthrough-video");
  const status = page.getByRole("status");
  await expect(video.or(status)).toBeVisible();
  await page.evaluate(() => {
    document
      .querySelector('[data-testid="walkthrough-video"]')
      ?.dispatchEvent(new Event("error", { bubbles: true }));
  });
  await expect(status).toContainText(
    "The embedded preview could not load in this browser.",
  );
  await expect(status.getByRole("link", { name: "Open the MP4 preview" })).toHaveAttribute(
    "href",
    /\.mp4$/,
  );
});

test("reduced motion keeps the complete home and case-study content available", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const reveal = page.locator("[data-reveal]").first();
  if ((await reveal.count()) > 0) {
    await expect(reveal).toHaveAttribute("data-revealed", "true");
    const revealStyles = await reveal.evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        opacity: styles.opacity,
        transform: styles.transform,
        transitionDuration: styles.transitionDuration,
      };
    });
    expect(revealStyles.opacity).toBe("1");
    expect(revealStyles.transform).toBe("none");
    const transitionMs = revealStyles.transitionDuration.endsWith("ms")
      ? Number.parseFloat(revealStyles.transitionDuration)
      : Number.parseFloat(revealStyles.transitionDuration) * 1_000;
    expect(transitionMs).toBeLessThanOrEqual(0.02);
  }

  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(page.locator("#work")).toBeVisible();
  await expect(page.locator("#work article")).toHaveCount(slugs.length);

  await page.goto("/work/zentix", { waitUntil: "networkidle" });
  for (const id of chapterIds) {
    await expect(page.locator(`h2#${id}, #${id} h2`)).toBeAttached();
  }
});
