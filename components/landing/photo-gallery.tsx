import { getDriveImageDisplayUrl } from "@/lib/drive";

type Photo = {
  id: string;
  title: string;
  altText: string;
  caption: string | null;
  driveFileId: string;
};

export function PhotoGallery({
  photos,
  title = "Momentos de la comunidad Northern",
}: {
  photos: Photo[];
  title?: string;
}) {
  if (photos.length === 0) {
    return null;
  }

  return (
    <section id="galeria" className="landing-section" aria-labelledby="gallery-title">
      <p className="section-kicker">Galeria</p>
      <h2 id="gallery-title" className="display">
        {title}
      </h2>
      <div className="photo-grid">
        {photos.map((photo) => (
          <figure key={photo.id} className="photo-card">
            <img
              src={getDriveImageDisplayUrl(photo.driveFileId)}
              alt={photo.altText}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <figcaption>
              <strong>{photo.title}</strong>
              {photo.caption ? <span>{photo.caption}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
