import styles from "./scroll-fx.module.css";

/**
 * Approach "scene switcher" visuals — four tiny CSS/SVG dioramas, one per
 * method step (Discover / Design / Automate / Verify). Fully decorative
 * (aria-hidden); the real copy lives in the approach trace list.
 */

export function ApproachScenes() {
  return (
    <div className={styles.sceneStage} aria-hidden="true" data-fx-scene-stage>
      <div className={styles.sceneFrame}>
        <span className={styles.sceneFrameTick} data-tick="tl" />
        <span className={styles.sceneFrameTick} data-tick="tr" />
        <span className={styles.sceneFrameTick} data-tick="bl" />
        <span className={styles.sceneFrameTick} data-tick="br" />

        {/* 01 — DISCOVER: a small storefront, a visitor's dotted path, a signal
            ring where momentum stops. */}
        <div className={styles.scene} data-scene="1">
          <svg viewBox="0 0 360 260" className={styles.sceneSvg}>
            <g className={styles.sketchStroke}>
              <rect x="70" y="96" width="220" height="112" />
              <path d="M58 96 L82 56 H278 L302 96 Z" />
              <path d="M82 56 L70 96 M142 56 L134 96 M202 56 L198 96 M262 56 L274 96" />
              <rect x="96" y="132" width="64" height="76" />
              <circle cx="128" cy="172" r="6" />
              <rect x="188" y="132" width="74" height="44" />
              <path d="M188 152 h74 M225 132 v44" />
            </g>
            <path
              className={styles.visitorPath}
              d="M40 236 C 90 210, 96 176, 150 190 S 236 226, 262 196"
            />
            <circle className={styles.visitorDot} r="5" />
            <circle className={styles.signalRing} cx="150" cy="190" r="16" />
            <circle className={styles.signalRing} cx="150" cy="190" r="16" />
            <g className={styles.sketchAccent}>
              <circle cx="298" cy="152" r="4" />
            </g>
            <text className={styles.sceneTag} x="70" y="46">
              STOREFRONT / MOMENT OF DOUBT
            </text>
          </svg>
        </div>

        {/* 02 — DESIGN: a wireframe kanban, cards gliding from backlog to done. */}
        <div className={styles.scene} data-scene="2">
          <svg viewBox="0 0 360 260" className={styles.sceneSvg}>
            <g className={styles.sketchStroke}>
              <rect x="52" y="60" width="256" height="152" />
              <path d="M138 60 V212 M224 60 V212" />
              <path d="M52 88 H308" />
            </g>
            <g className={styles.kanbanCard} style={{ animationDelay: "0s" }}>
              <rect x="66" y="104" width="58" height="30" rx="2" />
            </g>
            <g className={styles.kanbanCard} style={{ animationDelay: "1.4s" }}>
              <rect x="66" y="144" width="58" height="30" rx="2" />
            </g>
            <g className={styles.kanbanCard} style={{ animationDelay: "2.6s" }}>
              <rect x="152" y="104" width="58" height="30" rx="2" />
            </g>
            <g className={`${styles.kanbanCard} ${styles.kanbanDone}`}>
              <rect x="238" y="104" width="58" height="30" rx="2" />
              <path className={styles.kanbanCheck} d="M252 119 l8 8 14 -16" />
            </g>
            <g className={styles.wireGlow}>
              <rect x="152" y="150" width="58" height="44" rx="2" strokeDasharray="5 5" />
            </g>
            <g className={styles.sceneCursor}>
              <path d="M0 0 L0 16 L5 12 L9 20 L13 18 L9 10 L15 9 Z" />
            </g>
            <text className={styles.sceneTag} x="52" y="46">
              WIREFRAME / SEQUENCE
            </text>
          </svg>
        </div>

        {/* 03 — AUTOMATE: a node pipeline, packets flowing along the wires. */}
        <div className={styles.scene} data-scene="3">
          <svg viewBox="0 0 360 260" className={styles.sceneSvg}>
            <g className={styles.wire}>
              <path d="M74 130 H128" />
              <path d="M170 130 H206" />
              <path d="M248 130 C 268 130, 268 84, 292 84" />
              <path d="M248 130 C 268 130, 268 176, 292 176" />
            </g>
            <g className={styles.node}>
              <rect x="32" y="108" width="42" height="44" rx="3" />
              <path d="M40 130 h26 M40 120 h18 M40 140 h18" />
            </g>
            <g className={styles.node} data-node="logic">
              <rect x="128" y="104" width="42" height="52" rx="3" />
              <path d="M138 122 l10 -8 10 8 M138 138 h20" />
              <circle className={styles.nodeSpin} cx="149" cy="130" r="13" strokeDasharray="58 24" />
            </g>
            <g className={styles.node}>
              <rect x="206" y="108" width="42" height="44" rx="3" />
              <path d="M214 122 h26 M214 132 h26 M214 142 h14" />
            </g>
            <g className={styles.node} data-node="ai">
              <rect x="292" y="62" width="38" height="42" rx="3" />
              <circle cx="311" cy="83" r="9" />
              <path d="M311 70 v-6 M311 102 v-6 M298 83 h-4 M328 83 h-4" />
            </g>
            <g className={styles.node}>
              <rect x="292" y="154" width="38" height="42" rx="3" />
              <path d="M300 188 l8 -10 6 6 10 -14" />
            </g>
            <circle className={styles.packet} r="4" />
            <circle className={styles.packet} r="4" style={{ animationDelay: "1.5s" }} />
            <text className={styles.sceneTag} x="32" y="46">
              PIPELINE / GUARDRAILS
            </text>
          </svg>
        </div>

        {/* 04 — VERIFY: a device with a checklist and a filling result meter. */}
        <div className={styles.scene} data-scene="4">
          <svg viewBox="0 0 360 260" className={styles.sceneSvg}>
            <g className={styles.sketchStroke}>
              <rect x="96" y="48" width="168" height="164" rx="10" />
              <path d="M152 58 h56" />
              <circle cx="180" cy="200" r="4" />
              <path d="M84 80 l-20 0 M84 130 l-20 0 M84 180 l-20 0" />
            </g>
            <g className={styles.checkRow} style={{ animationDelay: "0.2s" }}>
              <path className={styles.checkMark} d="M114 84 l7 7 12 -14" />
              <path className={styles.checkLine} d="M144 84 h92" />
            </g>
            <g className={styles.checkRow} style={{ animationDelay: "0.9s" }}>
              <path className={styles.checkMark} d="M114 118 l7 7 12 -14" />
              <path className={styles.checkLine} d="M144 118 h74" />
            </g>
            <g className={styles.checkRow} style={{ animationDelay: "1.6s" }}>
              <path className={styles.checkMark} d="M114 152 l7 7 12 -14" />
              <path className={styles.checkLine} d="M144 152 h84" />
            </g>
            <g className={styles.verifyMeter}>
              <rect x="114" y="176" width="132" height="12" rx="6" />
              <rect className={styles.verifyMeterFill} x="114" y="176" width="132" height="12" rx="6" />
            </g>
            <g className={styles.magnifier}>
              <circle cx="236" cy="112" r="22" />
              <path d="M252 128 L272 148" />
            </g>
            <text className={styles.sceneTag} x="96" y="40">
              VERIFY / RELEASE
            </text>
          </svg>
        </div>
      </div>

      <div className={styles.sceneLedger}>
        <span data-ledger="1">01</span>
        <span data-ledger="2">02</span>
        <span data-ledger="3">03</span>
        <span data-ledger="4">04</span>
      </div>
    </div>
  );
}
