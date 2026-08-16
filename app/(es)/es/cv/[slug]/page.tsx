import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CvPage } from "@/components/cv-page";
import { SiteShell } from "@/components/site-shell";
import {
  cvVariantSlugs,
  getCvVariant,
} from "@/lib/cv";
import { cvMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return cvVariantSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const variant = getCvVariant(slug);
  if (!variant) notFound();
  return cvMetadata("es", variant);
}

export default async function SpanishCv({ params }: Props) {
  const { slug } = await params;
  const variant = getCvVariant(slug);
  if (!variant) notFound();

  return (
    <SiteShell locale="es" alternateHref={`/cv/${variant.slug}`}>
      <CvPage locale="es" variant={variant} />
    </SiteShell>
  );
}
