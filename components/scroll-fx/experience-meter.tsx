import type { CSSProperties } from "react";
import styles from "./scroll-fx.module.css";

/**
 * "System readiness" gauge — a battery-style meter that charges as the
 * experience section scrolls past, with a counting readout and state label.
 * Purely decorative; the accessible timeline copy stays untouched.
 */

const stateWords = {
  en: ["Signal", "Design", "Automate", "Verify"],
  es: ["Señal", "Diseño", "Automatizar", "Verificar"],
} as const;

export function ExperienceMeter({ locale }: { locale: "en" | "es" }) {
  const words = stateWords[locale];
  return (
    <div className={styles.meter} data-fx="meter" data-fx-meter-block aria-hidden="true">
      <div className={styles.meterHead}>
        <span className={styles.meterTitle}>
          {locale === "en" ? "System readiness" : "Preparación del sistema"}
        </span>
        <span className={styles.meterReadout}>
          <span data-fx-meter-value>0</span>
          <i>%</i>
        </span>
      </div>
      <div className={styles.meterTrack}>
        <span className={styles.meterFill} />
        <span className={styles.meterTicks}>
          {[0, 1, 2, 3, 4].map((tick) => (
            <i key={tick} style={{ "--tick": tick } as CSSProperties} />
          ))}
        </span>
        <span className={styles.meterBolt}>
          <svg viewBox="0 0 24 24">
            <path d="M13 2 L5 14 h6 l-2 8 8 -12 h-6 Z" />
          </svg>
        </span>
      </div>
      <div className={styles.meterStates}>
        {words.map((word, index) => (
          <span key={word} data-state-index={index + 1}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
