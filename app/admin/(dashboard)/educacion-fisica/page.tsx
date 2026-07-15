import { PhysicalEducationForm } from "@/components/admin/singleton-forms";
import { getPhysicalEducation } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminEducacionFisicaPage() {
  const content = await getPhysicalEducation();
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Educación Física</p>
        <h1 className="display">Actividad física y deporte.</h1>
      </header>
      <PhysicalEducationForm content={content} />
    </div>
  );
}
