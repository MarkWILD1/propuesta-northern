type Location = {
  id: string;
  name: string;
  addressLines: string;
  phone: string | null;
};

export function SiteFooter({
  brand,
  contactTitle,
  contactBody,
  contactEmail,
  contactPhone,
  locations,
}: {
  brand: string;
  contactTitle: string;
  contactBody: string;
  contactEmail: string;
  contactPhone: string | null;
  locations: Location[];
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

        {locations.length > 0 ? (
          <div className="site-footer-locations">
            {locations.map((location) => (
              <div key={location.id} className="footer-location">
                <strong>{location.name}</strong>
                {location.addressLines.split("\n").map((line, index) => (
                  <span key={index}>{line}</span>
                ))}
                {location.phone ? <span className="footer-phone">{location.phone}</span> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="site-footer-base page-shell">
        <span>
          &copy; {new Date().getFullYear()} {brand}
        </span>
      </div>
    </footer>
  );
}
