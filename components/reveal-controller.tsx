"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";

export function RevealController() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );

    if (nodes.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.setAttribute("data-revealed", "true"));
      return;
    }

    const revealImmediately = window.innerHeight * 0.94;
    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top <= revealImmediately) {
        node.setAttribute("data-revealed", "true");
      }
    });

    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    nodes.forEach((node) => {
      if (!node.hasAttribute("data-revealed")) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
