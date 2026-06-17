import Link from "next/link";

import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const page = await getLandingPageForAdmin();
  const publishedSections = page.sections.filter((section) => section.published).length;
  const publishedPhotos = page.photos.filter((photo) => photo.published).length;
  const publishedSlides = page.carouselSlides.filter((slide) => slide.published).length;

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

      <section className="admin-grid" aria-label="Resumen de contenido">
        <article className="admin-card metric-card">
          <span>Secciones publicadas</span>
          <strong>{publishedSections}</strong>
          <p>{page.sections.length} secciones totales</p>
        </article>
        <article className="admin-card metric-card">
          <span>Slides del carrusel</span>
          <strong>{publishedSlides}</strong>
          <p>{page.carouselSlides.length} slides totales</p>
        </article>
        <article className="admin-card metric-card">
          <span>Fotos publicadas</span>
          <strong>{publishedPhotos}</strong>
          <p>{page.photos.length} fotos totales</p>
        </article>
        <article className="admin-card metric-card">
          <span>Estado landing</span>
          <strong>{page.published ? "Online" : "Oculta"}</strong>
          <p>Solo el contenido publicado aparece en la pagina publica.</p>
        </article>
      </section>

      <section className="admin-grid">
        <Link className="admin-card action-card" href="/admin/content">
          <span>Contenido</span>
          <strong>Editar textos y secciones</strong>
        </Link>
        <Link className="admin-card action-card" href="/admin/navegacion">
          <span>Navegacion</span>
          <strong>Menu del header</strong>
        </Link>
        <Link className="admin-card action-card" href="/admin/carousel">
          <span>Carrusel</span>
          <strong>Imagenes destacadas del hero</strong>
        </Link>
        <Link className="admin-card action-card" href="/admin/niveles">
          <span>Niveles</span>
          <strong>Propuesta educativa</strong>
        </Link>
        <Link className="admin-card action-card" href="/admin/estadisticas">
          <span>Estadisticas</span>
          <strong>Numeros de la comunidad</strong>
        </Link>
        <Link className="admin-card action-card" href="/admin/actividades">
          <span>Actividades</span>
          <strong>Pestanas de vida escolar</strong>
        </Link>
        <Link className="admin-card action-card" href="/admin/noticias">
          <span>Noticias</span>
          <strong>Novedades del colegio</strong>
        </Link>
        <Link className="admin-card action-card" href="/admin/photos">
          <span>Fotos Drive</span>
          <strong>Agregar y ordenar imagenes</strong>
        </Link>
        <Link className="admin-card action-card" href="/admin/instagram">
          <span>Instagram</span>
          <strong>Feed social</strong>
        </Link>
        <Link className="admin-card action-card" href="/admin/sedes">
          <span>Sedes</span>
          <strong>Direcciones del footer</strong>
        </Link>
        <Link className="admin-card action-card" href="/admin/usuarios">
          <span>Usuarios</span>
          <strong>Acceso al panel admin</strong>
        </Link>
      </section>
    </div>
  );
}
