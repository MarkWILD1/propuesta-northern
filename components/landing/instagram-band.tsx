import { getDriveImageDisplayUrl } from "@/lib/drive";

type InstagramPost = {
  id: string;
  caption: string | null;
  altText: string;
  driveFileId: string;
  href: string | null;
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
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="instagram-band page-shell" aria-labelledby="instagram-title">
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
      <div className="instagram-grid">
        {posts.map((post) => {
          const Wrapper = post.href ? "a" : "div";
          return (
            <Wrapper
              key={post.id}
              className="instagram-item"
              {...(post.href
                ? { href: post.href, target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <img
                src={getDriveImageDisplayUrl(post.driveFileId)}
                alt={post.altText}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {post.caption ? <span className="instagram-caption">{post.caption}</span> : null}
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
