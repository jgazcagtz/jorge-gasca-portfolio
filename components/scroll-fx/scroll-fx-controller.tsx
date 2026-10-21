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
 *
 * The loop parks itself once scrolling stops and the velocity skew has
 * settled; scroll/resize/layout-size listeners wake it again, so an idle tab
 * runs zero rAF work.
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
  /**
   * pin = progress across a tall sticky stage (its height minus the viewport);
   * exit = progress while the element itself scrolls out of the viewport —
   *   used for the hero, whose height tracks the viewport (its `height - vh`
   *   pin range would collapse to zero), so its real range is its own height;
   * enter = progress from entering the bottom of the viewport.
   */
  kind: "pin" | "exit" | "enter";
  p: number;
  /** Elements whose compositor layers are held only while 0 < p < 1. */
  live: boolean;
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

const PART_NAMES: PartName[] = ["barJ", "footJ", "arcG", "barG"];

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

/** Monogram parts resolved once; per-frame morphing writes styles directly. */
type MorphParts = Array<{ name: PartName; el: SVGGraphicsElement }>;

function collectMorphParts(root: HTMLElement): MorphParts {
  return PART_NAMES.flatMap((name) => {
    const el = root.querySelector<SVGGraphicsElement>(`[data-part="${name}"]`);
    return el ? [{ name, el }] : [];
  });
}

function renderMorph(parts: MorphParts, pinP: number) {
  const t1 = seg(pinP, 0.16, 0.58);
  const t2 = seg(pinP, 0.58, 0.82);
  for (const { name, el } of parts) {
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

const FINALE_VARS = [
  "--fx-fa",
  "--fx-fe",
  "--fx-wa",
  "--fx-we",
  "--fx-mi",
  "--fx-mo",
  "--fx-flood",
] as const;

export function ScrollFxController() {
  useEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    /** Enables the enhanced layer; returns its full teardown. */
    const startFx = () => {
        if (
          motionQuery.matches ||
          !document.querySelector("[data-fx]")
        ) {
          return () => {};
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
      const pinKeys = ["track", "scenes", "finale"] as const;
      const exitKeys = ["hero"] as const;
      const liveKeys = ["hero", "track", "finale"] as const;
      for (const [key, el] of byKey) {
        tracked.push({
          key,
          el,
          kind: (pinKeys as readonly string[]).includes(key)
            ? "pin"
            : (exitKeys as readonly string[]).includes(key)
              ? "exit"
              : "enter",
          p: -1,
          live: false,
        });
      }

      const scenesEl = byKey.get("scenes");
      const steps = scenesEl
        ? Array.from(
            scenesEl.querySelectorAll<HTMLElement>("[data-fx-steps] > li"),
          )
        : [];
      const sceneFrames = scenesEl
        ? Array.from(
            scenesEl.querySelectorAll<HTMLElement>(
              "[data-fx-scene-stage] [data-scene]",
            ),
          )
        : [];
      const meterValueEl = byKey
        .get("meter")
        ?.querySelector<HTMLElement>("[data-fx-meter-value]");
      const trackEl = byKey.get("track");
      const morphParts = byKey.has("finale")
        ? collectMorphParts(byKey.get("finale")!)
        : [];

      let lastY = window.scrollY;
      let vel = 0;
      let lastProgress = -1;
      let lastVeln = 0;
      let lastStep = -1;
      let lastMeterState = "";
      let lastMeterValue = -1;
      let raf = 0;
      let running = false;

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
        let dirty = dy !== 0;

        if (Math.abs(progress - lastProgress) > 0.0004) {
          lastProgress = progress;
          dirty = true;
          root.style.setProperty("--fx-progress", progress.toFixed(4));
        }

        // Velocity skew decays on its own cadence, independent of whether the
        // track's progress is still moving (a clamped pin must not freeze skew).
        // Below ~0.2% the skew is imperceptible — snap to zero so it fully settles.
        const veln = Math.abs(vel / 46) < 0.002 ? 0 : clamp(vel / 46, -1, 1);
        if (trackEl && Math.abs(veln - lastVeln) > 0.0004) {
          lastVeln = veln;
          dirty = true;
          trackEl.style.setProperty("--fx-veln", veln.toFixed(4));
        }

        for (const { t, rect } of frames) {
          const range =
            t.kind === "pin"
              ? Math.max(1, rect.height - vh)
              : t.kind === "exit"
                ? Math.max(1, rect.height)
                : Math.max(1, vh * 0.9 + rect.height);
          const p =
            t.kind === "enter"
              ? clamp((vh - rect.top) / range)
              : clamp(-rect.top / range);
          if (Math.abs(p - t.p) < 0.0006) continue;
          t.p = p;
          dirty = true;
          t.el.style.setProperty("--fx-p", p.toFixed(4));

          // Hold compositor layers only while the choreography is mid-flight;
          // past either end the element releases them (data-fx-live in CSS).
          if ((liveKeys as readonly string[]).includes(t.key)) {
            const live = p > 0 && p < 1;
            if (live !== t.live) {
              t.live = live;
              t.el.toggleAttribute("data-fx-live", live);
            }
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
              sceneFrames.forEach((scene) =>
                scene.toggleAttribute(
                  "data-active",
                  Number(scene.dataset.scene) === step,
                ),
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
            if (morphParts.length > 0 && rect.bottom > -vh && rect.top < vh * 2) {
              renderMorph(morphParts, p);
            }
          }
        }

        // Park the loop once every input has settled; listeners wake it.
        if (dirty || Math.abs(vel) >= 0.092) {
          raf = requestAnimationFrame(write);
        } else {
          running = false;
        }
      };

      const wake = () => {
        if (running) return;
        running = true;
        raf = requestAnimationFrame(write);
      };

      wake();

      // Body-height changes (images, accordions, deferred sections) can move
      // tracked elements without a scroll event — watch the layout too.
      const layoutObserver = new ResizeObserver(wake);
      layoutObserver.observe(document.body);

      window.addEventListener("scroll", wake, { passive: true });
      window.addEventListener("resize", wake);
      window.addEventListener("pageshow", wake);

      return () => {
        cancelAnimationFrame(raf);
        layoutObserver.disconnect();
        window.removeEventListener("scroll", wake);
        window.removeEventListener("resize", wake);
        window.removeEventListener("pageshow", wake);
        root.classList.remove("fx-enhanced");
        root.style.removeProperty("--fx-progress");
        // Drop every trace of the enhanced layer so toggling reduced motion
        // never leaves half-driven vars or attributes behind.
        for (const t of tracked) {
          t.el.style.removeProperty("--fx-p");
          t.el.removeAttribute("data-fx-live");
          t.el.removeAttribute("data-fx-step");
          t.el.removeAttribute("data-fx-state");
          t.el.style.removeProperty("--fx-meter");
          if (t.key === "track") t.el.style.removeProperty("--fx-veln");
          if (t.key === "finale") {
            for (const name of FINALE_VARS) t.el.style.removeProperty(name);
          }
        }
        steps.forEach((li) => li.removeAttribute("data-active"));
        sceneFrames.forEach((scene) => scene.removeAttribute("data-active"));
      };
    };

    // Reduced-motion can change mid-session: stop (and fully reset) or
    // restart the enhanced layer to match. Cleanups are idempotent.
    let stopFx = startFx();
    const onMotionChange = (event: MediaQueryListEvent) => {
      stopFx();
      stopFx = event.matches ? () => {} : startFx();
    };
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      stopFx();
    };
  }, []);

  return (
    <div className={styles.progressRail} aria-hidden="true">
      <span className={styles.progressFill} />
    </div>
  );
}
