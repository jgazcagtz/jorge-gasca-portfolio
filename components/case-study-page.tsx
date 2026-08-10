import type { CSSProperties } from "react";
import Image from "next/image";
import { RevealController } from "@/components/reveal-controller";
import { VideoWalkthrough } from "@/components/video-walkthrough";
import {
  getNextCaseStudy,
  type CaseStudy,
  type EvidenceClassification,
} from "@/lib/case-studies";
import { localePath, type Locale } from "@/lib/site";
import styles from "./case-study-page.module.css";

const labels = {
  en: {
    back: "Selected work",
    brief: "30-second brief",
    role: "Role",
    stage: "Stage",
    owned: "What I owned",
    result: "Current result",
    challenge: "What I noticed",
    actions: "What I worked on",
    decision: "One decision that mattered",
    reflection: "What I learned",
    status: "Current status",
    limitations: "Still limited",
    stack: "Technology",
    proof: "See it in action",
    proofIntro: "Public, synthetic, or simulated screens only. Customer and account data stay out of the portfolio.",
    live: "Open live product",
    source: "View public repository",
    private: "Private source",
    next: "Next case study",
    transcript: "Read the visual transcript",
    videoError: "The embedded preview could not load in this browser.",
    videoFallback: "Open the MP4 preview",
    flow: "Flow shown",
    roleIndependent: "Independent product builder",
    roleMini: "Product Development Manager",
    watch: (name: string, seconds: number) => `Watch the ${seconds}-second ${name} product preview`,
  },
  es: {
    back: "Proyectos destacados",
    brief: "Resumen en 30 segundos",
    role: "Rol",
    stage: "Etapa",
    owned: "Lo que hice",
    result: "Resultado actual",
    challenge: "Lo que encontré",
    actions: "En qué trabajé",
    decision: "Una decisión importante",
    reflection: "Lo que aprendí",
    status: "Estado actual",
    limitations: "Lo que aún falta",
    stack: "Tecnología",
    proof: "Verlo en acción",
    proofIntro: "Solo se muestran pantallas públicas, sintéticas o simuladas. Los datos de clientes y cuentas quedan fuera del portafolio.",
    live: "Abrir producto",
    source: "Ver repositorio público",
    private: "Código privado",
    next: "Siguiente proyecto",
    transcript: "Leer la descripción visual",
    videoError: "La vista previa no pudo cargar en este navegador.",
    videoFallback: "Abrir vista previa en MP4",
    flow: "Recorrido mostrado",
    roleIndependent: "Creador independiente de producto",
    roleMini: "Product Development Manager",
    watch: (name: string, seconds: number) => `Ver vista previa de ${name} · ${seconds} s`,
  },
} as const;

const evidenceLabels: Record<Locale, Record<EvidenceClassification, string>> = {
  en: {
    "public-marketing": "Public product page",
    "synthetic-demo": "Synthetic demo",
    "guest-runtime": "Public guest flow",
    simulation: "Simulation",
    illustration: "Illustration",
  },
  es: {
    "public-marketing": "Página pública del producto",
    "synthetic-demo": "Demo sintética",
    "guest-runtime": "Recorrido público de invitado",
    simulation: "Simulación",
    illustration: "Ilustración",
  },
};

type TransitionStyle = CSSProperties & { "--case-transition": string };

export function CaseStudyPage({
  locale,
  study,
}: {
  locale: Locale;
  study: CaseStudy;
}) {
  const copy = study.copy[locale];
  const ui = labels[locale];
  const nextStudy = getNextCaseStudy(study.slug);
  const { desktop, mobile, walkthrough, secondary = [] } = study.media;
  const productName = copy.title.split(" — ")[0];
  const role = study.slug === "minitiendai" ? ui.roleMini : ui.roleIndependent;
  const transitionStyle: TransitionStyle = {
    "--case-transition": `case-${study.slug}`,
  };

  return (
    <main
      id="main-content"
      className={styles.casePage}
      data-accent={study.accent}
      data-product={study.slug}
    >
      <RevealController />
      <span className={styles.caseProgress} aria-hidden="true" />

      <section className={styles.caseHero} aria-labelledby="case-title">
        <div className={styles.caseHeroCopy}>
          <a className={styles.backLink} href={`${localePath(locale)}#work`}>
            <span aria-hidden="true">←</span>{ui.back}
          </a>
          <p className={styles.caseMeta}>
            <span>{copy.stageLabel}</span>
            <span>{copy.sourceLabel}</span>
          </p>
          <h1 id="case-title">{copy.title}</h1>
          <p className={styles.caseSummary}>{copy.summary}</p>
          <div className={styles.caseActions}>
            <a href={study.liveUrl} target="_blank" rel="noreferrer">
              {ui.live}<span aria-hidden="true">↗</span>
            </a>
            {study.sourceUrl ? (
              <a href={study.sourceUrl} target="_blank" rel="noreferrer" data-testid="source-link">
                {ui.source}<span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className={styles.privateSource} data-testid="private-source">{ui.private}</span>
            )}
          </div>
        </div>

        <figure className={styles.caseCover} style={transitionStyle}>
          <Image
            src={desktop.src}
            alt={copy.coverAlt}
            width={desktop.viewport.width}
            height={desktop.viewport.height}
            sizes="100vw"
            preload
          />
          <figcaption>
            <span>{evidenceLabels[locale][desktop.classification]}</span>
            <span>{desktop.captureDate}</span>
            <span>{desktop.caveat[locale]}</span>
          </figcaption>
        </figure>

        <div className={styles.briefBlock} data-reveal>
          <p className={styles.sectionLabel}>{ui.brief}</p>
          <div className={styles.briefGrid}>
            <article>
              <span>{ui.role}</span>
              <strong>{role}</strong>
            </article>
            <article>
              <span>{ui.stage}</span>
              <strong>{copy.stageLabel}</strong>
            </article>
            <article>
              <span>{ui.owned}</span>
              <p>{copy.ownership}</p>
            </article>
            <article>
              <span>{ui.result}</span>
              <p>{copy.outcome}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.storySection} data-reveal>
        <article>
          <p className={styles.sectionLabel}>{ui.challenge}</p>
          <p className={styles.leadText}>{copy.challenge}</p>
        </article>
        <article>
          <p className={styles.sectionLabel}>{ui.actions}</p>
          <ol>
            {copy.actions.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className={styles.decisionSection} data-reveal>
        <article>
          <p className={styles.sectionLabel}>{ui.decision}</p>
          <p>{copy.decisionRationale}</p>
        </article>
        <article>
          <p className={styles.sectionLabel}>{ui.reflection}</p>
          <p>{copy.reflection}</p>
        </article>
      </section>

      <section className={styles.statusSection} data-reveal>
        <div>
          <p className={styles.sectionLabel}>{ui.status}</p>
          <p>{copy.currentStatus}</p>
        </div>
        <aside>
          <p className={styles.sectionLabel}>{ui.limitations}</p>
          <ul>
            {copy.limitations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </aside>
      </section>

      <section className={styles.proofSection} aria-labelledby="proof-title" data-reveal>
        <div className={styles.proofIntro}>
          <p className={styles.sectionLabel}>{ui.proof}</p>
          <h2 id="proof-title">{productName}</h2>
          <p>{ui.proofIntro}</p>
        </div>

        <div className={styles.proofFlow} aria-label={ui.flow}>
          {copy.actions.slice(0, 3).map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <div className={styles.proofGrid}>
          <figure className={styles.desktopProof}>
            <Image
              src={desktop.src}
              alt={desktop.alt[locale]}
              width={desktop.viewport.width}
              height={desktop.viewport.height}
              sizes="(max-width: 900px) 100vw, 66vw"
            />
            <figcaption>
              <strong>{evidenceLabels[locale][desktop.classification]}</strong>
              <span>{desktop.caption[locale]}</span>
              <span>{desktop.caveat[locale]}</span>
            </figcaption>
          </figure>
          <figure className={styles.mobileProof}>
            <Image
              src={mobile.src}
              alt={mobile.alt[locale]}
              width={mobile.viewport.width}
              height={mobile.viewport.height}
              sizes="(max-width: 700px) 78vw, 28vw"
            />
            <figcaption>
              <strong>{evidenceLabels[locale][mobile.classification]}</strong>
              <span>{mobile.caption[locale]}</span>
              <span>{mobile.caveat[locale]}</span>
            </figcaption>
          </figure>
          {secondary.map((asset) => (
            <figure className={styles.secondaryProof} key={asset.id}>
              <Image
                src={asset.src}
                alt={asset.alt[locale]}
                width={asset.viewport.width}
                height={asset.viewport.height}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
              <figcaption>
                <strong>{evidenceLabels[locale][asset.classification]}</strong>
                <span>{asset.caption[locale]}</span>
                <span>{asset.caveat[locale]}</span>
              </figcaption>
            </figure>
          ))}
          {walkthrough ? (
            <figure className={styles.videoProof}>
              <VideoWalkthrough
                sources={walkthrough.sources}
                poster={walkthrough.poster}
                label={ui.watch(productName, Math.round(walkthrough.durationSeconds))}
                description={copy.videoDescription}
                transcript={copy.videoTranscript}
                transcriptLabel={ui.transcript}
                errorMessage={ui.videoError}
                fallbackLabel={ui.videoFallback}
              />
              <figcaption>
                <strong>{evidenceLabels[locale][walkthrough.classification]}</strong>
                <span>{walkthrough.caption[locale]}</span>
                <span>{walkthrough.caveat[locale]}</span>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>

      <section className={styles.stackSection} data-reveal>
        <p className={styles.sectionLabel}>{ui.stack}</p>
        <ul>
          {study.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <a
        className={styles.nextCase}
        href={localePath(locale, `/work/${nextStudy.slug}`)}
      >
        <span>{ui.next}</span>
        <strong>{nextStudy.copy[locale].title}</strong>
        <span aria-hidden="true">→</span>
      </a>
    </main>
  );
}