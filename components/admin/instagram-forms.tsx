import { removeInstagramPost, saveInstagramPost } from "@/app/admin/actions";
import { getDriveImageDisplayUrl } from "@/lib/drive";

type InstagramPost = {
  id: string;
  caption: string | null;
  altText: string;
  driveUrl: string;
  driveFileId: string;
  href: string | null;
  sortOrder: number;
  published: boolean;
};

export function InstagramPostForm({
  post,
  nextSortOrder,
}: {
  post?: InstagramPost;
  nextSortOrder?: number;
}) {
  return (
    <form action={saveInstagramPost} className="form-card form-grid">
      <h3>{post ? "Editar publicacion" : "Nueva publicacion de Instagram"}</h3>
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <div className="field">
        <label htmlFor={`insta-drive-${post?.id ?? "new"}`}>Imagen de Google Drive</label>
        <input
          id={`insta-drive-${post?.id ?? "new"}`}
          name="driveUrl"
          defaultValue={post?.driveUrl ?? ""}
          placeholder="https://drive.google.com/file/d/.../view"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`insta-caption-${post?.id ?? "new"}`}>Texto (opcional)</label>
        <input
          id={`insta-caption-${post?.id ?? "new"}`}
          name="caption"
          defaultValue={post?.caption ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`insta-href-${post?.id ?? "new"}`}>Link al post (opcional)</label>
        <input
          id={`insta-href-${post?.id ?? "new"}`}
          name="href"
          defaultValue={post?.href ?? ""}
          placeholder="https://instagram.com/p/..."
        />
      </div>
      <div className="field">
        <label htmlFor={`insta-alt-${post?.id ?? "new"}`}>Texto alternativo (opcional)</label>
        <input
          id={`insta-alt-${post?.id ?? "new"}`}
          name="altText"
          defaultValue={post?.altText ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`insta-sort-${post?.id ?? "new"}`}>Orden</label>
        <input
          id={`insta-sort-${post?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={post?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={post?.published ?? true}
        />
        Publicado
      </label>
      <button className="button" type="submit">
        {post ? "Guardar publicacion" : "Agregar publicacion"}
      </button>
    </form>
  );
}

export function InstagramPostPreview({ post }: { post: InstagramPost }) {
  return (
    <figure className="admin-photo-preview">
      <img
        src={getDriveImageDisplayUrl(post.driveFileId)}
        alt={post.altText}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <figcaption>
        <strong>{post.caption ?? "Instagram"}</strong>
        <span>{post.published ? "Publicado" : "Oculto"}</span>
      </figcaption>
    </figure>
  );
}

export function DeleteInstagramPostForm({ id }: { id: string }) {
  return (
    <form action={removeInstagramPost}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
