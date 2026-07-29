"use client";

import { useState } from "react";
import Link from "next/link";

import {
  removeAnnouncementBar,
  removeNavLink,
  saveAnnouncementBar,
  saveNavLink,
} from "@/app/admin/actions";
import {
  contentPageSlugFromHref,
  LANDING_SECTION_HREFS,
  LANDING_SECTIONS,
  resolveNavHref,
} from "@/lib/landing-sections";

type ContentPageOption = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
};

type NavLinkItem = {
  id: string;
  label: string;
  href: string;
  linkType: string;
  openInNewTab: boolean;
  highlight: boolean;
  sortOrder: number;
  published: boolean;
};

type AnnouncementBarItem = {
  id: string;
  message: string;
  linkLabel: string | null;
  linkType: string;
  href: string | null;
  openInNewTab: boolean;
  dismissible: boolean;
  published: boolean;
};

const DEFAULT_SECTION_HREF = LANDING_SECTIONS[0].href;

function defaultSectionHref(linkType: string, href?: string | null) {
  if (linkType !== "SECTION" || !href) return DEFAULT_SECTION_HREF;

  const normalized = resolveNavHref(href);

  return (LANDING_SECTION_HREFS as readonly string[]).includes(normalized)
    ? normalized
    : DEFAULT_SECTION_HREF;
}

function defaultPageSlug(
  linkType: string,
  href: string | null | undefined,
  pages: ContentPageOption[],
) {
  if (pages.length === 0) return "";

  if (linkType === "PAGE" && href) {
    const fromHref = contentPageSlugFromHref(resolveNavHref(href));
    if (fromHref && pages.some((page) => page.slug === fromHref)) {
      return fromHref;
    }
  }

  return pages[0].slug;
}

function SectionSelect({
  fieldId,
  defaultValue,
}: {
  fieldId: string;
  defaultValue: string;
}) {
  return (
    <div className="field">
      <label htmlFor={fieldId}>Seccion de la landing</label>
      <select id={fieldId} name="sectionHref" defaultValue={defaultValue}>
        {LANDING_SECTIONS.map((section) => (
          <option key={section.href} value={section.href}>
            {section.label}
          </option>
        ))}
      </select>
      <small className="muted">
        Al hacer click, la pagina baja hasta esa seccion de la landing.
      </small>
    </div>
  );
}

function PageSelect({
  fieldId,
  pages,
  defaultValue,
}: {
  fieldId: string;
  pages: ContentPageOption[];
  defaultValue: string;
}) {
  if (pages.length === 0) {
    return (
      <p className="muted">
        Todavia no hay paginas.{" "}
        <Link href="/admin/paginas">Crea una en Paginas</Link> primero.
      </p>
    );
  }

  return (
    <div className="field">
      <label htmlFor={fieldId}>Pagina de Northern</label>
      <select id={fieldId} name="pageSlug" defaultValue={defaultValue} required>
        {pages.map((page) => (
          <option key={page.id} value={page.slug}>
            {page.title}
            {page.published ? "" : " (oculta)"}
          </option>
        ))}
      </select>
      <small className="muted">
        Abre /pagina/{defaultValue || pages[0].slug} en la misma pestana.
      </small>
    </div>
  );
}

function ExternalFields({
  fieldId,
  defaultHref,
  defaultOpenInNewTab,
}: {
  fieldId: string;
  defaultHref: string;
  defaultOpenInNewTab: boolean;
}) {
  return (
    <>
      <div className="field">
        <label htmlFor={fieldId}>Link externo</label>
        <input
          id={fieldId}
          name="externalHref"
          defaultValue={defaultHref}
          placeholder="https://ejemplo.com/inscripciones"
          required
        />
        <small className="muted">
          Pega la direccion completa, incluyendo https://
        </small>
      </div>
      <label className="checkbox">
        <input type="hidden" name="openInNewTab" value="false" />
        <input
          type="checkbox"
          name="openInNewTab"
          value="true"
          defaultChecked={defaultOpenInNewTab}
        />
        Abrir en una pestana nueva
      </label>
    </>
  );
}

function DestinationFields({
  linkType,
  fieldPrefix,
  href,
  openInNewTab,
  pages,
}: {
  linkType: string;
  fieldPrefix: string;
  href?: string | null;
  openInNewTab?: boolean;
  pages: ContentPageOption[];
}) {
  if (linkType === "EXTERNAL") {
    return (
      <ExternalFields
        fieldId={`${fieldPrefix}-external`}
        defaultHref={href ?? ""}
        defaultOpenInNewTab={openInNewTab ?? true}
      />
    );
  }

  if (linkType === "PAGE") {
    return (
      <PageSelect
        fieldId={`${fieldPrefix}-page`}
        pages={pages}
        defaultValue={defaultPageSlug("PAGE", href, pages)}
      />
    );
  }

  if (linkType === "SECTION") {
    return (
      <SectionSelect
        fieldId={`${fieldPrefix}-section`}
        defaultValue={defaultSectionHref("SECTION", href)}
      />
    );
  }

  return null;
}

export function NavLinkForm({
  link,
  nextSortOrder,
  pages,
}: {
  link?: NavLinkItem;
  nextSortOrder?: number;
  pages: ContentPageOption[];
}) {
  const [linkType, setLinkType] = useState(link?.linkType ?? "SECTION");
  const fieldId = link?.id ?? "new";

  return (
    <form action={saveNavLink} className="form-card form-grid">
      <h3>{link ? "Editar item" : "Nuevo item de la top bar"}</h3>
      {link ? <input type="hidden" name="id" value={link.id} /> : null}
      <div className="field">
        <label htmlFor={`nav-label-${fieldId}`}>Texto del item</label>
        <input
          id={`nav-label-${fieldId}`}
          name="label"
          defaultValue={link?.label ?? ""}
          placeholder="Propuesta educativa"
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`nav-type-${fieldId}`}>Destino</label>
        <select
          id={`nav-type-${fieldId}`}
          name="linkType"
          value={linkType}
          onChange={(event) => setLinkType(event.target.value)}
        >
          <option value="SECTION">Una seccion de esta landing</option>
          <option value="PAGE">Pagina de Northern</option>
          <option value="EXTERNAL">Otro link</option>
        </select>
      </div>
      <DestinationFields
        linkType={linkType}
        fieldPrefix={`nav-${fieldId}`}
        href={
          link && link.linkType === linkType
            ? link.href
            : linkType === "EXTERNAL"
              ? ""
              : link?.href
        }
        openInNewTab={link?.openInNewTab}
        pages={pages}
      />
      <label className="checkbox">
        <input type="hidden" name="highlight" value="false" />
        <input
          type="checkbox"
          name="highlight"
          value="true"
          defaultChecked={link?.highlight ?? false}
        />
        Destacar como boton
      </label>
      <div className="field">
        <label htmlFor={`nav-sort-${fieldId}`}>Orden</label>
        <input
          id={`nav-sort-${fieldId}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={link?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={link?.published ?? true}
        />
        Publicado
      </label>
      <button
        className="button"
        type="submit"
        disabled={linkType === "PAGE" && pages.length === 0}
      >
        {link ? "Guardar item" : "Agregar item"}
      </button>
    </form>
  );
}

export function DeleteNavLinkForm({ id }: { id: string }) {
  return (
    <form action={removeNavLink}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}

export function AnnouncementBarForm({
  bar,
  pages,
}: {
  bar?: AnnouncementBarItem | null;
  pages: ContentPageOption[];
}) {
  const [linkType, setLinkType] = useState(bar?.linkType ?? "NONE");

  return (
    <form action={saveAnnouncementBar} className="form-card form-grid">
      <h3>Franja de anuncio</h3>
      <p className="muted">
        Aparece arriba de todo, sobre el logo. Dejala despublicada si no queres
        mostrarla.
      </p>
      <div className="field">
        <label htmlFor="announcement-message">Mensaje</label>
        <input
          id="announcement-message"
          name="message"
          defaultValue={bar?.message ?? ""}
          placeholder="Inscripciones abiertas 2027"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="announcement-type">Destino</label>
        <select
          id="announcement-type"
          name="linkType"
          value={linkType}
          onChange={(event) => setLinkType(event.target.value)}
        >
          <option value="NONE">Sin link (solo texto)</option>
          <option value="SECTION">Una seccion de esta landing</option>
          <option value="PAGE">Pagina de Northern</option>
          <option value="EXTERNAL">Otro link</option>
        </select>
      </div>
      <DestinationFields
        linkType={linkType}
        fieldPrefix="announcement"
        href={
          bar && bar.linkType === linkType
            ? bar.href
            : linkType === "EXTERNAL"
              ? ""
              : bar?.href
        }
        openInNewTab={bar?.openInNewTab}
        pages={pages}
      />
      {linkType === "NONE" ? null : (
        <div className="field">
          <label htmlFor="announcement-link-label">Texto del boton (opcional)</label>
          <input
            id="announcement-link-label"
            name="linkLabel"
            defaultValue={bar?.linkLabel ?? ""}
            placeholder="Quiero inscribirme"
          />
          <small className="muted">
            Si lo dejas vacio, todo el mensaje funciona como link.
          </small>
        </div>
      )}
      <label className="checkbox">
        <input type="hidden" name="dismissible" value="false" />
        <input
          type="checkbox"
          name="dismissible"
          value="true"
          defaultChecked={bar?.dismissible ?? true}
        />
        Permitir cerrarla
      </label>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={bar?.published ?? false}
        />
        Publicada
      </label>
      <button
        className="button"
        type="submit"
        disabled={linkType === "PAGE" && pages.length === 0}
      >
        Guardar franja
      </button>
    </form>
  );
}

export function DeleteAnnouncementBarForm({ id }: { id: string }) {
  return (
    <form action={removeAnnouncementBar}>
      <input type="hidden" name="id" value={id} />
      <button className="button secondary" type="submit">
        Restablecer franja
      </button>
    </form>
  );
}
