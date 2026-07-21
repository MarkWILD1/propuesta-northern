import { removePhoto, savePhoto } from "@/app/admin/actions";
import { getDriveImageDisplayUrl } from "@/lib/drive";

type Photo = {
  id: string;
  title: string;
  altText: string;
  caption: string | null;
  driveUrl: string;
  driveFileId: string;
  sortOrder: number;
  published: boolean;
};

export function PhotoForm({
  photo,
  nextSortOrder,
}: {
  photo?: Photo;
  nextSortOrder?: number;
}) {
  return (
    <form action={savePhoto} className="form-card form-grid">
      <h3>{photo ? "Editar foto" : "Nueva foto desde Drive"}</h3>
      {photo ? <input type="hidden" name="id" value={photo.id} /> : null}
      <div className="field">
        <label htmlFor={`photo-title-${photo?.id ?? "new"}`}>Titulo</label>
        <input
          id={`photo-title-${photo?.id ?? "new"}`}
          name="title"
          defaultValue={photo?.title ?? ""}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`photo-alt-${photo?.id ?? "new"}`}>Texto alternativo (opcional)</label>
        <input
          id={`photo-alt-${photo?.id ?? "new"}`}
          name="altText"
          defaultValue={photo?.altText ?? ""}
        />
        <small className="muted">
          Describe la imagen para accesibilidad. Si lo dejas vacio se usa el titulo.
        </small>
      </div>
      <div className="field">
        <label htmlFor={`photo-caption-${photo?.id ?? "new"}`}>Descripcion opcional</label>
        <textarea
          id={`photo-caption-${photo?.id ?? "new"}`}
          name="caption"
          defaultValue={photo?.caption ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`photo-drive-${photo?.id ?? "new"}`}>Imagen - Link público de google Drive</label>
        <input
          id={`photo-drive-${photo?.id ?? "new"}`}
          name="driveUrl"
          defaultValue={photo?.driveUrl ?? ""}
          placeholder="https://drive.google.com/file/d/.../view"
          required
        />
        <small className="muted">
          En Drive, comparte la imagen como Anyone with the link can view.
        </small>
      </div>
      <div className="field">
        <label htmlFor={`photo-sort-${photo?.id ?? "new"}`}>Orden</label>
        <input
          id={`photo-sort-${photo?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={photo?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={photo?.published ?? true}
        />
        Publicada
      </label>
      <button className="button" type="submit">
        {photo ? "Guardar foto" : "Agregar foto"}
      </button>
    </form>
  );
}

export function PhotoPreview({ photo }: { photo: Photo }) {
  return (
    <figure className="admin-photo-preview">
      <img
        src={getDriveImageDisplayUrl(photo.driveFileId)}
        alt={photo.altText}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <figcaption>
        <strong>{photo.title}</strong>
        <span>{photo.published ? "Publicada" : "Oculta"}</span>
      </figcaption>
    </figure>
  );
}

export function DeletePhotoForm({ id }: { id: string }) {
  return (
    <form action={removePhoto}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
