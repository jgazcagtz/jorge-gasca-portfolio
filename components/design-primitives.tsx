import type { ReactNode } from "react";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrackedAnchor,
} from "@/components/analytics/tracked-anchor";
import {
  TrackedLink,
} from "@/components/analytics/tracked-link";
import type {
  AnalyticsEventData,
  AnalyticsEventName,
} from "@/components/analytics/track";
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
  download = false,
  analyticsEvent,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet" | "inverse";
  external?: boolean;
  transitionTypes?: string[];
  download?: boolean;
  analyticsEvent?: {
    name: AnalyticsEventName;
    data?: AnalyticsEventData;
  };
}) {
  const className = styles.actionLink;
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden="true">{external ? "↗" : "→"}</span>
    </>
  );

  if (
    external ||
    download ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    if (analyticsEvent) {
      return (
        <TrackedAnchor
          className={className}
          data-variant={variant}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          download={download || undefined}
          eventName={analyticsEvent.name}
          eventData={analyticsEvent.data}
        >
          {content}
        </TrackedAnchor>
      );
    }
    return (
      <a
        className={className}
        data-variant={variant}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        download={download || undefined}
      >
        {content}
      </a>
    );
  }

  if (analyticsEvent) {
    return (
      <TrackedLink
        className={className}
        data-variant={variant}
        href={href}
        transitionTypes={transitionTypes}
        eventName={analyticsEvent.name}
        eventData={analyticsEvent.data}
      >
        {content}
      </TrackedLink>
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
