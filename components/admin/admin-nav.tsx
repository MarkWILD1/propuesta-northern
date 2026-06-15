import Link from "next/link";

import { logoutAdmin } from "@/app/admin/actions";

export function AdminNav({ email }: { email?: string | null }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span>Colegio Northern</span>
        <strong>Admin</strong>
      </div>
      <nav className="admin-nav" aria-label="Admin navigation">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/content">Contenido</Link>
        <Link href="/admin/photos">Fotos Drive</Link>
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
