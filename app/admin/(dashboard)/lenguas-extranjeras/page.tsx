import {
  ActivityTabForm,
  ActivityTabPreview,
  DeleteActivityTabForm,
} from "@/components/admin/activity-forms";
import {
  ActivitiesKickerForm,
  LandingTitleForm,
} from "@/components/admin/landing-title-form";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminLenguasExtranjerasPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder = page.activities.length
    ? Math.max(...page.activities.map((activity) => activity.sortOrder)) + 1
    : 0;
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Lenguas extranjeras</p>
        <h1 className="display">Propuestas de idiomas.</h1>
        <p className="muted">Gestiona textos, imágenes y enlaces externos de cada lengua.</p>
      </header>
      <LandingTitleForm field="activitiesTitle" value={page.activitiesTitle} />
      <ActivitiesKickerForm value={page.activitiesKicker} />
      <ActivityTabForm nextSortOrder={nextSortOrder} />
      <section className="admin-grid" aria-label="Lenguas guardadas">
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
