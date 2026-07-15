import { DeleteLocationForm, LocationForm } from "@/components/admin/location-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminLocalesYEspaciosPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder = page.locations.length
    ? Math.max(...page.locations.map((location) => location.sortOrder)) + 1
    : 0;
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Locales y espacios</p>
        <h1 className="display">Sedes e instalaciones.</h1>
        <p className="muted">Gestiona datos de contacto, texto, imagen y enlaces de cada espacio.</p>
      </header>
      <LocationForm nextSortOrder={nextSortOrder} />
      <section className="admin-grid" aria-label="Locales y espacios guardados">
        {page.locations.map((location) => (
          <article key={location.id} className="admin-card stack">
            <LocationForm location={location} />
            <DeleteLocationForm id={location.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
