"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { submitStaffApplication } from "@/app/actions/staff-application";
import type { StaffApplicationSubmitState } from "@/lib/content";
import { parseSelectOptions } from "@/lib/staff-fields";

type StaffField = {
  id: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string | null;
  options: string | null;
};

type StaffSection = {
  title: string;
  body: string;
  successMessage: string;
  submitLabel: string;
  fields: StaffField[];
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button className="button staff-submit" type="submit" disabled={pending}>
      {pending ? "Enviando..." : label}
    </button>
  );
}

export function StaffApplicationSection({
  content,
}: {
  content: StaffSection | null | undefined;
}) {
  const [state, formAction] = useActionState<
    StaffApplicationSubmitState,
    FormData
  >(submitStaffApplication, {});

  if (!content || content.fields.length === 0) return null;

  return (
    <section
      id="staff"
      className="staff-section"
      aria-labelledby="staff-title"
    >
      <div className="staff-section-inner page-shell">
        <div className="staff-copy">
          <p className="section-kicker">Staff</p>
          <h2 id="staff-title" className="display">
            {content.title}
          </h2>
          {content.body ? <p className="staff-intro">{content.body}</p> : null}

          <ul className="staff-points">
            <li>
              <span className="staff-point-index" aria-hidden="true">
                01
              </span>
              <span>Completá tus datos de contacto</span>
            </li>
            <li>
              <span className="staff-point-index" aria-hidden="true">
                02
              </span>
              <span>Adjuntá el link de tu curriculum</span>
            </li>
            <li>
              <span className="staff-point-index" aria-hidden="true">
                03
              </span>
              <span>Nuestro equipo revisará tu postulación</span>
            </li>
          </ul>
        </div>

        <div className="staff-panel">
          {state.success ? (
            <p className="staff-form-success" role="status">
              {state.message ?? content.successMessage}
            </p>
          ) : (
            <>
              <div className="staff-panel-head">
                <h3>Postulación</h3>
                <p>Completá el formulario y enviá tu candidatura.</p>
              </div>
              <form action={formAction} className="staff-form form-grid">
                {content.fields.map((field) => (
                  <StaffFieldInput key={field.id} field={field} />
                ))}
                {state.error ? <p className="form-error">{state.error}</p> : null}
                <SubmitButton label={content.submitLabel} />
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function StaffFieldInput({ field }: { field: StaffField }) {
  const id = `staff-field-${field.id}`;
  const name = `field_${field.id}`;
  const placeholder = field.placeholder ?? undefined;

  if (field.type === "TEXTAREA") {
    return (
      <div className="field">
        <label htmlFor={id}>
          {field.label}
          {field.required ? "" : " (opcional)"}
        </label>
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={field.required}
          rows={4}
        />
      </div>
    );
  }

  if (field.type === "SELECT") {
    const options = parseSelectOptions(field.options);
    return (
      <div className="field">
        <label htmlFor={id}>
          {field.label}
          {field.required ? "" : " (opcional)"}
        </label>
        <select id={id} name={name} required={field.required} defaultValue="">
          <option value="" disabled>
            {placeholder || "Elegí una opción"}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  const inputType =
    field.type === "EMAIL"
      ? "email"
      : field.type === "PHONE"
        ? "tel"
        : field.type === "DRIVE_URL"
          ? "url"
          : "text";

  return (
    <div className="field">
      <label htmlFor={id}>
        {field.label}
        {field.required ? "" : " (opcional)"}
      </label>
      <input
        id={id}
        name={name}
        type={inputType}
        placeholder={
          placeholder ||
          (field.type === "DRIVE_URL"
            ? "https://drive.google.com/file/d/.../view"
            : undefined)
        }
        required={field.required}
      />
      {field.type === "DRIVE_URL" ? (
        <small>Pegá el link público de Google Drive de tu curriculum.</small>
      ) : null}
    </div>
  );
}
