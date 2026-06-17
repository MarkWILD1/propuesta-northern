type FeatureBlock = {
  id: string;
  title: string;
  body: string;
  ctaLabel: string | null;
  ctaHref: string | null;
};

export function FeaturedBlocks({
  title,
  pageTitle,
  blocks,
}: {
  title: string;
  pageTitle: string;
  blocks: FeatureBlock[];
}) {
  if (blocks.length === 0) {
    return null;
  }

  return (
    <section
      id="colegio"
      className="landing-section page-shell"
      aria-labelledby="featured-title"
    >
      <p className="section-kicker">{pageTitle}</p>
      <h2 id="featured-title" className="display">
        {title}
      </h2>
      <div className="section-grid">
        {blocks.map((block) => (
          <article key={block.id}>
            <span />
            <h3>{block.title}</h3>
            <p>{block.body}</p>
            {block.ctaLabel && block.ctaHref ? (
              <a className="text-link" href={block.ctaHref}>
                {block.ctaLabel}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
