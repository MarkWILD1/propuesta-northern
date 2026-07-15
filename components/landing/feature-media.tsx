import { getDriveImageDisplayUrl } from "@/lib/drive";

type FeatureMediaContent = {
  title: string;
  body: string;
  altText: string;
  driveFileId: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

export function FeatureMedia({
  content,
  sectionId,
  kicker,
  reversed = false,
}: {
  content: FeatureMediaContent | null;
  sectionId: string;
  kicker: string;
  reversed?: boolean;
}) {
  if (!content) {
    return null;
  }

  const titleId = `${sectionId}-title`;
  const paragraphs = content.body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section
      id={sectionId}
      className={`feature-media page-shell${reversed ? " is-reversed" : ""}`}
      aria-labelledby={titleId}
    >
      <div className="feature-media-text">
        <p className="section-kicker">{kicker}</p>
        <h2 id={titleId} className="display">
          {content.title}
        </h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {content.ctaLabel && content.ctaHref ? (
          <a
            className="button"
            href={content.ctaHref}
            target="_blank"
            rel="noreferrer"
          >
            {content.ctaLabel}
          </a>
        ) : null}
      </div>
      {content.driveFileId ? (
        <div className="feature-media-image">
          <img
            src={getDriveImageDisplayUrl(content.driveFileId)}
            alt={content.altText || content.title}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : null}
    </section>
  );
}
