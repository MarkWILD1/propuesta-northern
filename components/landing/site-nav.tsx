"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { isExternalHref, resolveNavHref } from "@/lib/landing-sections";

export type SiteNavLink = {
  id: string;
  label: string;
  href: string;
  openInNewTab: boolean;
  highlight: boolean;
};

// Mirrors the breakpoint where globals.css swaps the nav for the toggle.
const DESKTOP_QUERY = "(min-width: 821px)";

export function SiteNav({ links }: { links: SiteNavLink[] }) {
  const [open, setOpen] = useState(false);
  const navId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onDesktopChange = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktopChange);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktopChange);
    };
  }, [open]);

  if (links.length === 0) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="site-nav-toggle"
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? "Cerrar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{open ? "\u2715" : "\u2630"}</span>
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
    </>
  );
}
