import type { ReactNode } from "react";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ImageEvidenceAsset } from "@/lib/case-studies";
import type { Locale } from "@/lib/site";
import styles from "./design-primitives.module.css";

export function SectionHeading({
  eyebrow,
  title,
  body,
  id,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  id: string;
  tone?: "default" | "inverse";
}) {
  return (
    <div className={styles.sectionHeading} data-tone={tone}>
      <p>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {body ? <div className={styles.sectionBody}>{body}</div> : null}
    </div>
  );
}

export function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  transitionTypes,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet" | "inverse";
  external?: boolean;
  transitionTypes?: string[];
}) {
  const className = styles.actionLink;
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden="true">{external ? "↗" : "→"}</span>
    </>
  );

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        className={className}
        data-variant={variant}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={className}
      data-variant={variant}
      href={href}
      transitionTypes={transitionTypes}
    >
      {content}
    </Link>
  );
}

export function MetaLabel({ children }: { children: ReactNode }) {
  return <span className={styles.metaLabel}>{children}</span>;
}

export function EvidenceMedia({
  asset,
  locale,
  role,
  sizes,
  priority = false,
  className,
  transitionName,
}: {
  asset: ImageEvidenceAsset;
  locale: Locale;
  role: "card" | "hero" | "proof";
  sizes: string;
  priority?: boolean;
  className?: string;
  transitionName?: string;
}) {
  const image = (
    <Image
      src={asset.src}
      alt={asset.alt[locale]}
      width={asset.viewport.width}
      height={asset.viewport.height}
      sizes={sizes}
      preload={priority}
    />
  );

  return (
    <div
      className={className}
      data-evidence-id={asset.id}
      data-media-role={role}
    >
      {transitionName ? (
        <ViewTransition name={transitionName} share="case-morph" default="none">
          {image}
        </ViewTransition>
      ) : image}
    </div>
  );
}

export function EvidenceCaption({
  asset,
  locale,
  classification,
}: {
  asset: ImageEvidenceAsset;
  locale: Locale;
  classification: string;
}) {
  return (
    <figcaption className={styles.evidenceCaption}>
      <strong>{classification}</strong>
      <span>{asset.caption[locale]}</span>
      <span>{asset.caveat[locale]}</span>
    </figcaption>
  );
}
