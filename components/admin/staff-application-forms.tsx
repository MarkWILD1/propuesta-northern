import {
  removeStaffApplicationField,
  removeStaffApplicationSubmission,
  saveStaffApplicationField,
  saveStaffApplicationSection,
} from "@/app/admin/actions";
import { STAFF_FIELD_TYPES } from "@/lib/staff-fields";

type StaffField = {
  id: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string | null;
  options: string | null;
  sortOrder: number;
  published: boolean;
};

type StaffSubmission = {
  id: string;
  answersJson: string;
  createdAt: Date;
};

type StaffSection = {
  title: string;
  body: string;
  successMessage: string;
  submitLabel: string;
  published: boolean;
  fields: StaffField[];
  submissions: StaffSubmission[];
};

const FIELD_TYPE_LABELS: Record<(typeof STAFF_FIELD_TYPES)[number], string> = {
  TEXT: "Texto",
  EMAIL: "Email",
  PHONE: "Teléfono",
  TEXTAREA: "Texto largo",
  SELECT: "Lista desplegable",
  DRIVE_URL: "Link Drive (CV)",
};

export function StaffApplicationAdmin({ section }: { section: StaffSection }) {
  const nextSortOrder = section.fields.length
    ? Math.max(...section.fields.map((field) => field.sortOrder)) + 1
    : 0;

  return (
    <div className="stack">
      <form action={saveStaffApplicationSection} className="form-card form-grid">
        <h2>Sección pública</h2>
        <div className="field">
          <label htmlFor="staff-title">Título</label>
          <input id="staff-title" name="title" defaultValue={section.title} required />
        </div>
        <div className="field">
          <label htmlFor="staff-body">Texto</label>
          <textarea id="staff-body" name="body" defaultValue={section.body} />
        </div>
        <div className="field">
          <label htmlFor="staff-success">Mensaje de éxito</label>
          <input
            id="staff-success"
            name="successMessage"
            defaultValue={section.successMessage}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="staff-submit">Texto del botón</label>
          <input
            id="staff-submit"
            name="submitLabel"
            defaultValue={section.submitLabel}
            required
          />
        </div>
        <label className="checkbox">
          <input type="hidden" name="published" value="false" />
          <input
            type="checkbox"
            name="published"
            value="true"
            defaultChecked={section.published}
          />
          Publicado
        </label>
        <button className="button" type="submit">
          Guardar sección
        </button>
      </form>

      <section className="stack" aria-labelledby="staff-fields-title">
        <h2 id="staff-fields-title">Campos del formulario</h2>
        <p className="muted">
          Agregá, editá u ordená los campos que se muestran en la landing. Para
          listas desplegables, escribí una opción por línea.
        </p>
        <StaffFieldForm nextSortOrder={nextSortOrder} />
        <div className="admin-grid">
          {section.fields.map((field) => (
            <article key={field.id} className="admin-card stack">
              <StaffFieldForm field={field} />
              <form action={removeStaffApplicationField}>
                <input type="hidden" name="id" value={field.id} />
                <button className="button danger" type="submit">
                  Eliminar campo
                </button>
              </form>
            </article>
          ))}
        </div>
      </section>

      <section className="stack" aria-labelledby="staff-submissions-title">
        <h2 id="staff-submissions-title">
          Respuestas ({section.submissions.length})
        </h2>
        {section.submissions.length === 0 ? (
          <p className="muted">Todavía no hay postulaciones enviadas.</p>
        ) : (
          <div className="stack staff-submissions">
            {section.submissions.map((submission) => (
              <StaffSubmissionCard
                key={submission.id}
                submission={submission}
                fields={section.fields}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StaffFieldForm({
  field,
  nextSortOrder = 0,
}: {
  field?: StaffField;
  nextSortOrder?: number;
}) {
  const suffix = field?.id ?? "new";
  const type = (field?.type ?? "TEXT") as (typeof STAFF_FIELD_TYPES)[number];

  return (
    <form action={saveStaffApplicationField} className="form-card form-grid">
      <h3>{field ? "Editar campo" : "Nuevo campo"}</h3>
      {field ? <input type="hidden" name="id" value={field.id} /> : null}
      <div className="field">
        <label htmlFor={`staff-field-label-${suffix}`}>Etiqueta</label>
        <input
          id={`staff-field-label-${suffix}`}
          name="label"
          defaultValue={field?.label ?? ""}
          required
        />
      </div>
      <div className="field">
        <label htmlFor={`staff-field-type-${suffix}`}>Tipo</label>
        <select
          id={`staff-field-type-${suffix}`}
          name="type"
          defaultValue={type}
          required
        >
          {STAFF_FIELD_TYPES.map((value) => (
            <option key={value} value={value}>
              {FIELD_TYPE_LABELS[value]}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor={`staff-field-placeholder-${suffix}`}>
          Placeholder (opcional)
        </label>
        <input
          id={`staff-field-placeholder-${suffix}`}
          name="placeholder"
          defaultValue={field?.placeholder ?? ""}
        />
      </div>
      <div className="field">
        <label htmlFor={`staff-field-options-${suffix}`}>
          Opciones (solo lista desplegable)
        </label>
        <textarea
          id={`staff-field-options-${suffix}`}
          name="options"
          defaultValue={field?.options ?? ""}
          placeholder={"Opción 1\nOpción 2"}
        />
        <small>Una opción por línea.</small>
      </div>
      <div className="field">
        <label htmlFor={`staff-field-sort-${suffix}`}>Orden</label>
        <input
          id={`staff-field-sort-${suffix}`}
          name="sortOrder"
          type="number"
          min={0}
          defaultValue={field?.sortOrder ?? nextSortOrder}
          required
        />
      </div>
      <label className="checkbox">
        <input type="hidden" name="required" value="false" />
        <input
          type="checkbox"
          name="required"
          value="true"
          defaultChecked={field?.required ?? true}
        />
        Obligatorio
      </label>
      <label className="checkbox">
        <input type="hidden" name="published" value="false" />
        <input
          type="checkbox"
          name="published"
          value="true"
          defaultChecked={field?.published ?? true}
        />
        Publicado
      </label>
      <button className="button" type="submit">
        {field ? "Guardar campo" : "Agregar campo"}
      </button>
    </form>
  );
}

function StaffSubmissionCard({
  submission,
  fields,
}: {
  submission: StaffSubmission;
  fields: StaffField[];
}) {
  let answers: Record<string, string> = {};
  try {
    answers = JSON.parse(submission.answersJson) as Record<string, string>;
  } catch {
    answers = {};
  }

  const fieldById = new Map(fields.map((field) => [field.id, field]));
  const entries = Object.entries(answers);
  const dateLabel = new Intl.DateTimeFormat("es-UY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(submission.createdAt));

  return (
    <article className="admin-card stack staff-submission-card">
      <header className="staff-submission-header">
        <strong>{dateLabel}</strong>
        <form action={removeStaffApplicationSubmission}>
          <input type="hidden" name="id" value={submission.id} />
          <button className="button danger" type="submit">
            Eliminar
          </button>
        </form>
      </header>
      <dl className="staff-submission-answers">
        {entries.length === 0 ? (
          <p className="muted">Sin respuestas legibles.</p>
        ) : (
          entries.map(([fieldId, value]) => {
            const field = fieldById.get(fieldId);
            const label = field?.label ?? "Campo eliminado";
            const isDrive = field?.type === "DRIVE_URL" || /^https?:\/\//i.test(value);

            return (
              <div key={fieldId}>
                <dt>{label}</dt>
                <dd>
                  {isDrive ? (
                    <a href={value} target="_blank" rel="noreferrer">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            );
          })
        )}
      </dl>
    </article>
  );
}
