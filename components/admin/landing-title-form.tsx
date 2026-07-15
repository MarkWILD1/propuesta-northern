import { saveLandingTitles } from "@/app/admin/actions";

type LandingTitleField =
  | "levelsTitle"
  | "statsTitle"
  | "featuredTitle"
  | "activitiesTitle"
  | "galleryTitle"
  | "instagramTitle";

export function LandingTitleForm({
  field,
  value,
  label = "Título de la sección",
}: {
  field: LandingTitleField;
  value: string;
  label?: string;
}) {
  return (
    <form action={saveLandingTitles} className="form-card form-grid">
      <input type="hidden" name="field" value={field} />
      <div className="field">
        <label htmlFor={`landing-title-${field}`}>{label}</label>
        <input
          id={`landing-title-${field}`}
          name="value"
          defaultValue={value}
          required
        />
      </div>
      <button className="button" type="submit">
        Guardar título
      </button>
    </form>
  );
}
