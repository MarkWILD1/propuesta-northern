import { LandingTitleForm } from "@/components/admin/landing-title-form";
import {
  DeleteWorkshopForm,
  WorkshopForm,
  WorkshopPreview,
} from "@/components/admin/workshop-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminTalleresPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder = page.workshops.length
    ? Math.max(...page.workshops.map((workshop) => workshop.sortOrder)) + 1
    : 0;
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Talleres</p>
        <h1 className="display">Talleres del colegio.</h1>
        <p className="muted">Publica cada taller con texto, imagen y link externo opcional.</p>
      </header>
      <LandingTitleForm field="galleryTitle" value={page.galleryTitle} />
      <WorkshopForm nextSortOrder={nextSortOrder} />
      <section className="admin-grid" aria-label="Talleres guardados">
        {page.workshops.map((workshop) => (
          <article key={workshop.id} className="admin-card stack">
            <WorkshopPreview workshop={workshop} />
            <WorkshopForm workshop={workshop} />
            <DeleteWorkshopForm id={workshop.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
