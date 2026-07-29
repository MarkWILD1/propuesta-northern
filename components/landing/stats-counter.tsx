"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = {
  id: string;
  label: string;
  value: string;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d[\d.,]*)(\D*)$/);
  const target = match ? Number(match[2].replace(/[.,]/g, "")) : null;
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";

  const [display, setDisplay] = useState(target === null ? value : prefix + "0" + suffix);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (target === null) {
      setDisplay(value);
      return;
    }
    if (prefersReducedMotion()) {
      setDisplay(prefix + target.toLocaleString("es") + suffix);
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasRun.current) {
          return;
        }
        hasRun.current = true;

        const duration = 1400;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          setDisplay(prefix + current.toLocaleString("es") + suffix);
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefix, suffix, target, value]);

  return <span ref={ref}>{display}</span>;
}

export function StatsCounter({
  title,
  stats,
}: {
  title: string;
  stats: StatItem[];
}) {
  if (stats.length === 0) {
    return null;
  }

  return (
    <section id="estadisticas" className="stats-band" aria-labelledby="stats-title">
      <div className="page-shell">
        <p className="section-kicker stats-kicker">{title}</p>
        <dl id="stats-title" className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-item">
              <dt>
                <StatValue value={stat.value} />
              </dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
