import { removeActivityTab, saveActivityTab } from "@/app/admin/actions";
import { getDriveImageDisplayUrl } from "@/lib/drive";

type ActivityTab = {
  id: string;
  title: string;
  body: string;
  altText: string | null;
  driveUrl: string | null;
  driveFileId: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  sortOrder: number;
  published: boolean;
};

export function ActivityTabForm({
  activity,
  nextSortOrder,
}: {
  activity?: ActivityTab;
  nextSortOrder?: number;
}) {
  return (
    <form action={saveActivityTab} className="form-card form-grid">
      <h3>{activity ? "Editar actividad" : "Nueva actividad"}</h3>
      {activity ? <input type="hidden" name="id" value={activity.id} /> : null}
      <div className="field">
        <label htmlFor={`activity-title-${activity?.id ?? "new"}`}>Titulo de la pestana</label>
        <input
          id={`activity-title-${activity?.id ?? "new"}`}
          name="title"
          defaultValue={activity?.title ?? ""}
          placeholder="Deportes, Actividades, Accion Social"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`activity-body-${activity?.id ?? "new"}`}>Texto</label>
        <textarea
          id={`activity-body-${activity?.id ?? "new"}`}
          name="body"
          defaultValue={activity?.body ?? ""}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`activity-drive-${activity?.id ?? "new"}`}>
          Link de Google Drive (opcional)
        </label>
        <input
          id={`activity-drive-${activity?.id ?? "new"}`}
          name="driveUrl"
          defaultValue={activity?.driveUrl ?? ""}
          placeholder="https://drive.google.com/file/d/.../view"
        />
      </div>
      <div className="field">
        <label htmlFor={`activity-alt-${activity?.id ?? "new"}`}>Texto alternativo (opcional)</label>
        <input
          id={`activity-alt-${activity?.id ?? "new"}`}
          name="altText"
          defaultValue={activity?.altText ?? ""}
        />
      </div>
      <div className="admin-grid">
        <div className="field">
          <label htmlFor={`activity-cta-label-${activity?.id ?? "new"}`}>
            Texto del boton (opcional)
          </label>
          <input
            id={`activity-cta-label-${activity?.id ?? "new"}`}
            name="ctaLabel"
            defaultValue={activity?.ctaLabel ?? ""}
            placeholder="Leer mas"
          />
        </div>
        <div className="field">
          <label htmlFor={`activity-cta-href-${activity?.id ?? "new"}`}>
            Link del boton (opcional)
          </label>
          <input
            id={`activity-cta-href-${activity?.id ?? "new"}`}
            name="ctaHref"
            defaultValue={activity?.ctaHref ?? ""}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor={`activity-sort-${activity?.id ?? "new"}`}>Orden</label>
        <input
          id={`activity-sort-${activity?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={activity?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={activity?.published ?? true}
        />
        Publicado
      </label>
      <button className="button" type="submit">
        {activity ? "Guardar actividad" : "Agregar actividad"}
      </button>
    </form>
  );
}

export function ActivityTabPreview({ activity }: { activity: ActivityTab }) {
  if (!activity.driveFileId) {
    return null;
  }
  return (
    <figure className="admin-photo-preview">
      <img
        src={getDriveImageDisplayUrl(activity.driveFileId)}
        alt={activity.altText ?? activity.title}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <figcaption>
        <strong>{activity.title}</strong>
        <span>{activity.published ? "Publicado" : "Oculto"}</span>
      </figcaption>
    </figure>
  );
}

export function DeleteActivityTabForm({ id }: { id: string }) {
  return (
    <form action={removeActivityTab}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
