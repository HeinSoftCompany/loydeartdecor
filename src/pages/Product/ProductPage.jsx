import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/ui/Container/Container.jsx';
import ProductGallery from '../../components/product/ProductGallery/ProductGallery.jsx';
import CheckoutButton from '../../components/product/CheckoutButton/CheckoutButton.jsx';
import { findProductBySlug } from '../../data/products.js';
import { formatCurrencyFromCents } from '../../utils/currency.js';

export default function ProductPage() {
  const { productSlug } = useParams();
  const product = findProductBySlug(productSlug);

  if (!product) return <Navigate to="/nao-encontrado" replace />;

  return (
    <section className="page-section">
      <Container>
        <div className="product-page">
          <ProductGallery images={product.images} title={product.title} />

          <div className="product-page__content">
            <p className="page-hero__eyebrow">Produto</p>
            <h1>{product.title}</h1>
            <p className="product-page__description">{product.description}</p>

            <div className="product-page__price">{formatCurrencyFromCents(product.priceCents)}</div>

            {product.oldPriceCents ? (
              <div className="product-page__old-price">
                De {formatCurrencyFromCents(product.oldPriceCents)} por hoje
              </div>
            ) : null}

            <div className="product-page__installments">
              Em até {product.installments.count}x de{' '}
              {formatCurrencyFromCents(product.installments.valueCents)} sem juros.
            </div>

            <ul className="product-page__benefits">
              <li>Navegação interna até o momento da compra</li>
              <li>Checkout externo seguro no botão final</li>
              <li>Estrutura pronta para integrar novos produtos e categorias</li>
            </ul>

            <CheckoutButton href={product.yampiLink} />
          </div>
        </div>
      </Container>
    </section>
  );
}
