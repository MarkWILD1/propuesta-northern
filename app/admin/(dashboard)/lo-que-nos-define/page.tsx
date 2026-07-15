import { DeleteSectionForm, SectionForm } from "@/components/admin/content-forms";
import { LandingTitleForm } from "@/components/admin/landing-title-form";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminLoQueNosDefinePage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder = page.sections.length
    ? Math.max(...page.sections.map((section) => section.sortOrder)) + 1
    : 0;
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Lo que nos define</p>
        <h1 className="display">Identidad del colegio.</h1>
        <p className="muted">Edita el título y las secciones que presentan los valores institucionales.</p>
      </header>
      <LandingTitleForm field="featuredTitle" value={page.featuredTitle} />
      <SectionForm nextSortOrder={nextSortOrder} />
      <section className="admin-grid" aria-label="Secciones guardadas">
        {page.sections.map((section) => (
          <article key={section.id} className="admin-card stack">
            <SectionForm section={section} />
            <DeleteSectionForm id={section.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
