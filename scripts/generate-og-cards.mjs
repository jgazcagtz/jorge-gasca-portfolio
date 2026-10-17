/**
 * Generates the static Open Graph cards for the home pages (/ and /es).
 *
 * Renders a 1200x630 dark card (portrait + name + positioning line) with
 * Playwright and writes the PNGs to public/media/og-card-{en,es}.png. The
 * PNGs are committed; rerun this script only when the design or copy changes.
 *
 * Fonts are fetched from Google Fonts into tmp/og-fonts (network required).
 *
 * Usage: node scripts/generate-og-cards.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const ROOT = path.resolve(process.cwd());
const FONT_DIR = path.join(ROOT, "tmp", "og-fonts");
const FONT_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const CARDS = {
  en: {
    chip: "HUMAN / SYSTEMS",
    location: "MX / REMOTE",
    name: "Jorge Gasca",
    title: "Product Specialist · AI &amp; Sales Automation",
    steps: ["Discover", "Design", "Automate", "Verify"],
    file: "og-card-en.png",
  },
  es: {
    chip: "HUMANO / SISTEMAS",
    location: "MX / REMOTO",
    name: "Jorge Gasca",
    title: "Especialista de Producto · IA y Automatización de Ventas",
    steps: ["Descubrir", "Diseñar", "Automatizar", "Verificar"],
    file: "og-card-es.png",
  },
};

async function prepareFonts() {
  await mkdir(FONT_DIR, { recursive: true });
  const cssPath = path.join(FONT_DIR, "fonts.css");

  if (!existsSync(cssPath)) {
    const response = await fetch(FONT_CSS_URL, { headers: { "User-Agent": USER_AGENT } });
    if (!response.ok) throw new Error(`Google Fonts CSS failed: ${response.status}`);
    await writeFile(cssPath, await response.text());
  }

  let css = await readFile(cssPath, "utf8");
  const urls = [...new Set(css.match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g) ?? [])];
  for (const url of urls) {
    const fileName = url.split("/").pop();
    const filePath = path.join(FONT_DIR, fileName);
    if (!existsSync(filePath)) {
      const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
      if (!response.ok) throw new Error(`Font download failed: ${url}`);
      await writeFile(filePath, Buffer.from(await response.arrayBuffer()));
    }
    css = css.split(url).join(`file:///${filePath.replace(/\\/g, "/")}`);
  }
  return css;
}

function cardHtml(copy) {
  const portraitPath = path.join(ROOT, "public", "media", "jorge-gasca-portrait.png");
  const steps = copy.steps
    .map(
      (step, index) => `
        <div class="step">
          <span class="dot${index === copy.steps.length - 1 ? " accent" : ""}"></span>
          <span class="stepLabel">${step}</span>
          ${index < copy.steps.length - 1 ? '<span class="stepRule"></span>' : ""}
        </div>`,
    )
    .join("");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  ${FONT_CSS}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1200px; height: 630px; }
  body {
    display: flex;
    background:
      radial-gradient(circle at 12% 8%, rgba(255, 107, 98, 0.05) 0 1px, transparent 1.5px) 0 0 / 20px 20px,
      #0b0b10;
    color: #f5f0e7;
    font-family: "Geist", Arial, sans-serif;
    overflow: hidden;
  }
  .column {
    display: flex;
    flex-direction: column;
    width: 696px;
    padding: 48px 52px 44px 56px;
    position: relative;
  }
  .column::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 -56px;
    width: 700px;
    background: linear-gradient(90deg, rgba(245, 240, 231, 0.05) 1px, transparent 1px);
    background-size: calc(100% / 6) 100%;
    pointer-events: none;
  }
  .metaRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2.6px;
    text-transform: uppercase;
  }
  .chip {
    padding: 7px 10px;
    border: 1px solid rgba(245, 240, 231, 0.32);
  }
  .location { color: #a9a3ad; letter-spacing: 2px; }
  .nameBlock { margin-top: 96px; }
  .eyebrowRule {
    width: 64px;
    height: 3px;
    margin-bottom: 26px;
    background: #8062ff;
  }
  .name {
    font-family: "Instrument Serif", Georgia, serif;
    font-size: 92px;
    font-weight: 400;
    letter-spacing: -0.015em;
    line-height: 0.98;
  }
  .title {
    max-width: 560px;
    margin-top: 26px;
    font-size: 25px;
    font-weight: 600;
    letter-spacing: 0.01em;
    line-height: 1.3;
  }
  .stepsRow {
    display: flex;
    align-items: center;
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid rgba(245, 240, 231, 0.22);
  }
  .step { display: flex; align-items: center; }
  .dot {
    width: 9px;
    height: 9px;
    border-radius: 999px;
    background: #6e6879;
  }
  .dot.accent { background: #8062ff; }
  .stepLabel {
    margin-left: 8px;
    color: #a9a3ad;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.6px;
    text-transform: uppercase;
  }
  .stepRule {
    width: 26px;
    height: 1px;
    margin: 0 12px;
    background: rgba(245, 240, 231, 0.22);
  }
  .portraitColumn {
    position: relative;
    flex: 1;
    border-left: 1px solid rgba(245, 240, 231, 0.18);
  }
  .portraitColumn img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 58% 38%;
  }
  .portraitColumn::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #0b0b10 0%, rgba(11, 11, 16, 0) 26%);
  }
</style>
</head>
<body>
  <div class="column">
    <div class="metaRow">
      <span class="chip">${copy.chip}</span>
      <span class="location">${copy.location}</span>
    </div>
    <div class="nameBlock">
      <div class="eyebrowRule"></div>
      <div class="name">${copy.name}</div>
      <div class="title">${copy.title}</div>
    </div>
    <div class="stepsRow">${steps}</div>
  </div>
  <div class="portraitColumn">
    <img src="file:///${portraitPath.replace(/\\/g, "/")}" alt="" />
  </div>
</body>
</html>`;
}

const FONT_CSS = await prepareFonts();

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  for (const [locale, copy] of Object.entries(CARDS)) {
    const htmlPath = path.join(FONT_DIR, `og-card-${locale}.html`);
    await writeFile(htmlPath, cardHtml(copy), "utf8");
    await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const outPath = path.join(ROOT, "public", "media", copy.file);
    await page.screenshot({ path: outPath, type: "png" });
    console.log(`wrote ${path.relative(ROOT, outPath)}`);
  }
} finally {
  await browser.close();
}
