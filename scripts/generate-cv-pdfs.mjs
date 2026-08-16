import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import {
  CV_PDF_DIRECTORY,
  CV_PDF_MANIFEST,
  CV_PDF_ROUTES,
  expectedPdfText,
  inspectPdf,
  pdfRelativePath,
  sha256,
  sourceDigest,
} from "./lib/cv-pdf-integrity.mjs";

const root = process.cwd();
const requestedBaseUrl = process.env.CV_PDF_BASE_URL;
const baseUrl = requestedBaseUrl ?? "http://127.0.0.1:4174";
const fixedDate = new Date("2026-08-15T00:00:00.000Z");

function run(executable, args) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(executable, args, {
      cwd: root,
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolveRun();
      else reject(new Error(`${executable} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function waitForServer(url) {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 500));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function normalizePdf(path, entry) {
  const source = await readFile(path);
  const document = await PDFDocument.load(source, { updateMetadata: false });
  document.setTitle(`Jorge Gasca - ${entry.title} CV (${entry.locale.toUpperCase()})`);
  document.setAuthor("Jorge Manuel Gasca Gutiérrez");
  document.setSubject(entry.title);
  document.setCreator("jgasca.io CV generator");
  document.setProducer("jgasca.io");
  document.setCreationDate(fixedDate);
  document.setModificationDate(fixedDate);
  document.setKeywords([
    "Jorge Gasca",
    entry.title,
    "Apollo.io",
    "Mexico City",
  ]);
  const bytes = await document.save({
    addDefaultPage: false,
    updateFieldAppearances: false,
    useObjectStreams: false,
  });
  await writeFile(path, bytes);
  return Buffer.from(bytes);
}

let server;
let browser;

try {
  if (!requestedBaseUrl) {
    await run(process.execPath, [
      resolve(root, "node_modules/next/dist/bin/next"),
      "build",
    ]);
    server = spawn(
      process.execPath,
      [
        resolve(root, "node_modules/next/dist/bin/next"),
        "start",
        "--hostname",
        "127.0.0.1",
        "--port",
        "4174",
      ],
      {
        cwd: root,
        env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
        stdio: ["ignore", "inherit", "inherit"],
      },
    );
    await waitForServer(baseUrl);
  }

  await mkdir(resolve(root, CV_PDF_DIRECTORY), { recursive: true });
  browser = await chromium.launch();
  const context = await browser.newContext({ colorScheme: "light" });
  const outputs = [];

  for (const entry of CV_PDF_ROUTES) {
    const page = await context.newPage();
    await page.goto(`${baseUrl}${entry.route}`, {
      waitUntil: "domcontentloaded",
      timeout: 60_000,
    });
    await page.emulateMedia({ media: "print" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState("load", { timeout: 10_000 }).catch(() => undefined);
    const relativePath = pdfRelativePath(entry);
    const path = resolve(root, relativePath);
    await page.pdf({
      path,
      format: "Letter",
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: false,
      tagged: true,
      outline: true,
    });
    await page.close();

    const normalized = await normalizePdf(path, entry);
    const inspection = await inspectPdf(normalized);
    if (inspection.pages !== 2) {
      throw new Error(`${relativePath} generated ${inspection.pages} pages; expected 2`);
    }
    const checks = expectedPdfText(entry);
    for (const expected of checks) {
      if (!inspection.text.includes(expected)) {
        throw new Error(`${relativePath} is missing selectable text: ${expected}`);
      }
    }

    outputs.push({
      locale: entry.locale,
      variant: entry.variant,
      route: entry.route,
      path: relativePath.replaceAll("\\", "/"),
      bytes: normalized.byteLength,
      sha256: sha256(normalized),
      pages: inspection.pages,
      textChecks: checks,
    });
    process.stdout.write(`Generated ${relativePath} (${inspection.pages} pages)\n`);
  }

  await context.close();
  await browser.close();
  browser = undefined;

  const manifest = {
    version: 1,
    contentDate: "2026-08-15",
    algorithm: "sha256",
    sourceDigest: await sourceDigest(root),
    outputCount: outputs.length,
    outputs,
  };
  await writeFile(
    resolve(root, CV_PDF_MANIFEST),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  process.stdout.write(`Wrote ${CV_PDF_MANIFEST}\n`);
} finally {
  if (browser) await browser.close();
  if (server && !server.killed) server.kill();
}
