import { LocaleSwitch } from "@/components/locale-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { homeCopy } from "@/lib/home";
import { localePath, type Locale } from "@/lib/site";

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale].nav;
  const home = localePath(locale);

  return (
    <header className="siteHeader">
      <div className="headerInner">
        <a className="wordmark" href={home} aria-label="Jorge Gasca — home">
          <span className="wordmarkMonogram" aria-hidden="true">JG</span>
          <span className="wordmarkName">Jorge Gasca</span>
        </a>

        <nav className="desktopNav" aria-label={locale === "en" ? "Primary" : "Principal"}>
          <a href={`${home}#work`}>{copy.work}</a>
          <a href={`${home}#approach`}>{copy.approach}</a>
          <a href={`${home}#experience`}>{copy.experience}</a>
          <a href={`${home}#contact`}>{copy.contact}</a>
        </nav>

        <div className="headerActions">
          <LocaleSwitch locale={locale} label={copy.language} />
          <ThemeToggle label={copy.theme} />
          <details className="mobileNav">
            <summary>{copy.menu}</summary>
            <nav aria-label={locale === "en" ? "Mobile" : "Móvil"}>
              <a href={`${home}#work`}>{copy.work}</a>
              <a href={`${home}#approach`}>{copy.approach}</a>
              <a href={`${home}#experience`}>{copy.experience}</a>
              <a href={`${home}#contact`}>{copy.contact}</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
