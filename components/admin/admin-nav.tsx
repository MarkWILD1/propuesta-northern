"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { logoutAdmin } from "@/app/admin/actions";

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
  neverActive?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/content", label: "Contenido" },
  { href: "/admin/navegacion", label: "Navegacion" },
  { href: "/admin/carousel", label: "Carrusel" },
  { href: "/admin/niveles", label: "Niveles" },
  { href: "/admin/estadisticas", label: "Estadisticas" },
  { href: "/admin/actividades", label: "Actividades" },
  { href: "/admin/noticias", label: "Noticias" },
  { href: "/admin/photos", label: "Fotos Drive" },
  { href: "/admin/instagram", label: "Instagram" },
  { href: "/admin/sedes", label: "Sedes" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/", label: "Ver landing", neverActive: true },
];

function isNavLinkActive(
  pathname: string,
  href: string,
  exact?: boolean,
  neverActive?: boolean,
) {
  if (neverActive) return false;
  if (exact) return pathname === href || pathname === `${href}/`;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav({ email }: { email?: string | null }) {
  const pathname = usePathname();

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
        {NAV_ITEMS.map(({ href, label, exact, neverActive }) => {
          const isActive = isNavLinkActive(pathname, href, exact, neverActive);

          return (
            <Link
              key={href}
              href={href}
              className={isActive ? "is-active" : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
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
