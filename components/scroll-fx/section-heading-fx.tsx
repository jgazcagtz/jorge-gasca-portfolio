import type { CSSProperties, ReactNode } from "react";
import styles from "./scroll-fx.module.css";

/**
 * Home-scoped section heading with word-by-word reveal. Mirrors the shared
 * SectionHeading DOM (p / h2 / body) but splits the title into spans that
 * cascade in through the existing data-reveal system — the accessible name
 * is preserved with aria-label on the h2.
 */

export function splitWords(text: string) {
  return text.split(/\s+/).filter(Boolean);
}

export function WordSpans({
  text,
  baseDelay = 0,
}: {
  text: string;
  baseDelay?: number;
}) {
  const words = splitWords(text);
  return (
    <span className={styles.wordRow} aria-hidden="true">
      {words.map((word, index) => (
        <span
          className={styles.word}
          style={{ "--wi": index + baseDelay } as CSSProperties}
          key={`${word}-${index}`}
        >
          <span className={styles.wordInner}>{word}</span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeadingFx({
  eyebrow,
  title,
  body,
  id,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  body?: ReactNode;
  id: string;
  tone?: "default" | "inverse";
}) {
  return (
    <div
      className={styles.sectionHeadingFx}
      data-tone={tone}
      data-reveal
    >
      <p>{eyebrow}</p>
      <h2 id={id} aria-label={title}>
        <WordSpans text={title} />
      </h2>
      {body ? <div className={styles.sectionBodyFx}>{body}</div> : null}
    </div>
  );
}
