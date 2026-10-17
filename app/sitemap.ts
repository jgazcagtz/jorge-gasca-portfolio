import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/lib/case-studies";
import { cvVariantSlugs } from "@/lib/cv";
import { CONTENT_DATE } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { writingSlugs } from "@/lib/writing";

const lastModified = new Date(`${CONTENT_DATE}T00:00:00-06:00`);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    ...caseStudySlugs.map((slug) => `/work/${slug}`),
    "/cv",
    ...cvVariantSlugs.map((slug) => `/cv/${slug}`),
    "/writing",
    ...writingSlugs.map((slug) => `/writing/${slug}`),
  ];

  return pages.flatMap((path) => {
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
      { url: enUrl, lastModified, alternates },
      { url: esUrl, lastModified, alternates },
    ];
  });
}
