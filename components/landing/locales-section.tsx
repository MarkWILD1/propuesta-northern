import { getDriveImageDisplayUrl } from "@/lib/drive";

type Locale = {
  id: string;
  name: string;
  addressLines: string;
  phone: string | null;
  body: string;
  altText: string;
  driveFileId: string | null;
  href: string | null;
};

export function LocalesSection({
  title,
  locales,
}: {
  title: string;
  locales: Locale[];
}) {
  if (locales.length === 0) {
    return null;
  }

  return (
    <section id="locales" className="locales-section" aria-labelledby="locales-title">
      <div className="page-shell">
        <p className="section-kicker">Locales y espacios</p>
        <h2 id="locales-title" className="display">
          {title}
        </h2>
      </div>
      <div className="locales-list">
        {locales.map((locale, index) => {
          const addressLines = locale.addressLines
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
          const paragraphs = locale.body
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

          return (
            <article
              key={locale.id}
              className={`locale-row page-shell${index % 2 === 1 ? " is-reversed" : ""}`}
            >
              {locale.driveFileId ? (
                <div className="locale-media">
                  <img
                    src={getDriveImageDisplayUrl(locale.driveFileId)}
                    alt={locale.altText || locale.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : null}
              <div className="locale-text">
                <h3>{locale.name}</h3>
                {paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
                {addressLines.length > 0 ? (
                  <address className="locale-address">
                    {addressLines.map((line, lineIndex) => (
                      <span key={lineIndex}>{line}</span>
                    ))}
                  </address>
                ) : null}
                {locale.phone ? (
                  <a className="text-link" href={`tel:${locale.phone}`}>
                    {locale.phone}
                  </a>
                ) : null}
                {locale.href ? (
                  <a
                    className="button secondary"
                    href={locale.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver más
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
