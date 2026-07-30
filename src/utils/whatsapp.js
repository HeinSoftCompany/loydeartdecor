const STORE_WHATSAPP_NUMBER = '5581996444751';

export function buildWhatsAppUrl(message = '') {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;
}