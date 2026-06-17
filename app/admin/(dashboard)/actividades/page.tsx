import {
  ActivityTabForm,
  ActivityTabPreview,
  DeleteActivityTabForm,
} from "@/components/admin/activity-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminActividadesPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.activities.length > 0
      ? Math.max(...page.activities.map((activity) => activity.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Actividades</p>
        <h1 className="display">Vida en el colegio.</h1>
        <p className="muted">
          Pestanas con las propuestas (Deportes, Actividades Extracurriculares,
          Accion Social). La imagen es opcional.
        </p>
      </header>

      <ActivityTabForm nextSortOrder={nextSortOrder} />

      <section className="admin-grid" aria-label="Actividades guardadas">
        {page.activities.map((activity) => (
          <article key={activity.id} className="admin-card stack">
            <ActivityTabPreview activity={activity} />
            <ActivityTabForm activity={activity} />
            <DeleteActivityTabForm id={activity.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
