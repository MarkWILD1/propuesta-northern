"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getDriveImageDisplayUrl } from "@/lib/drive";

type Slide = {
  id: string;
  title: string;
  altText: string;
  caption: string | null;
  driveFileId: string;
};

const AUTOPLAY_MS = 3000;

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) {
        return;
      }
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1 || paused || prefersReducedMotion()) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) {
      return;
    }
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartX.current = null;
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  if (count === 0) {
    return (
      <div className="hero-carousel hero-carousel--empty" aria-label="Carrusel del Colegio Northern">
        <div className="hc-placeholder">
          <span>Colegio Northern</span>
          <strong>Los slides del carrusel apareceran cuando el administrador los publique.</strong>
        </div>
      </div>
    );
  }

  return (
    <div
      className="hero-carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Galeria destacada del Colegio Northern"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hc-viewport">
        <ul className="hc-track" style={{ "--hc-index": index } as React.CSSProperties}>
          {slides.map((slide, slideIndex) => {
            const isActive = slideIndex === index;
            return (
              <li
                key={slide.id}
                className={`hc-slide${isActive ? " is-active" : ""}`}
                aria-roledescription="diapositiva"
                aria-label={`${slideIndex + 1} de ${count}`}
                aria-hidden={!isActive}
              >
                <img
                  src={getDriveImageDisplayUrl(slide.driveFileId)}
                  alt={slide.altText}
                  loading={slideIndex <= 1 ? "eager" : "lazy"}
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
                <div className="hc-overlay">
                  <strong>{slide.title}</strong>
                  {slide.caption ? <span>{slide.caption}</span> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            className="hc-arrow hc-arrow--prev"
            onClick={prev}
            aria-label="Anterior"
          >
            <span aria-hidden="true">&#8249;</span>
          </button>
          <button
            type="button"
            className="hc-arrow hc-arrow--next"
            onClick={next}
            aria-label="Siguiente"
          >
            <span aria-hidden="true">&#8250;</span>
          </button>

          <div className="hc-dots" role="tablist" aria-label="Seleccionar diapositiva">
            {slides.map((slide, dotIndex) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                className={`hc-dot${dotIndex === index ? " is-active" : ""}`}
                aria-selected={dotIndex === index}
                aria-label={`Ir a la diapositiva ${dotIndex + 1}`}
                onClick={() => goTo(dotIndex)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
