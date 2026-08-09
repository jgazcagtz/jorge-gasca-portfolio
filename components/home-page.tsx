import Image from "next/image";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { homeCopy } from "@/lib/home";
import {
  CONTACT,
  localePath,
  SITE_URL,
  whatsappHref,
  type Locale,
} from "@/lib/site";
import styles from "./home-page.module.css";

function ProductCard({
  study,
  locale,
  compact = false,
}: {
  study: CaseStudy;
  locale: Locale;
  compact?: boolean;
}) {
  const copy = study.copy[locale];
  const cover = study.media[0];

  return (
    <article
      className={`${styles.productCard} ${compact ? styles.productCardCompact : ""}`}
      data-accent={study.accent}
    >
      <a
        className={styles.productMedia}
        href={localePath(locale, `/work/${study.slug}`)}
        aria-label={`${homeCopy[locale].work.viewCase}: ${copy.title}`}
      >
        <Image
          src={cover.src}
          alt={copy.coverAlt}
          width={cover.viewport.width}
          height={cover.viewport.height}
          sizes={compact ? "(max-width: 800px) 100vw, 40vw" : "(max-width: 900px) 100vw, 50vw"}
        />
        <span className={styles.cardIndex} aria-hidden="true">
          {String(study.sequence).padStart(2, "0")}
        </span>
      </a>
      <div className={styles.productBody}>
        <p className={styles.productMeta}>
          <span>{copy.stageLabel}</span>
          <span>{copy.sourceLabel}</span>
        </p>
        <h3>{copy.title}</h3>
        <p>{copy.dek}</p>
        <a
          className={styles.textLink}
          href={localePath(locale, `/work/${study.slug}`)}
        >
          {homeCopy[locale].work.viewCase}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const featured = caseStudies.filter((study) => study.featured);
  const labs = caseStudies.filter((study) => !study.featured);
  const pageUrl = locale === "en" ? SITE_URL : `${SITE_URL}/es`;
  const personId = `${SITE_URL}/#jorge-gasca`;
  const profileId = `${pageUrl}#profile`;
  const personJsonLd = {
    "@id": personId,
    "@type": "Person",
    name: "Jorge Manuel Gasca Gutiérrez",
    alternateName: "Jorge Gasca",
    url: SITE_URL,
    image: `${SITE_URL}/media/jorge-gasca-portrait.webp`,
    description: copy.hero.summary,
    email: CONTACT.email,
    telephone: CONTACT.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mexico City",
      addressCountry: "MX",
    },
    sameAs: [CONTACT.linkedIn, CONTACT.github],
    jobTitle: "SaaS Onboarding & Product Builder",
    knowsLanguage: ["Spanish", "English"],
    knowsAbout: [
      "SaaS onboarding",
      "Customer adoption",
      "CRM automation",
      "AI workflows",
      "Customer experience",
      "Product operations",
      "Responsive product UX",
      "Quality assurance",
      "Web and API delivery",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "business inquiries",
      telephone: CONTACT.phoneDisplay,
      email: CONTACT.email,
      url: whatsappHref(locale),
      availableLanguage: ["English", "Spanish"],
      areaServed: "Worldwide",
    },
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Product Specialist",
        description: "B2B SaaS onboarding, CRM workflows, adoption, and customer experience.",
        occupationLocation: {
          "@type": "City",
          name: "Mexico City",
        },
      },
      {
        "@type": "Occupation",
        name: "Product Builder",
        description: "Hands-on product delivery across SaaS, AI, commerce, and learning products.",
      },
    ],
  };
  const profilePageJsonLd = {
    "@id": profileId,
    "@type": "ProfilePage",
    url: pageUrl,
    name:
      locale === "en"
        ? "Jorge Gasca — SaaS Onboarding & Product Builder"
        : "Jorge Gasca — Onboarding SaaS y Creador de Productos",
    description: copy.hero.summary,
    inLanguage: locale,
    dateCreated: "2026-08-09T00:00:00-06:00",
    dateModified: "2026-08-09T00:00:00-06:00",
    mainEntity: { "@id": personId },
    hasPart: caseStudies.map((study) => ({
      "@type": "CreativeWork",
      name: study.copy[locale].title,
      description: study.copy[locale].dek,
      url: `${SITE_URL}${localePath(locale, `/work/${study.slug}`)}`,
      author: { "@id": personId },
      inLanguage: locale,
    })),
  };
  const websiteJsonLd = {
    "@id": `${SITE_URL}/#website`,
    "@type": "WebSite",
    name: "Jorge Gasca — Product Portfolio",
    url: SITE_URL,
    inLanguage: ["en", "es"],
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [profilePageJsonLd, personJsonLd, websiteJsonLd],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
          <p className={styles.name}>Jorge Manuel Gasca Gutiérrez</p>
          <h1 id="hero-title">{copy.hero.headline}</h1>
          <p className={styles.heroSummary}>{copy.hero.summary}</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#work">
              {copy.hero.primaryCta}<span aria-hidden="true">↓</span>
            </a>
            <a
              className={styles.secondaryAction}
              href={whatsappHref(locale)}
              target="_blank"
              rel="noreferrer"
            >
              {copy.hero.secondaryCta}<span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className={styles.heroFacts} aria-label={locale === "en" ? "Availability" : "Disponibilidad"}>
            <span>{copy.hero.availability}</span>
            <span>{copy.hero.languages}</span>
          </div>
        </div>

        <figure className={styles.heroField}>
          <Image
            className={styles.heroPortrait}
            src="/media/jorge-gasca-portrait.webp"
            alt={
              locale === "en"
                ? "Black-and-white portrait of Jorge Gasca smiling with his arms crossed"
                : "Retrato en blanco y negro de Jorge Gasca sonriendo con los brazos cruzados"
            }
            width={1254}
            height={1254}
            sizes="(max-width: 820px) calc(100vw - 28px), 34vw"
            priority
          />
          <div className={styles.heroFieldTop}>
            <span>PRODUCT FIELD NOTES</span>
            <span>MX / REMOTE</span>
          </div>
          <figcaption className={styles.heroPortraitCaption}>
            <div className={styles.heroDisciplines} aria-hidden="true">
              <span>ADOPTION</span>
              <span>AUTOMATION</span>
              <span>PRODUCT</span>
            </div>
            <p>{copy.hero.proofLabel}</p>
          </figcaption>
        </figure>
      </section>

      <section className={styles.workSection} id="work" aria-labelledby="work-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{copy.work.eyebrow}</p>
          <h2 id="work-title">{copy.work.title}</h2>
          <p>{copy.work.intro}</p>
        </div>
        <p className={styles.collectionLabel}>{copy.work.featured}</p>
        <div className={styles.productGrid}>
          {featured.map((study) => (
            <ProductCard key={study.slug} study={study} locale={locale} />
          ))}
        </div>
        <div className={styles.labsHeader}>
          <p className={styles.collectionLabel}>{copy.work.labs}</p>
          <span aria-hidden="true">05—06</span>
        </div>
        <div className={styles.labsGrid}>
          {labs.map((study) => (
            <ProductCard key={study.slug} study={study} locale={locale} compact />
          ))}
        </div>
      </section>

      <section className={styles.approachSection} id="approach" aria-labelledby="approach-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{copy.approach.eyebrow}</p>
          <h2 id="approach-title">{copy.approach.title}</h2>
          <p>{copy.approach.intro}</p>
        </div>
        <ol className={styles.approachList}>
          {copy.approach.steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.experienceSection} id="experience" aria-labelledby="experience-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{copy.experience.eyebrow}</p>
          <h2 id="experience-title">{copy.experience.title}</h2>
          <p>{copy.experience.intro}</p>
        </div>
        <div className={styles.timeline}>
          {copy.experience.items.map((item) => (
            <article key={item.title}>
              <p>{item.period}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.skillsSection} aria-labelledby="skills-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{copy.skills.eyebrow}</p>
          <h2 id="skills-title">{copy.skills.title}</h2>
        </div>
        <div className={styles.skillsGrid}>
          {copy.skills.groups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
        <p className={styles.eyebrow}>{copy.contact.eyebrow}</p>
        <h2 id="contact-title">{copy.contact.title}</h2>
        <p>{copy.contact.intro}</p>
        <div className={styles.contactActions}>
          <a className={styles.primaryAction} href={whatsappHref(locale)} target="_blank" rel="noreferrer">
            {copy.contact.whatsapp}<span aria-hidden="true">↗</span>
          </a>
          <a href={CONTACT.emailHref}>{copy.contact.email}</a>
          <a href={CONTACT.linkedIn} target="_blank" rel="noreferrer">{copy.contact.linkedIn}</a>
          <a href={CONTACT.phoneHref}>{copy.contact.phone} · {CONTACT.phoneDisplay}</a>
        </div>
      </section>
    </main>
  );
}
