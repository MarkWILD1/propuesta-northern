import { StaffApplicationAdmin } from "@/components/admin/staff-application-forms";
import { getStaffApplicationSection } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminStaffPage() {
  const section = await getStaffApplicationSection();

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Staff</p>
        <h1 className="display">Postulaciones al staff Northern.</h1>
        <p className="muted">
          Editá el texto de la sección, construí el formulario y revisá las
          respuestas enviadas desde la landing.
        </p>
      </header>
      <StaffApplicationAdmin section={section} />
    </div>
  );
}
