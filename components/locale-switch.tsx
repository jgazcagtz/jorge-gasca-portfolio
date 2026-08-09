import type { Locale } from "@/lib/site";

export function LocaleSwitch({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  return (
    <a
      className="localeSwitch"
      href={locale === "en" ? "/es" : "/"}
      hrefLang={locale === "en" ? "es" : "en"}
      data-locale-switch
    >
      <span aria-hidden="true">{locale === "en" ? "ES" : "EN"}</span>
      <span className="srOnly">{label}</span>
    </a>
  );
}
