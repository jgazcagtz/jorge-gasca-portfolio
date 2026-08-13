import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/site";

export function SiteShell({
  locale,
  alternateHref,
  children,
}: {
  locale: Locale;
  alternateHref: string;
  children: ReactNode;
}) {
  const skipLabel = locale === "en" ? "Skip to content" : "Saltar al contenido";

  return (
    <>
      <a className="skipLink" href="#main-content">{skipLabel}</a>
      <SiteHeader locale={locale} alternateHref={alternateHref} />
      {children}
      <SiteFooter locale={locale} />
    </>
  );
}
