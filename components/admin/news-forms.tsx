import { removeNewsItem, saveNewsItem } from "@/app/admin/actions";
import { getDriveImageDisplayUrl } from "@/lib/drive";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  dateLabel: string | null;
  altText: string | null;
  driveUrl: string | null;
  driveFileId: string | null;
  href: string | null;
  sortOrder: number;
  published: boolean;
};

export function NewsItemForm({
  news,
  nextSortOrder,
}: {
  news?: NewsItem;
  nextSortOrder?: number;
}) {
  return (
    <form action={saveNewsItem} className="form-card form-grid">
      <h3>{news ? "Editar noticia" : "Nueva noticia"}</h3>
      {news ? <input type="hidden" name="id" value={news.id} /> : null}
      <div className="field">
        <label htmlFor={`news-title-${news?.id ?? "new"}`}>Titulo</label>
        <input
          id={`news-title-${news?.id ?? "new"}`}
          name="title"
          defaultValue={news?.title ?? ""}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`news-excerpt-${news?.id ?? "new"}`}>Resumen</label>
        <textarea
          id={`news-excerpt-${news?.id ?? "new"}`}
          name="excerpt"
          defaultValue={news?.excerpt ?? ""}
          required
        />
      </div>
      <div className="admin-grid">
        <div className="field">
          <label htmlFor={`news-date-${news?.id ?? "new"}`}>Fecha (opcional)</label>
          <input
            id={`news-date-${news?.id ?? "new"}`}
            name="dateLabel"
            defaultValue={news?.dateLabel ?? ""}
            placeholder="Mayo 2026"
          />
        </div>
        <div className="field">
          <label htmlFor={`news-href-${news?.id ?? "new"}`}>Link (opcional)</label>
          <input
            id={`news-href-${news?.id ?? "new"}`}
            name="href"
            defaultValue={news?.href ?? ""}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor={`news-drive-${news?.id ?? "new"}`}>
          Imagen de Google Drive (opcional)
        </label>
        <input
          id={`news-drive-${news?.id ?? "new"}`}
          name="driveUrl"
          defaultValue={news?.driveUrl ?? ""}
          placeholder="https://drive.google.com/file/d/.../view"
        />
      </div>
      <div className="field">
        <label htmlFor={`news-alt-${news?.id ?? "new"}`}>Texto alternativo (opcional)</label>
        <input
          id={`news-alt-${news?.id ?? "new"}`}
          name="altText"
          defaultValue={news?.altText ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`news-sort-${news?.id ?? "new"}`}>Orden</label>
        <input
          id={`news-sort-${news?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={news?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={news?.published ?? true}
        />
        Publicado
      </label>
      <button className="button" type="submit">
        {news ? "Guardar noticia" : "Agregar noticia"}
      </button>
    </form>
  );
}

export function NewsItemPreview({ news }: { news: NewsItem }) {
  if (!news.driveFileId) {
    return null;
  }
  return (
    <figure className="admin-photo-preview">
      <img
        src={getDriveImageDisplayUrl(news.driveFileId)}
        alt={news.altText ?? news.title}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <figcaption>
        <strong>{news.title}</strong>
        <span>{news.published ? "Publicado" : "Oculto"}</span>
      </figcaption>
    </figure>
  );
}

export function DeleteNewsItemForm({ id }: { id: string }) {
  return (
    <form action={removeNewsItem}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
