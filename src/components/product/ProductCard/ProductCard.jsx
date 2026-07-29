import { Link } from "react-router-dom";
import { formatCurrencyFromCents } from "../../../utils/currency.js";
import { useReveal } from "../../../hooks/useReveal.js";

export default function ProductCard({ product }) {
  const revealRef = useReveal();

  const variants = product.variants ?? [];

  const variantPrices = variants
    .map((variant) => variant.priceCents)
    .filter(
      (priceCents) =>
        Number.isInteger(priceCents) && priceCents >= 0,
    );

  const minPriceCents =
    variantPrices.length > 0
      ? Math.min(...variantPrices)
      : product.priceCents;

  const maxPriceCents =
    variantPrices.length > 0
      ? Math.max(...variantPrices)
      : product.priceCents;

  const hasPriceRange =
    variantPrices.length > 0 &&
    minPriceCents !== maxPriceCents;

  const referenceVariant = variants.find(
    (variant) => variant.priceCents === minPriceCents,
  );

  const displayedInstallments =
    referenceVariant?.installments ??
    product.installments ??
    null;

  const hasFreeShipping =
    product.badges?.includes("destaque");

  return (
    <article className="card reveal" ref={revealRef}>
      <Link
        className="card__link"
        to={`/produto/${product.slug}`}
      >
        <div
          className="card__image"
          style={{
            backgroundImage: `url('${product.images?.[0]?.src}')`,
          }}
        >
          {hasFreeShipping ? (
            <div className="tag-ship">
              Destaque
            </div>
          ) : null}
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

              {product.extraColors ? (
                <span className="card__extra-colors">
                  +{product.extraColors}
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="card__title">
            {product.title}
          </div>

          {hasPriceRange ? (
            <div className="price price--range">
              <span className="price__prefix">
                {" "}
              </span>

              <strong>
                {formatCurrencyFromCents(
                  minPriceCents,
                )}
              </strong>

              <span className="price__maximum">
                {" - "}
                {formatCurrencyFromCents(
                  maxPriceCents,
                )}
              </span>
            </div>
          ) : (
            <div className="price">
              {formatCurrencyFromCents(
                minPriceCents,
              )}
            </div>
          )}

          {!hasPriceRange &&
          product.oldPriceCents ? (
            <div>
              <span className="price-old">
                {formatCurrencyFromCents(
                  product.oldPriceCents,
                )}
              </span>
            </div>
          ) : null}

          {hasPriceRange ? (
            <div className="installment">
              Escolha o tamanho para consultar o
              Valor
            </div>
          ) : displayedInstallments ? (
            <div className="installment">
              {displayedInstallments.count}x de{" "}
              {formatCurrencyFromCents(
                displayedInstallments.valueCents,
              )}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}