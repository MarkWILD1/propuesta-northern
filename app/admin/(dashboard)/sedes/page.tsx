import { DeleteLocationForm, LocationForm } from "@/components/admin/location-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminSedesPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.locations.length > 0
      ? Math.max(...page.locations.map((location) => location.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Sedes</p>
        <h1 className="display">Direcciones del footer.</h1>
        <p className="muted">
          Sedes que aparecen en el pie de pagina con direccion y telefono.
        </p>
      </header>

      <LocationForm nextSortOrder={nextSortOrder} />

      <section className="admin-grid" aria-label="Sedes guardadas">
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
