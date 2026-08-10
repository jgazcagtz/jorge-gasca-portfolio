/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { cache } from "react";
import { ImageResponse } from "next/og";
import type { CaseStudy } from "@/lib/case-studies";
import type { Locale } from "@/lib/site";

export const SOCIAL_CARD_SIZE = {
  width: 1200,
  height: 630,
} as const;

const palette = {
  paper: "#f2eee6",
  ink: "#151515",
  muted: "#5f5a52",
  rule: "#c8c1b6",
  accent: "#cf4937",
};

const caseAccents: Record<CaseStudy["accent"], string> = {
  violet: "#7657d7",
  coral: "#d75b4a",
  lime: "#819b35",
  orange: "#d77332",
  blue: "#3c70b8",
  cyan: "#268a96",
};

const publicAssetDataUri = cache(async (src: string) => {
  const publicRoot = resolve(process.cwd(), "public");
  const relativePath = src.split(/[?#]/, 1)[0].replace(/^[/\\]+/, "");
  const assetPath = resolve(publicRoot, relativePath);

  if (!assetPath.startsWith(`${publicRoot}${sep}`)) {
    throw new Error(`Social-card asset must stay inside public/: ${src}`);
  }

  const mimeType =
    extname(assetPath).toLowerCase() === ".webp"
      ? "image/webp"
      : extname(assetPath).toLowerCase() === ".jpg" ||
          extname(assetPath).toLowerCase() === ".jpeg"
        ? "image/jpeg"
        : "image/png";
  const contents = await readFile(assetPath);

  return `data:${mimeType};base64,${contents.toString("base64")}`;
});

export async function createHomeSocialCard(locale: Locale) {
  const portrait = await publicAssetDataUri(
    "/media/jorge-gasca-portrait.png",
  );
  const isEnglish = locale === "en";

  return new ImageResponse(
    (
      <div
        style={{
          background: palette.paper,
          color: palette.ink,
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: palette.accent,
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 10,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 720,
            padding: "64px 58px 52px 64px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 2.5,
                textTransform: "uppercase",
              }}
            >
              <span>Jorge Gasca</span>
              <span style={{ color: palette.accent, margin: "0 14px" }}>/</span>
              <span>{isEnglish ? "Product Specialist" : "Especialista de producto"}</span>
            </div>
            <div
              style={{
                background: palette.rule,
                display: "flex",
                width: "100%",
                height: 1,
                margin: "24px 0 38px",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: isEnglish ? 62 : 58,
                fontWeight: 700,
                letterSpacing: -2.5,
                lineHeight: 1.04,
                maxWidth: 590,
              }}
            >
              {isEnglish
                ? "I turn product ideas and messy workflows into tools people can actually use."
                : "Convierto ideas de producto y flujos complicados en herramientas que las personas pueden usar."}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: palette.muted,
            }}
          >
            <div style={{ display: "flex", fontSize: 22 }}>
              {isEnglish
                ? "Product UX · Sales automation · AI workflows"
                : "UX de producto · Automatización de ventas · Flujos con IA"}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 2,
                marginTop: 16,
                textTransform: "uppercase",
              }}
            >
              {isEnglish
                ? "Mexico City · English / Spanish"
                : "Ciudad de México · Español / Inglés"}
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#e9e9e7",
            borderLeft: `1px solid ${palette.ink}`,
            display: "flex",
            flex: 1,
            position: "relative",
          }}
        >
          <img
            src={portrait}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "58% 44%",
            }}
          />
          <div
            style={{
              background: palette.ink,
              color: palette.paper,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              right: 0,
              bottom: 0,
              left: 0,
              height: 54,
              padding: "0 24px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1.8,
              textTransform: "uppercase",
            }}
          >
            <span>Apollo.io</span>
            <span>EN / ES</span>
          </div>
        </div>
      </div>
    ),
    SOCIAL_CARD_SIZE,
  );
}

export async function createCaseSocialCard(
  locale: Locale,
  study: CaseStudy,
) {
  const copy = study.copy[locale];
  const cover = await publicAssetDataUri(study.media.desktop.src);
  const accent = caseAccents[study.accent];
  const isEnglish = locale === "en";

  return new ImageResponse(
    (
      <div
        style={{
          background: palette.paper,
          color: palette.ink,
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 44,
          position: "relative",
        }}
      >
        <div
          style={{
            background: accent,
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 10,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 730,
            height: "100%",
          }}
        >
          <div
            style={{
              background: "#ded9cf",
              border: `1px solid ${palette.ink}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 456,
              padding: 18,
            }}
          >
            <img
              src={cover}
              alt=""
              style={{
                backgroundColor: "#ffffff",
                display: "flex",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: 76,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: 1.8,
              textTransform: "uppercase",
            }}
          >
            <span>{isEnglish ? "Product case study" : "Caso de producto"}</span>
            <span>{String(study.sequence).padStart(2, "0")} / 06</span>
          </div>
        </div>
        <div
          style={{
            borderLeft: `1px solid ${palette.rule}`,
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: 42,
            padding: "8px 4px 8px 42px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: accent,
                display: "flex",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: 1.6,
                textTransform: "uppercase",
              }}
            >
              {copy.stageLabel}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: copy.title.length > 48 ? 42 : 50,
                fontWeight: 700,
                letterSpacing: -1.8,
                lineHeight: 1.06,
                marginTop: 28,
              }}
            >
              {copy.title}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                background: accent,
                display: "flex",
                width: 56,
                height: 5,
                marginBottom: 20,
              }}
            />
            <div style={{ display: "flex", fontSize: 22, fontWeight: 700 }}>
              Jorge Gasca
            </div>
            <div
              style={{
                color: palette.muted,
                display: "flex",
                fontSize: 16,
                marginTop: 8,
              }}
            >
              {isEnglish ? "Product & Sales Automation Specialist · Mexico City" : "Producto y Automatización de Ventas · Ciudad de México"}
            </div>
          </div>
        </div>
      </div>
    ),
    SOCIAL_CARD_SIZE,
  );
}
