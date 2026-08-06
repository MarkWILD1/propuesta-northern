"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { isExternalHref, resolveNavHref } from "@/lib/landing-sections";

export type SiteNavLink = {
  id: string;
  label: string;
  href: string;
  openInNewTab: boolean;
  highlight: boolean;
};

const COMPACT_QUERY = "(max-width: 820px)";

export function SiteNav({ links }: { links: SiteNavLink[] }) {
  const [open, setOpen] = useState(false);
  const navId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      const root = rootRef.current;
      if (!root || !(event.target instanceof Node)) return;
      if (!root.contains(event.target)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const compact = window.matchMedia(COMPACT_QUERY);
    if (!compact.matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="site-nav-root" ref={rootRef}>
      <button
        type="button"
        className="site-nav-toggle"
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? "Cerrar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="site-nav-toggle-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <nav
        id={navId}
        className={`site-nav${open ? " is-open" : ""}`}
        aria-label="Navegacion principal"
      >
        {links.map((link) => {
          const href = resolveNavHref(link.href);
          const external = isExternalHref(href);
          const className = link.highlight ? "button site-nav-cta" : undefined;
          const targetProps =
            external && link.openInNewTab
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};

          return external ? (
            <a
              key={link.id}
              className={className}
              href={href}
              onClick={() => setOpen(false)}
              {...targetProps}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.id}
              className={className}
              href={href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
