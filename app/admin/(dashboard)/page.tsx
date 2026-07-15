import Link from "next/link";

import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

const MODULES = [
  ["/admin/carousel", "Carrusel", "Imágenes destacadas del hero"],
  ["/admin/content", "Contenido", "Topbar y textos principales"],
  ["/admin/niveles", "Misión y Visión", "Propuesta educativa"],
  ["/admin/estadisticas", "Estadística", "Números de la comunidad"],
  ["/admin/lo-que-nos-define", "Lo que nos define", "Identidad institucional"],
  ["/admin/lenguas-extranjeras", "Lenguas extranjeras", "Propuestas de idiomas"],
  ["/admin/talleres", "Talleres", "Actividades y experiencias"],
  ["/admin/educacion-fisica", "Educación Física", "Actividad física y deporte"],
  ["/admin/equipo-multidisciplinario", "Equipo multidisciplinario", "Equipo y videos"],
  ["/admin/proyecto-institucional", "Proyecto institucional", "Presentación del proyecto"],
  ["/admin/mas-alla-del-aula", "Más allá del aula", "Publicaciones sociales"],
  ["/admin/locales-y-espacios", "Locales y espacios", "Sedes e instalaciones"],
  ["/admin/muestra-final", "Countdown — The Final Show", "Cuenta regresiva y video"],
  ["/admin/footer", "Footer", "Datos de contacto"],
] as const;

export default async function AdminDashboardPage() {
  const page = await getLandingPageForAdmin();

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Panel administrativo</p>
        <h1 className="display">Gestiona la landing del colegio.</h1>
        <p className="muted">
          Edita textos, ordena secciones y publica fotos desde enlaces compartidos
          de Google Drive.
        </p>
      </header>

      <section className="admin-grid" aria-label="Estado de la landing">
        <article className="admin-card metric-card">
          <span>Estado landing</span>
          <strong>{page.published ? "Online" : "Oculta"}</strong>
          <p>Solo el contenido publicado aparece en la pagina publica.</p>
        </article>
      </section>

      <section className="admin-grid" aria-label="Módulos editoriales">
        {MODULES.map(([href, label, description]) => (
          <Link key={href} className="admin-card action-card" href={href}>
            <span>{label}</span>
            <strong>{description}</strong>
          </Link>
        ))}
        <Link className="admin-card action-card" href="/admin/usuarios">
          <span>Usuarios</span>
          <strong>Acceso al panel admin</strong>
        </Link>
        <Link className="admin-card action-card" href="/">
          <span>Ver landing</span>
          <strong>Abrir el sitio público</strong>
        </Link>
      </section>
    </div>
  );
}
