import { notFound } from "next/navigation";
import {
  createCvSocialCard,
  SOCIAL_CARD_SIZE,
} from "@/app/_seo/social-card";
import { getCvVariant } from "@/lib/cv";

type Props = { params: Promise<{ slug: string }> };

export const alt = "CV enfocado por rol de Jorge Gasca";
export const size = SOCIAL_CARD_SIZE;
export const contentType = "image/png";
export const dynamicParams = false;

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const variant = getCvVariant(slug);
  if (!variant) notFound();
  return createCvSocialCard("es", variant);
}
