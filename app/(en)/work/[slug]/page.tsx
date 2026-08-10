import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  caseStudyStructuredData,
  StructuredData,
} from "@/app/_seo/structured-data";
import { CaseStudyPage } from "@/components/case-study-page";
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
  return caseStudyMetadata("en", study);
}

export default async function EnglishCaseStudy({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return (
    <>
      <StructuredData data={caseStudyStructuredData("en", study)} />
      <CaseStudyPage locale="en" study={study} />
    </>
  );
}
