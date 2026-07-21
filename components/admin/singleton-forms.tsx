import {
  removeTeamVideo,
  saveFinalShow,
  saveFooter,
  saveInstitutionalProject,
  saveMultidisciplinaryTeam,
  savePhysicalEducation,
  saveTeamVideo,
} from "@/app/admin/actions";

type ImageSingleton = {
  title: string;
  body: string;
  altText: string;
  driveUrl: string | null;
  published: boolean;
};

export function PhysicalEducationForm({
  content,
}: {
  content: (ImageSingleton & { ctaLabel: string | null; ctaHref: string | null }) | null;
}) {
  return (
    <form action={savePhysicalEducation} className="form-card form-grid">
      <h2>Educación Física</h2>
      <TextFields content={content} bodyLabel="Texto corto" />
      <ImageFields content={content} />
      <div className="admin-grid">
        <Field label="Texto CTA" name="ctaLabel" value={content?.ctaLabel} />
        <Field label="Link CTA" name="ctaHref" value={content?.ctaHref} type="url" />
      </div>
      <Published checked={content?.published ?? false} />
      <Submit />
    </form>
  );
}

export function InstitutionalProjectForm({ content }: { content: ImageSingleton | null }) {
  return (
    <form action={saveInstitutionalProject} className="form-card form-grid">
      <h2>Proyecto institucional</h2>
      <TextFields content={content} />
      <ImageFields content={content} />
      <Published checked={content?.published ?? false} />
      <Submit />
    </form>
  );
}

export function FinalShowForm({
  content,
}: {
  content: {
    title: string;
    body: string;
    eventAt: Date | null;
    videoUrl: string | null;
    published: boolean;
  } | null;
}) {
  const localDate = content?.eventAt
    ? new Date(content.eventAt.getTime() - content.eventAt.getTimezoneOffset() * 60_000)
        .toISOString()
        .slice(0, 16)
    : "";
  return (
    <form action={saveFinalShow} className="form-card form-grid">
      <h2>Countdown — The Final Show</h2>
      <Field label="Título (opcional)" name="title" value={content?.title} />
      <div className="field">
        <label htmlFor="final-show-body">Texto (opcional)</label>
        <textarea id="final-show-body" name="body" defaultValue={content?.body ?? ""} />
      </div>
      <Field label="Fecha y hora (opcional)" name="eventAt" value={localDate} type="datetime-local" />
      <Field label="URL de YouTube (opcional)" name="videoUrl" value={content?.videoUrl} type="url" />
      <Published checked={content?.published ?? false} />
      <Submit />
    </form>
  );
}

export function FooterForm({
  content,
}: {
  content: {
    contactTitle: string;
    contactBody: string;
    contactEmail: string;
    contactPhone: string | null;
  };
}) {
  return (
    <form action={saveFooter} className="form-card form-grid">
      <h2>Footer</h2>
      <Field label="Título de contacto" name="contactTitle" value={content.contactTitle} required />
      <div className="field">
        <label htmlFor="contactBody">Texto de contacto</label>
        <textarea id="contactBody" name="contactBody" defaultValue={content.contactBody} required />
      </div>
      <div className="admin-grid">
        <Field label="Email" name="contactEmail" value={content.contactEmail} type="email" required />
        <Field label="Teléfono" name="contactPhone" value={content.contactPhone} />
      </div>
      <Submit />
    </form>
  );
}

type Team = {
  title: string;
  body: string;
  published: boolean;
  videos: Array<{ id: string; url: string; sortOrder: number; published: boolean }>;
};

export function MultidisciplinaryTeamForms({ team }: { team: Team | null }) {
  const videos = team?.videos ?? [];
  return (
    <div className="stack">
      <form action={saveMultidisciplinaryTeam} className="form-card form-grid">
        <h2>Equipo multidisciplinario</h2>
        <TextFields content={team} />
        <Published checked={team?.published ?? false} />
        <Submit />
      </form>
      <section className="stack" aria-labelledby="team-videos-title">
        <h2 id="team-videos-title">Videos</h2>
        {videos.length >= 3 ? (
          <p className="muted">Ya alcanzaste el máximo de 3 links de video.</p>
        ) : (
          <TeamVideoForm nextSortOrder={videos.length ? Math.max(...videos.map((video) => video.sortOrder)) + 1 : 0} />
        )}
        <div className="admin-grid">
          {videos.map((video) => (
            <article key={video.id} className="admin-card stack">
              <TeamVideoForm video={video} />
              <form action={removeTeamVideo}>
                <input type="hidden" name="id" value={video.id} />
                <button className="button danger" type="submit">Eliminar</button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function TeamVideoForm({
  video,
  nextSortOrder = 0,
}: {
  video?: Team["videos"][number];
  nextSortOrder?: number;
}) {
  const suffix = video?.id ?? "new";
  return (
    <form action={saveTeamVideo} className="form-card form-grid">
      <h3>{video ? "Editar video" : "Agregar video"}</h3>
      {video ? <input type="hidden" name="id" value={video.id} /> : null}
      <Field label="URL pública" name="url" value={video?.url} type="url" suffix={suffix} required />
      <Field label="Orden" name="sortOrder" value={String(video?.sortOrder ?? nextSortOrder)} type="number" suffix={suffix} required />
      <Published checked={video?.published ?? true} />
      <Submit label={video ? "Guardar video" : "Agregar video"} />
    </form>
  );
}

function TextFields({
  content,
  bodyLabel = "Texto",
}: {
  content: { title: string; body: string } | null;
  bodyLabel?: string;
}) {
  return (
    <>
      <Field label="Título" name="title" value={content?.title} required />
      <div className="field">
        <label htmlFor="singleton-body">{bodyLabel}</label>
        <textarea id="singleton-body" name="body" defaultValue={content?.body ?? ""} />
      </div>
    </>
  );
}

function ImageFields({ content }: { content: ImageSingleton | null }) {
  return (
    <>
      <Field label="Imagen - Link público de google Drive" name="driveUrl" value={content?.driveUrl} required />
      <Field label="Texto alternativo" name="altText" value={content?.altText} />
    </>
  );
}

function Field({
  label,
  name,
  value,
  type = "text",
  suffix,
  required = false,
}: {
  label: string;
  name: string;
  value?: string | null;
  type?: string;
  suffix?: string;
  required?: boolean;
}) {
  const id = suffix ? `${name}-${suffix}` : name;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type={type} defaultValue={value ?? ""} required={required} min={type === "number" ? 0 : undefined} />
    </div>
  );
}

function Published({ checked }: { checked: boolean }) {
  return (
    <label className="checkbox">
      <input type="hidden" name="published" value="false" />
      <input type="checkbox" name="published" value="true" defaultChecked={checked} />
      Publicado
    </label>
  );
}

function Submit({ label = "Guardar" }: { label?: string }) {
  return <button className="button" type="submit">{label}</button>;
}
