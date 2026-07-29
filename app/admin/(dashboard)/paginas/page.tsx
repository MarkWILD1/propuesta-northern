import {
  ContentPageForm,
  ContentPagePreview,
  DeleteContentPageForm,
} from "@/components/admin/content-page-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminContentPagesPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.contentPages.length > 0
      ? Math.max(...page.contentPages.map((item) => item.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Paginas</p>
        <h1 className="display">Paginas propias de Northern.</h1>
        <p className="muted">
          Crea paginas como &quot;Primer grado&quot; que no aparecen en la
          landing, pero pueden enlazarse desde la top bar.
        </p>
      </header>

      <ContentPageForm nextSortOrder={nextSortOrder} />

      <section className="admin-grid" aria-label="Paginas guardadas">
        {page.contentPages.map((item) => (
          <article key={item.id} className="admin-card stack">
            <ContentPagePreview page={item} />
            <ContentPageForm page={item} />
            <DeleteContentPageForm id={item.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
