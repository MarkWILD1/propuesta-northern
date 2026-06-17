import { DeleteStatItemForm, StatItemForm } from "@/components/admin/stat-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminEstadisticasPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.stats.length > 0
      ? Math.max(...page.stats.map((stat) => stat.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Estadisticas</p>
        <h1 className="display">Numeros de la comunidad.</h1>
        <p className="muted">
          Contadores destacados (Anos, Alumnos, Funcionarios, Sedes). Usa solo
          numeros en el valor para que la animacion de conteo funcione.
        </p>
      </header>

      <StatItemForm nextSortOrder={nextSortOrder} />

      <section className="admin-grid" aria-label="Estadisticas guardadas">
        {page.stats.map((stat) => (
          <article key={stat.id} className="admin-card stack">
            <StatItemForm stat={stat} />
            <DeleteStatItemForm id={stat.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
