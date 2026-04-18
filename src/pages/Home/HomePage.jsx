import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container/Container.jsx';
import Button from '../../components/ui/Button/Button.jsx';
import SectionTitle from '../../components/ui/SectionTitle/SectionTitle.jsx';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid.jsx';
import { navigationGroups } from '../../data/navigation.js';
import { getFeaturedProducts, getOfferProducts } from '../../data/products.js';
import { useReveal } from '../../hooks/useReveal.js';

export default function HomePage() {
  const heroRef = useReveal();
  const promoRef = useReveal();
  const groupsRef = useReveal();

  const featuredProducts = getFeaturedProducts(3);
  const offerProducts = getOfferProducts(3);

  return (
    <>
      <section className="hero">
        <div className="hero__grid">
          <div className="hero__content reveal" ref={heroRef}>
            <div className="hero__eyebrow">Ofertas exclusivas</div>
            <h1>
              Inspiração para decorar <span className="hero__arrow">→</span>
            </h1>
            <p>Ideias para transformar sua casa em uma verdadeira obra de arte.</p>
            <Button to="/decoracao">Ver mais</Button>
          </div>
          <div className="hero__visual" />
        </div>
      </section>

      <div className="ticker">
        <div className="ticker__track">
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index}>DIVIDIMOS EM ATÉ 12X S/JUROS</span>
          ))}
        </div>
      </div>

      <section className="section">
        <Container>
          <SectionTitle>Em destaque</SectionTitle>
          <ProductGrid products={featuredProducts} />

          <div className="promo-grid reveal" ref={promoRef}>
            <div className="promo-box">
              <div className="promo-box__content">
                <small>Todo o mês</small>
                <strong>Produtos temáticos</strong>
                <span>em selecionados</span>
                <div style={{ fontSize: '2rem', marginTop: '6px' }}>→</div>
              </div>
              <div className="promo-box__icon">📣</div>
            </div>

            <div className="promo-box">
              <div className="promo-box__content">
                <small>Todo o mês</small>
                <strong>50% OFF</strong>
                <span>em selecionados</span>
                <div style={{ fontSize: '2rem', marginTop: '6px' }}>→</div>
              </div>
              <div className="promo-box__icon">%</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container className="category-grid reveal" ref={groupsRef}>
          {navigationGroups.map((group) => (
            <article className="category-card" key={group.id}>
              <div className="category-card__image category-card__image--placeholder" />
              <div className="category-card__body">
                <h3>{group.label}</h3>
                <Button className="btn--yellow" to={`/${group.slug}`}>
                  Ver mais
                </Button>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="section offers-section">
        <Container>
          <SectionTitle>Ofertas</SectionTitle>
          <ProductGrid products={offerProducts} />
          <div className="offer-slider-dots">
            <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>‹</span>
            <div className="dot" />
            <div className="dot is-active" />
            <div className="dot" />
            <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>›</span>
          </div>
        </Container>
      </section>
    </>
  );
}
