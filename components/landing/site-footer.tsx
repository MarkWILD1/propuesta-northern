export function SiteFooter({
  brand,
  contactTitle,
  contactBody,
  contactEmail,
  contactPhone,
}: {
  brand: string;
  contactTitle: string;
  contactBody: string;
  contactEmail: string;
  contactPhone: string | null;
}) {
  return (
    <footer id="contacto" className="site-footer">
      <div className="site-footer-inner page-shell">
        <div className="site-footer-intro">
          <p className="section-kicker">Contacto</p>
          <h2 className="display">{contactTitle}</h2>
          <p>{contactBody}</p>
          <div className="site-footer-actions">
            <a className="button" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            {contactPhone ? (
              <a className="button secondary" href={`tel:${contactPhone}`}>
                {contactPhone}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="site-footer-base page-shell">
        <span>
          &copy; {new Date().getFullYear()} {brand}
        </span>
      </div>
    </footer>
  );
}
