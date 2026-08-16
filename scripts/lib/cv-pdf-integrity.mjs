import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export const CV_PDF_ROUTES = [
  {
    locale: "en",
    variant: "gtm-revops",
    route: "/cv/gtm-revops",
    title: "GTM Systems and Revenue Operations",
    languageText: "Portuguese - A2",
  },
  {
    locale: "en",
    variant: "product-implementation",
    route: "/cv/product-implementation",
    title: "Product Operations and Implementation",
    languageText: "Portuguese - A2",
  },
  {
    locale: "en",
    variant: "ai-automation",
    route: "/cv/ai-automation",
    title: "AI Automation and Technical Product",
    languageText: "Portuguese - A2",
  },
  {
    locale: "en",
    variant: "customer-solutions",
    route: "/cv/customer-solutions",
    title: "Customer Success and Solutions",
    languageText: "Portuguese - A2",
  },
  {
    locale: "es",
    variant: "gtm-revops",
    route: "/es/cv/gtm-revops",
    title: "Sistemas GTM y Operaciones de Ingresos",
    languageText: "Portugués - A2",
  },
  {
    locale: "es",
    variant: "product-implementation",
    route: "/es/cv/product-implementation",
    title: "Operaciones de Producto e Implementación",
    languageText: "Portugués - A2",
  },
  {
    locale: "es",
    variant: "ai-automation",
    route: "/es/cv/ai-automation",
    title: "Automatización con IA y Producto Técnico",
    languageText: "Portugués - A2",
  },
  {
    locale: "es",
    variant: "customer-solutions",
    route: "/es/cv/customer-solutions",
    title: "Customer Success y Soluciones",
    languageText: "Portugués - A2",
  },
];

export const CV_SOURCE_FILES = [
  "app/globals.css",
  "components/cv-page.module.css",
  "components/cv-page.tsx",
  "lib/cv.ts",
  "lib/site.ts",
  "scripts/generate-cv-pdfs.mjs",
  "scripts/lib/cv-pdf-integrity.mjs",
];

export const CV_PDF_MANIFEST = "content/cv-pdf-manifest.json";
export const CV_PDF_DIRECTORY = "public/cv/downloads";

export function pdfRelativePath(entry) {
  return `${CV_PDF_DIRECTORY}/jorge-gasca-${entry.variant}-${entry.locale}.pdf`;
}

export function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

export async function sourceDigest(root = process.cwd()) {
  const hash = createHash("sha256");
  for (const file of CV_SOURCE_FILES) {
    hash.update(file);
    hash.update("\0");
    hash.update(await readFile(resolve(root, file)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export async function inspectPdf(buffer) {
  const document = await getDocument({
    data: new Uint8Array(buffer),
    useSystemFonts: true,
  }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    pages.push(content.items.map((item) => ("str" in item ? item.str : "")).join(" "));
  }
  return {
    pages: document.numPages,
    text: pages.join("\n"),
  };
}

export function expectedPdfText(entry) {
  return [
    "Jorge Manuel Gasca Gutiérrez",
    entry.title,
    "Apollo.io",
    "MiniTiendAI",
    "GTMSnap",
    "Hermes Agent Lab",
    "Google Cloud Generative AI Leader (2025)",
    entry.languageText,
    "gascagtz@gmail.com",
    "jgasca.io",
  ];
}
