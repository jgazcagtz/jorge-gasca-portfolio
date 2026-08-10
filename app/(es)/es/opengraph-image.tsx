import {
  createHomeSocialCard,
  SOCIAL_CARD_SIZE,
} from "@/app/_seo/social-card";

export const alt = "Jorge Gasca — Especialista y Creador de Producto";
export const size = SOCIAL_CARD_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createHomeSocialCard("es");
}
