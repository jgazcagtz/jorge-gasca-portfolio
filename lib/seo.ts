import type { Metadata } from "next";
import type { CaseStudy } from "@/lib/case-studies";
import { homeCopy } from "@/lib/home";
import { localePath, SITE_URL, type Locale } from "@/lib/site";

export const CONTENT_DATE = "2026-08-09";
export const CONTENT_DATE_ISO = `${CONTENT_DATE}T00:00:00-06:00`;

export const HOME_TITLES: Record<Locale, string> = {
  en: "Jorge Gasca | Product & Sales Automation Specialist",
  es: "Jorge Gasca | Producto y Automatización de Ventas",
};

const AUTHOR_NAME = "Jorge Manuel Gasca Gutiérrez";
const SITE_NAME = "Jorge Gasca";

export function homeMetadata(locale: Locale): Metadata {
  const copy = homeCopy[locale].hero;
  const canonicalPath = localePath(locale);
  const title = HOME_TITLES[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: copy.summary,
    applicationName: "Jorge Gasca Portfolio",
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
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
      siteName: SITE_NAME,
      title,
      description: copy.summary,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.summary,
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

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.seoTitle,
    description: copy.seoDescription,
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
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
      siteName: SITE_NAME,
      title: copy.seoTitle,
      description: copy.seoDescription,
      publishedTime: CONTENT_DATE_ISO,
      modifiedTime: CONTENT_DATE_ISO,
      authors: [SITE_URL],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.seoTitle,
      description: copy.seoDescription,
    },
  };
}
