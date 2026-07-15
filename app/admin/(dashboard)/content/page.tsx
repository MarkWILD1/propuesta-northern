import { LandingPageForm } from "@/components/admin/content-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const page = await getLandingPageForAdmin();
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Contenido</p>
        <h1 className="display">Contenido principal.</h1>
        <p className="muted">
          Cambia el contenido que se muestra en la landing publica sin editar codigo.
        </p>
      </header>

      <LandingPageForm page={page} />
    </div>
  );
}
