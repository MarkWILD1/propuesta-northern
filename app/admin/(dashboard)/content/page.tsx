import {
  DeleteSectionForm,
  LandingPageForm,
  SectionForm,
} from "@/components/admin/content-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.sections.length > 0
      ? Math.max(...page.sections.map((section) => section.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Contenido</p>
        <h1 className="display">Textos y secciones.</h1>
        <p className="muted">
          Cambia el contenido que se muestra en la landing publica sin editar codigo.
        </p>
      </header>

      <LandingPageForm page={page} />

      <section className="stack" aria-labelledby="sections-admin-title">
        <h2 id="sections-admin-title">Secciones</h2>
        <SectionForm nextSortOrder={nextSortOrder} />
        <div className="admin-grid">
          {page.sections.map((section) => (
            <article key={section.id} className="admin-card stack">
              <SectionForm section={section} />
              <DeleteSectionForm id={section.id} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
