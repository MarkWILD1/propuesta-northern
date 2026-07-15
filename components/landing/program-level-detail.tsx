import Link from "next/link";

import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { WhatsAppFab } from "@/components/landing/whatsapp-fab";
import { getDriveImageDisplayUrl } from "@/lib/drive";
import type { PublishedProgramLevel } from "@/lib/content";

export function ProgramLevelDetail({ level }: { level: PublishedProgramLevel }) {
  const page = level.landingPage;

  return (
    <div id="top">
      <SiteHeader brand={page.title} eyebrow={page.eyebrow} />

      <main className="landing">
        <article className="level-detail page-shell">
          <nav className="level-detail-nav" aria-label="Navegacion">
            <Link className="text-link" href="/#niveles">
              Volver a propuesta educativa
            </Link>
          </nav>

          <p className="section-kicker">Propuesta educativa</p>
          <h1 className="display level-detail-title">{level.title}</h1>

          <div className="level-detail-media">
            {level.driveFileId ? (
              <img
                src={getDriveImageDisplayUrl(level.driveFileId)}
                alt={level.altText}
                loading="eager"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="level-media-placeholder" aria-hidden="true" />
            )}
          </div>

          <div className="level-detail-body">
            {level.detailBody
              .split("\n")
              .filter((paragraph) => paragraph.trim().length > 0)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          {level.ctaLabel && level.ctaHref ? (
            <a className="button" href={level.ctaHref}>
              {level.ctaLabel}
            </a>
          ) : null}
        </article>
      </main>

      <SiteFooter
        brand={page.title}
        contactTitle={page.contactTitle}
        contactBody={page.contactBody}
        contactEmail={page.contactEmail}
        contactPhone={page.contactPhone}
      />

      <WhatsAppFab phone={page.contactPhone} />
    </div>
  );
}
