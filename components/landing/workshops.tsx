import { getDriveImageDisplayUrl } from "@/lib/drive";

type Workshop = {
  id: string;
  title: string;
  body: string;
  altText: string;
  driveFileId: string;
  href: string | null;
};

export function Workshops({
  title,
  workshops,
}: {
  title: string;
  workshops: Workshop[];
}) {
  if (workshops.length === 0) {
    return null;
  }

  return (
    <section id="talleres" className="landing-section page-shell" aria-labelledby="workshops-title">
      <p className="section-kicker">Talleres</p>
      <h2 id="workshops-title" className="display">
        {title}
      </h2>
      <div className="workshops-grid">
        {workshops.map((workshop) => {
          const Wrapper = workshop.href ? "a" : "article";
          return (
            <Wrapper
              key={workshop.id}
              className="workshop-card"
              {...(workshop.href
                ? { href: workshop.href, target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <div className="workshop-media">
                <img
                  src={getDriveImageDisplayUrl(workshop.driveFileId)}
                  alt={workshop.altText}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="workshop-body">
                <h3>{workshop.title}</h3>
                {workshop.body ? <p>{workshop.body}</p> : null}
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
