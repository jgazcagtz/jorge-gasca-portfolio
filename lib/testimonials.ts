import type { Locale } from "@/lib/site";

export type Testimonial = {
  quote: Record<Locale, string>;
  name: string;
  role: Record<Locale, string>;
  company: string;
};

/**
 * Placeholder quotes. Every field that still carries a TODO marker renders in
 * development only; production builds hide the whole section until real,
 * attributable quotes replace the placeholders.
 */
export const testimonials: Testimonial[] = [
  {
    quote: {
      en: "TODO-QUOTE: Replace with the real recommendation in English.",
      es: "TODO-CITA: Reemplazar con la recomendación real en español.",
    },
    name: "TODO-NAME",
    role: {
      en: "TODO-ROLE",
      es: "TODO-ROL",
    },
    company: "TODO-COMPANY",
  },
  {
    quote: {
      en: "TODO-QUOTE: Replace with the real recommendation in English.",
      es: "TODO-CITA: Reemplazar con la recomendación real en español.",
    },
    name: "TODO-NAME",
    role: {
      en: "TODO-ROLE",
      es: "TODO-ROL",
    },
    company: "TODO-COMPANY",
  },
];

const TODO_PLACEHOLDER = "TODO";

function isPlaceholder(testimonial: Testimonial) {
  return (
    testimonial.name.startsWith(TODO_PLACEHOLDER) ||
    testimonial.company.startsWith(TODO_PLACEHOLDER) ||
    testimonial.quote.en.startsWith(TODO_PLACEHOLDER) ||
    testimonial.quote.es.startsWith(TODO_PLACEHOLDER) ||
    testimonial.role.en.startsWith(TODO_PLACEHOLDER) ||
    testimonial.role.es.startsWith(TODO_PLACEHOLDER)
  );
}

export function visibleTestimonials(): Testimonial[] {
  if (process.env.NODE_ENV === "production") {
    return testimonials.filter((testimonial) => !isPlaceholder(testimonial));
  }
  return testimonials;
}
