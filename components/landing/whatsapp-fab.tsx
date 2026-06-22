function whatsappHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function WhatsAppFab({ phone }: { phone: string | null }) {
  const trimmed = phone?.trim();
  if (!trimmed) {
    return null;
  }

  return (
    <a
      className="whatsapp-fab"
      href={whatsappHref(trimmed)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <img src="/whatsapp-icon.png" alt="" width={56} height={56} />
    </a>
  );
}
