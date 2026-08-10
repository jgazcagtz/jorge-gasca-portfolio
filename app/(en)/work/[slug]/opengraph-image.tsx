import { notFound } from "next/navigation";
import {
  createCaseSocialCard,
  SOCIAL_CARD_SIZE,
} from "@/app/_seo/social-card";
import { getCaseStudy } from "@/lib/case-studies";

type Props = { params: Promise<{ slug: string }> };

export const alt = "Jorge Gasca product case study";
export const size = SOCIAL_CARD_SIZE;
export const contentType = "image/png";
export const dynamicParams = false;

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return createCaseSocialCard("en", study);
}
