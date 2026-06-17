"use client";

import { useState } from "react";

import { getDriveImageDisplayUrl } from "@/lib/drive";

type ActivityTab = {
  id: string;
  title: string;
  body: string;
  altText: string | null;
  driveFileId: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
};

export function ActivityTabs({
  title,
  activities,
}: {
  title: string;
  activities: ActivityTab[];
}) {
  const [active, setActive] = useState(0);

  if (activities.length === 0) {
    return null;
  }

  const current = activities[active] ?? activities[0];

  return (
    <section
      id="actividades"
      className="landing-section page-shell"
      aria-labelledby="activities-title"
    >
      <p className="section-kicker">Vida escolar</p>
      <h2 id="activities-title" className="display">
        {title}
      </h2>

      <div className="activity-tabs">
        <div className="activity-tablist" role="tablist" aria-label="Actividades">
          {activities.map((activity, index) => (
            <button
              key={activity.id}
              type="button"
              role="tab"
              id={`activity-tab-${activity.id}`}
              aria-selected={index === active}
              aria-controls={`activity-panel-${activity.id}`}
              className={`activity-tab${index === active ? " is-active" : ""}`}
              onClick={() => setActive(index)}
            >
              {activity.title}
            </button>
          ))}
        </div>

        <div
          className="activity-panel"
          role="tabpanel"
          id={`activity-panel-${current.id}`}
          aria-labelledby={`activity-tab-${current.id}`}
        >
          {current.driveFileId ? (
            <div className="activity-media">
              <img
                src={getDriveImageDisplayUrl(current.driveFileId)}
                alt={current.altText ?? current.title}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}
          <div className="activity-content">
            <h3>{current.title}</h3>
            <p>{current.body}</p>
            {current.ctaLabel && current.ctaHref ? (
              <a className="text-link" href={current.ctaHref}>
                {current.ctaLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
