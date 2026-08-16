import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  CV_PDF_MANIFEST,
  CV_PDF_ROUTES,
  expectedPdfText,
  inspectPdf,
  pdfRelativePath,
  sha256,
  sourceDigest,
} from "./lib/cv-pdf-integrity.mjs";

const root = process.cwd();
const manifest = JSON.parse(await readFile(resolve(root, CV_PDF_MANIFEST), "utf8"));
const expectedSourceDigest = await sourceDigest(root);

if (manifest.sourceDigest !== expectedSourceDigest) {
  throw new Error(
    `CV PDF source digest is stale. Run npm run cv:pdf. Expected ${expectedSourceDigest}, received ${manifest.sourceDigest}.`,
  );
}
if (manifest.outputCount !== CV_PDF_ROUTES.length || manifest.outputs.length !== CV_PDF_ROUTES.length) {
  throw new Error(`Expected ${CV_PDF_ROUTES.length} PDF outputs, received ${manifest.outputs.length}.`);
}

for (const entry of CV_PDF_ROUTES) {
  const expectedPath = pdfRelativePath(entry).replaceAll("\\", "/");
  const approved = manifest.outputs.find(
    (output) => output.locale === entry.locale && output.variant === entry.variant,
  );
  if (!approved) throw new Error(`Missing manifest entry for ${entry.locale}/${entry.variant}`);
  if (approved.path !== expectedPath) {
    throw new Error(`Unexpected path for ${entry.locale}/${entry.variant}: ${approved.path}`);
  }

  const buffer = await readFile(resolve(root, approved.path));
  if (buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
    throw new Error(`${approved.path} is not a PDF file.`);
  }
  if (buffer.byteLength !== approved.bytes) {
    throw new Error(`${approved.path} byte size changed.`);
  }
  if (sha256(buffer) !== approved.sha256) {
    throw new Error(`${approved.path} SHA-256 changed.`);
  }

  const inspection = await inspectPdf(buffer);
  if (inspection.pages !== 2 || approved.pages !== 2) {
    throw new Error(`${approved.path} must contain exactly two pages.`);
  }
  for (const expected of expectedPdfText(entry)) {
    if (!inspection.text.includes(expected)) {
      throw new Error(`${approved.path} is missing selectable text: ${expected}`);
    }
  }
  process.stdout.write(`PASS ${approved.path} (${inspection.pages} pages, ${buffer.byteLength} bytes)\n`);
}
