import Link from "next/link";

import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { WhatsAppFab } from "@/components/landing/whatsapp-fab";
import { getDriveImageDisplayUrl } from "@/lib/drive";
import type { PublishedContentPage } from "@/lib/content";

export function ContentPageDetail({ page }: { page: PublishedContentPage }) {
  const landing = page.landingPage;

  return (
    <div id="top">
      <SiteHeader
        brand={landing.title}
        eyebrow={landing.eyebrow}
        navLinks={landing.navLinks}
        announcement={landing.announcementBar}
      />

      <main className="landing">
        <article className="level-detail page-shell">
          <nav className="level-detail-nav" aria-label="Navegacion">
            <Link className="text-link" href="/">
              Volver al inicio
            </Link>
          </nav>

          <p className="section-kicker">Pagina</p>
          <h1 className="display level-detail-title">{page.title}</h1>

          {page.driveFileId ? (
            <div className="level-detail-media">
              <img
                src={getDriveImageDisplayUrl(page.driveFileId)}
                alt={page.altText || page.title}
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}

          <div className="level-detail-body">
            {page.body
              .split("\n")
              .filter((paragraph) => paragraph.trim().length > 0)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </article>
      </main>

      <SiteFooter
        brand={landing.title}
        contactTitle={landing.contactTitle}
        contactBody={landing.contactBody}
        contactEmail={landing.contactEmail}
        contactPhone={landing.contactPhone}
      />

      <WhatsAppFab phone={landing.contactPhone} />
    </div>
  );
}
