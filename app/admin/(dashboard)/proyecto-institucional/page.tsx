import { InstitutionalProjectForm } from "@/components/admin/singleton-forms";
import { getInstitutionalProject } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminProyectoInstitucionalPage() {
  const content = await getInstitutionalProject();
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Proyecto institucional</p>
        <h1 className="display">Proyecto institucional.</h1>
      </header>
      <InstitutionalProjectForm content={content} />
    </div>
  );
}
