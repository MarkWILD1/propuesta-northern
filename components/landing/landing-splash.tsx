"use client";

import { useCallback, useLayoutEffect, useState } from "react";

const SESSION_KEY = "northern-splash-seen";

const PHASE_MS = {
  compass: 1200,
  reveal: 600,
  hold: 500,
  exit: 500,
} as const;

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function shouldSkipSplash() {
  if (typeof window === "undefined") {
    return true;
  }
  if (prefersReducedMotion()) {
    return true;
  }
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function LandingSplash({ onComplete }: { onComplete: () => void }) {
  const [skip, setSkip] = useState(true);
  const [phase, setPhase] = useState<"compass" | "reveal" | "hold" | "exit">("compass");

  useLayoutEffect(() => {
    if (shouldSkipSplash()) {
      onComplete();
      return;
    }

    setSkip(false);
    document.body.style.overflow = "hidden";

    const timers = [
      window.setTimeout(() => setPhase("reveal"), PHASE_MS.compass),
      window.setTimeout(() => setPhase("hold"), PHASE_MS.compass + PHASE_MS.reveal),
      window.setTimeout(() => setPhase("exit"), PHASE_MS.compass + PHASE_MS.reveal + PHASE_MS.hold),
      window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
        onComplete();
      }, PHASE_MS.compass + PHASE_MS.reveal + PHASE_MS.hold + PHASE_MS.exit),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (skip) {
    return null;
  }

  return (
    <div
      className={`landing-splash${phase === "exit" ? " is-exiting" : ""}${phase === "hold" || phase === "exit" ? " is-light" : ""}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="landing-splash__glow" aria-hidden="true" />
      <div className="landing-splash__brand">
        <img
          className="landing-splash__compass"
          src="/logo-northern.png"
          alt=""
          width={1024}
          height={705}
          draggable={false}
        />
        <div className={`landing-splash__text${phase !== "compass" ? " is-visible" : ""}`}>
          <span className="landing-splash__northern">Northern</span>
          <span className="landing-splash__school">School</span>
        </div>
      </div>
    </div>
  );
}
