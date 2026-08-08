export const LANDING_SECTIONS = [
  { href: "/#top", label: "Inicio" },
  { href: "/#niveles", label: "Propuesta educativa" },
  { href: "/#estadisticas", label: "Estadistica" },
  { href: "/#colegio", label: "Lo que nos define" },
  { href: "/#actividades", label: "Lenguas extranjeras" },
  { href: "/#talleres", label: "Talleres" },
  { href: "/#educacion-fisica", label: "Educacion Fisica" },
  { href: "/#equipo", label: "Equipo multidisciplinario" },
  { href: "/#proyecto-institucional", label: "Proyecto institucional" },
  { href: "/#mas-alla-del-aula", label: "Mas alla del aula" },
  { href: "/#locales", label: "Locales y espacios" },
  { href: "/#final-show", label: "The Final Show" },
  { href: "/#staff", label: "Staff" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export const LANDING_SECTION_HREFS = LANDING_SECTIONS.map(
  (section) => section.href,
);

export const NAV_LINK_TYPES = ["SECTION", "PAGE", "EXTERNAL"] as const;
export const ANNOUNCEMENT_LINK_TYPES = [
  "NONE",
  "SECTION",
  "PAGE",
  "EXTERNAL",
] as const;

export function contentPageHref(slug: string) {
  return `/pagina/${slug}`;
}

export function isContentPageHref(href: string) {
  return href.startsWith("/pagina/");
}

export function contentPageSlugFromHref(href: string) {
  if (!isContentPageHref(href)) return null;
  return href.slice("/pagina/".length).split(/[?#]/)[0] || null;
}

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//i.test(href) || /^(mailto|tel):/i.test(href);
}

/**
 * Older records stored bare anchors like "#top", which do not navigate from
 * /propuesta/[slug]. Normalize them to the "/#anchor" form used everywhere now.
 */
export function resolveNavHref(href: string) {
  const value = href.trim();

  if (!value) return "/";
  if (value.startsWith("#")) return `/${value}`;

  return value;
}
