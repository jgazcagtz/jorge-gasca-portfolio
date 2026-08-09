import type { Metadata } from "next";
import type { CaseStudy } from "@/lib/case-studies";
import { homeCopy } from "@/lib/home";
import { absoluteUrl, localePath, SITE_URL, type Locale } from "@/lib/site";

export function homeMetadata(locale: Locale): Metadata {
  const copy = homeCopy[locale].hero;
  const canonicalPath = localePath(locale);
  const socialImage = "/media/jorge-gasca-social-card.png";
  const keywords =
    locale === "en"
      ? [
          "SaaS onboarding specialist",
          "product builder Mexico City",
          "CRM automation",
          "AI workflows",
          "customer experience",
          "product operations",
          "bilingual SaaS specialist",
          "Apollo.io onboarding",
        ]
      : [
          "especialista en onboarding SaaS",
          "creador de productos Ciudad de México",
          "automatización CRM",
          "flujos de IA",
          "experiencia de cliente",
          "operaciones de producto",
          "especialista SaaS bilingüe",
          "onboarding Apollo.io",
        ];

  return {
    metadataBase: new URL(SITE_URL),
    title:
      locale === "en"
        ? "Jorge Gasca — SaaS Onboarding & Product Builder"
        : "Jorge Gasca — Onboarding SaaS y Creador de Productos",
    description: copy.summary,
    applicationName: "Jorge Gasca Product Portfolio",
    authors: [{ name: "Jorge Manuel Gasca Gutiérrez", url: SITE_URL }],
    creator: "Jorge Manuel Gasca Gutiérrez",
    publisher: "Jorge Manuel Gasca Gutiérrez",
    keywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/",
        es: "/es",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_MX",
      alternateLocale: locale === "en" ? ["es_MX"] : ["en_US"],
      url: canonicalPath,
      siteName: "Jorge Gasca — Product Portfolio",
      title: copy.headline,
      description: copy.summary,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt:
            locale === "en"
              ? "Jorge Gasca — SaaS onboarding and product builder"
              : "Jorge Gasca — Onboarding SaaS y creador de productos",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.headline,
      description: copy.summary,
      images: [socialImage],
    },
    category: "technology",
  };
}

export function caseStudyMetadata(
  locale: Locale,
  study: CaseStudy,
): Metadata {
  const copy = study.copy[locale];
  const englishPath = `/work/${study.slug}`;
  const spanishPath = `/es/work/${study.slug}`;
  const canonicalPath = locale === "en" ? englishPath : spanishPath;
  const cover = study.media.find((asset) => asset.id.endsWith("desktop"));

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.dek,
    authors: [{ name: "Jorge Manuel Gasca Gutiérrez", url: SITE_URL }],
    creator: "Jorge Manuel Gasca Gutiérrez",
    keywords: [study.copy[locale].title, ...study.stack, copy.stageLabel],
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: englishPath,
        es: spanishPath,
        "x-default": englishPath,
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "en" ? "en_US" : "es_MX",
      alternateLocale: locale === "en" ? ["es_MX"] : ["en_US"],
      url: canonicalPath,
      siteName: "Jorge Gasca — Product Portfolio",
      title: copy.title,
      description: copy.dek,
      images: cover
        ? [
            {
              url: absoluteUrl(cover.src),
              width: cover.viewport.width,
              height: cover.viewport.height,
              alt: copy.coverAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.dek,
      images: cover ? [absoluteUrl(cover.src)] : undefined,
    },
  };
}
