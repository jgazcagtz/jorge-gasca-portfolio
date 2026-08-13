"use client";

import { useEffect, useId, useRef, useState } from "react";

type VideoWalkthroughProps = {
  sources: {
    webm: string;
    mp4: string;
  };
  poster: string;
  label: string;
  description: string;
  transcript: string;
  transcriptLabel: string;
  errorMessage: string;
  fallbackLabel: string;
};

export function VideoWalkthrough({
  sources,
  poster,
  label,
  description,
  transcript,
  transcriptLabel,
  errorMessage,
  fallbackLabel,
}: VideoWalkthroughProps) {
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const descriptionId = useId();

  useEffect(() => {
    if (!active) return;

    const frame = window.requestAnimationFrame(() => {
      if (failed) {
        fallbackRef.current?.focus();
        return;
      }
      videoRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [active, failed]);

  return (
    <div className="walkthroughShell">
      {failed ? (
        <div
          ref={fallbackRef}
          className="walkthroughFallback"
          role="status"
          tabIndex={-1}
          data-testid="walkthrough-fallback"
        >
          <p>{errorMessage}</p>
          <a href={sources.mp4} target="_blank" rel="noreferrer">
            {fallbackLabel}
          </a>
        </div>
      ) : active ? (
        <video
          ref={videoRef}
          className="walkthroughVideo"
          controls
          autoPlay
          muted
          playsInline
          preload="none"
          poster={poster}
          aria-label={label}
          aria-describedby={descriptionId}
          data-testid="walkthrough-video"
          onError={() => setFailed(true)}
        >
          <source src={sources.webm} type="video/webm" />
          <source src={sources.mp4} type="video/mp4" />
        </video>
      ) : (
        <button
          className="walkthroughPoster"
          type="button"
          onClick={() => setActive(true)}
          aria-label={label}
          aria-describedby={descriptionId}
          data-testid="walkthrough-play"
        >
          <span className="walkthroughPattern" aria-hidden="true" />
          <span className="walkthroughKicker" aria-hidden="true">Product proof / Case file</span>
          <span className="playControl" aria-hidden="true">
            <span>▶</span>
          </span>
          <span className="walkthroughLabel">{label}</span>
        </button>
      )}

      <div className="walkthroughNotes">
        <p id={descriptionId}>{description}</p>
        <details>
          <summary>{transcriptLabel}</summary>
          <p>{transcript}</p>
        </details>
      </div>
    </div>
  );
}
