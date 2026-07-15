import { MultidisciplinaryTeamForms } from "@/components/admin/singleton-forms";
import { getMultidisciplinaryTeam } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminEquipoMultidisciplinarioPage() {
  const team = await getMultidisciplinaryTeam();
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Equipo multidisciplinario</p>
        <h1 className="display">Equipo y videos.</h1>
        <p className="muted">Configura la presentación y hasta 3 links públicos de video.</p>
      </header>
      <MultidisciplinaryTeamForms team={team} />
    </div>
  );
}
