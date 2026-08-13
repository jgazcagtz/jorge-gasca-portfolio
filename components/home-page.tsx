import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeStructuredData } from "@/app/_seo/structured-data";
import {
  ActionLink,
  EvidenceMedia,
  MetaLabel,
  SectionHeading,
} from "@/components/design-primitives";
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
  "--case-accent": string;
  "--reveal-delay": string;
};

const accentColors: Record<CaseStudy["accent"], string> = {
  violet: "var(--accent-violet)",
  coral: "var(--accent-coral)",
  lime: "var(--accent-lime)",
  orange: "var(--accent-orange)",
  blue: "var(--accent-blue)",
  cyan: "var(--accent-cyan)",
};

const fieldLabels = {
  en: {
    top: "HUMAN / SYSTEMS",
    location: "MX / REMOTE",
    availability: "Availability",
    result: "Verified result",
    role: "Jorge’s role",
    partnerAria: "Jorge Gasca’s Marblism partner disclosure",
    partnerProof: "Supporting partner",
    roleIndex: "01 / HIRING",
    projectIndex: "02 / PROJECTS",
  },
  es: {
    top: "HUMANO / SISTEMAS",
    location: "MX / REMOTO",
    availability: "Disponibilidad",
    result: "Resultado verificado",
    role: "Rol de Jorge",
    partnerAria: "Declaración del enlace de partner de Marblism de Jorge Gasca",
    partnerProof: "Partner de apoyo",
    roleIndex: "01 / OPORTUNIDADES",
    projectIndex: "02 / PROYECTOS",
  },
} as const;

function ProductCard({
  study,
  locale,
  variant,
}: {
  study: CaseStudy;
  locale: Locale;
  variant: "lead" | "standard" | "compact";
}) {
  const copy = study.copy[locale];
  const cardStyle: CardStyle = {
    "--case-accent": accentColors[study.accent],
    "--reveal-delay": `${Math.min(study.sequence - 1, 3) * 45}ms`,
  };
  const labels = fieldLabels[locale];

  return (
    <article
      className={styles.productCard}
      data-variant={variant}
      data-product={study.slug}
      data-reveal
      style={cardStyle}
    >
      <Link
        className={styles.productCardLink}
        href={localePath(locale, `/work/${study.slug}`)}
        transitionTypes={["case-forward"]}
        aria-label={`${homeCopy[locale].work.viewCase}: ${copy.title}`}
      >
        <div className={styles.productMedia}>
          <EvidenceMedia
            asset={study.media.desktop}
            locale={locale}
            role="card"
            sizes={variant === "lead" ? "(max-width: 900px) 100vw, 64vw" : "(max-width: 800px) 100vw, 45vw"}
            className={styles.productMediaVisual}
            transitionName={`case-${study.slug}`}
          />
          <span className={styles.cardIndex} aria-hidden="true">
            {String(study.sequence).padStart(2, "0")}
          </span>
          <span className={styles.cardStage}>{copy.stageLabel}</span>
        </div>

        <div className={styles.productBody}>
          <div className={styles.cardRole}>
            <span>{labels.role}</span>
            <strong>{copy.role}</strong>
          </div>
          <h3>{copy.title}</h3>
          <p className={styles.productSummary}>{copy.summary}</p>
          <div className={styles.cardResult}>
            <span>{labels.result}</span>
            <p>{copy.cardResult}</p>
          </div>
          <span className={styles.textLink}>
            {homeCopy[locale].work.viewCase}
            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const labels = fieldLabels[locale];
  const signature = caseStudies
    .filter((study) => study.featured)
    .sort((a, b) => a.sequence - b.sequence);
  const moreWork = caseStudies
    .filter((study) => !study.featured)
    .sort((a, b) => a.sequence - b.sequence);

  return (
    <main id="main-content">
      <HomeStructuredData locale={locale} />
      <RevealController />

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <div className={styles.heroIdentity}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <p className={styles.name}>Jorge Gasca</p>
          </div>
          <h1 id="hero-title">{copy.hero.headline}</h1>
          <p className={styles.heroSummary}>{copy.hero.summary}</p>
          <div className={styles.heroActions}>
            <ActionLink href="#work" variant="primary">{copy.hero.primaryCta}</ActionLink>
            <ActionLink href="#contact" variant="secondary">{copy.hero.secondaryCta}</ActionLink>
          </div>
          <div className={styles.heroFacts} aria-label={labels.availability}>
            <span>{copy.hero.availability}</span>
            <span>{copy.hero.languages}</span>
          </div>
        </div>

        <figure className={styles.heroPortraitCard}>
          <Image
            src="/media/jorge-gasca-portrait.webp"
            alt={
              locale === "en"
                ? "Black-and-white portrait of Jorge Gasca smiling with his arms crossed"
                : "Retrato en blanco y negro de Jorge Gasca sonriendo con los brazos cruzados"
            }
            width={1254}
            height={1254}
            sizes="(max-width: 820px) 112px, 34vw"
            preload
          />
          <div className={styles.portraitTop}>
            <span>{labels.top}</span>
            <span>{labels.location}</span>
          </div>
          <figcaption>
            <MetaLabel>{copy.hero.proofLabel}</MetaLabel>
          </figcaption>
        </figure>

        <div className={styles.heroSystemTrace} aria-hidden="true">
          <span>DISCOVER</span><i /><span>DESIGN</span><i /><span>AUTOMATE</span><i /><span>VERIFY</span>
        </div>
      </section>

      <section className={styles.workSection} id="work" aria-labelledby="work-title">
        <SectionHeading
          eyebrow={copy.work.eyebrow}
          title={copy.work.title}
          body={copy.work.intro}
          id="work-title"
        />

        <div className={styles.collectionHeader}>
          <MetaLabel>{copy.work.featured}</MetaLabel>
          <span aria-hidden="true">01—03</span>
        </div>
        <div className={styles.signatureGrid}>
          {signature.map((study, index) => (
            <ProductCard
              key={study.slug}
              study={study}
              locale={locale}
              variant={index === 0 ? "lead" : "standard"}
            />
          ))}
        </div>

        <div className={styles.collectionHeader}>
          <MetaLabel>{copy.work.labs}</MetaLabel>
          <span aria-hidden="true">04—06</span>
        </div>
        <div className={styles.moreGrid}>
          {moreWork.map((study) => (
            <ProductCard key={study.slug} study={study} locale={locale} variant="compact" />
          ))}
        </div>
      </section>

      <section className={styles.approachSection} id="approach" aria-labelledby="approach-title" data-reveal>
        <SectionHeading
          eyebrow={copy.approach.eyebrow}
          title={copy.approach.title}
          body={copy.approach.intro}
          id="approach-title"
        />
        <ol className={styles.approachTrace}>
          {copy.approach.steps.map((step, index) => (
            <li
              key={step.title}
              data-phase={String(index + 1).padStart(2, "0")}
              data-reveal
              style={{ "--reveal-delay": `${index * 45}ms` } as CSSProperties}
            >
              <div className={styles.traceNode} aria-hidden="true"><span /></div>
              <div className={styles.approachCopy}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <ul aria-label={copy.skills.groups[index].title}>
                {copy.skills.groups[index].items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.experienceSection} id="experience" aria-labelledby="experience-title" data-reveal>
        <SectionHeading
          eyebrow={copy.experience.eyebrow}
          title={copy.experience.title}
          body={copy.experience.intro}
          id="experience-title"
        />
        <div className={styles.timeline}>
          {copy.experience.items.map((item, index) => (
            <article key={item.title} data-reveal style={{ "--reveal-delay": `${index * 45}ms` } as CSSProperties}>
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className={styles.partnerBand} aria-label={labels.partnerAria} data-reveal>
        <div className={styles.partnerMark}>
          <Image src="/media/marblism-wordmark.png" alt="Marblism" width={1484} height={432} sizes="150px" />
          <MetaLabel>{labels.partnerProof}</MetaLabel>
        </div>
        <div>
          <h2>{copy.partner.label}</h2>
          <p>{copy.partner.body}</p>
        </div>
        <a href={MARBLISM_PARTNER_URL} target="_blank" rel="sponsored noreferrer">
          {copy.partner.cta}<span aria-hidden="true">↗</span>
        </a>
      </aside>

      <section className={styles.contactSection} id="contact" aria-labelledby="contact-title" data-reveal>
        <SectionHeading
          eyebrow={copy.contact.eyebrow}
          title={copy.contact.title}
          body={copy.contact.intro}
          id="contact-title"
          tone="inverse"
        />
        <div className={styles.contactGrid}>
          <article>
            <p>{labels.roleIndex}</p>
            <h3>{copy.contact.rolesTitle}</h3>
            <p>{copy.contact.rolesBody}</p>
            <div>
              <ActionLink href={emailHref(locale, "role")} variant="inverse">{copy.contact.email}</ActionLink>
              <ActionLink href={CONTACT.linkedIn} variant="secondary" external>{copy.contact.linkedIn}</ActionLink>
            </div>
          </article>
          <article>
            <p>{labels.projectIndex}</p>
            <h3>{copy.contact.projectsTitle}</h3>
            <p>{copy.contact.projectsBody}</p>
            <div>
              <ActionLink href={emailHref(locale, "project")} variant="inverse">{copy.contact.email}</ActionLink>
              <ActionLink href={whatsappHref(locale)} variant="secondary" external>{copy.contact.whatsapp}</ActionLink>
            </div>
          </article>
        </div>
        <a className={styles.phoneLink} href={CONTACT.phoneHref}>
          {copy.contact.phone} · {CONTACT.phoneDisplay}<span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
