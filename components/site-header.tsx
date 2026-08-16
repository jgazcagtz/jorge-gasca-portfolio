import Link from "next/link";
import { LocaleSwitch } from "@/components/locale-switch";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { homeCopy } from "@/lib/home";
import { localePath, type Locale } from "@/lib/site";

export function SiteHeader({
  locale,
  alternateHref,
}: {
  locale: Locale;
  alternateHref: string;
}) {
  const copy = homeCopy[locale].nav;
  const home = localePath(locale);
  const navLinks = [
    { href: `${home}#work`, label: copy.work },
    { href: `${home}#approach`, label: copy.approach },
    { href: `${home}#experience`, label: copy.experience },
    { href: localePath(locale, "/cv"), label: copy.cv },
    { href: `${home}#contact`, label: copy.contact },
  ];

  return (
    <header className="siteHeader">
      <div className="headerInner">
        <Link className="wordmark" href={home} aria-label="Jorge Gasca — home">
          <span className="wordmarkMonogram" aria-hidden="true">JG</span>
          <span className="wordmarkName">Jorge Gasca</span>
        </Link>

        <nav className="desktopNav" aria-label={locale === "en" ? "Primary" : "Principal"}>
          {navLinks.slice(0, 4).map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>

        <div className="headerActions">
          <Link className="headerContact" href={`${home}#contact`}>
            {copy.contact}<span aria-hidden="true">↘</span>
          </Link>
          <LocaleSwitch locale={locale} label={copy.language} href={alternateHref} />
          <ThemeToggle locale={locale} />
          <MobileNav
            label={copy.menu}
            navigationLabel={locale === "en" ? "Mobile" : "Móvil"}
            links={navLinks}
          />
        </div>
      </div>
    </header>
  );
}
