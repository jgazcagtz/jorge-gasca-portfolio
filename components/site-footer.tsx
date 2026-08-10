import { homeCopy } from "@/lib/home";
import { CONTACT, localePath, type Locale } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter">
      <div className="footerInner">
        <div>
          <a className="footerName" href={localePath(locale)}>
            Jorge Gasca
          </a>
          <p>{copy.note}</p>
        </div>
        <nav aria-label={locale === "en" ? "Contact links" : "Enlaces de contacto"}>
          <a href={CONTACT.linkedIn} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={CONTACT.emailHref}>Email</a>
        </nav>
      </div>
      <div className="footerLegal">
        <span>© {year} Jorge Gasca. {copy.rights}</span>
      </div>
    </footer>
  );
}
