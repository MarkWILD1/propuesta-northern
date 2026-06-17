import { removeStatItem, saveStatItem } from "@/app/admin/actions";

type StatItem = {
  id: string;
  label: string;
  value: string;
  sortOrder: number;
  published: boolean;
};

export function StatItemForm({
  stat,
  nextSortOrder,
}: {
  stat?: StatItem;
  nextSortOrder?: number;
}) {
  return (
    <form action={saveStatItem} className="form-card form-grid">
      <h3>{stat ? "Editar estadistica" : "Nueva estadistica"}</h3>
      {stat ? <input type="hidden" name="id" value={stat.id} /> : null}
      <div className="admin-grid">
        <div className="field">
          <label htmlFor={`stat-value-${stat?.id ?? "new"}`}>Valor</label>
          <input
            id={`stat-value-${stat?.id ?? "new"}`}
            name="value"
            defaultValue={stat?.value ?? ""}
            placeholder="50, 1200, +30"
            required
          />
        </div>
        <div className="field">
          <label htmlFor={`stat-label-${stat?.id ?? "new"}`}>Etiqueta</label>
          <input
            id={`stat-label-${stat?.id ?? "new"}`}
            name="label"
            defaultValue={stat?.label ?? ""}
            placeholder="Anos, Alumnos, Sedes"
            required
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor={`stat-sort-${stat?.id ?? "new"}`}>Orden</label>
        <input
          id={`stat-sort-${stat?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={stat?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={stat?.published ?? true}
        />
        Publicado
      </label>
      <button className="button" type="submit">
        {stat ? "Guardar estadistica" : "Agregar estadistica"}
      </button>
    </form>
  );
}

export function DeleteStatItemForm({ id }: { id: string }) {
  return (
    <form action={removeStatItem}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
