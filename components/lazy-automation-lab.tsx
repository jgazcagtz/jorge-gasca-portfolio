"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/site";

/**
 * The animated workflow graph is a large block of interactive markup that sits
 * well below the fold. It is excluded from server rendering and from the
 * initial client bundle, then mounted just before it scrolls into view. Once
 * mounted it behaves exactly like the direct import did.
 */
const AutomationLab = dynamic(
  () => import("@/components/automation-lab").then((mod) => mod.AutomationLab),
  { ssr: false },
);

export function LazyAutomationLab({ locale }: { locale: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // RevealController only scans [data-reveal] elements once on load, so the
    // late-mounted lab markup would never receive its reveal state.
    rootRef.current
      ?.querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((node) => node.setAttribute("data-revealed", "true"));
  }, [mounted]);

  return (
    <div ref={rootRef}>
      {mounted ? (
        <AutomationLab locale={locale} />
      ) : (
        <p className="automationLabPending" aria-hidden="true">
          15 nodes / 4 systems
        </p>
      )}
    </div>
  );
}
