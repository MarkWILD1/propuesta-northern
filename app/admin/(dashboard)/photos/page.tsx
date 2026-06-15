import {
  DeletePhotoForm,
  PhotoForm,
  PhotoPreview,
} from "@/components/admin/photo-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminPhotosPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.photos.length > 0 ? Math.max(...page.photos.map((photo) => photo.sortOrder)) + 1 : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Fotos Drive</p>
        <h1 className="display">Publica imagenes desde enlaces.</h1>
        <p className="muted">
          Pega links publicos de Google Drive. El sistema guarda el enlace,
          extrae el ID del archivo y lo muestra en la landing.
        </p>
      </header>

      <PhotoForm nextSortOrder={nextSortOrder} />

      <section className="admin-grid" aria-label="Fotos guardadas">
        {page.photos.map((photo) => (
          <article key={photo.id} className="admin-card stack">
            <PhotoPreview photo={photo} />
            <PhotoForm photo={photo} />
            <DeletePhotoForm id={photo.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
