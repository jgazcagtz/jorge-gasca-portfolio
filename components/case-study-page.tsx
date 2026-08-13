import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ActionLink,
  EvidenceCaption,
  EvidenceMedia,
  MetaLabel,
} from "@/components/design-primitives";
import { RevealController } from "@/components/reveal-controller";
import { VideoWalkthrough } from "@/components/video-walkthrough";
import {
  getNextCaseStudy,
  type CaseStudy,
  type EvidenceClassification,
} from "@/lib/case-studies";
import {
  CONTACT,
  emailHref,
  localePath,
  type Locale,
  whatsappHref,
} from "@/lib/site";
import styles from "./case-study-page.module.css";

const labels = {
  en: {
    back: "Selected work",
    chapters: "Case chapters",
    overview: "Overview",
    context: "Context",
    contribution: "Contribution",
    decision: "Key decision",
    result: "Result and current status",
    evidence: "Evidence",
    limitations: "Limitations",
    technology: "Technology",
    contact: "Contact",
    stage: "Stage",
    role: "My role",
    owned: "What I owned",
    resultLabel: "Verified result",
    contextLead: "The operating problem behind the interface.",
    contributionLead: "From customer signal to a system that can be used and shipped.",
    actions: "What moved",
    rationale: "Why this decision",
    reflection: "What it taught me",
    outcome: "Result",
    status: "Current status",
    evidenceIntro:
      "Every plate is public-safe, privacy-reviewed, and labeled by evidence type. No customer or account data appears here.",
    evidenceFlow: "Proof sequence",
    live: "Open live product",
    source: "View public repository",
    private: "Private source",
    transcript: "Read the visual transcript",
    videoError: "The embedded preview could not load in this browser.",
    videoFallback: "Open the MP4 preview",
    watch: (name: string, seconds: number) =>
      `Watch the ${seconds}-second ${name} proof sequence`,
    rolePrompt: "Hiring and product teams",
    roleTitle: "Need someone who can connect product judgment to delivery?",
    roleBody:
      "I am open to product, product operations, sales automation, and AI workflow roles where customer context matters.",
    roleAction: "Discuss an opportunity",
    projectPrompt: "Founders and operating teams",
    projectTitle: "Have a workflow that is harder than it should be?",
    projectBody:
      "Bring the customer problem, the handoffs, and the constraints. I can help turn them into a clearer operating system.",
    projectAction: "Share a project brief",
    whatsapp: "Start on WhatsApp",
    next: "Continue the atlas",
    nextAria: "Next case study",
    nextContext: "A related system, with a different operating constraint.",
    sourceFact: "Source",
  },
  es: {
    back: "Proyectos destacados",
    chapters: "Capítulos del caso",
    overview: "Resumen",
    context: "Contexto",
    contribution: "Contribución",
    decision: "Decisión clave",
    result: "Resultado y estado actual",
    evidence: "Evidencia",
    limitations: "Limitaciones",
    technology: "Tecnología",
    contact: "Contacto",
    stage: "Etapa",
    role: "Mi rol",
    owned: "Lo que lideré",
    resultLabel: "Resultado verificado",
    contextLead: "El problema operativo detrás de la interfaz.",
    contributionLead: "De la señal del cliente a un sistema que se puede usar y entregar.",
    actions: "Qué cambió",
    rationale: "Por qué tomé esta decisión",
    reflection: "Qué aprendí",
    outcome: "Resultado",
    status: "Estado actual",
    evidenceIntro:
      "Cada evidencia es apta para publicación, fue revisada por privacidad y está clasificada. No se muestran datos de clientes ni de cuentas.",
    evidenceFlow: "Secuencia de evidencia",
    live: "Abrir producto",
    source: "Ver repositorio público",
    private: "Código privado",
    transcript: "Leer la descripción visual",
    videoError: "La vista previa no pudo cargar en este navegador.",
    videoFallback: "Abrir vista previa en MP4",
    watch: (name: string, seconds: number) =>
      `Ver la secuencia de evidencia de ${name} · ${seconds} s`,
    rolePrompt: "Equipos de contratación y producto",
    roleTitle: "¿Buscas a alguien que conecte criterio de producto con ejecución?",
    roleBody:
      "Estoy abierto a roles de producto, operaciones, automatización comercial y flujos con IA donde el contexto del cliente sea importante.",
    roleAction: "Conversar sobre una oportunidad",
    projectPrompt: "Fundadores y equipos operativos",
    projectTitle: "¿Tienes un flujo de trabajo más difícil de lo necesario?",
    projectBody:
      "Trae el problema del cliente, los traspasos y las restricciones. Puedo ayudar a convertirlos en un sistema operativo más claro.",
    projectAction: "Compartir un proyecto",
    whatsapp: "Empezar por WhatsApp",
    next: "Continuar el atlas",
    nextAria: "Siguiente caso de estudio",
    nextContext: "Un sistema relacionado, con una restricción operativa distinta.",
    sourceFact: "Código",
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

type WalkthroughStyle = CSSProperties & { "--walkthrough-accent": string };

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
  const chapters = [
    ["overview", ui.overview],
    ["context", ui.context],
    ["contribution", ui.contribution],
    ["decision", ui.decision],
    ["result", ui.result],
    ["evidence", ui.evidence],
    ["limitations", ui.limitations],
    ["technology", ui.technology],
    ["contact", ui.contact],
  ] as const;
  const walkthroughStyle: WalkthroughStyle = {
    "--walkthrough-accent": "var(--case-accent)",
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
        <div className={styles.heroCopy}>
          <Link
            className={styles.backLink}
            href={`${localePath(locale)}#work`}
            transitionTypes={["case-back"]}
          >
            <span aria-hidden="true">←</span>
            {ui.back}
          </Link>
          <div className={styles.heroMeta}>
            <MetaLabel>{copy.stageLabel}</MetaLabel>
            <span>{copy.sourceLabel}</span>
          </div>
          <h1 id="case-title">{copy.title}</h1>
          <p className={styles.heroSummary}>{copy.summary}</p>
          <div className={styles.heroActions}>
            <ActionLink href={study.liveUrl} external>
              {ui.live}
            </ActionLink>
            {study.sourceUrl ? (
              <a
                className={styles.sourceLink}
                href={study.sourceUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="source-link"
              >
                <span>{ui.source}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className={styles.privateSource} data-testid="private-source">
                {ui.private}
              </span>
            )}
          </div>
        </div>

        <figure className={styles.heroEvidence}>
          <EvidenceMedia
            asset={desktop}
            locale={locale}
            role="hero"
            sizes="100vw"
            priority
            className={styles.heroMedia}
            transitionName={`case-${study.slug}`}
          />
          <EvidenceCaption
            asset={desktop}
            locale={locale}
            classification={evidenceLabels[locale][desktop.classification]}
          />
        </figure>
      </section>

      <div className={styles.atlasLayout}>
        <nav className={styles.chapterNav} aria-label={ui.chapters}>
          <p>{ui.chapters}</p>
          <ol>
            {chapters.map(([id, label], index) => (
              <li key={id}>
                <a href={`#${id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.chapters}>
          <section className={`${styles.chapter} ${styles.overviewChapter}`} aria-labelledby="overview">
            <header className={styles.chapterHeader}>
              <span>01</span>
              <h2 id="overview">{ui.overview}</h2>
            </header>
            <div className={styles.briefGrid} data-reveal>
              <article>
                <span>{ui.role}</span>
                <strong>{copy.role}</strong>
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
                <span>{ui.resultLabel}</span>
                <p>{copy.cardResult}</p>
              </article>
            </div>
          </section>

          <section className={styles.chapter} aria-labelledby="context" data-reveal>
            <header className={styles.chapterHeader}>
              <span>02</span>
              <h2 id="context">{ui.context}</h2>
            </header>
            <div className={styles.editorialPair}>
              <p className={styles.chapterLead}>{ui.contextLead}</p>
              <p className={styles.longCopy}>{copy.challenge}</p>
            </div>
          </section>

          <section className={styles.chapter} aria-labelledby="contribution" data-reveal>
            <header className={styles.chapterHeader}>
              <span>03</span>
              <h2 id="contribution">{ui.contribution}</h2>
            </header>
            <p className={styles.chapterLead}>{ui.contributionLead}</p>
            <div className={styles.contributionGrid}>
              <article className={styles.ownershipCard}>
                <h3>{ui.owned}</h3>
                <p>{copy.ownership}</p>
              </article>
              <div className={styles.actionList}>
                <h3>{ui.actions}</h3>
                <ol>
                  {copy.actions.map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section className={`${styles.chapter} ${styles.decisionChapter}`} aria-labelledby="decision" data-reveal>
            <header className={styles.chapterHeader}>
              <span>04</span>
              <h2 id="decision">{ui.decision}</h2>
            </header>
            <div className={styles.decisionGrid}>
              <article>
                <h3>{ui.rationale}</h3>
                <p>{copy.decisionRationale}</p>
              </article>
              <article>
                <h3>{ui.reflection}</h3>
                <p>{copy.reflection}</p>
              </article>
            </div>
          </section>

          <section className={styles.chapter} aria-labelledby="result" data-reveal>
            <header className={styles.chapterHeader}>
              <span>05</span>
              <h2 id="result">{ui.result}</h2>
            </header>
            <div className={styles.resultGrid}>
              <article>
                <h3>{ui.outcome}</h3>
                <p>{copy.outcome}</p>
              </article>
              <article>
                <h3>{ui.status}</h3>
                <p>{copy.currentStatus}</p>
              </article>
            </div>
          </section>

          <section className={`${styles.chapter} ${styles.evidenceChapter}`} aria-labelledby="evidence" data-reveal>
            <header className={styles.chapterHeader}>
              <span>06</span>
              <h2 id="evidence">{ui.evidence}</h2>
            </header>
            <p className={styles.evidenceRule}>{ui.evidenceIntro}</p>
            <div className={styles.proofSequence} aria-label={ui.evidenceFlow}>
              {copy.actions.slice(0, 3).map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className={styles.evidenceGrid}>
              <figure className={styles.mobileEvidence}>
                <EvidenceMedia
                  asset={mobile}
                  locale={locale}
                  role="proof"
                  sizes="(max-width: 700px) 76vw, 28vw"
                  className={styles.proofMedia}
                />
                <EvidenceCaption
                  asset={mobile}
                  locale={locale}
                  classification={evidenceLabels[locale][mobile.classification]}
                />
              </figure>

              {secondary.map((asset) => (
                <figure className={styles.secondaryEvidence} key={asset.id}>
                  <EvidenceMedia
                    asset={asset}
                    locale={locale}
                    role="proof"
                    sizes="(max-width: 980px) 100vw, 52vw"
                    className={styles.proofMedia}
                  />
                  <EvidenceCaption
                    asset={asset}
                    locale={locale}
                    classification={evidenceLabels[locale][asset.classification]}
                  />
                </figure>
              ))}

              {walkthrough ? (
                <figure className={styles.videoEvidence} style={walkthroughStyle}>
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
                  <figcaption className={styles.videoCaption}>
                    <strong>{evidenceLabels[locale][walkthrough.classification]}</strong>
                    <span>{walkthrough.caption[locale]}</span>
                    <span>{walkthrough.caveat[locale]}</span>
                  </figcaption>
                </figure>
              ) : null}
            </div>
          </section>

          <section className={styles.chapter} aria-labelledby="limitations" data-reveal>
            <header className={styles.chapterHeader}>
              <span>07</span>
              <h2 id="limitations">{ui.limitations}</h2>
            </header>
            <ul className={styles.limitationsList}>
              {copy.limitations.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.chapter} aria-labelledby="technology" data-reveal>
            <header className={styles.chapterHeader}>
              <span>08</span>
              <h2 id="technology">{ui.technology}</h2>
            </header>
            <ul className={styles.stackList}>
              {study.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className={styles.sourceFact}>
              <span>{ui.sourceFact}</span>
              <p>{copy.sourceLabel}</p>
            </div>
          </section>

          <section className={`${styles.chapter} ${styles.contactChapter}`} aria-labelledby="contact" data-reveal>
            <header className={styles.chapterHeader}>
              <span>09</span>
              <h2 id="contact">{ui.contact}</h2>
            </header>
            <div className={styles.contactGrid}>
              <article>
                <p>{ui.rolePrompt}</p>
                <h3>{ui.roleTitle}</h3>
                <span>{ui.roleBody}</span>
                <ActionLink href={emailHref(locale, "role")} variant="inverse">
                  {ui.roleAction}
                </ActionLink>
              </article>
              <article>
                <p>{ui.projectPrompt}</p>
                <h3>{ui.projectTitle}</h3>
                <span>{ui.projectBody}</span>
                <div>
                  <ActionLink href={emailHref(locale, "project")} variant="inverse">
                    {ui.projectAction}
                  </ActionLink>
                  <ActionLink href={whatsappHref(locale)} variant="secondary" external>
                    {ui.whatsapp}
                  </ActionLink>
                </div>
              </article>
            </div>
            <a className={styles.directContact} href={CONTACT.phoneHref}>
              {CONTACT.phoneDisplay}<span aria-hidden="true">↗</span>
            </a>
          </section>

          <Link
            className={styles.nextCase}
            href={localePath(locale, `/work/${nextStudy.slug}`)}
            transitionTypes={["case-forward"]}
            aria-label={`${ui.nextAria}: ${nextStudy.copy[locale].title}`}
          >
            <span>{ui.next}</span>
            <span>{ui.nextContext}</span>
            <strong>{nextStudy.copy[locale].title}</strong>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
