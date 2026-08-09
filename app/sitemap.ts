import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";

const lastModified = new Date("2026-08-09T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", ...caseStudySlugs.map((slug) => `/work/${slug}`)];

  return pages.flatMap((path, index) => {
    const enUrl = `${SITE_URL}${path}`;
    const esUrl = `${SITE_URL}/es${path}`;
    const alternates = {
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    };

    return [
      {
        url: enUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: index === 0 ? 1 : 0.8,
        alternates,
      },
      {
        url: esUrl,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: index === 0 ? 0.9 : 0.8,
        alternates,
      },
    ];
  });
}
