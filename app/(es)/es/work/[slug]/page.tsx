import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  caseStudyStructuredData,
  StructuredData,
} from "@/app/_seo/structured-data";
import { CaseStudyPage } from "@/components/case-study-page";
import { SiteShell } from "@/components/site-shell";
import { caseStudySlugs, getCaseStudy } from "@/lib/case-studies";
import { caseStudyMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };


export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return caseStudyMetadata("es", study);
}

export default async function SpanishCaseStudy({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return (
    <SiteShell locale="es" alternateHref={`/work/${study.slug}`}>
      <StructuredData data={caseStudyStructuredData("es", study)} />
      <CaseStudyPage locale="es" study={study} />
    </SiteShell>
  );
}
