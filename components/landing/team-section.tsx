import { parseVideoUrl } from "@/lib/embeds";

type TeamVideo = {
  id: string;
  url: string;
};

type Team = {
  title: string;
  body: string;
  videos: TeamVideo[];
};

export function TeamSection({ team }: { team: Team | null }) {
  if (!team) {
    return null;
  }

  const videos = team.videos
    .map((video) => ({ id: video.id, embed: parseVideoUrl(video.url) }))
    .filter((video): video is { id: string; embed: NonNullable<ReturnType<typeof parseVideoUrl>> } =>
      Boolean(video.embed),
    );

  const paragraphs = team.body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section id="equipo" className="landing-section page-shell" aria-labelledby="team-title">
      <p className="section-kicker">Equipo</p>
      <h2 id="team-title" className="display">
        {team.title}
      </h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="team-intro">
          {paragraph}
        </p>
      ))}
      {videos.length > 0 ? (
        <div className="team-videos">
          {videos.map(({ id, embed }) =>
            embed.embedUrl ? (
              <div key={id} className="video-embed">
                <iframe
                  src={embed.embedUrl}
                  title="Video del equipo multidisciplinario"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <a
                key={id}
                className="button secondary video-embed-link"
                href={embed.watchUrl}
                target="_blank"
                rel="noreferrer"
              >
                Ver video
              </a>
            ),
          )}
        </div>
      ) : null}
    </section>
  );
}
