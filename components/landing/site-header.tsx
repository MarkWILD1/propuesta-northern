import Link from "next/link";

import {
  AnnouncementBar,
  type AnnouncementBarContent,
} from "@/components/landing/announcement-bar";
import { SiteNav, type SiteNavLink } from "@/components/landing/site-nav";

export function SiteHeader({
  brand,
  eyebrow,
  navLinks = [],
  announcement = null,
}: {
  brand: string;
  eyebrow: string;
  navLinks?: SiteNavLink[];
  announcement?: AnnouncementBarContent | null;
}) {
  return (
    <>
      <AnnouncementBar announcement={announcement} />
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
          <SiteNav links={navLinks} />
        </div>
      </header>
    </>
  );
}
