import { buildWhatsAppUrl } from "../../../utils/whatsapp.js";

function WhatsappIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="31"
      viewBox="0 0 32 32"
      width="31"
    >
      <path d="M16.04 3C8.85 3 3 8.77 3 15.86c0 2.48.72 4.9 2.08 6.97L3.7 28l5.34-1.38a13.1 13.1 0 0 0 6.99 2.02h.01C23.23 28.64 29 22.87 29 15.86 29 8.77 23.23 3 16.04 3Zm0 23.47h-.01a10.91 10.91 0 0 1-5.57-1.53l-.4-.24-3.17.82.85-3.06-.26-.42a10.64 10.64 0 0 1-1.68-5.75c0-5.93 4.86-10.76 10.84-10.76 2.9 0 5.62 1.12 7.66 3.14a10.66 10.66 0 0 1 3.18 7.62c0 5.93-4.86 10.18-11.44 10.18Zm5.94-8.05c-.33-.16-1.94-.95-2.24-1.06-.3-.11-.52-.16-.74.16-.22.33-.85 1.06-1.04 1.28-.19.22-.38.24-.71.08-.33-.16-1.38-.5-2.63-1.6a9.84 9.84 0 0 1-1.82-2.24c-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.77-1.01-2.42-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71 0 1.6 1.17 3.14 1.33 3.36.16.22 2.29 3.48 5.55 4.88.78.33 1.38.53 1.85.68.78.24 1.49.21 2.05.13.63-.09 1.94-.79 2.21-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38Z" />
    </svg>
  );
}

export default function WhatsappContact() {
  const whatsappUrl = buildWhatsAppUrl(
    "Olá! Vim pelo site da Loyde Art & Decoração e gostaria de falar com uma atendente.",
  );

  return (
    <a
      aria-label="Falar com uma atendente pelo WhatsApp"
      className="whatsapp-contact"
      href={whatsappUrl}
      rel="noopener noreferrer"
      target="_blank"
      title="Fale conosco pelo WhatsApp"
    >
      <WhatsappIcon />

      <span className="whatsapp-contact__tooltip">
        Fale conosco
      </span>
    </a>
  );
}