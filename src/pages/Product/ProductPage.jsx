import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import Container from "../../components/ui/Container/Container.jsx";
import ProductGallery from "../../components/product/ProductGallery/ProductGallery.jsx";

import { useCart } from "../../context/CartContext.jsx";
import { buildWhatsAppUrl } from "../../utils/whatsapp.js";
import { findProductBySlug } from "../../data/products.js";

import { getProductPriceRange } from "../../utils/productPricing.js";
import { formatCurrencyFromCents } from "../../utils/currency.js";

import {
  buildYampiCheckoutUrl,
  getProductYampiToken,
} from "../../utils/yampiCheckout.js";

const MAX_QUANTITY = 99;

function getAttributeLabel(attributeName) {
  switch (attributeName) {
    case "finish":
      return "Acabamento";

    case "color":
      return "Cor";

    case "size":
      return "Tamanho";

    case "model":
      return "Modelo";

    default:
      return "Opção";
  }
}

function getAttributeOptions(variants) {
  return variants.reduce((options, variant) => {
    const attributes = variant.attributes ?? {};

    Object.entries(attributes).forEach(([attributeName, attributeValue]) => {
      if (!options[attributeName]) {
        options[attributeName] = [];
      }

      if (!options[attributeName].includes(attributeValue)) {
        options[attributeName].push(attributeValue);
      }
    });

    return options;
  }, {});
}

export default function ProductPage() {
  const { productSlug } = useParams();
  const product = findProductBySlug(productSlug);

  const { addItem } = useCart();

  const [selectedAttributes, setSelectedAttributes] = useState({});

  const [quantity, setQuantity] = useState(1);
  const [addError, setAddError] = useState("");

  const variants = useMemo(() => product?.variants ?? [], [product]);

  const attributeOptions = useMemo(
    () => getAttributeOptions(variants),
    [variants],
  );

  useEffect(() => {
    const defaultAttributes = {};

    Object.entries(attributeOptions).forEach(([attributeName, options]) => {
      if (options.length === 1) {
        defaultAttributes[attributeName] = options[0];
      }
    });

    setSelectedAttributes(defaultAttributes);
    setQuantity(1);
    setAddError("");
  }, [productSlug, attributeOptions]);

  const selectedVariant = useMemo(() => {
    if (variants.length === 0) {
      return null;
    }

    const attributeNames = Object.keys(attributeOptions);

    const hasSelectedEveryAttribute = attributeNames.every(
      (attributeName) => selectedAttributes[attributeName],
    );

    if (!hasSelectedEveryAttribute) {
      return null;
    }

    return (
      variants.find((variant) =>
        attributeNames.every(
          (attributeName) =>
            variant.attributes?.[attributeName] ===
            selectedAttributes[attributeName],
        ),
      ) ?? null
    );
  }, [variants, attributeOptions, selectedAttributes]);

  const { minPriceCents, maxPriceCents, hasPriceRange } = useMemo(
    () => getProductPriceRange(product),
    [product],
  );

  const hasVariants = variants.length > 0;

  const displayedPriceCents = selectedVariant?.priceCents ?? minPriceCents;

  const displayedOldPriceCents = selectedVariant
    ? (selectedVariant.oldPriceCents ?? null)
    : !hasVariants
      ? (product?.oldPriceCents ?? null)
      : null;

  const displayedInstallments = selectedVariant
    ? (selectedVariant.installments ?? null)
    : !hasVariants
      ? (product?.installments ?? null)
      : null;
  const selectedYampiToken = useMemo(() => {
    if (!product) {
      return null;
    }

    if (variants.length > 0) {
      if (!selectedVariant) {
        return null;
      }

      return getProductYampiToken(product, selectedVariant);
    }

    return getProductYampiToken(product);
  }, [product, variants, selectedVariant]);

  const checkoutUrl = useMemo(() => {
    if (!product || !selectedYampiToken) {
      return null;
    }

    try {
      return buildYampiCheckoutUrl([
        {
          title: product.title,
          yampiToken: selectedYampiToken,
          quantity,
        },
      ]);
    } catch {
      return null;
    }
  }, [product, selectedYampiToken, quantity]);

  const productWhatsAppUrl = useMemo(() => {
    if (!product) {
      return null;
    }

    const selectedOptions = selectedVariant?.attributes ?? selectedAttributes;

    const optionLines = Object.entries(selectedOptions)
      .filter(([, value]) => Boolean(value))
      .map(
        ([attributeName, value]) =>
          `${getAttributeLabel(attributeName)}: ${value}`,
      );

    const productUrl = `${window.location.origin}/produto/${product.slug}`;

    const message = [
      "Olá! Tenho interesse neste produto:",
      "",
      `*${product.title}*`,
      ...optionLines,
      `Quantidade: ${quantity}`,
      "",
      `Link do produto: ${productUrl}`,
    ].join("\n");

    return buildWhatsAppUrl(message);
  }, [product, selectedVariant, selectedAttributes, quantity]);

  if (!product) {
    return <Navigate to="/nao-encontrado" replace />;
  }

  function isOptionAvailable(attributeName, optionValue) {
    if (variants.length === 0) {
      return true;
    }

    const possibleSelection = {
      ...selectedAttributes,
      [attributeName]: optionValue,
    };

    return variants.some((variant) =>
      Object.entries(possibleSelection).every(([name, value]) => {
        if (!value) {
          return true;
        }

        return variant.attributes?.[name] === value;
      }),
    );
  }

  function handleSelectAttribute(attributeName, optionValue) {
    setSelectedAttributes((currentAttributes) => ({
      ...currentAttributes,
      [attributeName]: optionValue,
    }));

    setAddError("");
  }

  function decreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.min(MAX_QUANTITY, currentQuantity + 1),
    );
  }

  function handleAddToCart() {
    setAddError("");

    if (variants.length > 0 && !selectedVariant) {
      setAddError("Selecione todas as opções do produto.");

      return;
    }

    if (!selectedYampiToken) {
      setAddError("Este produto ainda não possui um link válido da Yampi.");

      return;
    }

    try {
      addItem({
        product,
        variant: selectedVariant,
        quantity,
      });
    } catch (error) {
      setAddError(
        error instanceof Error
          ? error.message
          : "Não foi possível adicionar o produto.",
      );
    }
  }

  const hasIncompleteSelection = variants.length > 0 && !selectedVariant;

  return (
    <section className="page-section">
      <Container>
        <div className="product-page">
          <ProductGallery images={product.images} title={product.title} />

          <div className="product-page__content">
            <h1>{product.title}</h1>

            <p className="product-page__description">{product.description}</p>

            {displayedOldPriceCents ? (
              <div className="product-page__old-price">
                De {formatCurrencyFromCents(displayedOldPriceCents)} por:
              </div>
            ) : null}

            <div className="product-page__price">
              {formatCurrencyFromCents(displayedPriceCents)}
            </div>

            {displayedInstallments ? (
              <div className="product-page__installments">
                Em até {displayedInstallments.count}x de{" "}
                {formatCurrencyFromCents(displayedInstallments.valueCents)} sem
                juros.
              </div>
            ) : null}

            {Object.entries(attributeOptions).map(
              ([attributeName, options]) => (
                <fieldset
                  className="product-page__option-group"
                  key={attributeName}
                >
                  <legend>{getAttributeLabel(attributeName)}</legend>

                  {options.length === 1 ? (
                    <div className="product-page__single-option">
                      {options[0]}
                    </div>
                  ) : (
                    <div className="product-page__option-list">
                      {options.map((optionValue) => {
                        const isSelected =
                          selectedAttributes[attributeName] === optionValue;

                        const isAvailable = isOptionAvailable(
                          attributeName,
                          optionValue,
                        );

                        return (
                          <button
                            className={`product-page__option-button ${
                              isSelected ? "is-selected" : ""
                            }`}
                            disabled={!isAvailable}
                            key={optionValue}
                            onClick={() =>
                              handleSelectAttribute(attributeName, optionValue)
                            }
                            type="button"
                          >
                            {optionValue}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </fieldset>
              ),
            )}

            <div className="product-page__quantity">
              <span>Quantidade</span>

              <div className="product-page__quantity-control">
                <button
                  aria-label="Diminuir quantidade"
                  disabled={quantity <= 1}
                  onClick={decreaseQuantity}
                  type="button"
                >
                  −
                </button>

                <strong>{quantity}</strong>

                <button
                  aria-label="Aumentar quantidade"
                  disabled={quantity >= MAX_QUANTITY}
                  onClick={increaseQuantity}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>

            {hasIncompleteSelection ? (
              <p className="product-page__selection-message">
                Selecione todas as opções para continuar.
              </p>
            ) : null}

            {addError ? (
              <p className="product-page__error">{addError}</p>
            ) : null}

            <div className="product-page__actions">
              <button
                className="btn btn--yellow"
                onClick={handleAddToCart}
                type="button"
              >
                Adicionar ao carrinho
              </button>

              {checkoutUrl ? (
                <a
                  className="btn"
                  href={checkoutUrl}
                  rel="noopener noreferrer"
                  target="_self"
                >
                  Comprar agora
                </a>
              ) : (
                <button className="btn btn--disabled" disabled type="button">
                  Comprar agora
                </button>
              )}

              {productWhatsAppUrl ? (
                <a
                  className="btn btn--whatsapp"
                  href={productWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dúvidas sobre o produto
                </a>
              ) : null}
            </div>

            <ul className="product-page__benefits">
              <li>Produto artesanal feito com cuidado</li>

              <li>Escolha a variação antes de adicionar</li>

              <li>Pagamento e entrega concluídos pela Yampi</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
