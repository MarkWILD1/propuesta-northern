import { removeNavLink, saveNavLink } from "@/app/admin/actions";

type NavLink = {
  id: string;
  label: string;
  href: string;
  sortOrder: number;
  published: boolean;
};

export function NavLinkForm({
  link,
  nextSortOrder,
}: {
  link?: NavLink;
  nextSortOrder?: number;
}) {
  return (
    <form action={saveNavLink} className="form-card form-grid">
      <h3>{link ? "Editar enlace" : "Nuevo enlace de navegacion"}</h3>
      {link ? <input type="hidden" name="id" value={link.id} /> : null}
      <div className="field">
        <label htmlFor={`nav-label-${link?.id ?? "new"}`}>Texto</label>
        <input
          id={`nav-label-${link?.id ?? "new"}`}
          name="label"
          defaultValue={link?.label ?? ""}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`nav-href-${link?.id ?? "new"}`}>Link o ancla</label>
        <input
          id={`nav-href-${link?.id ?? "new"}`}
          name="href"
          defaultValue={link?.href ?? ""}
          placeholder="#niveles, /admin, https://..."
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`nav-sort-${link?.id ?? "new"}`}>Orden</label>
        <input
          id={`nav-sort-${link?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={link?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={link?.published ?? true}
        />
        Publicado
      </label>
      <button className="button" type="submit">
        {link ? "Guardar enlace" : "Agregar enlace"}
      </button>
    </form>
  );
}

export function DeleteNavLinkForm({ id }: { id: string }) {
  return (
    <form action={removeNavLink}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
