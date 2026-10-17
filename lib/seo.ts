import type { Metadata } from "next";
import type { CaseStudy } from "@/lib/case-studies";
import {
  cvHubPath,
  cvUiCopy,
  cvVariantPath,
  type CvVariant,
} from "@/lib/cv";
import { homeCopy } from "@/lib/home";
import { localePath, SITE_URL, type Locale } from "@/lib/site";
import {
  writingHubPath,
  writingPostPath,
  writingUiCopy,
  type WritingPost,
} from "@/lib/writing";

export const CONTENT_DATE = "2026-10-17";
export const CONTENT_DATE_ISO = `${CONTENT_DATE}T00:00:00-06:00`;

export const HOME_TITLES: Record<Locale, string> = {
  en: "Jorge Gasca | Product Specialist · AI & Sales Automation",
  es: "Jorge Gasca | Especialista de Producto · IA y Automatización de Ventas",
};

const AUTHOR_NAME = "Jorge Manuel Gasca Gutiérrez";
const SITE_NAME = "Jorge Gasca";

/** Static, designed social cards (see scripts/generate-og-cards.mjs). */
const HOME_OG_CARDS: Record<Locale, { url: string; alt: string }> = {
  en: {
    url: "/media/og-card-en.png",
    alt: "Jorge Gasca — Product Specialist, AI & Sales Automation",
  },
  es: {
    url: "/media/og-card-es.png",
    alt: "Jorge Gasca — Especialista de Producto, IA y Automatización de Ventas",
  },
};

export function homeMetadata(locale: Locale): Metadata {
  const copy = homeCopy[locale].hero;
  const canonicalPath = localePath(locale);
  const title = HOME_TITLES[locale];
  const ogImage = {
    url: HOME_OG_CARDS[locale].url,
    width: 1200,
    height: 630,
    alt: HOME_OG_CARDS[locale].alt,
    type: "image/png" as const,
  };

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
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.summary,
      images: [ogImage.url],
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

export function cvHubMetadata(locale: Locale): Metadata {
  const canonicalPath = cvHubPath(locale);
  const englishPath = cvHubPath("en");
  const spanishPath = cvHubPath("es");
  const copy = cvUiCopy[locale];
  const title = locale === "en"
    ? "Jorge Gasca | CV for GTM, Product and AI Automation"
    : "Jorge Gasca | CV de GTM, Producto y Automatización con IA";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: copy.hubSummary,
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
      type: "website",
      locale: locale === "en" ? "en_US" : "es_MX",
      alternateLocale: locale === "en" ? ["es_MX"] : ["en_US"],
      url: canonicalPath,
      siteName: SITE_NAME,
      title,
      description: copy.hubSummary,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.hubSummary,
    },
  };
}

export function cvMetadata(locale: Locale, variant: CvVariant): Metadata {  const englishPath = cvVariantPath("en", variant.slug);
  const spanishPath = cvVariantPath("es", variant.slug);
  const canonicalPath = cvVariantPath(locale, variant.slug);
  const title = variant.seoTitle[locale];
  const description = variant.seoDescription[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
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
      type: "website",
      locale: locale === "en" ? "en_US" : "es_MX",
      alternateLocale: locale === "en" ? ["es_MX"] : ["en_US"],
      url: canonicalPath,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function writingHubMetadata(locale: Locale): Metadata {
  const canonicalPath = writingHubPath(locale);
  const englishPath = writingHubPath("en");
  const spanishPath = writingHubPath("es");
  const copy = writingUiCopy[locale];
  const title = locale === "en"
    ? "Jorge Gasca | Writing"
    : "Jorge Gasca | Escritos";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: copy.intro,
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
      type: "website",
      locale: locale === "en" ? "en_US" : "es_MX",
      alternateLocale: locale === "en" ? ["es_MX"] : ["en_US"],
      url: canonicalPath,
      siteName: SITE_NAME,
      title,
      description: copy.intro,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.intro,
    },
  };
}

export function writingPostMetadata(
  locale: Locale,
  post: WritingPost,
): Metadata {
  const copy = post.copy[locale];
  const canonicalPath = writingPostPath(locale, post.slug);
  const englishPath = writingPostPath("en", post.slug);
  const spanishPath = writingPostPath("es", post.slug);
  const publishedIso = `${post.date}T00:00:00-06:00`;

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
      publishedTime: publishedIso,
      modifiedTime: publishedIso,
      authors: [SITE_URL],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.seoTitle,
      description: copy.seoDescription,
    },
  };
}
