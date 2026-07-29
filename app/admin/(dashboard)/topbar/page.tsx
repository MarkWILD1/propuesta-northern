import {
  AnnouncementBarForm,
  DeleteAnnouncementBarForm,
  DeleteNavLinkForm,
  NavLinkForm,
} from "@/components/admin/topbar-forms";
import { getLandingPageForAdmin } from "@/lib/content";
import { resolveNavHref } from "@/lib/landing-sections";

export const dynamic = "force-dynamic";

export default async function AdminTopBarPage() {
  const page = await getLandingPageForAdmin();
  const pages = page.contentPages.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    published: item.published,
  }));
  const nextSortOrder =
    page.navLinks.length > 0
      ? Math.max(...page.navLinks.map((link) => link.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Top bar</p>
        <h1 className="display">Franja de anuncio y navegacion.</h1>
        <p className="muted">
          Cada item puede bajar a una seccion de la landing, abrir una pagina
          propia de Northern o un link externo.
        </p>
      </header>

      <AnnouncementBarForm bar={page.announcementBar} pages={pages} />
      {page.announcementBar ? (
        <DeleteAnnouncementBarForm id={page.announcementBar.id} />
      ) : null}

      <header className="admin-header">
        <h2 className="display">Items de navegacion</h2>
        <p className="muted">
          Se muestran a la derecha del logo, ordenados de menor a mayor. En
          celulares se agrupan dentro del boton de menu.
        </p>
      </header>

      <NavLinkForm nextSortOrder={nextSortOrder} pages={pages} />

      <section className="admin-grid" aria-label="Items guardados">
        {page.navLinks.map((link) => (
          <article key={link.id} className="admin-card stack">
            <div>
              <strong>{link.label}</strong>
              <p className="muted">
                {resolveNavHref(link.href)}
                {link.openInNewTab ? " (pestana nueva)" : ""}
              </p>
              <p className="muted">{link.published ? "Publicado" : "Oculto"}</p>
            </div>
            <NavLinkForm link={link} pages={pages} />
            <DeleteNavLinkForm id={link.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
