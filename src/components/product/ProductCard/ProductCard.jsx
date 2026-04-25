import { Link } from 'react-router-dom';
import { formatCurrencyFromCents } from '../../../utils/currency.js';
import { useReveal } from '../../../hooks/useReveal.js';

export default function ProductCard({ product }) {
  const revealRef = useReveal();

  return (
    <article className="card reveal" ref={revealRef}>
      <Link className="card__link" to={`/produto/${product.slug}`}>
        <div
          className="card__image"
          style={{ backgroundImage: `url('${product.images[0]?.src}')` }}
        >
          {product.badges.includes('frete-gratis') && <div className="tag-ship">Frete grátis</div>}
        </div>

        <div className="card__body">
          {product.colorSwatches?.length ? (
            <div className="card__swatches">
              {product.colorSwatches.map((color) => (
                <span
                  className="card__swatch"
                  key={color}
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
              ))}

              {product.extraColors ? <span className="card__extra-colors">+{product.extraColors}</span> : null}
            </div>
          ) : null}

          <div className="card__title">{product.title}</div>

          <div className="price">{formatCurrencyFromCents(product.priceCents)}</div>

          {product.oldPriceCents ? (
            <div>
              <span className="price-old">{formatCurrencyFromCents(product.oldPriceCents)}</span>
            </div>
          ) : null}

          <div className="installment">
            10 x de {formatCurrencyFromCents(product.installments.valueCents)}
          </div>
        </div>
      </Link>
    </article>
  );
}