import { buildWhatsAppUrl } from '../../../utils/whatsapp';

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="27"
      viewBox="0 0 24 24"
      width="27"
    >
      <path
        d="M8.2 7.4C8.5 6.9 8.8 6.9 9.1 6.9H9.5C9.7 6.9 9.9 7 10 7.3L10.8 9.2C10.9 9.5 10.9 9.7 10.7 9.9L10.1 10.7C10 10.9 10 11.1 10.1 11.3C10.7 12.3 11.5 13.1 12.5 13.7C12.7 13.8 12.9 13.8 13.1 13.6L13.9 12.7C14.1 12.5 14.3 12.5 14.6 12.6L16.4 13.5C16.7 13.6 16.8 13.8 16.8 14.1C16.8 14.7 16.5 15.5 16 15.9C15.5 16.4 14.7 16.7 13.9 16.5C12.7 16.2 10.9 15.5 9.3 14C7.9 12.6 7.1 11 6.8 9.8C6.6 8.9 7.1 8 8.2 7.4Z"
        fill="currentColor"
      />

      <path
        d="M20 11.7C20 16.1 16.4 19.7 12 19.7C10.6 19.7 9.3 19.4 8.2 18.8L4 20L5.2 16C4.4 14.8 4 13.3 4 11.7C4 7.3 7.6 3.7 12 3.7C16.4 3.7 20 7.3 20 11.7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function WhatsAppFloatingButton() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá! Vim pelo site da Loyde Art & Decoração e gostaria de tirar uma dúvida.',
  );

  return (
    <a
      className="whatsapp-floating"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Loyde Art & Decoração pelo WhatsApp"
      title="Falar pelo WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}