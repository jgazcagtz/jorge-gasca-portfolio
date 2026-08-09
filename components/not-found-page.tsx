import type { Locale } from "@/lib/site";

const copy = {
  en: {
    eyebrow: "404 / Not found",
    title: "Case study not found.",
    body: "That project address is not part of the published portfolio.",
    action: "Return to selected work",
  },
  es: {
    eyebrow: "404 / No encontrado",
    title: "Caso de estudio no encontrado.",
    body: "Esa dirección no forma parte del portafolio publicado.",
    action: "Volver al trabajo seleccionado",
  },
} as const;

export function NotFoundPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const home = locale === "en" ? "/#work" : "/es#work";

  return (
    <main id="main-content" className="notFoundPage">
      <p>{text.eyebrow}</p>
      <h1>{text.title}</h1>
      <p>{text.body}</p>
      <a href={home}>{text.action}<span aria-hidden="true"> →</span></a>
    </main>
  );
}
