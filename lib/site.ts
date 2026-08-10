export type Locale = "en" | "es";

export const SITE_URL = "https://jgasca.io";
export const MARBLISM_URL = "https://marblism.com";
export const MARBLISM_PARTNER_URL = "https://marblism.com?via=zentixmarblism";

export const CONTACT = {
  phoneDisplay: "+52 55 3335 5687",
  phoneHref: "tel:+525533355687",
  email: "gascagtz@gmail.com",
  emailHref: "mailto:gascagtz@gmail.com",
  linkedIn:
    "https://linkedin.com/in/jorge-gasca-guti%C3%A9rrez-4580b2210",
  github: "https://github.com/jgazcagtz",
} as const;

const whatsappMessages: Record<Locale, string> = {
  en: "Hi Jorge, I found your portfolio and would like to share a project brief involving sales automation, SaaS, CRM, or an AI workflow.",
  es: "Hola Jorge, encontré tu portafolio y me gustaría compartirte un proyecto de automatización de ventas, SaaS, CRM o un flujo con IA.",
};

export type ContactIntent = "role" | "project";

const emailMessages: Record<
  Locale,
  Record<ContactIntent, { subject: string; body: string }>
> = {
  en: {
    role: {
      subject: "Product or sales automation opportunity",
      body: "Hi Jorge, I found your portfolio and would like to discuss a product or sales automation opportunity.",
    },
    project: {
      subject: "Sales automation, SaaS, CRM, or AI workflow project",
      body: "Hi Jorge, I found your portfolio and would like to share a project brief.",
    },
  },
  es: {
    role: {
      subject: "Oportunidad de producto o automatización de ventas",
      body: "Hola Jorge, encontré tu portafolio y me gustaría conversar sobre una oportunidad de producto o automatización de ventas.",
    },
    project: {
      subject: "Proyecto de automatización de ventas, SaaS, CRM o IA",
      body: "Hola Jorge, encontré tu portafolio y me gustaría compartirte un proyecto.",
    },
  },
};

export function whatsappHref(locale: Locale) {
  return `https://wa.me/525533355687?text=${encodeURIComponent(
    whatsappMessages[locale],
  )}`;
}

export function emailHref(locale: Locale, intent: ContactIntent) {
  const message = emailMessages[locale][intent];
  const query = new URLSearchParams({
    subject: message.subject,
    body: message.body,
  });
  return `mailto:${CONTACT.email}?${query.toString()}`;
}

export function localePath(locale: Locale, path = "") {
  const cleanPath = path === "/" ? "" : path;
  return locale === "es" ? `/es${cleanPath}` : cleanPath || "/";
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
