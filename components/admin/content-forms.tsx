import { removeSection, saveLandingHero, saveSection } from "@/app/admin/actions";

type LandingPage = {
  title: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  published: boolean;
  sections: Array<{
    id: string;
    title: string;
    body: string;
    ctaLabel: string | null;
    ctaHref: string | null;
    sortOrder: number;
    published: boolean;
  }>;
};

export function LandingPageForm({ page }: { page: LandingPage }) {
  return (
    <form action={saveLandingHero} className="form-card form-grid">
      <h2>Landing principal</h2>
      <div className="field">
        <label htmlFor="title">Nombre del sitio</label>
        <input id="title" name="title" defaultValue={page.title} required />
      </div>
      <div className="field">
        <label htmlFor="eyebrow">Etiqueta superior</label>
        <input id="eyebrow" name="eyebrow" defaultValue={page.eyebrow} required />
      </div>
      <div className="field">
        <label htmlFor="heroTitle">Titulo hero</label>
        <textarea id="heroTitle" name="heroTitle" defaultValue={page.heroTitle} required />
      </div>
      <div className="field">
        <label htmlFor="heroSubtitle">Subtitulo hero</label>
        <textarea
          id="heroSubtitle"
          name="heroSubtitle"
          defaultValue={page.heroSubtitle}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input type="checkbox" name="published" value="true" defaultChecked={page.published} />
        Landing publicada
      </label>
      <button className="button" type="submit">
        Guardar contenido
      </button>
    </form>
  );
}

export function SectionForm({
  section,
  nextSortOrder,
}: {
  section?: LandingPage["sections"][number];
  nextSortOrder?: number;
}) {
  return (
    <form action={saveSection} className="form-card form-grid">
      <h3>{section ? "Editar seccion" : "Nueva seccion"}</h3>
      {section ? <input type="hidden" name="id" value={section.id} /> : null}
      <div className="field">
        <label htmlFor={`section-title-${section?.id ?? "new"}`}>Titulo</label>
        <input
          id={`section-title-${section?.id ?? "new"}`}
          name="title"
          defaultValue={section?.title ?? ""}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`section-body-${section?.id ?? "new"}`}>Texto</label>
        <textarea
          id={`section-body-${section?.id ?? "new"}`}
          name="body"
          defaultValue={section?.body ?? ""}
          required
        />
      </div>
      <div className="admin-grid">
        <div className="field">
          <label htmlFor={`section-cta-label-${section?.id ?? "new"}`}>
            Texto del boton (opcional)
          </label>
          <input
            id={`section-cta-label-${section?.id ?? "new"}`}
            name="ctaLabel"
            defaultValue={section?.ctaLabel ?? ""}
            placeholder="Leer mas"
          />
        </div>
        <div className="field">
          <label htmlFor={`section-cta-href-${section?.id ?? "new"}`}>
            Link del boton (opcional)
          </label>
          <input
            id={`section-cta-href-${section?.id ?? "new"}`}
            name="ctaHref"
            defaultValue={section?.ctaHref ?? ""}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor={`section-sort-${section?.id ?? "new"}`}>Orden</label>
        <input
          id={`section-sort-${section?.id ?? "new"}`}
          name="sortOrder"
          type="number"
          min="0"
          defaultValue={section?.sortOrder ?? nextSortOrder ?? 0}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={section?.published ?? true}
        />
        Publicada
      </label>
      <button className="button" type="submit">
        {section ? "Guardar seccion" : "Crear seccion"}
      </button>
    </form>
  );
}

export function DeleteSectionForm({ id }: { id: string }) {
  return (
    <form action={removeSection}>
      <input type="hidden" name="id" value={id} />
      <button className="button danger" type="submit">
        Eliminar
      </button>
    </form>
  );
}
