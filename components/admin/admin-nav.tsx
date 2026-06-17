import Link from "next/link";

import { logoutAdmin } from "@/app/admin/actions";

export function AdminNav({ email }: { email?: string | null }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <img
          className="admin-brand-logo"
          src="/logo-northern.png"
          alt="Northern School"
          width={1024}
          height={705}
        />
        <strong>Admin</strong>
      </div>
      <nav className="admin-nav" aria-label="Admin navigation">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/content">Contenido</Link>
        <Link href="/admin/navegacion">Navegacion</Link>
        <Link href="/admin/carousel">Carrusel</Link>
        <Link href="/admin/niveles">Niveles</Link>
        <Link href="/admin/estadisticas">Estadisticas</Link>
        <Link href="/admin/actividades">Actividades</Link>
        <Link href="/admin/noticias">Noticias</Link>
        <Link href="/admin/photos">Fotos Drive</Link>
        <Link href="/admin/instagram">Instagram</Link>
        <Link href="/admin/sedes">Sedes</Link>
        <Link href="/admin/usuarios">Usuarios</Link>
        <Link href="/">Ver landing</Link>
      </nav>
      <form action={logoutAdmin} className="logout-form">
        <p>{email}</p>
        <button className="button secondary" type="submit">
          Salir
        </button>
      </form>
    </aside>
  );
}
