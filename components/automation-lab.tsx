"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { MetaLabel } from "@/components/design-primitives";
import { homeCopy } from "@/lib/home";
import type { Locale } from "@/lib/site";
import styles from "./automation-lab.module.css";

type GraphNode = {
  id: string;
  lane: "intake" | "data" | "ai" | "action" | "ops";
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  stack: string[];
  x: number;
  y: number;
};

type CaseStudy = {
  id: string;
  accent: "coral" | "violet" | "lime" | "cyan";
  title: Record<Locale, string>;
  whatItDoes: Record<Locale, string>;
  impact: Record<Locale, string>;
  problem: Record<Locale, string>;
  logic: Record<Locale, string[]>;
  aiLayer: Record<Locale, string>;
  outcome: Record<Locale, string>;
  nodeIds: string[];
};

const graphNodes: GraphNode[] = [
  {
    id: "batch-review",
    lane: "intake",
    title: { en: "Batch Review", es: "Revisión por lote" },
    summary: {
      en: "Collects several work items into a single review surface.",
      es: "Agrupa varios elementos de trabajo en una superficie de revisión.",
    },
    stack: ["n8n", "Webhook", "Review queue"],
    x: 7,
    y: 16,
  },
  {
    id: "gateway-preflight",
    lane: "ops",
    title: { en: "Gateway Preflight", es: "Preflight de gateway" },
    summary: {
      en: "Checks request shape before a workflow spends downstream resources.",
      es: "Valida la forma de la solicitud antes de usar recursos posteriores.",
    },
    stack: ["n8n", "API guardrail", "Validation"],
    x: 22,
    y: 9,
  },
  {
    id: "signal-os",
    lane: "data",
    title: { en: "Signal OS", es: "Signal OS" },
    summary: {
      en: "Turns free public signals into a structured GTM brief.",
      es: "Convierte señales públicas gratuitas en un brief GTM estructurado.",
    },
    stack: ["n8n", "RSS/API", "Briefing"],
    x: 25,
    y: 36,
  },
  {
    id: "guarded-enrichment",
    lane: "data",
    title: { en: "Guarded Enrichment", es: "Enriquecimiento controlado" },
    summary: {
      en: "Uses data-source guardrails before enriching a person record.",
      es: "Usa guardrails de fuente de datos antes de enriquecer un registro.",
    },
    stack: ["n8n", "Data source", "Cost control"],
    x: 42,
    y: 18,
  },
  {
    id: "credit-spend",
    lane: "ops",
    title: { en: "Credit Spend Control", es: "Control de créditos" },
    summary: {
      en: "Tracks when enrichment should spend credits and when it should stop.",
      es: "Define cuándo gastar créditos de enriquecimiento y cuándo detenerse.",
    },
    stack: ["n8n", "Rules", "Budget guardrail"],
    x: 58,
    y: 6,
  },
  {
    id: "account-preflight",
    lane: "data",
    title: { en: "Account Preflight", es: "Preflight de cuenta" },
    summary: {
      en: "Checks account data before deeper qualification or outreach.",
      es: "Revisa datos de cuenta antes de calificación u outreach.",
    },
    stack: ["n8n", "Data source", "Qualification"],
    x: 59,
    y: 29,
  },
  {
    id: "aware-drafts",
    lane: "action",
    title: { en: "Aware Email Drafts", es: "Drafts de email con contexto" },
    summary: {
      en: "Builds outbound drafts using context, limits, and run summaries.",
      es: "Crea drafts outbound usando contexto, límites y resúmenes.",
    },
    stack: ["n8n", "Email workspace", "LLM"],
    x: 76,
    y: 19,
  },
  {
    id: "signal-scanner",
    lane: "data",
    title: { en: "Signal Scanner", es: "Scanner de señales" },
    summary: {
      en: "Runs scheduled scans and scores which signals deserve attention.",
      es: "Corre scans programados y puntúa señales relevantes.",
    },
    stack: ["n8n", "Scheduler", "Scoring"],
    x: 13,
    y: 55,
  },
  {
    id: "daily-briefing",
    lane: "ai",
    title: { en: "Daily Briefing", es: "Briefing diario" },
    summary: {
      en: "Converts automation and AI signals into a concise operating brief.",
      es: "Convierte señales de automatización e IA en un brief operativo.",
    },
    stack: ["n8n", "LLM", "Brief"],
    x: 36,
    y: 62,
  },
  {
    id: "ai-signal-brief",
    lane: "ai",
    title: { en: "AI Signal Brief", es: "Brief de señales IA" },
    summary: {
      en: "Summarizes relevant AI and automation updates for review.",
      es: "Resume actualizaciones relevantes de IA y automatización.",
    },
    stack: ["n8n", "Feeds", "LLM"],
    x: 52,
    y: 50,
  },
  {
    id: "showcase-builder",
    lane: "action",
    title: { en: "Showcase Builder", es: "Constructor de showcase" },
    summary: {
      en: "Packages product evidence into a reusable portfolio narrative.",
      es: "Empaqueta evidencia de producto en una narrativa reutilizable.",
    },
    stack: ["n8n", "Content logic", "Publishing"],
    x: 72,
    y: 55,
  },
  {
    id: "alert-intake",
    lane: "intake",
    title: { en: "Alert Intake", es: "Intake de alertas" },
    summary: {
      en: "Receives uptime alerts and formats them for operational review.",
      es: "Recibe alertas de uptime y las prepara para revisión operativa.",
    },
    stack: ["n8n", "Monitoring", "Webhook"],
    x: 8,
    y: 77,
  },
  {
    id: "draft-factory",
    lane: "action",
    title: { en: "Email Draft Factory", es: "Fábrica de drafts" },
    summary: {
      en: "Turns structured requests into ready-to-review outbound drafts.",
      es: "Convierte solicitudes estructuradas en drafts listos para revisar.",
    },
    stack: ["n8n", "Webhook", "LLM drafting"],
    x: 86,
    y: 39,
  },
  {
    id: "fit-intake",
    lane: "ai",
    title: { en: "High-Fit Intake", es: "Intake de alto fit" },
    summary: {
      en: "Scores incoming opportunities before deeper human review.",
      es: "Puntúa oportunidades entrantes antes de una revisión humana profunda.",
    },
    stack: ["n8n", "Webhook", "Fit scoring"],
    x: 62,
    y: 80,
  },
  {
    id: "health-sweep",
    lane: "ops",
    title: { en: "Health Sweep", es: "Health sweep" },
    summary: {
      en: "Checks system health and turns status into a reviewable signal.",
      es: "Revisa salud del sistema y convierte estado en una señal revisable.",
    },
    stack: ["n8n", "Health check", "Ops signal"],
    x: 27,
    y: 87,
  },
];

const graphLinks = [
  ["batch-review", "gateway-preflight"],
  ["gateway-preflight", "guarded-enrichment"],
  ["guarded-enrichment", "credit-spend"],
  ["guarded-enrichment", "account-preflight"],
  ["account-preflight", "aware-drafts"],
  ["aware-drafts", "draft-factory"],
  ["signal-scanner", "signal-os"],
  ["signal-os", "daily-briefing"],
  ["daily-briefing", "ai-signal-brief"],
  ["ai-signal-brief", "showcase-builder"],
  ["alert-intake", "health-sweep"],
  ["health-sweep", "daily-briefing"],
  ["fit-intake", "showcase-builder"],
  ["fit-intake", "draft-factory"],
] as const;

const caseStudies: CaseStudy[] = [
  {
    id: "signal-intelligence",
    accent: "coral",
    title: { en: "Signal Intelligence System", es: "Sistema de inteligencia de señales" },
    whatItDoes: {
      en: "Runs scheduled scans, ranks useful signals, and turns noisy inputs into concise GTM briefs.",
      es: "Corre scans programados, prioriza señales útiles y convierte inputs ruidosos en briefs GTM claros.",
    },
    impact: {
      en: "Creates a repeatable habit for market monitoring instead of manual feed checking.",
      es: "Crea un hábito repetible de monitoreo de mercado en vez de revisión manual de feeds.",
    },
    problem: {
      en: "Useful market signals decay quickly when they are scattered across sources and reviewed inconsistently.",
      es: "Las señales útiles pierden valor rápido cuando están dispersas entre fuentes y se revisan sin consistencia.",
    },
    logic: {
      en: [
        "Run scans on a defined cadence.",
        "Normalize source data into a common shape.",
        "Score relevance before sending the brief downstream.",
      ],
      es: [
        "Ejecutar scans con una cadencia definida.",
        "Normalizar datos de distintas fuentes en una forma común.",
        "Puntuar relevancia antes de enviar el brief al siguiente paso.",
      ],
    },
    aiLayer: {
      en: "AI supports ranking and summarization after the data is collected, so the workflow stays explainable.",
      es: "La IA apoya ranking y resumen después de recolectar datos, manteniendo el workflow explicable.",
    },
    outcome: {
      en: "A signal pipeline that can feed briefing, routing, or outbound action.",
      es: "Un pipeline de señales que puede alimentar briefing, routing o acciones outbound.",
    },
    nodeIds: ["signal-scanner", "signal-os", "daily-briefing", "ai-signal-brief"],
  },
  {
    id: "enrichment-governance",
    accent: "violet",
    title: { en: "Data Enrichment Governance", es: "Gobernanza de enriquecimiento" },
    whatItDoes: {
      en: "Checks request quality, account readiness, and data-source spend before deeper enrichment.",
      es: "Valida calidad de solicitud, preparación de cuenta y gasto de fuente de datos antes de enriquecer.",
    },
    impact: {
      en: "Adds budget and quality guardrails around GTM data workflows.",
      es: "Agrega guardrails de presupuesto y calidad a workflows de datos GTM.",
    },
    problem: {
      en: "Enrichment workflows can waste credits or create bad downstream data when every request is treated the same.",
      es: "Los workflows de enriquecimiento pueden gastar créditos o crear datos malos si todas las solicitudes se tratan igual.",
    },
    logic: {
      en: [
        "Validate the request at the gateway.",
        "Check whether person and account data justify enrichment.",
        "Spend data-source credits only when the workflow has enough signal.",
      ],
      es: [
        "Validar la solicitud en el gateway.",
        "Revisar si persona y cuenta justifican enriquecimiento.",
        "Gastar créditos de fuente de datos sólo con suficiente señal.",
      ],
    },
    aiLayer: {
      en: "AI can interpret fit and context, while deterministic checks protect budget and data quality.",
      es: "La IA puede interpretar fit y contexto, mientras checks determinísticos protegen presupuesto y calidad.",
    },
    outcome: {
      en: "Cleaner records, fewer wasted runs, and a better handoff into outreach or CRM work.",
      es: "Registros más limpios, menos ejecuciones desperdiciadas y mejor handoff hacia outreach o CRM.",
    },
    nodeIds: ["gateway-preflight", "guarded-enrichment", "credit-spend", "account-preflight"],
  },
  {
    id: "outbound-factory",
    accent: "lime",
    title: { en: "Outbound Draft Factory", es: "Fábrica outbound" },
    whatItDoes: {
      en: "Turns structured GTM requests into context-aware email drafts and run summaries.",
      es: "Convierte solicitudes GTM estructuradas en drafts con contexto y resúmenes de ejecución.",
    },
    impact: {
      en: "Reduces repetitive writing while keeping a human review step in the loop.",
      es: "Reduce escritura repetitiva manteniendo revisión humana en el flujo.",
    },
    problem: {
      en: "Outbound preparation becomes slow when research, personalization, and draft writing happen separately.",
      es: "La preparación outbound se vuelve lenta cuando research, personalización y escritura ocurren por separado.",
    },
    logic: {
      en: [
        "Receive a structured draft request.",
        "Use available context and guardrails before generation.",
        "Return a draft and summary that a person can review quickly.",
      ],
      es: [
        "Recibir una solicitud estructurada de draft.",
        "Usar contexto disponible y guardrails antes de generar.",
        "Devolver un draft y resumen que una persona pueda revisar rápido.",
      ],
    },
    aiLayer: {
      en: "AI drafts the message, but the automation controls intake, context, and final handoff.",
      es: "La IA redacta el mensaje, pero la automatización controla intake, contexto y handoff final.",
    },
    outcome: {
      en: "A faster route from qualified signal to reviewable outreach.",
      es: "Una ruta más rápida de señal calificada a outreach revisable.",
    },
    nodeIds: ["aware-drafts", "draft-factory", "fit-intake"],
  },
  {
    id: "ops-monitoring",
    accent: "cyan",
    title: { en: "Ops Monitoring Loop", es: "Loop de monitoreo operativo" },
    whatItDoes: {
      en: "Receives alerts, checks health, and translates operational state into reviewable signals.",
      es: "Recibe alertas, revisa salud y traduce estado operativo en señales revisables.",
    },
    impact: {
      en: "Makes operational issues easier to triage before they disappear into disconnected tools.",
      es: "Hace más fácil priorizar issues operativos antes de que se pierdan entre herramientas desconectadas.",
    },
    problem: {
      en: "Alerts are easy to ignore when they do not become clear action signals.",
      es: "Las alertas se ignoran fácilmente cuando no se convierten en señales claras de acción.",
    },
    logic: {
      en: [
        "Capture alert intake through a webhook.",
        "Run a health sweep to add context.",
        "Route the result into a briefing or review workflow.",
      ],
      es: [
        "Capturar alertas por webhook.",
        "Correr un health sweep para agregar contexto.",
        "Enviar el resultado a un briefing o revisión.",
      ],
    },
    aiLayer: {
      en: "AI is useful for summarizing status and grouping related signals, while the workflow keeps the source trail intact.",
      es: "La IA ayuda a resumir estado y agrupar señales relacionadas, mientras el workflow conserva la trazabilidad.",
    },
    outcome: {
      en: "A lightweight operations loop for monitoring, briefing, and prioritization.",
      es: "Un loop operativo ligero para monitoreo, briefing y priorización.",
    },
    nodeIds: ["alert-intake", "health-sweep", "batch-review", "showcase-builder"],
  },
];

const accentClass: Record<CaseStudy["accent"], string> = {
  coral: styles.coral,
  violet: styles.violet,
  lime: styles.lime,
  cyan: styles.cyan,
};

const laneLabels: Record<GraphNode["lane"], Record<Locale, string>> = {
  intake: { en: "Intake", es: "Intake" },
  data: { en: "Data", es: "Datos" },
  ai: { en: "AI logic", es: "Lógica IA" },
  action: { en: "Action", es: "Acción" },
  ops: { en: "Ops", es: "Ops" },
};

function nodeById(id: string) {
  const node = graphNodes.find((item) => item.id === id);
  if (!node) {
    throw new Error(`Missing graph node: ${id}`);
  }
  return node;
}

export function AutomationLab({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale].automationLab;
  const [selectedId, setSelectedId] = useState(caseStudies[0].id);
  const selected = caseStudies.find((study) => study.id === selectedId) ?? caseStudies[0];
  const selectedNodes = new Set(selected.nodeIds);

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
        <span aria-hidden="true">15 nodes / 4 systems</span>
      </div>

      <div className={`${styles.graphShell} ${accentClass[selected.accent]}`} data-reveal>
        <div className={styles.graphHeader}>
          <div>
            <span>{copy.systemLabel}</span>
            <h3>{selected.title[locale]}</h3>
          </div>
          <p>{selected.whatItDoes[locale]}</p>
        </div>

        <div className={styles.graphStage} aria-label={`${copy.workflowLabel}: ${selected.title[locale]}`}>
          <svg className={styles.graphLinks} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {graphLinks.map(([from, to], index) => {
              const source = nodeById(from);
              const target = nodeById(to);
              const isActive = selectedNodes.has(from) && selectedNodes.has(to);
              const midX = (source.x + target.x) / 2;
              const midY = (source.y + target.y) / 2 - 9;
              return (
                <path
                  key={`${from}-${to}`}
                  className={isActive ? styles.activeLink : styles.link}
                  d={`M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`}
                  pathLength="1"
                  style={{ "--link-delay": `${index * 180}ms` } as CSSProperties}
                />
              );
            })}
          </svg>

          {graphNodes.map((node, index) => {
            const isActive = selectedNodes.has(node.id);
            return (
              <button
                key={node.id}
                type="button"
                className={styles.graphNode}
                data-lane={node.lane}
                data-active={isActive ? "true" : "false"}
                style={{
                  "--node-x": `${node.x}%`,
                  "--node-y": `${node.y}%`,
                  "--node-delay": `${index * 70}ms`,
                } as CSSProperties}
                onClick={() => {
                  const next = caseStudies.find((study) => study.nodeIds.includes(node.id));
                  setSelectedId(next?.id ?? selected.id);
                }}
              >
                <span>{laneLabels[node.lane][locale]}</span>
                <strong>{node.title[locale]}</strong>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.systemTabs} role="tablist" aria-label={copy.detailLabel}>
        {caseStudies.map((study, index) => (
          <button
            key={study.id}
            type="button"
            role="tab"
            aria-selected={study.id === selected.id}
            className={`${styles.systemTab} ${accentClass[study.accent]}`}
            onClick={() => setSelectedId(study.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {study.title[locale]}
          </button>
        ))}
      </div>

      <article className={`${styles.caseStudy} ${accentClass[selected.accent]}`} data-reveal>
        <div className={styles.caseHeading}>
          <MetaLabel>{copy.detailLabel}</MetaLabel>
          <h3>{selected.title[locale]}</h3>
          <p>{selected.impact[locale]}</p>
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
            <p>{selected.nodeIds.flatMap((id) => nodeById(id).stack).filter((item, index, items) => items.indexOf(item) === index).join(" · ")}</p>
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
