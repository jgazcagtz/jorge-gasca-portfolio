import Image from "next/image";
import { VideoWalkthrough } from "@/components/video-walkthrough";
import { getNextCaseStudy, type CaseStudy } from "@/lib/case-studies";
import { localePath, type Locale } from "@/lib/site";
import styles from "./case-study-page.module.css";

const labels = {
  en: {
    back: "Selected work",
    problem: "The problem",
    role: "My role",
    contributions: "Contributions",
    capabilities: "Product capabilities",
    decisions: "Product decisions",
    limitations: "Stage & limitations",
    stack: "Technology",
    proof: "Proof gallery",
    proofIntro: "Approved captures of public product surfaces. No customer, tenant, account, prompt, analytics, or provider configuration is shown.",
    live: "Open live product",
    source: "View public repository",
    private: "Private source",
    play: "Play muted walkthrough",
    next: "Next case study",
    runtime: "Runtime evidence",
    reviewed: "Privacy reviewed",
  },
  es: {
    back: "Trabajo seleccionado",
    problem: "El problema",
    role: "Mi papel",
    contributions: "Contribuciones",
    capabilities: "Capacidades del producto",
    decisions: "Decisiones de producto",
    limitations: "Etapa y limitaciones",
    stack: "Tecnología",
    proof: "Galería de evidencia",
    proofIntro: "Capturas aprobadas de superficies públicas. No se muestran clientes, cuentas, prompts, analítica ni configuración de proveedores.",
    live: "Abrir producto",
    source: "Ver repositorio público",
    private: "Código privado",
    play: "Reproducir recorrido sin audio",
    next: "Siguiente caso",
    runtime: "Evidencia en ejecución",
    reviewed: "Privacidad revisada",
  },
} as const;

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
  const desktop = study.media.find((asset) => asset.id.endsWith("desktop"));
  const mobile = study.media.find((asset) => asset.id.endsWith("mobile"));
  const video = study.media.find((asset) => asset.kind === "video");

  if (!desktop || !mobile || !video || !video.poster) return null;

  return (
    <main id="main-content" className={styles.casePage} data-accent={study.accent}>
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
          <p className={styles.caseDek}>{copy.dek}</p>
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
        <figure className={styles.caseCover}>
          <Image
            src={desktop.src}
            alt={copy.coverAlt}
            width={desktop.viewport.width}
            height={desktop.viewport.height}
            sizes="100vw"
            priority
          />
          <figcaption>
            <span>{ui.runtime}</span>
            <span>{desktop.captureDate}</span>
            <span>{ui.reviewed}</span>
          </figcaption>
        </figure>
      </section>

      <section className={styles.twoColumnSection} aria-label={`${ui.problem} / ${ui.role}`}>
        <article>
          <p className={styles.sectionLabel}>{ui.problem}</p>
          <p className={styles.leadText}>{copy.problem}</p>
        </article>
        <article>
          <p className={styles.sectionLabel}>{ui.role}</p>
          <p className={styles.leadText}>{copy.role}</p>
        </article>
      </section>

      <section className={styles.listSection}>
        <article>
          <p className={styles.sectionLabel}>{ui.contributions}</p>
          <ol>
            {copy.contributions.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </article>
        <article>
          <p className={styles.sectionLabel}>{ui.capabilities}</p>
          <ol>
            {copy.capabilities.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className={styles.decisionSection}>
        <div>
          <p className={styles.sectionLabel}>{ui.decisions}</p>
          <ul>
            {copy.decisions.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <aside>
          <p className={styles.sectionLabel}>{ui.limitations}</p>
          <p>{copy.limitations}</p>
        </aside>
      </section>

      <section className={styles.proofSection} aria-labelledby="proof-title">
        <div className={styles.proofIntro}>
          <p className={styles.sectionLabel}>{ui.proof}</p>
          <h2 id="proof-title">{copy.title.split(" — ")[0]} / 2026</h2>
          <p>{ui.proofIntro}</p>
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
            <figcaption>{desktop.caption[locale]}</figcaption>
          </figure>
          <figure className={styles.mobileProof}>
            <Image
              src={mobile.src}
              alt={mobile.alt[locale]}
              width={mobile.viewport.width}
              height={mobile.viewport.height}
              sizes="(max-width: 700px) 80vw, 28vw"
            />
            <figcaption>{mobile.caption[locale]}</figcaption>
          </figure>
          <figure className={styles.videoProof}>
            <VideoWalkthrough src={video.src} poster={video.poster} label={ui.play} />
            <figcaption>{video.caption[locale]}</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.stackSection}>
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
