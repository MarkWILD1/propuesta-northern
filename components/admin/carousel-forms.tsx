import { removeCarouselSlide, saveCarouselSlide } from "@/app/admin/actions";
import { getDriveImageDisplayUrl } from "@/lib/drive";

type CarouselSlide = {
  id: string;
  title: string;
  altText: string;
  caption: string | null;
  driveUrl: string;
  driveFileId: string;
  sortOrder: number;
  published: boolean;
};

export function CarouselSlideForm({
  slide,
  nextSortOrder,
}: {
  slide?: CarouselSlide;
  nextSortOrder?: number;
}) {
  return (
    <form action={saveCarouselSlide} className="form-card form-grid">
      <h3>{slide ? "Editar slide" : "Nuevo slide del carrusel"}</h3>
      {slide ? <input type="hidden" name="id" value={slide.id} /> : null}
      <div className="field">
        <label htmlFor={`slide-title-${slide?.id ?? "new"}`}>Titulo (opcional)</label>
        <input
          id={`slide-title-${slide?.id ?? "new"}`}
          name="title"
          defaultValue={slide?.title ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`slide-alt-${slide?.id ?? "new"}`}>Texto alternativo (opcional)</label>
        <input
          id={`slide-alt-${slide?.id ?? "new"}`}
          name="altText"
          defaultValue={slide?.altText ?? ""}
        />
        <small className="muted">
          Describe la imagen para accesibilidad. Si lo dejas vacio se usa el titulo o un texto por defecto.
        </small>
      </div>
      <div className="field">
        <label htmlFor={`slide-caption-${slide?.id ?? "new"}`}>Descripcion opcional</label>
        <textarea
          id={`slide-caption-${slide?.id ?? "new"}`}
          name="caption"
          defaultValue={slide?.caption ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`slide-drive-${slide?.id ?? "new"}`}>Imagen - Link público de google Drive</label>
        <input
          id={`slide-drive-${slide?.id ?? "new"}`}
          name="driveUrl"
          defaultValue={slide?.driveUrl ?? ""}
          placeholder="https://drive.google.com/file/d/.../view"
          required
        />
        <small className="muted">
          En Drive, comparte la imagen como Anyone with the link can view.
        </small>
      </div>
      <div className="field">
        <label htmlFor={`slide-sort-${slide?.id ?? "new"}`}>Orden</label>
        <input
          id={`slide-sort-${slide?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={slide?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={slide?.published ?? true}
        />
        Publicado
      </label>
      <button className="button" type="submit">
        {slide ? "Guardar slide" : "Agregar slide"}
      </button>
    </form>
  );
}

export function CarouselSlidePreview({ slide }: { slide: CarouselSlide }) {
  return (
    <figure className="admin-photo-preview">
      <img
        src={getDriveImageDisplayUrl(slide.driveFileId)}
        alt={slide.altText}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <figcaption>
        <strong>{slide.title || "Sin titulo"}</strong>
        <span>{slide.published ? "Publicado" : "Oculto"}</span>
      </figcaption>
    </figure>
  );
}

export function DeleteCarouselSlideForm({ id }: { id: string }) {
  return (
    <form action={removeCarouselSlide}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
