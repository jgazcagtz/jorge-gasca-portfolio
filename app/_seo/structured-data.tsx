import {
  caseStudies,
  type CaseStudy,
} from "@/lib/case-studies";
import { homeCopy } from "@/lib/home";
import {
  CONTENT_DATE_ISO,
  HOME_TITLES,
} from "@/lib/seo";
import {
  absoluteUrl,
  CONTACT,
  localePath,
  SITE_URL,
  type Locale,
} from "@/lib/site";

const PERSON_ID = `${SITE_URL}/#jorge-gasca`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function personNode(locale: Locale) {
  return {
    "@id": PERSON_ID,
    "@type": "Person",
    name: "Jorge Manuel Gasca Gutiérrez",
    alternateName: "Jorge Gasca",
    url: SITE_URL,
    image: absoluteUrl("/media/jorge-gasca-portrait.webp"),
    description: homeCopy[locale].hero.summary,
    email: CONTACT.email,
    telephone: CONTACT.phoneDisplay,
    jobTitle: "Product Specialist",
    worksFor: {
      "@type": "Organization",
      name: "Apollo.io",
      url: "https://www.apollo.io/",
    },
    affiliation: {
      "@type": "Organization",
      name: "Marblism",
      url: "https://marblism.com",
    },
    hasOccupation: [
      { "@type": "Occupation", name: "Product Specialist" },
      { "@type": "Occupation", name: "Sales Automation Specialist" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "en" ? "Mexico City" : "Ciudad de México",
      addressCountry: "MX",
    },
    sameAs: [CONTACT.linkedIn, CONTACT.github],
    knowsLanguage: ["Spanish", "English"],
    knowsAbout: [
      "Sales automation",
      "SaaS onboarding",
      "Customer adoption",
      "CRM workflows",
      "Product UX",
      "Product quality assurance",
      "AI workflow design",
      "Web and API delivery",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "professional and project inquiries",
      telephone: CONTACT.phoneDisplay,
      email: CONTACT.email,
      availableLanguage: ["English", "Spanish"],
      areaServed: "Worldwide",
    },
  };
}

export function homeStructuredData(locale: Locale) {
  const pageUrl = absoluteUrl(localePath(locale));
  const profileId = `${pageUrl}#profile`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": profileId,
        "@type": "ProfilePage",
        url: pageUrl,
        name: HOME_TITLES[locale],
        description: homeCopy[locale].hero.summary,
        inLanguage: locale,
        dateCreated: CONTENT_DATE_ISO,
        dateModified: CONTENT_DATE_ISO,
        mainEntity: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        hasPart: caseStudies.map((study) => ({
          "@id": `${absoluteUrl(localePath(locale, `/work/${study.slug}`))}#case-study`,
        })),
      },
      personNode(locale),
      {
        "@id": WEBSITE_ID,
        "@type": "WebSite",
        name: "Jorge Gasca",
        url: SITE_URL,
        inLanguage: ["en", "es"],
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

export function caseStudyStructuredData(
  locale: Locale,
  study: CaseStudy,
) {
  const copy = study.copy[locale];
  const pageUrl = absoluteUrl(localePath(locale, `/work/${study.slug}`));
  const homeUrl = absoluteUrl(localePath(locale));
  const productName = copy.title.split(" — ")[0];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${pageUrl}#case-study`,
        "@type": "CreativeWork",
        url: pageUrl,
        name: copy.title,
        description: copy.summary,
        abstract: copy.summary,
        creditText: copy.ownership,
        inLanguage: locale,
        dateCreated: CONTENT_DATE_ISO,
        dateModified: CONTENT_DATE_ISO,
        image: absoluteUrl(study.media.desktop.src),
        author: { "@id": PERSON_ID },
        creator: { "@id": PERSON_ID },
        copyrightHolder: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        mainEntityOfPage: pageUrl,
        about: {
          "@type": "SoftwareApplication",
          name: productName,
          url: study.liveUrl,
        },
      },
      {
        "@id": `${pageUrl}#breadcrumb`,
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "en" ? "Jorge Gasca portfolio" : "Portafolio de Jorge Gasca",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.title,
            item: pageUrl,
          },
        ],
      },
      personNode(locale),
      {
        "@id": WEBSITE_ID,
        "@type": "WebSite",
        name: "Jorge Gasca",
        url: SITE_URL,
        inLanguage: ["en", "es"],
        author: { "@id": PERSON_ID },
      },
    ],
  };
}

export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function StructuredData({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }}
    />
  );
}

export function HomeStructuredData({ locale }: { locale: Locale }) {
  return <StructuredData data={homeStructuredData(locale)} />;
}
