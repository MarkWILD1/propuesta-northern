import {
  DeleteNewsItemForm,
  NewsItemForm,
  NewsItemPreview,
} from "@/components/admin/news-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminNoticiasPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.news.length > 0
      ? Math.max(...page.news.map((item) => item.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Noticias</p>
        <h1 className="display">Novedades del colegio.</h1>
        <p className="muted">
          Tarjetas de noticias con resumen, fecha e imagen opcional de Google
          Drive.
        </p>
      </header>

      <NewsItemForm nextSortOrder={nextSortOrder} />

      <section className="admin-grid" aria-label="Noticias guardadas">
        {page.news.map((item) => (
          <article key={item.id} className="admin-card stack">
            <NewsItemPreview news={item} />
            <NewsItemForm news={item} />
            <DeleteNewsItemForm id={item.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
