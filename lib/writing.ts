import type { Locale } from "@/lib/site";

export type LocalizedWritingPost = {
  title: string;
  dek: string;
  seoTitle: string;
  seoDescription: string;
  body: string[];
};

export type WritingPost = {
  slug: string;
  date: string;
  copy: Record<Locale, LocalizedWritingPost>;
};

export const writingUiCopy = {
  en: {
    eyebrow: "Writing",
    title: "Notes from shipping product and automation.",
    intro:
      "Short, practical notes on product delivery, GTM systems, and AI automation. Everything here reflects what I actually built, shipped, or verified — no invented numbers.",
    readPost: "Read note",
    published: "Published",
    back: "All writing",
  },
  es: {
    eyebrow: "Escritos",
    title: "Notas de entregar producto y automatización.",
    intro:
      "Notas breves y prácticas sobre entrega de producto, sistemas GTM y automatización con IA. Todo lo que aparece aquí refleja lo que construí, publiqué o verifiqué; sin números inventados.",
    readPost: "Leer nota",
    published: "Publicado",
    back: "Todos los escritos",
  },
} as const;

export const writingPosts: WritingPost[] = [
  {
    slug: "what-verified-means",
    date: "2026-10-17",
    copy: {
      en: {
        title: "What verified means when I ship an automation",
        dek: "The most useful word in my portfolio is also the easiest to abuse. Here is the line I draw.",
        seoTitle: "What verified means when I ship | Jorge Gasca",
        seoDescription:
          "How Jorge Gasca applies the verified label in his portfolio: which checks count, which claims stay out, and why honest limits make automation work easier to trust.",
        body: [
          "Every case study in this portfolio carries a stage label like Live MVP, Live pilot, or Simulated POC, and most results are introduced as verified. Those words do specific work, so I want to be precise about what they mean before someone hires me based on them.",
          "When I call a result verified, I mean I exercised the journey myself: I opened the screens a user would open, on desktop and on a phone, walked the workflow end to end, and checked that the state I expected is the state the system kept. If the flow hands off to another service, I say what the handoff does and what it cannot prove.",
          "What verified does not mean is sometimes more important. Opening a WhatsApp link does not confirm a message was delivered. A payment link loading does not confirm a settled charge. A demo with seed data does not confirm a merchant's orders. Those claims stay out of the portfolio because I cannot stand behind them from my side of the handoff.",
          "Automations invite optimistic claims because their failures are quiet. A workflow that silently drops an edge case still looks like a success on a dashboard. That is why the case studies here keep a limitations section next to the outcome: the honest list of what stayed hard is part of the result, not a footnote to it.",
          "In practice I apply three checks before I call something shipped. First, the happy path works on real screens, not only in a build log. Second, the failure paths either recover or report themselves. Third, someone other than me could run the flow tomorrow from the documentation I left behind.",
          "That last point is the real standard. Verified is not a badge I award a release; it is a promise that the next person can check my work.",
        ],
      },
      es: {
        title: "Qué significa verificado cuando entrego una automatización",
        dek: "La palabra más útil de mi portafolio también es la más fácil de abusar. Esta es la línea que trazo.",
        seoDescription:
          "Cómo aplica Jorge Gasca la etiqueta verificado en su portafolio: qué revisiones cuentan, qué afirmaciones quedan fuera y por qué los límites honestos hacen más confiable el trabajo de automatización.",
        seoTitle: "Qué significa verificado al entregar | Jorge Gasca",
        body: [
          "Cada caso de estudio en este portafolio lleva una etiqueta de etapa como MVP en vivo, Piloto en vivo o POC simulado, y la mayoría de los resultados se presentan como verificados. Esas palabras hacen un trabajo específico, así que quiero ser preciso sobre su significado antes de que alguien me contrate con base en ellas.",
          "Cuando digo que un resultado está verificado, significa que yo mismo recorrí el journey: abrí las pantallas que abriría una persona usuaria, en desktop y en el teléfono, seguí el flujo de principio a fin y comprobé que el estado que esperaba es el estado que el sistema conservó. Si el flujo entrega el control a otro servicio, digo qué hace ese handoff y qué no puede probar.",
          "Lo que verificado no significa es a veces más importante. Abrir un enlace de WhatsApp no confirma que un mensaje se entregó. Que cargue un enlace de pago no confirma una cobranza liquidada. Una demo con datos semilla no confirma los pedidos de un comercio. Esas afirmaciones quedan fuera del portafolio porque no puedo sostenerlas desde mi lado del handoff.",
          "Las automatizaciones invitan a afirmaciones optimistas porque sus fallas son silenciosas. Un flujo que descarta un caso límite sin avisar sigue pareciendo un éxito en un dashboard. Por eso los casos aquí conservan una sección de limitaciones junto al resultado: la lista honesta de lo que siguió difícil es parte del resultado, no una nota al pie.",
          "En la práctica aplico tres revisiones antes de llamar entregado a algo. Primera: el camino feliz funciona en pantallas reales, no solo en el log del build. Segunda: los caminos de falla se recuperan o se reportan solos. Tercera: alguien además de mí podría ejecutar el flujo mañana con la documentación que dejé.",
          "Ese último punto es el estándar real. Verificado no es una insignia que otorgo a un release; es la promesa de que la siguiente persona puede comprobar mi trabajo.",
        ],
      },
    },
  },
];

export const writingSlugs = writingPosts.map((post) => post.slug);

export function getWritingPost(slug: string) {
  return writingPosts.find((post) => post.slug === slug);
}

export function writingHubPath(locale: Locale) {
  return locale === "es" ? "/es/writing" : "/writing";
}

export function writingPostPath(locale: Locale, slug: string) {
  return locale === "es" ? `/es/writing/${slug}` : `/writing/${slug}`;
}
