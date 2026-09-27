"use client";

import { useEffect } from "react";
import styles from "./scroll-fx.module.css";

/**
 * Scroll FX controller — drives every scroll-linked effect on the home page.
 *
 * One rAF loop, read phase then write phase, transform/opacity only. Effects
 * are opt-in through `data-fx` attributes rendered by the home page. With JS
 * disabled or `prefers-reduced-motion: reduce` the class `fx-enhanced` is
 * never added, so the page stays exactly as the static markup defines it.
 */

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);
/** Smooth remap of p from range [a, b] to [0, 1]. */
const seg = (p: number, a: number, b: number) => smooth(clamp((p - a) / (b - a)));

type Tracked = {
  key:
    | "hero"
    | "track"
    | "scenes"
    | "meter"
    | "finale"
    | "contact"
    | "work"
    | "experience"
    | "automation";
  el: HTMLElement;
  /** pin = progress while the element scrolls past the viewport top. */
  kind: "pin" | "enter";
  p: number;
};

/* ---------------------------------------------------------------------------
 * JG monogram morph — letterforms → circuit → iris. Each part is an SVG
 * primitive moved through keyframe states; values are lerped per frame.
 * ------------------------------------------------------------------------- */

type PartName = "barJ" | "footJ" | "arcG" | "barG";

type PartState = {
  x: number;
  y: number;
  r: number;
  sx: number;
  sy: number;
  o: number;
  /** visible dash length for the G arc (others ignore it). */
  dash: number;
};

const LETTERS: Record<PartName, PartState> = {
  barJ: { x: 96, y: 120, r: 0, sx: 1, sy: 1, o: 1, dash: 0 },
  footJ: { x: 56, y: 168, r: 0, sx: 1, sy: 1, o: 1, dash: 0 },
  arcG: { x: 232, y: 120, r: 118, sx: 1, sy: 1, o: 1, dash: 318 },
  barG: { x: 232, y: 120, r: 0, sx: 1, sy: 1, o: 1, dash: 0 },
};

const CIRCUIT: Record<PartName, PartState> = {
  barJ: { x: 180, y: 58, r: 90, sx: 2.55, sy: 0.6, o: 1, dash: 0 },
  footJ: { x: 296, y: 184, r: 0, sx: 0.85, sy: 0.85, o: 1, dash: 0 },
  arcG: { x: 180, y: 132, r: 0, sx: 1, sy: 1, o: 1, dash: 402 },
  barG: { x: 180, y: 132, r: 45, sx: 0.5, sy: 0.5, o: 1, dash: 0 },
};

const IRIS: Record<PartName, PartState> = {
  barJ: { x: 180, y: 58, r: 90, sx: 2.55, sy: 0.6, o: 0.1, dash: 0 },
  footJ: { x: 296, y: 184, r: 0, sx: 0.25, sy: 0.25, o: 0, dash: 0 },
  arcG: { x: 180, y: 120, r: 0, sx: 1.4, sy: 1.4, o: 1, dash: 402 },
  barG: { x: 180, y: 132, r: 45, sx: 0.15, sy: 0.15, o: 0, dash: 0 },
};

const ARC_CIRCUMFERENCE = 2 * Math.PI * 64;

function lerpState(a: PartState, b: PartState, t: number): PartState {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    r: lerp(a.r, b.r, t),
    sx: lerp(a.sx, b.sx, t),
    sy: lerp(a.sy, b.sy, t),
    o: lerp(a.o, b.o, t),
    dash: lerp(a.dash, b.dash, t),
  };
}

function renderMorph(root: HTMLElement, pinP: number) {
  const t1 = seg(pinP, 0.16, 0.58);
  const t2 = seg(pinP, 0.58, 0.82);
  for (const name of Object.keys(LETTERS) as PartName[]) {
    const el = root.querySelector<SVGGraphicsElement>(`[data-part="${name}"]`);
    if (!el) continue;
    const state =
      t2 > 0
        ? lerpState(CIRCUIT[name], IRIS[name], t2)
        : lerpState(LETTERS[name], CIRCUIT[name], t1);
    el.style.transform = `translate(${state.x.toFixed(2)}px, ${state.y.toFixed(
      2,
    )}px) rotate(${state.r.toFixed(2)}deg) scale(${state.sx.toFixed(3)}, ${state.sy.toFixed(3)})`;
    el.style.opacity = state.o.toFixed(3);
    if (name === "arcG") {
      el.style.strokeDasharray = `${state.dash.toFixed(1)} ${(
        ARC_CIRCUMFERENCE + 84 - state.dash
      ).toFixed(1)}`;
    }
  }
}

function meterState(p: number) {
  if (p < 0.02) return "idle";
  if (p < 0.34) return "q1";
  if (p < 0.66) return "q2";
  if (p < 0.94) return "q3";
  return "full";
}

export function ScrollFxController() {
  useEffect(() => {
    const root = document.documentElement;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !document.querySelector("[data-fx]")
    ) {
      return;
    }

    root.classList.add("fx-enhanced");

    const byKey = new Map<Tracked["key"], HTMLElement>();
    for (const el of document.querySelectorAll<HTMLElement>("[data-fx]")) {
      const key = el.dataset.fx as Tracked["key"];
      if (
        [
          "hero",
          "track",
          "scenes",
          "meter",
          "finale",
          "contact",
          "work",
          "experience",
          "automation",
        ].includes(key)
      ) {
        byKey.set(key, el);
      }
    }

    const tracked: Tracked[] = [];
    const pinKeys = ["hero", "track", "scenes", "finale"] as const;
    for (const [key, el] of byKey) {
      tracked.push({
        key,
        el,
        kind: (pinKeys as readonly string[]).includes(key) ? "pin" : "enter",
        p: -1,
      });
    }

    const steps = byKey.has("scenes")
      ? Array.from(
          byKey.get("scenes")!.querySelectorAll<HTMLElement>(
            "[data-fx-steps] > li",
          ),
        )
      : [];
    const meterValueEl = byKey
      .get("meter")
      ?.querySelector<HTMLElement>("[data-fx-meter-value]");

    let lastY = window.scrollY;
    let vel = 0;
    let lastProgress = -1;
    let lastStep = -1;
    let lastMeterState = "";
    let lastMeterValue = -1;
    let raf = 0;

    const write = () => {
      /* ---- read phase ---- */
      const vh = window.innerHeight;
      const maxScroll = Math.max(1, root.scrollHeight - vh);
      const y = window.scrollY;
      const progress = clamp(y / maxScroll);
      const dy = y - lastY;
      lastY = y;
      vel += (dy - vel) * 0.14;

      const frames = tracked.map((t) => ({
        t,
        rect: t.el.getBoundingClientRect(),
      }));

      /* ---- write phase ---- */
      if (Math.abs(progress - lastProgress) > 0.0004) {
        lastProgress = progress;
        root.style.setProperty("--fx-progress", progress.toFixed(4));
      }
      root.style.setProperty("--fx-vel", clamp(vel / 46, -1, 1).toFixed(4));

      for (const { t, rect } of frames) {
        const p =
          t.kind === "pin"
            ? clamp(-rect.top / Math.max(1, rect.height - vh))
            : clamp((vh - rect.top) / (vh * 0.9 + rect.height));
        if (Math.abs(p - t.p) < 0.0006) continue;
        t.p = p;
        t.el.style.setProperty("--fx-p", p.toFixed(4));

        if (t.key === "track") {
          t.el.style.setProperty("--fx-veln", clamp(vel / 46, -1, 1).toFixed(4));
        }

        if (t.key === "scenes" && steps.length > 0) {
          const step = Math.min(
            steps.length,
            Math.max(1, Math.floor(p * steps.length) + 1),
          );
          if (step !== lastStep) {
            lastStep = step;
            t.el.setAttribute("data-fx-step", String(step));
            steps.forEach((li, index) =>
              li.toggleAttribute("data-active", index === step - 1),
            );
          }
        }

        if (t.key === "meter") {
          const fill = seg(p, 0.08, 0.62);
          t.el.style.setProperty("--fx-meter", fill.toFixed(4));
          const state = meterState(fill);
          if (state !== lastMeterState) {
            lastMeterState = state;
            t.el.setAttribute("data-fx-state", state);
          }
          const value = Math.round(fill * 100);
          if (value !== lastMeterValue && meterValueEl) {
            lastMeterValue = value;
            meterValueEl.textContent = String(value);
          }
        }

        if (t.key === "finale") {
          const set = (name: string, value: number) =>
            t.el.style.setProperty(name, value.toFixed(4));
          set("--fx-fa", seg(p, 0.02, 0.3));
          set("--fx-fe", seg(p, 0.38, 0.82));
          set("--fx-wa", seg(p, 0.12, 0.55));
          set("--fx-we", seg(p, 0.6, 0.88));
          set("--fx-mi", seg(p, 0.16, 0.5));
          set("--fx-mo", seg(p, 0.78, 0.98));
          set("--fx-flood", seg(p, 0.86, 1));
          if (rect.bottom > -vh && rect.top < vh * 2) renderMorph(t.el, p);
        }
      }

      raf = requestAnimationFrame(write);
    };

    raf = requestAnimationFrame(write);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("fx-enhanced");
      root.style.removeProperty("--fx-progress");
      root.style.removeProperty("--fx-vel");
    };
  }, []);

  return (
    <div className={styles.progressRail} aria-hidden="true">
      <span className={styles.progressFill} />
    </div>
  );
}
