"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const blocks = gsap.utils.toArray<HTMLElement>(
          ":scope > *",
          containerRef.current
        );

        blocks.forEach((block, index) => {
          gsap.from(block, {
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top center",
              toggleActions: "play none none none",
            },
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <main className="landing" ref={containerRef}>
      {children}
    </main>
  );
}
