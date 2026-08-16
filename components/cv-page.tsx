import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CvHubStructuredData,
  CvStructuredData,
} from "@/app/_seo/structured-data";
import { ActionLink, MetaLabel, SectionHeading } from "@/components/design-primitives";
import {
  cvCredentials,
  cvExperience,
  cvHubPath,
  cvLanguages,
  cvPdfPath,
  cvUiCopy,
  cvVariantPath,
  cvVariants,
  getCvProjects,
  getCvSkillGroups,
  type CvVariant,
} from "@/lib/cv";
import {
  CONTACT,
  emailHref,
  localePath,
  type Locale,
} from "@/lib/site";
import styles from "./cv-page.module.css";

const accentValues: Record<CvVariant["accent"], string> = {
  violet: "var(--accent-violet)",
  coral: "var(--accent-coral)",
  cyan: "var(--accent-cyan)",
  lime: "var(--accent-lime)",
};

function CvIdentity({ locale }: { locale: Locale }) {
  const copy = cvUiCopy[locale];
  return (
    <div className={styles.identityLine}>
      <span>{copy.location}</span>
      <a href={CONTACT.emailHref}>{CONTACT.email}</a>
      <a href={CONTACT.linkedIn}>LinkedIn</a>
      <a href={CONTACT.github}>GitHub</a>
      <a href="https://jgasca.io">jgasca.io</a>
    </div>
  );
}

export function CvHubPage({ locale }: { locale: Locale }) {
  const copy = cvUiCopy[locale];

  return (
    <main id="main-content" className={styles.hubMain}>
      <CvHubStructuredData locale={locale} />

      <section className={styles.hubHero} aria-labelledby="cv-hub-title">
        <div className={styles.hubHeroCopy}>
          <MetaLabel>{copy.hubEyebrow}</MetaLabel>
          <h1 id="cv-hub-title">{copy.hubTitle}</h1>
          <p>{copy.hubSummary}</p>
          <div className={styles.hubActions}>
            <ActionLink href="#cv-versions" variant="primary">{copy.hubPrimary}</ActionLink>
            <ActionLink href={`${localePath(locale)}#work`} variant="secondary">{copy.hubSecondary}</ActionLink>
          </div>
          <div className={styles.hubFacts}>
            <span>{copy.current}</span>
            <span>{copy.location}</span>
            <span>{cvLanguages[locale].join(" | ")}</span>
          </div>
        </div>
        <figure className={styles.hubPortrait}>
          <Image
            src="/media/jorge-gasca-portrait.webp"
            alt={
              locale === "en"
                ? "Portrait of Jorge Gasca"
                : "Retrato de Jorge Gasca"
            }
            width={1254}
            height={1254}
            sizes="(max-width: 820px) 112px, 31vw"
            preload
          />
          <figcaption>
            <strong>Jorge Manuel Gasca Gutiérrez</strong>
            <span>{copy.current}</span>
          </figcaption>
        </figure>
      </section>

      <section className={styles.variantSection} id="cv-versions" aria-labelledby="cv-versions-title">
        <SectionHeading
          eyebrow={copy.hubProfiles}
          title={copy.hubProfilesBody}
          id="cv-versions-title"
        />
        <div className={styles.variantGrid}>
          {cvVariants.map((variant, index) => (
            <article
              key={variant.slug}
              className={styles.variantCard}
              style={{ "--cv-accent": accentValues[variant.accent] } as CSSProperties}
            >
              <div className={styles.variantCardTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <MetaLabel>{variant.eyebrow[locale]}</MetaLabel>
              </div>
              <h2>{variant.title[locale]}</h2>
              <p>{variant.summary[locale]}</p>
              <ul aria-label={copy.bestFit}>
                {variant.fitRoles[locale].slice(0, 4).map((role) => <li key={role}>{role}</li>)}
              </ul>
              <div className={styles.variantCardActions}>
                <ActionLink href={cvVariantPath(locale, variant.slug)}>{copy.view}</ActionLink>
                <a href={cvPdfPath(locale, variant.slug)} download>
                  {copy.download}<span aria-hidden="true">↓</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sharedSection} aria-labelledby="cv-shared-title">
        <SectionHeading
          eyebrow={copy.verifiedNote}
          title={copy.sharedTitle}
          body={copy.sharedBody}
          id="cv-shared-title"
          tone="inverse"
        />
        <div className={styles.sharedStats}>
          <div><strong>4</strong><span>{locale === "en" ? "verified experience chapters" : "etapas de experiencia verificadas"}</span></div>
          <div><strong>8</strong><span>{locale === "en" ? "product builds" : "productos construidos"}</span></div>
          <div><strong>{cvSkillGroupsCount()}</strong><span>{locale === "en" ? "complete skill groups" : "grupos completos de habilidades"}</span></div>
          <div><strong>3</strong><span>{locale === "en" ? "working languages" : "idiomas de trabajo"}</span></div>
        </div>
      </section>
    </main>
  );
}

function cvSkillGroupsCount() {
  return cvVariants[0].skillOrder.length;
}

export function CvPage({ locale, variant }: { locale: Locale; variant: CvVariant }) {
  const copy = cvUiCopy[locale];
  const skills = getCvSkillGroups(variant);
  const projects = getCvProjects(variant);
  const featuredProjects = projects.slice(0, 3);

  return (
    <main
      id="main-content"
      className={styles.cvMain}
      data-cv-variant={variant.slug}
      style={{ "--cv-accent": accentValues[variant.accent] } as CSSProperties}
    >
      <CvStructuredData locale={locale} variant={variant} />

      <nav className={styles.breadcrumbs} aria-label={locale === "en" ? "Breadcrumb" : "Ruta de navegación"}>
        <Link href={localePath(locale)}>{copy.portfolio}</Link>
        <span aria-hidden="true">/</span>
        <Link href={cvHubPath(locale)}>{locale === "en" ? "CV" : "CV"}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{variant.shortTitle[locale]}</span>
      </nav>

      <article className={styles.resumeDocument} aria-labelledby="resume-title">
        <div className={`${styles.resumePage} ${styles.resumePageOne}`}>
          <header className={styles.resumeHeader}>
            <div className={styles.resumeHeaderCopy}>
              <div className={styles.resumeMeta}>
                <MetaLabel>{variant.eyebrow[locale]}</MetaLabel>
                <span>{copy.printLabel}</span>
              </div>
              <p className={styles.fullName}>Jorge Manuel Gasca Gutiérrez</p>
              <h1 id="resume-title">{variant.title[locale]}</h1>
              <p className={styles.resumeSummary}>{variant.summary[locale]}</p>
              <CvIdentity locale={locale} />
              <div className={styles.resumeActions}>
                <ActionLink href={cvPdfPath(locale, variant.slug)} variant="primary">
                  {copy.download}
                </ActionLink>
                <ActionLink href={emailHref(locale, "role")} variant="secondary">
                  {copy.email}
                </ActionLink>
              </div>
            </div>
            <figure className={styles.resumePortrait}>
              <Image
                src="/media/jorge-gasca-portrait.webp"
                alt={locale === "en" ? "Portrait of Jorge Gasca" : "Retrato de Jorge Gasca"}
                width={1254}
                height={1254}
                sizes="240px"
              />
            </figure>
          </header>

          <section className={styles.fitSection} aria-labelledby="fit-roles-title">
            <div className={styles.resumeSectionHeading}>
              <span>01</span>
              <h2 id="fit-roles-title">{copy.bestFit}</h2>
            </div>
            <p className={styles.truthNote}>{copy.verifiedNote}</p>
            <ul className={styles.roleList}>
              {variant.fitRoles[locale].map((role) => <li key={role}>{role}</li>)}
            </ul>
          </section>

          <section className={styles.experienceSection} aria-labelledby="cv-experience-title">
            <div className={styles.resumeSectionHeading}>
              <span>02</span>
              <h2 id="cv-experience-title">{copy.experience}</h2>
            </div>
            <div className={styles.experienceList}>
              {cvExperience.map((experience) => (
                <article key={experience.id} className={styles.experienceItem}>
                  <div className={styles.experienceLead}>
                    <p>{experience.period[locale]}</p>
                    <h3>{experience.organization[locale]}</h3>
                    <span>{experience.title[locale]}</span>
                    <small>{experience.context[locale]}</small>
                  </div>
                  <ul>
                    {experience.bullets[locale].map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className={`${styles.resumePage} ${styles.resumePageTwo}`}>
          <section aria-labelledby="cv-products-title">
            <div className={styles.resumeSectionHeading}>
              <span>03</span>
              <h2 id="cv-products-title">{copy.products}</h2>
            </div>
            <div className={styles.projectHighlights}>
              {featuredProjects.map((project) => (
                <article key={project.id}>
                  <div>
                    <h3>{project.name}</h3>
                    <span>{project.status[locale]}</span>
                  </div>
                  <p>{project.description[locale]}</p>
                  {project.path ? (
                    <Link href={localePath(locale, project.path)}>{copy.caseStudy}<span aria-hidden="true">↗</span></Link>
                  ) : (
                    <small>{copy.noCaseStudy}</small>
                  )}
                </article>
              ))}
            </div>
            <div className={styles.buildInventory}>
              <h3>{copy.allBuilds}</h3>
              <ul>
                {projects.map((project) => (
                  <li key={project.id}>
                    <strong>{project.name}</strong>
                    <span>{project.status[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.skillsSection} aria-labelledby="cv-skills-title">
            <div className={styles.resumeSectionHeading}>
              <span>04</span>
              <h2 id="cv-skills-title">{copy.skills}</h2>
            </div>
            <div className={styles.skillGrid}>
              {skills.map((group) => (
                <div key={group.id}>
                  <h3>{group.title[locale]}</h3>
                  <p>{group.items.join(" | ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.credentialsSection}>
            <div>
              <div className={styles.resumeSectionHeading}>
                <span>05</span>
                <h2>{copy.credentials}</h2>
              </div>
              <ul>{cvCredentials.map((credential) => <li key={credential}>{credential}</li>)}</ul>
            </div>
            <div>
              <div className={styles.resumeSectionHeading}>
                <span>06</span>
                <h2>{copy.languages}</h2>
              </div>
              <ul>{cvLanguages[locale].map((language) => <li key={language}>{language}</li>)}</ul>
            </div>
          </section>

          <section className={styles.resumeContact} aria-labelledby="cv-contact-title">
            <div>
              <span>07</span>
              <h2 id="cv-contact-title">{copy.contact}</h2>
              <p>{copy.contactBody}</p>
            </div>
            <CvIdentity locale={locale} />
          </section>
        </div>
      </article>

      <div className={styles.backLink}>
        <ActionLink href={cvHubPath(locale)} variant="quiet">{copy.back}</ActionLink>
      </div>
    </main>
  );
}
