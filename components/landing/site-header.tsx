"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = {
  id: string;
  label: string;
  href: string;
};

export function SiteHeader({
  brand,
  eyebrow,
  links,
  ctaLabel,
  ctaHref,
}: {
  brand: string;
  eyebrow: string;
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner page-shell">
        <Link className="site-brand" href="/" aria-label={brand}>
          <img
            className="site-brand-logo"
            src="/logo-northern.png"
            alt={brand}
            width={1024}
            height={705}
          />
          <span className="sr-only">{eyebrow}</span>
        </Link>

        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? "\u2715" : "\u2630"}</span>
          <span className="sr-only">Menu</span>
        </button>

        <nav
          id="site-nav"
          className={`site-nav${open ? " is-open" : ""}`}
          aria-label="Navegacion principal"
        >
          {links.map((link) => (
            <a key={link.id} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          {ctaLabel ? (
            <a className="button site-nav-cta" href={ctaHref} onClick={() => setOpen(false)}>
              {ctaLabel}
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
