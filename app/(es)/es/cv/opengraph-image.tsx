import {
  createCvSocialCard,
  SOCIAL_CARD_SIZE,
} from "@/app/_seo/social-card";

export const alt = "Colección bilingüe de CV de Jorge Gasca";
export const size = SOCIAL_CARD_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createCvSocialCard("es");
}
