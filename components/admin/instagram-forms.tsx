import { removeInstagramPost, saveInstagramPost } from "@/app/admin/actions";

type InstagramPost = {
  id: string;
  caption: string | null;
  href: string;
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
        <label htmlFor={`insta-caption-${post?.id ?? "new"}`}>Texto (opcional)</label>
        <input
          id={`insta-caption-${post?.id ?? "new"}`}
          name="caption"
          defaultValue={post?.caption ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`insta-href-${post?.id ?? "new"}`}>URL pública del post</label>
        <input
          id={`insta-href-${post?.id ?? "new"}`}
          name="href"
          type="url"
          defaultValue={post?.href ?? ""}
          placeholder="https://instagram.com/p/..."
          required
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
    <p className="muted">
      <a href={post.href} target="_blank" rel="noreferrer">
        {post.caption ?? post.href}
      </a>{" "}
      · {post.published ? "Publicado" : "Oculto"}
    </p>
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
