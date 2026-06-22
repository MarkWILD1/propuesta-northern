import { removeProgramLevel, saveProgramLevel } from "@/app/admin/actions";
import { getDriveImageDisplayUrl } from "@/lib/drive";
import { slugify } from "@/lib/slugify";

type ProgramLevel = {
  id: string;
  title: string;
  slug: string;
  body: string;
  detailBody: string;
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
  const suggestedSlug = level?.slug ?? (level?.title ? slugify(level.title) : "");

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
        <label htmlFor={`level-slug-${level?.id ?? "new"}`}>
          URL de la pagina
        </label>
        <input
          id={`level-slug-${level?.id ?? "new"}`}
          name="slug"
          defaultValue={level?.slug ?? ""}
          placeholder={suggestedSlug || "educacion-inicial"}
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
        />
        <small>
          Se abre en /propuesta/
          {level?.slug || suggestedSlug || "slug"}
          . Dejalo vacio para generarlo desde el titulo.
        </small>
      </div>
      <div className="field">
        <label htmlFor={`level-body-${level?.id ?? "new"}`}>
          Descripcion en la tarjeta
        </label>
        <textarea
          id={`level-body-${level?.id ?? "new"}`}
          name="body"
          defaultValue={level?.body ?? ""}
          placeholder="Texto breve visible en la tarjeta de la home"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`level-detail-${level?.id ?? "new"}`}>
          Contenido de la pagina
        </label>
        <textarea
          id={`level-detail-${level?.id ?? "new"}`}
          name="detailBody"
          defaultValue={level?.detailBody ?? ""}
          placeholder="Texto completo que se muestra al hacer clic en la tarjeta"
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
          <label htmlFor={`level-cta-label-${level?.id ?? "new"}`}>
            Texto del boton en la pagina (opcional)
          </label>
          <input
            id={`level-cta-label-${level?.id ?? "new"}`}
            name="ctaLabel"
            defaultValue={level?.ctaLabel ?? ""}
            placeholder="Contactanos"
          />
        </div>
        <div className="field">
          <label htmlFor={`level-cta-href-${level?.id ?? "new"}`}>
            Link del boton en la pagina (opcional)
          </label>
          <input
            id={`level-cta-href-${level?.id ?? "new"}`}
            name="ctaHref"
            defaultValue={level?.ctaHref ?? ""}
            placeholder="/#contacto"
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
        <span>/propuesta/{level.slug}</span>
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
