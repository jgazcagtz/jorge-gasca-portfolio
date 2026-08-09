export type Locale = "en" | "es";

export const SITE_URL = "https://jorge-gasca-portfolio.vercel.app";

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
  en: "Hi Jorge, I found your portfolio and would like to talk about SaaS onboarding or product work.",
  es: "Hola Jorge, encontré tu portafolio y me gustaría conversar sobre onboarding SaaS o trabajo de producto.",
};

export function whatsappHref(locale: Locale) {
  return `https://wa.me/525533355687?text=${encodeURIComponent(
    whatsappMessages[locale],
  )}`;
}

export function localePath(locale: Locale, path = "") {
  const cleanPath = path === "/" ? "" : path;
  return locale === "es" ? `/es${cleanPath}` : cleanPath || "/";
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export const BUILD_SHA =
  process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_BUILD_SHA ?? "local";
