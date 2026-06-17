import { removeProgramLevel, saveProgramLevel } from "@/app/admin/actions";
import { getDriveImageDisplayUrl } from "@/lib/drive";

type ProgramLevel = {
  id: string;
  title: string;
  body: string;
  altText: string;
  driveUrl: string;
  driveFileId: string;
  ctaLabel: string | null;
  ctaHref: string | null;
  sortOrder: number;
  published: boolean;
};

export function ProgramLevelForm({
  level,
  nextSortOrder,
}: {
  level?: ProgramLevel;
  nextSortOrder?: number;
}) {
  return (
    <form action={saveProgramLevel} className="form-card form-grid">
      <h3>{level ? "Editar nivel" : "Nuevo nivel educativo"}</h3>
      {level ? <input type="hidden" name="id" value={level.id} /> : null}
      <div className="field">
        <label htmlFor={`level-title-${level?.id ?? "new"}`}>Titulo</label>
        <input
          id={`level-title-${level?.id ?? "new"}`}
          name="title"
          defaultValue={level?.title ?? ""}
          placeholder="Inicial, Primaria, Secundaria"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`level-body-${level?.id ?? "new"}`}>Descripcion</label>
        <textarea
          id={`level-body-${level?.id ?? "new"}`}
          name="body"
          defaultValue={level?.body ?? ""}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`level-alt-${level?.id ?? "new"}`}>Texto alternativo (opcional)</label>
        <input
          id={`level-alt-${level?.id ?? "new"}`}
          name="altText"
          defaultValue={level?.altText ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`level-drive-${level?.id ?? "new"}`}>Link publico de Google Drive</label>
        <input
          id={`level-drive-${level?.id ?? "new"}`}
          name="driveUrl"
          defaultValue={level?.driveUrl ?? ""}
          placeholder="https://drive.google.com/file/d/.../view"
          required
        />
      </div>
      <div className="admin-grid">
        <div className="field">
          <label htmlFor={`level-cta-label-${level?.id ?? "new"}`}>Texto del boton (opcional)</label>
          <input
            id={`level-cta-label-${level?.id ?? "new"}`}
            name="ctaLabel"
            defaultValue={level?.ctaLabel ?? ""}
            placeholder="Leer mas"
          />
        </div>
        <div className="field">
          <label htmlFor={`level-cta-href-${level?.id ?? "new"}`}>Link del boton (opcional)</label>
          <input
            id={`level-cta-href-${level?.id ?? "new"}`}
            name="ctaHref"
            defaultValue={level?.ctaHref ?? ""}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor={`level-sort-${level?.id ?? "new"}`}>Orden</label>
        <input
          id={`level-sort-${level?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={level?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={level?.published ?? true}
        />
        Publicado
      </label>
      <button className="button" type="submit">
        {level ? "Guardar nivel" : "Agregar nivel"}
      </button>
    </form>
  );
}

export function ProgramLevelPreview({ level }: { level: ProgramLevel }) {
  return (
    <figure className="admin-photo-preview">
      <img
        src={getDriveImageDisplayUrl(level.driveFileId)}
        alt={level.altText}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <figcaption>
        <strong>{level.title}</strong>
        <span>{level.published ? "Publicado" : "Oculto"}</span>
      </figcaption>
    </figure>
  );
}

export function DeleteProgramLevelForm({ id }: { id: string }) {
  return (
    <form action={removeProgramLevel}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
