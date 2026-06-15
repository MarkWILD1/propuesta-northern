import { getDriveImageDisplayUrl } from "@/lib/drive";

type Photo = {
  id: string;
  title: string;
  altText: string;
  caption: string | null;
  driveFileId: string;
};

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) {
    return (
      <section className="landing-section gallery-empty" aria-labelledby="gallery-title">
        <p className="section-kicker">Galeria</p>
        <h2 id="gallery-title" className="display">
          Las fotos apareceran cuando el administrador las publique.
        </h2>
        <p className="muted">
          El panel acepta enlaces publicos de Google Drive para mantener la pagina
          actualizada sin subir archivos al servidor.
        </p>
      </section>
    );
  }

  return (
    <section className="landing-section" aria-labelledby="gallery-title">
      <p className="section-kicker">Galeria</p>
      <h2 id="gallery-title" className="display">
        Momentos de la comunidad Northern.
      </h2>
      <div className="photo-grid">
        {photos.map((photo) => (
          <figure key={photo.id} className="photo-card">
            <img
              src={getDriveImageDisplayUrl(photo.driveFileId)}
              alt={photo.altText}
              loading="lazy"
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
