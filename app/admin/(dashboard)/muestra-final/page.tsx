import { FinalShowForm } from "@/components/admin/singleton-forms";
import { getFinalShow } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminMuestraFinalPage() {
  const content = await getFinalShow();
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Countdown — The Final Show</p>
        <h1 className="display">Cuenta regresiva y video.</h1>
        <p className="muted">Todos los campos de contenido son opcionales.</p>
      </header>
      <FinalShowForm content={content} />
    </div>
  );
}
