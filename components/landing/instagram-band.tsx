import { parseInstagramUrl } from "@/lib/embeds";

type InstagramPost = {
  id: string;
  caption: string | null;
  href: string;
};

export function InstagramBand({
  title,
  profileUrl,
  posts,
}: {
  title: string;
  profileUrl: string;
  posts: InstagramPost[];
}) {
  const embeds = posts
    .map((post) => ({ post, embed: parseInstagramUrl(post.href) }))
    .filter((item): item is { post: InstagramPost; embed: NonNullable<ReturnType<typeof parseInstagramUrl>> } =>
      Boolean(item.embed),
    );

  if (embeds.length === 0) {
    return null;
  }

  return (
    <section id="mas-alla-del-aula" className="instagram-band page-shell" aria-labelledby="instagram-title">
      <div className="instagram-head">
        <p className="section-kicker">Comunidad</p>
        <h2 id="instagram-title" className="display">
          {title}
        </h2>
        {profileUrl ? (
          <a className="button secondary" href={profileUrl} target="_blank" rel="noreferrer">
            Ver perfil
          </a>
        ) : null}
      </div>
      <div className="instagram-embeds">
        {embeds.map(({ post, embed }) => (
          <figure key={post.id} className="instagram-embed">
            <iframe
              src={embed.embedUrl}
              title={post.caption ?? "Publicación de Instagram"}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer"
              scrolling="no"
            />
            {post.caption ? <figcaption>{post.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
