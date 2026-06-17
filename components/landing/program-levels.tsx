import { getDriveImageDisplayUrl } from "@/lib/drive";

type ProgramLevel = {
  id: string;
  title: string;
  body: string;
  altText: string;
  driveFileId: string;
  ctaLabel: string | null;
  ctaHref: string | null;
};

export function ProgramLevels({
  title,
  levels,
}: {
  title: string;
  levels: ProgramLevel[];
}) {
  if (levels.length === 0) {
    return null;
  }

  return (
    <section
      id="niveles"
      className="landing-section page-shell"
      aria-labelledby="levels-title"
    >
      <p className="section-kicker">Propuesta educativa</p>
      <h2 id="levels-title" className="display">
        {title}
      </h2>
      <div className="levels-grid">
        {levels.map((level) => (
          <article key={level.id} className="level-card">
            <div className="level-card-media">
              {level.driveFileId ? (
                <img
                  src={getDriveImageDisplayUrl(level.driveFileId)}
                  alt={level.altText}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="level-media-placeholder" aria-hidden="true" />
              )}
            </div>
            <div className="level-card-body">
              <h3>{level.title}</h3>
              <p>{level.body}</p>
              {level.ctaLabel && level.ctaHref ? (
                <a className="text-link" href={level.ctaHref}>
                  {level.ctaLabel}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
