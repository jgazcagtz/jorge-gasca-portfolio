import { homeCopy } from "@/lib/home";
import { BUILD_SHA, CONTACT, localePath, type Locale } from "@/lib/site";

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
          <a href="/llms.txt">{locale === "en" ? "AI-readable profile" : "Perfil legible por IA"}</a>
        </nav>
      </div>
      <div className="footerLegal">
        <span>© {year} Jorge Gasca. {copy.rights}</span>
        <span data-build-sha={BUILD_SHA}>Build {BUILD_SHA.slice(0, 7)}</span>
      </div>
    </footer>
  );
}
