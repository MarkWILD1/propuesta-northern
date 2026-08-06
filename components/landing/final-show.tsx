"use client";

import { useEffect, useState } from "react";

import { parseYouTubeUrl } from "@/lib/embeds";

type FinalShowContent = {
  title: string;
  body: string;
  eventAt: string | null;
  videoUrl: string | null;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

function computeTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    finished: false,
  };
}

function Countdown({ target }: { target: number }) {
  const [timeLeft, setTimeLeft] = useState(() => computeTimeLeft(target));

  useEffect(() => {
    setTimeLeft(computeTimeLeft(target));
    const interval = setInterval(() => {
      setTimeLeft(computeTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  if (timeLeft.finished) {
    return <p className="final-show-status">El evento ya comenzó.</p>;
  }

  const units: Array<[number, string]> = [
    [timeLeft.days, "Días"],
    [timeLeft.hours, "Horas"],
    [timeLeft.minutes, "Minutos"],
    [timeLeft.seconds, "Segundos"],
  ];

  return (
    <div className="final-show-countdown" role="timer" aria-live="off">
      {units.map(([value, label]) => (
        <div key={label} className="countdown-unit">
          <span className="countdown-value">{String(value).padStart(2, "0")}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function FinalShow({ content }: { content: FinalShowContent | null }) {
  if (!content) {
    return null;
  }

  const hasTitle = content.title.trim().length > 0;
  const hasBody = content.body.trim().length > 0;
  const targetTime = content.eventAt ? Date.parse(content.eventAt) : NaN;
  const hasCountdown = !Number.isNaN(targetTime);
  const youtube = parseYouTubeUrl(content.videoUrl);

  if (!hasTitle && !hasBody && !hasCountdown && !youtube) {
    return null;
  }

  const paragraphs = content.body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section id="final-show" className="final-show" aria-labelledby="final-show-title">
      <div className="page-shell final-show-inner">
        <p className="section-kicker">Countdown</p>
        {hasTitle ? (
          <h2 id="final-show-title" className="display">
            {content.title}
          </h2>
        ) : (
          <h2 id="final-show-title" className="display">
            The Final Show
          </h2>
        )}
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="final-show-body">
            {paragraph}
          </p>
        ))}
        {hasCountdown ? <Countdown target={targetTime} /> : null}
        {youtube ? (
          <div className="final-show-video">
            <a
              className="final-show-video-link"
              href={youtube.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mirar el video en YouTube"
            >
              <img
                className="final-show-video-thumb"
                src={`https://i.ytimg.com/vi/${youtube.videoId}/hqdefault.jpg`}
                alt=""
                width={860}
                height={484}
                loading="lazy"
                decoding="async"
              />
              <span className="final-show-video-play" aria-hidden="true">
                <span className="final-show-video-play-icon" />
              </span>
            </a>
            <a
              className="button final-show-youtube-button"
              href={youtube.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mirar en YouTube
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
