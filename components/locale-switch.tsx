import type { Locale } from "@/lib/site";

export function LocaleSwitch({
  locale,
  label,
  href,
}: {
  locale: Locale;
  label: string;
  href: string;
}) {
  return (
    <a
      className="localeSwitch"
      href={href}
      hrefLang={locale === "en" ? "es" : "en"}
      data-locale-switch
    >
      <span aria-hidden="true">{locale === "en" ? "ES" : "EN"}</span>
      <span className="srOnly">{label}</span>
    </a>
  );
}
