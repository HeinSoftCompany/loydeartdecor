import { Link } from 'react-router-dom';
import Container from '../../ui/Container/Container.jsx';
import DesktopMegaMenu from '../../navigation/DesktopMegaMenu/DesktopMegaMenu.jsx';

function SearchIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20L16.65 16.65" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5.5 19.5C6.7 16.9 9 15.5 12 15.5C15 15.5 17.3 16.9 18.5 19.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M3 4H5L7.2 14.2C7.4 15.1 8.2 15.7 9.1 15.7H17.2C18.1 15.7 18.9 15.1 19.1 14.2L20.3 8H6.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="9.5" cy="19" fill="currentColor" r="1.2" />
      <circle cx="17.5" cy="19" fill="currentColor" r="1.2" />
    </svg>
  );
}

export default function Header({ navData }) {
  return (
    <header className="header">
      <Container className="header__row">
        <Link className="logo" to="/">
          <span className="logo__mark" />
          <span>LOYDE ART</span>
            <span>& DECORAÇÃO</span>
        </Link>

        <DesktopMegaMenu groups={navData} />

        <div className="header__icons">
          <button className="icon-btn" aria-label="Buscar" type="button">
            <SearchIcon />
          </button>

          <button className="icon-btn" aria-label="Minha conta" type="button">
            <UserIcon />
          </button>

          <button className="icon-btn icon-btn--cart" aria-label="Carrinho" type="button">
            <CartIcon />
            <span className="cart-count">0</span>
          </button>
        </div>
      </Container>

      <div className="promo-bar">FRETE GRÁTIS À PARTIR DE R$ 500</div>
    </header>
  );
}