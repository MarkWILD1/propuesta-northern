import { removeWorkshop, saveWorkshop } from "@/app/admin/actions";
import { getDriveImageDisplayUrl } from "@/lib/drive";

type Workshop = {
  id: string;
  title: string;
  body: string;
  altText: string;
  driveUrl: string;
  driveFileId: string;
  href: string | null;
  sortOrder: number;
  published: boolean;
};

export function WorkshopForm({
  workshop,
  nextSortOrder,
}: {
  workshop?: Workshop;
  nextSortOrder?: number;
}) {
  const suffix = workshop?.id ?? "new";
  return (
    <form action={saveWorkshop} className="form-card form-grid">
      <h3>{workshop ? "Editar taller" : "Nuevo taller"}</h3>
      {workshop ? <input type="hidden" name="id" value={workshop.id} /> : null}
      <div className="field">
        <label htmlFor={`workshop-title-${suffix}`}>Título</label>
        <input id={`workshop-title-${suffix}`} name="title" defaultValue={workshop?.title ?? ""} required />
      </div>
      <div className="field">
        <label htmlFor={`workshop-body-${suffix}`}>Texto</label>
        <textarea id={`workshop-body-${suffix}`} name="body" defaultValue={workshop?.body ?? ""} />
      </div>
      <div className="field">
        <label htmlFor={`workshop-drive-${suffix}`}>Imagen de Google Drive</label>
        <input
          id={`workshop-drive-${suffix}`}
          name="driveUrl"
          defaultValue={workshop?.driveUrl ?? ""}
          placeholder="https://drive.google.com/file/d/.../view"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`workshop-alt-${suffix}`}>Texto alternativo (opcional)</label>
        <input id={`workshop-alt-${suffix}`} name="altText" defaultValue={workshop?.altText ?? ""} />
      </div>
      <div className="field">
        <label htmlFor={`workshop-href-${suffix}`}>Link externo (opcional)</label>
        <input
          id={`workshop-href-${suffix}`}
          name="href"
          type="url"
          defaultValue={workshop?.href ?? ""}
          placeholder="https://..."
        />
      </div>
      <div className="field">
        <label htmlFor={`workshop-sort-${suffix}`}>Orden</label>
        <input
          id={`workshop-sort-${suffix}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={workshop?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input type="checkbox" name="published" value="true" defaultChecked={workshop?.published ?? true} />
        Publicado
      </label>
      <button className="button" type="submit">
        {workshop ? "Guardar taller" : "Agregar taller"}
      </button>
    </form>
  );
}

export function WorkshopPreview({ workshop }: { workshop: Workshop }) {
  return (
    <figure className="admin-photo-preview">
      <img
        src={getDriveImageDisplayUrl(workshop.driveFileId)}
        alt={workshop.altText}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <figcaption>
        <strong>{workshop.title}</strong>
        <span>{workshop.published ? "Publicado" : "Oculto"}</span>
      </figcaption>
    </figure>
  );
}

export function DeleteWorkshopForm({ id }: { id: string }) {
  return (
    <form action={removeWorkshop}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">Eliminar</button>
    </form>
  );
}
