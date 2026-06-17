import { DeleteNavLinkForm, NavLinkForm } from "@/components/admin/nav-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminNavegacionPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.navLinks.length > 0
      ? Math.max(...page.navLinks.map((link) => link.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Navegacion</p>
        <h1 className="display">Menu del header.</h1>
        <p className="muted">
          Define los enlaces del menu superior de la landing. Pueden ser anclas
          internas (por ejemplo #niveles) o links externos.
        </p>
      </header>

      <NavLinkForm nextSortOrder={nextSortOrder} />

      <section className="admin-grid" aria-label="Enlaces guardados">
        {page.navLinks.map((link) => (
          <article key={link.id} className="admin-card stack">
            <NavLinkForm link={link} />
            <DeleteNavLinkForm id={link.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
