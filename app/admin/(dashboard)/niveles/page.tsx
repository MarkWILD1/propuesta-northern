import {
  DeleteProgramLevelForm,
  ProgramLevelForm,
  ProgramLevelPreview,
} from "@/components/admin/level-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminNivelesPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.programLevels.length > 0
      ? Math.max(...page.programLevels.map((level) => level.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Niveles</p>
        <h1 className="display">Propuesta educativa.</h1>
        <p className="muted">
          Tarjetas de niveles educativos (Inicial, Primaria, Secundaria) con
          imagen de Google Drive. Al hacer clic en una tarjeta se abre su pagina
          de detalle en /propuesta/[slug].
        </p>
      </header>

      <ProgramLevelForm nextSortOrder={nextSortOrder} />

      <section className="admin-grid" aria-label="Niveles guardados">
        {page.programLevels.map((level) => (
          <article key={level.id} className="admin-card stack">
            <ProgramLevelPreview level={level} />
            <ProgramLevelForm level={level} />
            <DeleteProgramLevelForm id={level.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
