import { PhotoGallery } from "@/components/landing/photo-gallery";

type Section = {
  id: string;
  title: string;
  body: string;
};

type Photo = {
  id: string;
  title: string;
  altText: string;
  caption: string | null;
  driveFileId: string;
};

type LandingPageContent = {
  title: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaLabel: string;
  ctaHref: string;
  contactTitle: string;
  contactBody: string;
  contactEmail: string;
  contactPhone: string | null;
  sections: Section[];
  photos: Photo[];
};

export function LandingPage({ page }: { page: LandingPageContent }) {
  return (
    <main className="landing">
      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="display">{page.heroTitle}</h1>
          <p>{page.heroSubtitle}</p>
          <a className="button" href={page.ctaHref}>
            {page.ctaLabel}
          </a>
        </div>
        <div className="hero-panel" aria-label="Resumen del Colegio Northern">
          <span>Colegio Northern</span>
          <strong>Landing administrable</strong>
          <p>
            Textos, secciones y fotos desde Drive se actualizan desde un panel
            privado.
          </p>
        </div>
      </section>

      <section className="landing-section page-shell" aria-labelledby="sections-title">
        <p className="section-kicker">{page.title}</p>
        <h2 id="sections-title" className="display">
          Informacion clara para familias y comunidad.
        </h2>
        <div className="section-grid">
          {page.sections.map((section) => (
            <article key={section.id}>
              <span />
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="page-shell">
        <PhotoGallery photos={page.photos} />
      </div>

      <section className="contact-band page-shell" aria-labelledby="contact-title">
        <div>
          <p className="section-kicker">Contacto</p>
          <h2 id="contact-title" className="display">
            {page.contactTitle}
          </h2>
          <p>{page.contactBody}</p>
        </div>
        <div className="contact-actions">
          <a className="button" href={`mailto:${page.contactEmail}`}>
            {page.contactEmail}
          </a>
          {page.contactPhone ? (
            <a className="button secondary" href={`tel:${page.contactPhone}`}>
              {page.contactPhone}
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}
