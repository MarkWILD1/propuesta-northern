import { removeSection, saveLandingPage, saveSection } from "@/app/admin/actions";

type LandingPage = {
  title: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaLabel: string;
  ctaHref: string;
  levelsTitle: string;
  statsTitle: string;
  featuredTitle: string;
  activitiesTitle: string;
  galleryTitle: string;
  newsTitle: string;
  instagramTitle: string;
  instagramUrl: string;
  contactTitle: string;
  contactBody: string;
  contactEmail: string;
  contactPhone: string | null;
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
    <form action={saveLandingPage} className="form-card form-grid">
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
      <div className="admin-grid">
        <div className="field">
          <label htmlFor="ctaLabel">Texto CTA</label>
          <input id="ctaLabel" name="ctaLabel" defaultValue={page.ctaLabel} required />
        </div>
        <div className="field">
          <label htmlFor="ctaHref">Link CTA</label>
          <input id="ctaHref" name="ctaHref" defaultValue={page.ctaHref} required />
        </div>
      </div>
      <h3>Titulos de las secciones</h3>
      <div className="admin-grid">
        <div className="field">
          <label htmlFor="levelsTitle">Titulo niveles</label>
          <input id="levelsTitle" name="levelsTitle" defaultValue={page.levelsTitle} required />
        </div>
        <div className="field">
          <label htmlFor="statsTitle">Titulo estadisticas</label>
          <input id="statsTitle" name="statsTitle" defaultValue={page.statsTitle} required />
        </div>
        <div className="field">
          <label htmlFor="featuredTitle">Titulo destacados</label>
          <input
            id="featuredTitle"
            name="featuredTitle"
            defaultValue={page.featuredTitle}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="activitiesTitle">Titulo actividades</label>
          <input
            id="activitiesTitle"
            name="activitiesTitle"
            defaultValue={page.activitiesTitle}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="galleryTitle">Titulo galeria</label>
          <input id="galleryTitle" name="galleryTitle" defaultValue={page.galleryTitle} required />
        </div>
        <div className="field">
          <label htmlFor="newsTitle">Titulo noticias</label>
          <input id="newsTitle" name="newsTitle" defaultValue={page.newsTitle} required />
        </div>
        <div className="field">
          <label htmlFor="instagramTitle">Titulo Instagram</label>
          <input
            id="instagramTitle"
            name="instagramTitle"
            defaultValue={page.instagramTitle}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="instagramUrl">Link Instagram (opcional)</label>
          <input
            id="instagramUrl"
            name="instagramUrl"
            defaultValue={page.instagramUrl}
            placeholder="https://instagram.com/..."
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="contactTitle">Titulo contacto</label>
        <input
          id="contactTitle"
          name="contactTitle"
          defaultValue={page.contactTitle}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="contactBody">Texto contacto</label>
        <textarea
          id="contactBody"
          name="contactBody"
          defaultValue={page.contactBody}
          required
        />
      </div>
      <div className="admin-grid">
        <div className="field">
          <label htmlFor="contactEmail">Email contacto</label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            defaultValue={page.contactEmail}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="contactPhone">Telefono</label>
          <input id="contactPhone" name="contactPhone" defaultValue={page.contactPhone ?? ""} />
        </div>
      </div>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input type="checkbox" name="published" value="true" defaultChecked={page.published} />
        Landing publicada
      </label>
      <button className="button" type="submit">
        Guardar landing
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
