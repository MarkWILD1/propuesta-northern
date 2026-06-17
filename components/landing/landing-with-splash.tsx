"use client";

import { useCallback, useState } from "react";

import { LandingSplash } from "@/components/landing/landing-splash";

export function LandingWithSplash({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  const handleComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash ? <LandingSplash onComplete={handleComplete} /> : null}
      {children}
    </>
  );
}
