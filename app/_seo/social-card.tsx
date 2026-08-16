/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { cache } from "react";
import { ImageResponse } from "next/og";
import type { CaseStudy } from "@/lib/case-studies";
import { cvUiCopy, type CvVariant } from "@/lib/cv";
import type { Locale } from "@/lib/site";

export const SOCIAL_CARD_SIZE = {
  width: 1200,
  height: 630,
} as const;

const palette = {
  paper: "#f3efe6",
  raised: "#fffdf7",
  ink: "#0d0d12",
  muted: "#5c5861",
  rule: "#cfc6b7",
  violet: "#8062ff",
};

const caseAccents: Record<CaseStudy["accent"], string> = {
  violet: "#8062ff",
  coral: "#ff6b62",
  lime: "#b9f466",
  orange: "#ff8a38",
  blue: "#5b8cff",
  cyan: "#4ce0db",
};

const publicAssetDataUri = cache(async (src: string) => {
  const publicRoot = resolve(process.cwd(), "public");
  const relativePath = src.split(/[?#]/, 1)[0].replace(/^[/\\]+/, "");
  const assetPath = resolve(publicRoot, relativePath);

  if (!assetPath.startsWith(`${publicRoot}${sep}`)) {
    throw new Error(`Social-card asset must stay inside public/: ${src}`);
  }

  const extension = extname(assetPath).toLowerCase();
  const mimeType = extension === ".webp"
    ? "image/webp"
    : extension === ".jpg" || extension === ".jpeg"
      ? "image/jpeg"
      : "image/png";
  const contents = await readFile(assetPath);

  return `data:${mimeType};base64,${contents.toString("base64")}`;
});

export async function createHomeSocialCard(locale: Locale) {
  const portrait = await publicAssetDataUri("/media/jorge-gasca-portrait.png");
  const isEnglish = locale === "en";
  const headline = isEnglish
    ? "I make complex product systems easier to understand, use, and ship."
    : "Convierto sistemas de producto complejos en experiencias claras, útiles y listas para operar.";
  const steps = isEnglish
    ? ["Discover", "Design", "Automate", "Verify"]
    : ["Descubrir", "Diseñar", "Automatizar", "Verificar"];

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
            backgroundImage: `linear-gradient(${palette.rule}66 1px, transparent 1px), linear-gradient(90deg, ${palette.rule}66 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            display: "flex",
            position: "absolute",
            inset: 0,
            opacity: 0.38,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 790,
            padding: "46px 50px 42px 56px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: 2.4,
                textTransform: "uppercase",
              }}
            >
              <span style={{ background: palette.ink, color: palette.paper, padding: "7px 10px" }}>
                Human / Systems Atlas
              </span>
              <span style={{ marginLeft: 14 }}>2026—27</span>
            </div>
            <span style={{ color: palette.muted, fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
              MX / REMOTE
            </span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: isEnglish ? 57 : 49,
              fontWeight: 760,
              letterSpacing: -2.7,
              lineHeight: 1.01,
              marginTop: 54,
              maxWidth: 680,
            }}
          >
            {headline}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "auto",
              borderTop: `1px solid ${palette.ink}`,
              paddingTop: 18,
            }}
          >
            {steps.map((step, index) => (
              <div key={step} style={{ display: "flex", alignItems: "center" }}>
                <span
                  style={{
                    background: index === 3 ? palette.violet : palette.ink,
                    borderRadius: 999,
                    display: "flex",
                    width: 9,
                    height: 9,
                  }}
                />
                <span style={{ fontSize: 13, fontWeight: 750, marginLeft: 7, textTransform: "uppercase" }}>
                  {step}
                </span>
                {index < steps.length - 1 ? (
                  <span style={{ background: palette.rule, display: "flex", width: 28, height: 1, margin: "0 9px" }} />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: palette.raised,
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
              objectPosition: "58% 42%",
            }}
          />
          <div
            style={{
              background: palette.violet,
              color: palette.ink,
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              right: 22,
              bottom: 22,
              width: 290,
              padding: "18px 20px",
            }}
          >
            <span style={{ fontSize: 27, fontWeight: 800 }}>Jorge Gasca</span>
            <span style={{ fontSize: 13, fontWeight: 750, letterSpacing: 1.7, marginTop: 7, textTransform: "uppercase" }}>
              {isEnglish ? "Product systems / Automation" : "Sistemas de producto / Automatización"}
            </span>
          </div>
        </div>
      </div>
    ),
    SOCIAL_CARD_SIZE,
  );
}

export async function createCaseSocialCard(locale: Locale, study: CaseStudy) {
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
          padding: 42,
          position: "relative",
          overflow: "hidden",
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
            height: 12,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 410,
            padding: "10px 36px 8px 6px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: 13, fontWeight: 800, letterSpacing: 2.1, textTransform: "uppercase" }}>
              <span>Human / Systems Atlas</span>
              <span style={{ color: accent, margin: "0 10px" }}>/</span>
              <span>{String(study.sequence).padStart(2, "0")}</span>
            </div>
            <div style={{ background: palette.rule, display: "flex", width: "100%", height: 1, margin: "24px 0 34px" }} />
            <div
              style={{
                display: "flex",
                fontSize: copy.title.length > 48 ? 42 : 50,
                fontWeight: 800,
                letterSpacing: -2.1,
                lineHeight: 1.02,
              }}
            >
              {copy.title}
            </div>
            <div
              style={{
                color: palette.muted,
                display: "flex",
                fontSize: 17,
                lineHeight: 1.35,
                marginTop: 24,
              }}
            >
              {copy.role}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: palette.muted, fontSize: 12, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase" }}>
              {isEnglish ? "Verified now" : "Verificado ahora"}
            </span>
            <span style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.35, marginTop: 10 }}>
              {copy.cardResult}
            </span>
            <span style={{ fontSize: 15, fontWeight: 800, marginTop: 24 }}>Jorge Gasca</span>
          </div>
        </div>

        <div
          style={{
            background: palette.ink,
            border: `1px solid ${palette.ink}`,
            display: "flex",
            flex: 1,
            flexDirection: "column",
            padding: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              background: palette.raised,
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={cover}
              alt=""
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div
            style={{
              color: palette.paper,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 58,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 1.7,
              textTransform: "uppercase",
            }}
          >
            <span>{isEnglish ? "Privacy-reviewed evidence" : "Evidencia revisada por privacidad"}</span>
            <span style={{ background: accent, color: palette.ink, padding: "6px 9px" }}>{copy.stageLabel}</span>
          </div>
        </div>
      </div>
    ),
    SOCIAL_CARD_SIZE,
  );
}

export async function createCvSocialCard(locale: Locale, variant?: CvVariant) {
  const portrait = await publicAssetDataUri("/media/jorge-gasca-portrait.png");
  const copy = cvUiCopy[locale];
  const title = variant?.title[locale] ?? copy.hubTitle;
  const eyebrow = variant?.eyebrow[locale] ?? copy.hubEyebrow;
  const accent = variant
    ? caseAccents[variant.accent === "lime" ? "lime" : variant.accent === "coral" ? "coral" : variant.accent === "cyan" ? "cyan" : "violet"]
    : palette.violet;
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
            background: accent,
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 14,
          }}
        />
        <div
          style={{
            backgroundImage: `linear-gradient(${palette.rule}55 1px, transparent 1px), linear-gradient(90deg, ${palette.rule}55 1px, transparent 1px)`,
            backgroundSize: "42px 42px",
            display: "flex",
            position: "absolute",
            inset: 0,
            opacity: 0.42,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 820,
            padding: "52px 52px 44px 58px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2.2, textTransform: "uppercase" }}>
              {eyebrow}
            </span>
            <span style={{ color: palette.muted, fontSize: 13, fontWeight: 750, letterSpacing: 1.8 }}>
              CV / 2026
            </span>
          </div>
          <div style={{ background: palette.ink, display: "flex", width: "100%", height: 1, marginTop: 24 }} />
          <div
            style={{
              display: "flex",
              fontSize: title.length > 54 ? 50 : 60,
              fontWeight: 800,
              letterSpacing: -2.6,
              lineHeight: 0.98,
              marginTop: 50,
              maxWidth: 700,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <span style={{ fontSize: 27, fontWeight: 800 }}>Jorge Manuel Gasca Gutiérrez</span>
            <span style={{ color: palette.muted, fontSize: 15, fontWeight: 700, marginTop: 8 }}>
              {isEnglish
                ? "Apollo.io Product Specialist | Mexico City | Remote"
                : "Product Specialist en Apollo.io | Ciudad de México | Remoto"}
            </span>
          </div>
        </div>
        <div
          style={{
            background: palette.raised,
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
              objectPosition: "58% 42%",
            }}
          />
          <div
            style={{
              background: accent,
              color: palette.ink,
              display: "flex",
              position: "absolute",
              right: 24,
              bottom: 24,
              padding: "16px 18px",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 1.6,
              textTransform: "uppercase",
            }}
          >
            {isEnglish ? "Web CV + ATS PDF" : "CV web + PDF ATS"}
          </div>
        </div>
      </div>
    ),
    SOCIAL_CARD_SIZE,
  );
}
