import { isAllowedExternalUrl } from '../../../utils/urlPolicy.js';

export default function CheckoutButton({ href }) {
  if (!isAllowedExternalUrl(href)) {
    return (
      <button className="btn btn--disabled" disabled type="button">
        Link de checkout inválido
      </button>
    );
  }

  return (
    <a className="btn" href={href} rel="noopener noreferrer" target="_blank">
      Comprar agora
    </a>
  );
}
