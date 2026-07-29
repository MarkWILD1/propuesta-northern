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
  { href: "/admin/topbar", label: "Top bar" },
  { href: "/admin/paginas", label: "Páginas" },
  { href: "/admin/carousel", label: "Carrusel" },
  { href: "/admin/content", label: "Contenido" },
  { href: "/admin/niveles", label: "Misión y Visión" },
  { href: "/admin/estadisticas", label: "Estadística" },
  { href: "/admin/lo-que-nos-define", label: "Lo que nos define" },
  { href: "/admin/lenguas-extranjeras", label: "Lenguas extranjeras" },
  { href: "/admin/talleres", label: "Talleres" },
  { href: "/admin/educacion-fisica", label: "Educación Física" },
  { href: "/admin/equipo-multidisciplinario", label: "Equipo multidisciplinario" },
  { href: "/admin/proyecto-institucional", label: "Proyecto institucional" },
  { href: "/admin/mas-alla-del-aula", label: "Más allá del aula" },
  { href: "/admin/locales-y-espacios", label: "Locales y espacios" },
  { href: "/admin/muestra-final", label: "Countdown — The Final Show" },
  { href: "/admin/footer", label: "Footer" },
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
