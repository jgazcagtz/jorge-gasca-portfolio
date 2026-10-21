import styles from "./scroll-fx.module.css";

/**
 * Finale — an infinite zoom into the JG monogram. Nested frames dive inward
 * while the monogram deconstructs letterforms → circuit → iris, ending in an
 * ink flood that hands off into the contact section below. Decorative only;
 * without JS the monogram simply rests in its letterform state.
 */

const labels = {
  en: {
    frame: "JG — SYSTEM PORTFOLIO",
    url: "jgasca.io/work",
    lineA: "Seven shipped systems. Zero handoffs lost.",
    lineB: "Sales · CRM · AI workflows",
    statA: "07 CASES",
    statB: "2020—2026",
  },
  es: {
    frame: "JG — PORTAFOLIO DE SISTEMAS",
    url: "jgasca.io/work",
    lineA: "Siete sistemas entregados. Cero traspasos perdidos.",
    lineB: "Ventas · CRM · flujos de IA",
    statA: "07 CASOS",
    statB: "2020—2026",
  },
} as const;

export function FinaleZoom({ locale }: { locale: "en" | "es" }) {
  const t = labels[locale];
  return (
    <section className={styles.finale} data-fx="finale" aria-hidden="true">
      <div className={styles.finaleStage}>
        <div className={styles.finaleLayer} data-layer="frame">
          <span className={styles.finaleFrame} />
          <span className={styles.finaleFrameLabel}>{t.frame}</span>
        </div>

        <div className={styles.finaleLayer} data-layer="window">
          <span className={styles.finaleWindow}>
            <span className={styles.finaleWindowChrome}>
              <i /><i /><i />
              <span className={styles.finaleUrl}>{t.url}</span>
            </span>
            <span className={styles.finaleWindowBody}>
              <strong>{t.lineA}</strong>
              <span>{t.lineB}</span>
              <span className={styles.finaleStats}>
                <i>{t.statA}</i>
                <i>{t.statB}</i>
              </span>
            </span>
          </span>
        </div>

        <div className={styles.finaleLayer} data-layer="monogram">
          <svg className={styles.finaleMonogram} viewBox="0 0 360 240">
            {/* barJ — vertical stroke of the J */}
            <rect
              data-part="barJ"
              x="-12"
              y="-64"
              width="24"
              height="128"
              rx="2"
              transform="translate(96 120)"
            />
            {/* footJ — bottom hook of the J */}
            <rect
              data-part="footJ"
              x="0"
              y="-12"
              width="44"
              height="24"
              rx="2"
              transform="translate(56 168)"
            />
            {/* arcG — the G body */}
            <circle
              data-part="arcG"
              cx="0"
              cy="0"
              r="64"
              fill="none"
              strokeWidth="24"
              strokeDasharray="318 168"
              transform="translate(232 120) rotate(118)"
            />
            {/* barG — the G crossbar */}
            <rect
              data-part="barG"
              x="28"
              y="-12"
              width="36"
              height="24"
              rx="2"
              transform="translate(232 120)"
            />
          </svg>
        </div>

        <div className={styles.finaleLayer} data-layer="flood" />
      </div>
    </section>
  );
}
