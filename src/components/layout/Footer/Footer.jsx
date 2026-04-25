import { Link } from 'react-router-dom';
import Container from '../../ui/Container/Container.jsx';
import { navigationGroups } from '../../../data/navigation.js';
import melhorEnvio from '../../../assets/shipping/melhorenvio.svg';
import correios from '../../../assets/shipping/correios.svg';

const shippingLogos = [
  { id: 'melhor-envio', src: melhorEnvio, alt: 'Melhor Envio' },
  { id: 'correios', src: correios, alt: 'Correios' },
];

const paymentLogos = [
  {
    id: 'visa',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png',
    alt: 'Visa',
  },
  {
    id: 'mastercard',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png',
    alt: 'Mastercard',
  },
  {
    id: 'amex',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png',
    alt: 'American Express',
  },
  {
    id: 'diners',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/diners@2x.png',
    alt: 'Diners',
  },
  {
    id: 'aura',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/br/aura@2x.png',
    alt: 'Aura',
  },
  {
    id: 'elo',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/br/elo@2x.png',
    alt: 'Elo',
  },
  {
    id: 'hipercard',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/br/hipercard@2x.png',
    alt: 'Hipercard',
  },
  {
    id: 'cash',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/cash@2x.png',
    alt: 'Dinheiro',
  },
  {
    id: 'custom',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/custom@2x.png',
    alt: 'Pagamento personalizado',
  },
  {
    id: 'other',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/other@2x.png',
    alt: 'Outros meios de pagamento',
  },
  {
    id: 'discover',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/br/discover@2x.png',
    alt: 'Discover',
  },
  {
    id: 'boleto',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/boleto@2x.png',
    alt: 'Boleto',
  },
  {
    id: 'pix',
    src: 'https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/payment-method-types/pix@2x.png',
    alt: 'Pix',
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__top">
        <div>
          <h4>Departamentos</h4>
          <ul>

            {navigationGroups.map((group) => (
              <li key={group.id}>
                <Link to={`/${group.slug}`}>{group.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Navegação</h4>
          <ul>
            <li>Quem somos</li>
            <li>Como Comprar</li>
            <li>Trocas e devoluções</li>
            <li>Perguntas Frequentes</li>
          </ul>
        </div>

        <div>
          <h4>Entre em contato</h4>
          <ul>
            <li>loydeartdecor@gmail.com</li>
            <li>Gravatá • Pernambuco</li>
          </ul>

          <div className="socials">
  <a href="https://www.instagram.com/loydeart_decor/" aria-label="Instagram">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
    </svg>
  </a>

  <a href="#" aria-label="Facebook">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.4 21V12.8H16l.4-3.2h-3V7.6c0-.9.3-1.5 1.6-1.5h1.5V3.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.5H8v3.2h2.3V21h3.1Z" />
    </svg>
  </a>

  <a href="mailto:loydeartdecor@gmail.com" aria-label="Email">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 6L12 13L20 6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  </a>
</div>
        </div>
      </Container>

      <Container className="footer__payment">
        <div>
          <h4>Meios de pagamento</h4>

          <div className="footer__icons-wrap footer__icons-wrap--payments">
            {paymentLogos.map((logo) => (
              <img
                key={logo.id}
                className="payment-logo"
                src={logo.src}
                alt={logo.alt}
                width="40"
                height="25"
                loading="lazy"
              />
            ))}
          </div>
        </div>


        <div>
          <h4>Meios de envio</h4>
        <div className="footer__icons-wrap footer__icons-wrap--shipping">
  {shippingLogos.map((logo) => (
    <img
      key={logo.id}
      className="shipping-logo"
      src={logo.src}
      alt={logo.alt}
      loading="lazy"
    />
  ))}
</div>
        </div>
      </Container>

      <Container className="footer__bottom">
        <div>Copyright Loyde Art & Decoração · 2026 · Todos os direitos reservados.</div>

        <div className="brand-credit">
          <span>Desenvolvido por</span>
          <a href="https://www.heinsoft.com.br">
          <strong>HeinSoft Company</strong>
          </a>
        </div>
      </Container>
    </footer>
  );
}