"use client";

import { useLayoutEffect, useState } from "react";

const SESSION_KEY = "northern-splash-seen";

const PHASE_MS = {
  enter: 1200,
  hold: 1000,
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
    return false;
  }
  if (prefersReducedMotion()) {
    return true;
  }
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function LandingSplash({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useLayoutEffect(() => {
    if (shouldSkipSplash()) {
      setVisible(false);
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const timers = [
      window.setTimeout(() => setPhase("hold"), PHASE_MS.enter),
      window.setTimeout(() => setPhase("exit"), PHASE_MS.enter + PHASE_MS.hold),
      window.setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
        setVisible(false);
        onComplete();
      }, PHASE_MS.enter + PHASE_MS.hold + PHASE_MS.exit),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`landing-splash${phase === "exit" ? " is-exiting" : ""}`}
      role="presentation"
      aria-hidden="true"
    >
      <img
        className="landing-splash__logo"
        src="/logo-northern.png"
        alt=""
        width={1024}
        height={705}
        draggable={false}
      />
    </div>
  );
}
