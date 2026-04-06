import { Link } from 'react-router-dom';
import Container from '../../ui/Container/Container.jsx';
import DesktopMegaMenu from '../../navigation/DesktopMegaMenu/DesktopMegaMenu.jsx';

export default function Header({ navData }) {
  return (
    <>
      <div className="top-strip" />

      <header className="header">
        <Container className="header__row">
          <Link className="logo" to="/">
            <span>LOYDE ART</span>
            <span>& DECORAÇÃO</span>
          </Link>

          <DesktopMegaMenu groups={navData} />

          <div className="header__icons">
            <button className="icon-btn" aria-label="Buscar" type="button">
              🔍
            </button>
          </div>
        </Container>

        <div className="promo-bar">Frete grátis à partir de R$ 500</div>
      </header>
    </>
  );
}