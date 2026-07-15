import { FooterForm } from "@/components/admin/singleton-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminFooterPage() {
  const page = await getLandingPageForAdmin();
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Footer</p>
        <h1 className="display">Contacto del pie de página.</h1>
      </header>
      <FooterForm content={page} />
    </div>
  );
}
