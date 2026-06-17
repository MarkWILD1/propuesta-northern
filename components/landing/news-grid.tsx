import { getDriveImageDisplayUrl } from "@/lib/drive";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  dateLabel: string | null;
  altText: string | null;
  driveFileId: string | null;
  href: string | null;
};

export function NewsGrid({
  title,
  items,
}: {
  title: string;
  items: NewsItem[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="noticias"
      className="landing-section page-shell"
      aria-labelledby="news-title"
    >
      <p className="section-kicker">Novedades</p>
      <h2 id="news-title" className="display">
        {title}
      </h2>
      <div className="news-grid">
        {items.map((item) => {
          const Wrapper = item.href ? "a" : "article";
          return (
            <Wrapper
              key={item.id}
              className="news-card"
              {...(item.href ? { href: item.href } : {})}
            >
              <div className="news-media">
                {item.driveFileId ? (
                  <img
                    src={getDriveImageDisplayUrl(item.driveFileId)}
                    alt={item.altText ?? item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="news-media-placeholder" aria-hidden="true" />
                )}
              </div>
              <div className="news-body">
                {item.dateLabel ? <span className="news-date">{item.dateLabel}</span> : null}
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
