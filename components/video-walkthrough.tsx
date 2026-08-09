"use client";

import Image from "next/image";
import { useState } from "react";

export function VideoWalkthrough({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <video
        className="walkthroughVideo"
        controls
        autoPlay
        muted
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        data-testid="walkthrough-video"
      >
        <source src={src} type="video/webm" />
      </video>
    );
  }

  return (
    <button
      className="walkthroughPoster"
      type="button"
      onClick={() => setActive(true)}
      aria-label={label}
      data-testid="walkthrough-play"
    >
      <Image src={poster} alt="" fill sizes="(max-width: 800px) 100vw, 66vw" />
      <span className="playControl" aria-hidden="true">
        <span>▶</span>
      </span>
      <span className="walkthroughLabel">{label}</span>
    </button>
  );
}
