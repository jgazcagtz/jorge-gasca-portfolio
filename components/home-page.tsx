import type { CSSProperties } from "react";
import Image from "next/image";
import { HomeStructuredData } from "@/app/_seo/structured-data";
import { RevealController } from "@/components/reveal-controller";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { homeCopy } from "@/lib/home";
import {
  CONTACT,
  emailHref,
  localePath,
  MARBLISM_PARTNER_URL,
  whatsappHref,
  type Locale,
} from "@/lib/site";
import styles from "./home-page.module.css";

type CardStyle = CSSProperties & {
  "--case-transition": string;
  "--reveal-delay": string;
};

const fieldLabels = {
  en: {
    top: "PRODUCT / PARTNER",
    location: "MX / REMOTE",
    disciplines: ["ADOPTION", "AUTOMATION", "DELIVERY"],
    availability: "Availability",
    partnerAria: "Jorge Gasca's Marblism partner link",
  },
  es: {
    top: "PRODUCTO / PARTNER",
    location: "MX / REMOTO",
    disciplines: ["ADOPCIÓN", "AUTOMATIZACIÓN", "ENTREGA"],
    availability: "Disponibilidad",
    partnerAria: "Enlace de partner de Marblism de Jorge Gasca",
  },
} as const;

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
  const cover = study.media.desktop;
  const cardStyle: CardStyle = {
    "--case-transition": `case-${study.slug}`,
    "--reveal-delay": `${Math.min(study.sequence - 1, 3) * 45}ms`,
  };

  return (
    <article
      className={`${styles.productCard} ${compact ? styles.productCardCompact : ""}`}
      data-accent={study.accent}
      data-reveal
      style={cardStyle}
    >
      <a
        className={styles.productCardLink}
        href={localePath(locale, `/work/${study.slug}`)}
        aria-label={`${homeCopy[locale].work.viewCase}: ${copy.title}`}
      >
        <span className={styles.productMedia}>
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
        </span>
        <span className={styles.productBody}>
          <span className={styles.productMeta}>
            <span>{copy.stageLabel}</span>
            <span>{copy.sourceLabel}</span>
          </span>
          <strong className={styles.productTitle}>{copy.title}</strong>
          <span className={styles.productSummary}>{copy.summary}</span>
          <span className={styles.textLink}>
            {homeCopy[locale].work.viewCase}
            <span aria-hidden="true">↗</span>
          </span>
        </span>
      </a>
    </article>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const labels = fieldLabels[locale];
  const featured = caseStudies.filter((study) => study.featured);
  const labs = caseStudies.filter((study) => !study.featured);

  return (
    <main id="main-content">
      <HomeStructuredData locale={locale} />
      <RevealController />

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <div className={styles.heroIdentity}>
            <div>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <p className={styles.name}>Jorge Gasca</p>
            </div>
            <Image
              className={styles.mobilePortraitCue}
              src="/media/jorge-gasca-portrait.webp"
              alt=""
              width={112}
              height={112}
              sizes="112px"
            />
          </div>
          <h1 id="hero-title">{copy.hero.headline}</h1>
          <p className={styles.heroSummary}>{copy.hero.summary}</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#work">
              {copy.hero.primaryCta}<span aria-hidden="true">↓</span>
            </a>
            <a className={styles.secondaryAction} href="#contact">
              {copy.hero.secondaryCta}<span aria-hidden="true">↘</span>
            </a>
          </div>
          <div className={styles.heroFacts} aria-label={labels.availability}>
            <span>{copy.hero.availability}</span>
            <span>{copy.hero.languages}</span>
          </div>
          <aside className={styles.partnerStrip} aria-label={labels.partnerAria}>
            <span className={styles.partnerIdentity}>
              <Image
                src="/media/marblism-wordmark.png"
                alt="Marblism"
                width={1484}
                height={432}
                sizes="150px"
              />
              <span>{copy.partner.label}</span>
            </span>
            <p>{copy.partner.body}</p>
            <a
              href={MARBLISM_PARTNER_URL}
              target="_blank"
              rel="sponsored noreferrer"
            >
              {copy.partner.cta}<span aria-hidden="true">↗</span>
            </a>
          </aside>
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
            preload
          />
          <div className={styles.heroFieldTop}>
            <span>{labels.top}</span>
            <span>{labels.location}</span>
          </div>
          <figcaption className={styles.heroPortraitCaption}>
            <div className={styles.heroDisciplines} aria-hidden="true">
              {labels.disciplines.map((item) => <span key={item}>{item}</span>)}
            </div>
            <p>{copy.hero.proofLabel}</p>
          </figcaption>
        </figure>
      </section>

      <section className={styles.workSection} id="work" aria-labelledby="work-title" data-reveal>
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

      <section className={styles.approachSection} id="approach" aria-labelledby="approach-title" data-reveal>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{copy.approach.eyebrow}</p>
          <h2 id="approach-title">{copy.approach.title}</h2>
          <p>{copy.approach.intro}</p>
        </div>
        <ol className={styles.approachList}>
          {copy.approach.steps.map((step, index) => (
            <li key={step.title} data-reveal style={{ "--reveal-delay": `${index * 45}ms` } as CSSProperties}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.experienceSection} id="experience" aria-labelledby="experience-title" data-reveal>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{copy.experience.eyebrow}</p>
          <h2 id="experience-title">{copy.experience.title}</h2>
          <p>{copy.experience.intro}</p>
        </div>
        <div className={styles.timeline}>
          {copy.experience.items.map((item, index) => (
            <article key={item.title} data-reveal style={{ "--reveal-delay": `${index * 45}ms` } as CSSProperties}>
              <p>{item.period}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.skillsSection} aria-labelledby="skills-title" data-reveal>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>{copy.skills.eyebrow}</p>
          <h2 id="skills-title">{copy.skills.title}</h2>
        </div>
        <div className={styles.skillsGrid}>
          {copy.skills.groups.map((group, index) => (
            <article key={group.title} data-reveal style={{ "--reveal-delay": `${index * 45}ms` } as CSSProperties}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contactSection} id="contact" aria-labelledby="contact-title" data-reveal>
        <p className={styles.eyebrow}>{copy.contact.eyebrow}</p>
        <h2 id="contact-title">{copy.contact.title}</h2>
        <p>{copy.contact.intro}</p>
        <div className={styles.contactGrid}>
          <article>
            <p className={styles.contactIndex}>01 / {locale === "en" ? "HIRING" : "EMPLEO"}</p>
            <h3>{copy.contact.rolesTitle}</h3>
            <p>{copy.contact.rolesBody}</p>
            <div className={styles.contactActions}>
              <a className={styles.primaryAction} href={emailHref(locale, "role")}>{copy.contact.email}<span aria-hidden="true">↗</span></a>
              <a href={CONTACT.linkedIn} target="_blank" rel="noreferrer">{copy.contact.linkedIn}<span aria-hidden="true">↗</span></a>
            </div>
          </article>
          <article>
            <p className={styles.contactIndex}>02 / {locale === "en" ? "PROJECTS" : "PROYECTOS"}</p>
            <h3>{copy.contact.projectsTitle}</h3>
            <p>{copy.contact.projectsBody}</p>
            <div className={styles.contactActions}>
              <a className={styles.primaryAction} href={emailHref(locale, "project")}>{copy.contact.email}<span aria-hidden="true">↗</span></a>
              <a href={whatsappHref(locale)} target="_blank" rel="noreferrer">{copy.contact.whatsapp}<span aria-hidden="true">↗</span></a>
            </div>
          </article>
        </div>
        <a className={styles.phoneLink} href={CONTACT.phoneHref}>{copy.contact.phone} · {CONTACT.phoneDisplay}</a>
      </section>
    </main>
  );
}
