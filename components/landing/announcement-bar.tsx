"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { isExternalHref, resolveNavHref } from "@/lib/landing-sections";

const SESSION_KEY = "northern-announcement-dismissed";

export type AnnouncementBarContent = {
  id: string;
  message: string;
  linkLabel: string | null;
  href: string | null;
  openInNewTab: boolean;
  dismissible: boolean;
};

export function AnnouncementBar({
  announcement,
}: {
  announcement: AnnouncementBarContent | null;
}) {
  const [dismissed, setDismissed] = useState(false);

  // Read after mount so the server and client markup match on first paint.
  useEffect(() => {
    if (!announcement?.dismissible) return;

    setDismissed(sessionStorage.getItem(SESSION_KEY) === announcement.id);
  }, [announcement?.dismissible, announcement?.id]);

  if (!announcement || dismissed) {
    return null;
  }

  const { message, linkLabel, href, openInNewTab, dismissible } = announcement;
  const resolvedHref = href ? resolveNavHref(href) : null;
  const external = resolvedHref ? isExternalHref(resolvedHref) : false;
  const linkProps =
    external && openInNewTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

  function renderLink(className: string, children: React.ReactNode) {
    if (!resolvedHref) return null;

    return external ? (
      <a className={className} href={resolvedHref} {...linkProps}>
        {children}
      </a>
    ) : (
      <Link className={className} href={resolvedHref}>
        {children}
      </Link>
    );
  }

  const wholeBarIsLink = Boolean(resolvedHref) && !linkLabel;

  return (
    <div className="announcement-bar">
      <div className="announcement-bar-inner page-shell">
        {wholeBarIsLink ? (
          renderLink("announcement-bar-message is-link", message)
        ) : (
          <p className="announcement-bar-message">{message}</p>
        )}
        {linkLabel ? renderLink("announcement-bar-cta", linkLabel) : null}
        {dismissible ? (
          <button
            type="button"
            className="announcement-bar-close"
            aria-label="Cerrar anuncio"
            onClick={() => {
              sessionStorage.setItem(SESSION_KEY, announcement.id);
              setDismissed(true);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
