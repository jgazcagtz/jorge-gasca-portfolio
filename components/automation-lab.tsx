"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { MetaLabel } from "@/components/design-primitives";
import { homeCopy } from "@/lib/home";
import type { Locale } from "@/lib/site";
import styles from "./automation-lab.module.css";

type AutomationStudy = {
  id: string;
  accent: "coral" | "violet" | "lime" | "cyan";
  title: Record<Locale, string>;
  strapline: Record<Locale, string>;
  whatItDoes: Record<Locale, string>;
  stack: string[];
  impact: Record<Locale, string>;
  problem: Record<Locale, string>;
  workflow: string[];
  logic: Record<Locale, string[]>;
  integrations: string[];
  aiLayer: Record<Locale, string>;
  outcome: Record<Locale, string>;
};

const studies: AutomationStudy[] = [
  {
    id: "signal-os",
    accent: "coral",
    title: {
      en: "Free Signal OS",
      es: "Free Signal OS",
    },
    strapline: {
      en: "Trigger -> Feed assembly -> Signal scoring -> Brief -> Response pack",
      es: "Trigger -> armado de feeds -> scoring de señales -> brief -> response pack",
    },
    whatItDoes: {
      en: "Runs a repeatable signal-intelligence workflow that gathers fresh inputs, scores them with an AI-assisted decision layer, and turns the output into a structured brief for downstream GTM action.",
      es: "Ejecuta un flujo repetible de inteligencia de señales que reúne inputs frescos, los puntúa con una capa de decisión asistida por IA y convierte el resultado en un brief estructurado para acciones GTM posteriores.",
    },
    stack: ["n8n", "RSS/API", "AI scoring", "Briefing", "Webhook response"],
    impact: {
      en: "Turns scattered market inputs into one reusable decision surface instead of manual feed checking.",
      es: "Convierte inputs dispersos del mercado en una sola superficie reutilizable de decisión en lugar de revisión manual de feeds.",
    },
    problem: {
      en: "Signal research breaks down when useful updates live across too many sources and nobody has time to normalize them consistently.",
      es: "La investigación de señales se rompe cuando las actualizaciones útiles viven en demasiadas fuentes y nadie tiene tiempo de normalizarlas con consistencia.",
    },
    workflow: [
      "Run Free Signal OS",
      "Build Free Signal Feeds",
      "Fetch RSS Feed",
      "Hermes GTM Scoring Brain",
      "Build Brief",
      "Respond With Signal Pack",
    ],
    logic: {
      en: [
        "Starts from a controlled trigger instead of ad-hoc browsing.",
        "Normalizes multiple signal sources before ranking them.",
        "Packages the output as a brief another workflow or operator can use immediately.",
      ],
      es: [
        "Parte de un trigger controlado en vez de navegación ad-hoc.",
        "Normaliza múltiples fuentes de señales antes de priorizarlas.",
        "Empaqueta la salida como un brief que otro workflow u operador puede usar de inmediato.",
      ],
    },
    integrations: ["RSS feeds", "AI scoring layer", "Internal briefing format"],
    aiLayer: {
      en: "AI is used as the scoring brain that helps rank which signals deserve attention before the final brief is assembled.",
      es: "La IA se usa como cerebro de scoring para priorizar qué señales merecen atención antes de ensamblar el brief final.",
    },
    outcome: {
      en: "Creates a reusable operating rhythm for signal monitoring, qualification, and distribution.",
      es: "Crea un ritmo operativo reutilizable para monitoreo, calificación y distribución de señales.",
    },
  },
  {
    id: "gmail-drafts",
    accent: "violet",
    title: {
      en: "Prospeo-Aware Gmail Drafts",
      es: "Prospeo-Aware Gmail Drafts",
    },
    strapline: {
      en: "Draft request -> Credit-aware build -> Gmail drafts -> Run summary",
      es: "Solicitud -> armado con control de créditos -> drafts en Gmail -> resumen",
    },
    whatItDoes: {
      en: "Builds outbound drafts with enrichment-aware logic so prospecting output is useful without wasting enrichment spend or forcing manual writing every time.",
      es: "Construye drafts outbound con lógica consciente del enriquecimiento para que la prospección produzca mensajes útiles sin desperdiciar créditos ni depender de escritura manual en cada caso.",
    },
    stack: ["n8n", "Prospeo", "Gmail API", "LLM", "Run summaries"],
    impact: {
      en: "Reduces repetitive outbound prep while adding guardrails around enrichment usage and message generation.",
      es: "Reduce la preparación repetitiva de outbound y agrega guardrails alrededor del uso de enriquecimiento y la generación de mensajes.",
    },
    problem: {
      en: "Outbound teams lose time when research, personalization, and draft creation all happen as disconnected manual steps.",
      es: "Los equipos outbound pierden tiempo cuando research, personalización y creación de drafts ocurren como pasos manuales desconectados.",
    },
    workflow: [
      "GTM Draft Request",
      "Build Credit-Aware Drafts",
      "Create Gmail Drafts",
      "Summarize Draft Run",
      "Respond",
    ],
    logic: {
      en: [
        "Accepts a draft request as structured intake.",
        "Applies credit-aware logic before generating outreach.",
        "Creates drafts in Gmail and returns a usable summary instead of opaque automation output.",
      ],
      es: [
        "Recibe una solicitud de draft como intake estructurado.",
        "Aplica lógica consciente de créditos antes de generar outreach.",
        "Crea drafts en Gmail y devuelve un resumen utilizable en vez de una salida opaca.",
      ],
    },
    integrations: ["Webhook intake", "Prospeo", "Gmail API", "LLM drafting"],
    aiLayer: {
      en: "AI supports the drafting step, but the workflow frames it inside data, budget, and channel constraints.",
      es: "La IA apoya la parte de drafting, pero el workflow la encuadra dentro de restricciones de datos, presupuesto y canal.",
    },
    outcome: {
      en: "Makes outbound drafting faster, more consistent, and easier to operationalize across a repeatable GTM process.",
      es: "Vuelve el drafting outbound más rápido, consistente y fácil de operacionalizar dentro de un proceso GTM repetible.",
    },
  },
  {
    id: "signal-scanner",
    accent: "lime",
    title: {
      en: "Signal Scanner",
      es: "Signal Scanner",
    },
    strapline: {
      en: "Daily trigger -> Query builder -> Feed fetch -> Signal score",
      es: "Trigger diario -> constructor de queries -> captura de feed -> scoring",
    },
    whatItDoes: {
      en: "Runs on a schedule, builds product-specific searches, fetches fresh inputs, and scores which signals should move into the next operating step.",
      es: "Corre con una programación fija, construye búsquedas por producto, obtiene inputs recientes y puntúa qué señales deben pasar al siguiente paso operativo.",
    },
    stack: ["n8n", "Scheduler", "Queries", "Feeds", "Scoring"],
    impact: {
      en: "Creates a dependable top-of-funnel signal layer instead of relying on memory or sporadic manual checks.",
      es: "Crea una capa confiable de señales top-of-funnel en lugar de depender de memoria o revisiones manuales esporádicas.",
    },
    problem: {
      en: "Opportunity signals decay quickly if nobody watches the right sources at the right cadence.",
      es: "Las señales de oportunidad se degradan rápido si nadie observa las fuentes correctas con la cadencia adecuada.",
    },
    workflow: [
      "Daily 9:15 CDMX",
      "Build product queries",
      "Fetch signal feed",
      "Score signals",
    ],
    logic: {
      en: [
        "Uses a fixed schedule to remove inconsistency.",
        "Builds queries dynamically around the products being monitored.",
        "Scores signals before they create noise downstream.",
      ],
      es: [
        "Usa una programación fija para eliminar inconsistencia.",
        "Construye queries dinámicamente alrededor de los productos monitoreados.",
        "Puntúa señales antes de que generen ruido aguas abajo.",
      ],
    },
    integrations: ["Scheduler", "Search/feed sources", "Scoring layer"],
    aiLayer: {
      en: "AI can help judge relevance after the raw signals are collected, turning a feed into a prioritized watchlist.",
      es: "La IA puede ayudar a juzgar relevancia después de recolectar las señales, convirtiendo un feed en una watchlist priorizada.",
    },
    outcome: {
      en: "Gives GTM work a durable signal-ingestion habit that can plug into briefing, routing, or research workflows.",
      es: "Le da al trabajo GTM un hábito durable de ingesta de señales que puede conectarse con workflows de briefing, routing o research.",
    },
  },
  {
    id: "job-intake",
    accent: "cyan",
    title: {
      en: "High-Fit Intake",
      es: "High-Fit Intake",
    },
    strapline: {
      en: "Job intake -> Fit scoring -> Response payload",
      es: "Intake de vacante -> scoring de fit -> respuesta estructurada",
    },
    whatItDoes: {
      en: "Receives a role or opportunity intake, evaluates fit automatically, and returns a score that can support quicker triage decisions.",
      es: "Recibe el intake de una vacante u oportunidad, evalúa el fit automáticamente y devuelve un score que ayuda a tomar decisiones de triage más rápido.",
    },
    stack: ["n8n", "Webhook", "Scoring", "AI evaluation", "Structured response"],
    impact: {
      en: "Cuts the time spent manually reviewing every intake with the same level of attention.",
      es: "Reduce el tiempo invertido en revisar manualmente cada intake con el mismo nivel de atención.",
    },
    problem: {
      en: "Manual opportunity review slows down fast when every inbound item needs the same reading, comparison, and judgment steps.",
      es: "La revisión manual de oportunidades se vuelve lenta cuando cada item entrante requiere la misma lectura, comparación y juicio.",
    },
    workflow: [
      "Job intake webhook",
      "Score fit",
      "Respond score",
    ],
    logic: {
      en: [
        "Takes structured intake from a webhook entrypoint.",
        "Scores the fit before a human spends time on full review.",
        "Returns a response that another tool or operator can act on quickly.",
      ],
      es: [
        "Toma intake estructurado desde un webhook.",
        "Puntúa el fit antes de que una persona invierta tiempo en revisión completa.",
        "Devuelve una respuesta que otra herramienta u operador puede accionar rápidamente.",
      ],
    },
    integrations: ["Webhook intake", "Scoring logic", "Structured response"],
    aiLayer: {
      en: "AI is best framed here as an evaluation aid inside a bounded scoring workflow, not as a black-box decision maker.",
      es: "Aquí la IA se entiende mejor como apoyo de evaluación dentro de un workflow acotado de scoring, no como caja negra de decisión.",
    },
    outcome: {
      en: "Transforms intake review into a systemized filter that supports faster prioritization.",
      es: "Transforma la revisión de intake en un filtro sistematizado que apoya una priorización más rápida.",
    },
  },
];

const accentClass: Record<AutomationStudy["accent"], string> = {
  coral: styles.coral,
  violet: styles.violet,
  lime: styles.lime,
  cyan: styles.cyan,
};

export function AutomationLab({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale].automationLab;
  const [selectedId, setSelectedId] = useState(studies[0].id);
  const selected = studies.find((study) => study.id === selectedId) ?? studies[0];

  return (
    <div className={styles.lab}>
      <div className={styles.recruiterStrip} data-reveal>
        <div>
          <MetaLabel>{copy.recruiterTitle}</MetaLabel>
          <p>{copy.recruiterPoints[0]}</p>
        </div>
        <p>{copy.recruiterPoints[1]}</p>
        <p>{copy.recruiterPoints[2]}</p>
      </div>

      <div className={styles.sectionMeta}>
        <MetaLabel>{copy.featuredLabel}</MetaLabel>
        <span aria-hidden="true">01-04</span>
      </div>

      <div className={styles.cardGrid}>
        {studies.map((study, index) => {
          const isSelected = study.id === selected.id;
          return (
            <button
              key={study.id}
              type="button"
              className={`${styles.card} ${accentClass[study.accent]}`}
              data-selected={isSelected ? "true" : "false"}
              data-reveal
              style={{ "--reveal-delay": `${index * 45}ms` } as CSSProperties}
              onClick={() => setSelectedId(study.id)}
            >
              <div className={styles.cardTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{copy.detailLabel}</span>
              </div>
              <h3>{study.title[locale]}</h3>
              <p className={styles.strapline}>{study.strapline[locale]}</p>
              <p className={styles.body}>{study.whatItDoes[locale]}</p>
              <div className={styles.flowPreview} aria-label={`${copy.workflowLabel}: ${study.title[locale]}`}>
                {study.workflow.slice(0, 4).map((step, stepIndex) => (
                  <div key={step} className={styles.flowStep}>
                    <span>{step}</span>
                    {stepIndex < Math.min(study.workflow.length, 4) - 1 ? <i aria-hidden="true" /> : null}
                  </div>
                ))}
              </div>
              <dl className={styles.metaGrid}>
                <div>
                  <dt>{copy.stackLabel}</dt>
                  <dd>{study.stack.join(" · ")}</dd>
                </div>
                <div>
                  <dt>{copy.impactLabel}</dt>
                  <dd>{study.impact[locale]}</dd>
                </div>
              </dl>
            </button>
          );
        })}
      </div>

      <article className={`${styles.caseStudy} ${accentClass[selected.accent]}`} data-reveal>
        <div className={styles.caseIntro}>
          <div className={styles.caseHeading}>
            <MetaLabel>{copy.detailLabel}</MetaLabel>
            <h3>{selected.title[locale]}</h3>
            <p>{selected.whatItDoes[locale]}</p>
          </div>
          <div className={styles.systemPanel}>
            <span>{copy.systemLabel}</span>
            <div className={styles.systemFlow}>
              {selected.workflow.map((step, index) => (
                <div key={step} className={styles.systemNode}>
                  <strong>{step}</strong>
                  {index < selected.workflow.length - 1 ? <i aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.detailGrid}>
          <section>
            <span>{copy.problemLabel}</span>
            <p>{selected.problem[locale]}</p>
          </section>
          <section>
            <span>{copy.logicLabel}</span>
            <ul>
              {selected.logic[locale].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <section>
            <span>{copy.integrationsLabel}</span>
            <p>{selected.integrations.join(" · ")}</p>
          </section>
          <section>
            <span>{copy.aiLabel}</span>
            <p>{selected.aiLayer[locale]}</p>
          </section>
          <section>
            <span>{copy.outcomeLabel}</span>
            <p>{selected.outcome[locale]}</p>
          </section>
        </div>
      </article>

      <p className={styles.note} data-reveal>{copy.note}</p>
    </div>
  );
}
