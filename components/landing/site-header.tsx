import Link from "next/link";

export function SiteHeader({
  brand,
  eyebrow,
}: {
  brand: string;
  eyebrow: string;
}) {
  return (
    <header className="site-header">
      <div className="site-header-inner page-shell">
        <Link className="site-brand" href="/" aria-label={brand}>
          <img
            className="site-brand-logo"
            src="/logo-northern.png"
            alt={brand}
            width={1024}
            height={705}
          />
          <span className="sr-only">{eyebrow}</span>
        </Link>
      </div>
    </header>
  );
}
