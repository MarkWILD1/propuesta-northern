import { removeLocation, saveLocation } from "@/app/admin/actions";

type Location = {
  id: string;
  name: string;
  addressLines: string;
  phone: string | null;
  body: string;
  altText: string;
  driveUrl: string | null;
  href: string | null;
  sortOrder: number;
  published: boolean;
};

export function LocationForm({
  location,
  nextSortOrder,
}: {
  location?: Location;
  nextSortOrder?: number;
}) {
  return (
    <form action={saveLocation} className="form-card form-grid">
      <h3>{location ? "Editar local o espacio" : "Nuevo local o espacio"}</h3>
      {location ? <input type="hidden" name="id" value={location.id} /> : null}
      <div className="field">
        <label htmlFor={`location-name-${location?.id ?? "new"}`}>Nombre</label>
        <input
          id={`location-name-${location?.id ?? "new"}`}
          name="name"
          defaultValue={location?.name ?? ""}
          placeholder="Sede Central"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`location-body-${location?.id ?? "new"}`}>Texto</label>
        <textarea
          id={`location-body-${location?.id ?? "new"}`}
          name="body"
          defaultValue={location?.body ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`location-drive-${location?.id ?? "new"}`}>Imagen - Link público de google Drive</label>
        <input
          id={`location-drive-${location?.id ?? "new"}`}
          name="driveUrl"
          defaultValue={location?.driveUrl ?? ""}
          placeholder="https://drive.google.com/file/d/.../view"
        />
      </div>
      <div className="field">
        <label htmlFor={`location-alt-${location?.id ?? "new"}`}>Texto alternativo</label>
        <input
          id={`location-alt-${location?.id ?? "new"}`}
          name="altText"
          defaultValue={location?.altText ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`location-href-${location?.id ?? "new"}`}>Link (opcional)</label>
        <input
          id={`location-href-${location?.id ?? "new"}`}
          name="href"
          type="url"
          defaultValue={location?.href ?? ""}
          placeholder="https://..."
        />
      </div>
      <div className="field">
        <label htmlFor={`location-address-${location?.id ?? "new"}`}>
          Direccion (una linea por renglon)
        </label>
        <textarea
          id={`location-address-${location?.id ?? "new"}`}
          name="addressLines"
          defaultValue={location?.addressLines ?? ""}
          placeholder={"Av. Ejemplo 1234\nRivera\nCod. Postal 40000"}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`location-phone-${location?.id ?? "new"}`}>Telefono (opcional)</label>
        <input
          id={`location-phone-${location?.id ?? "new"}`}
          name="phone"
          defaultValue={location?.phone ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`location-sort-${location?.id ?? "new"}`}>Orden</label>
        <input
          id={`location-sort-${location?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={location?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={location?.published ?? true}
        />
        Publicado
      </label>
      <button className="button" type="submit">
        {location ? "Guardar espacio" : "Agregar espacio"}
      </button>
    </form>
  );
}

export function DeleteLocationForm({ id }: { id: string }) {
  return (
    <form action={removeLocation}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
