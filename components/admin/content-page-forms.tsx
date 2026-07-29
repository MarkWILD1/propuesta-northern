import { removeContentPage, saveContentPage } from "@/app/admin/actions";
import { getDriveImageDisplayUrl } from "@/lib/drive";
import { contentPageHref } from "@/lib/landing-sections";
import { slugify } from "@/lib/slugify";

type ContentPageItem = {
  id: string;
  title: string;
  slug: string;
  body: string;
  altText: string;
  driveUrl: string | null;
  driveFileId: string | null;
  sortOrder: number;
  published: boolean;
};

export function ContentPageForm({
  page,
  nextSortOrder,
}: {
  page?: ContentPageItem;
  nextSortOrder?: number;
}) {
  const fieldId = page?.id ?? "new";
  const suggestedSlug = page?.slug ?? (page?.title ? slugify(page.title) : "");

  return (
    <form action={saveContentPage} className="form-card form-grid">
      <h3>{page ? "Editar pagina" : "Nueva pagina"}</h3>
      {page ? <input type="hidden" name="id" value={page.id} /> : null}
      <div className="field">
        <label htmlFor={`content-title-${fieldId}`}>Titulo</label>
        <input
          id={`content-title-${fieldId}`}
          name="title"
          defaultValue={page?.title ?? ""}
          placeholder="Primer grado"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`content-slug-${fieldId}`}>URL de la pagina</label>
        <input
          id={`content-slug-${fieldId}`}
          name="slug"
          defaultValue={page?.slug ?? ""}
          placeholder={suggestedSlug || "primer-grado"}
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
        />
        <small className="muted">
          Se abre en {contentPageHref(page?.slug || suggestedSlug || "slug")}.
          Dejalo vacio para generarlo desde el titulo.
        </small>
      </div>
      <div className="field">
        <label htmlFor={`content-body-${fieldId}`}>Contenido</label>
        <textarea
          id={`content-body-${fieldId}`}
          name="body"
          defaultValue={page?.body ?? ""}
          placeholder="Texto completo de la pagina. Separá párrafos con Enter."
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`content-alt-${fieldId}`}>Texto alternativo (opcional)</label>
        <input
          id={`content-alt-${fieldId}`}
          name="altText"
          defaultValue={page?.altText ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`content-drive-${fieldId}`}>
          Imagen - Link publico de Google Drive (opcional)
        </label>
        <input
          id={`content-drive-${fieldId}`}
          name="driveUrl"
          defaultValue={page?.driveUrl ?? ""}
          placeholder="https://drive.google.com/file/d/.../view"
        />
        <small className="muted">
          En Drive, compartí la imagen como Anyone with the link can view.
        </small>
      </div>
      <div className="field">
        <label htmlFor={`content-sort-${fieldId}`}>Orden</label>
        <input
          id={`content-sort-${fieldId}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={page?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={page?.published ?? true}
        />
        Publicada
      </label>
      <button className="button" type="submit">
        {page ? "Guardar pagina" : "Agregar pagina"}
      </button>
    </form>
  );
}

export function ContentPagePreview({ page }: { page: ContentPageItem }) {
  return (
    <div>
      <strong>{page.title}</strong>
      <p className="muted">{contentPageHref(page.slug)}</p>
      <p className="muted">{page.published ? "Publicada" : "Oculta"}</p>
      {page.driveFileId ? (
        <figure className="admin-photo-preview">
          <img
            src={getDriveImageDisplayUrl(page.driveFileId)}
            alt={page.altText || page.title}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </figure>
      ) : null}
    </div>
  );
}

export function DeleteContentPageForm({ id }: { id: string }) {
  return (
    <form action={removeContentPage}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
