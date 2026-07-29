import {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext.jsx';
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll.js';
import { formatCurrencyFromCents } from '../../../utils/currency.js';
import { buildYampiCheckoutUrl } from '../../../utils/yampiCheckout.js';

function getVariantTypeLabel(type) {
  switch (type) {
    case 'size':
      return 'Tamanho';

    case 'color':
    case 'finish':
      return 'Acabamento';

    default:
      return 'Opção';
  }
}

function getAttributeLabel(attributeName) {
  switch (attributeName) {
    case 'size':
      return 'Tamanho';

    case 'color':
      return 'Cor';

    case 'finish':
      return 'Acabamento';

    default:
      return attributeName;
  }
}

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    totalItems,
    totalPriceCents,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
    closeCart,
  } = useCart();

  const closeButtonRef = useRef(null);

  useLockBodyScroll(isCartOpen);

  const checkoutResult = useMemo(() => {
    if (items.length === 0) {
      return {
        url: null,
        error: null,
      };
    }

    try {
      return {
        url: buildYampiCheckoutUrl(items),
        error: null,
      };
    } catch (error) {
      return {
        url: null,
        error:
          error instanceof Error
            ? error.message
            : 'Não foi possível montar o checkout.',
      };
    }
  }, [items]);

  useEffect(() => {
    if (!isCartOpen) {
      return undefined;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeCart();
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [isCartOpen, closeCart]);

  return (
    <>
      <button
        className={`cart-overlay ${
          isCartOpen ? 'is-open' : ''
        }`}
        aria-label="Fechar carrinho"
        onClick={closeCart}
        tabIndex={isCartOpen ? 0 : -1}
        type="button"
      />

      <aside
        className={`cart-drawer ${
          isCartOpen ? 'is-open' : ''
        }`}
        aria-hidden={!isCartOpen}
        aria-label="Carrinho de compras"
        aria-modal="true"
        role="dialog"
      >
        <header className="cart-drawer__header">
          <div>
            <p className="cart-drawer__eyebrow">
              Sua seleção
            </p>

            <h2>
              Carrinho
              {totalItems > 0
                ? ` (${totalItems})`
                : ''}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            className="cart-drawer__close"
            aria-label="Fechar carrinho"
            onClick={closeCart}
            type="button"
          >
            ×
          </button>
        </header>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <strong>Seu carrinho está vazio.</strong>

              <p>
                Escolha uma peça e adicione ao
                carrinho para continuar.
              </p>

              <button
                className="btn"
                onClick={closeCart}
                type="button"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li
                  className="cart-item"
                  key={item.cartItemId}
                >
                  <Link
                    className="cart-item__image"
                    onClick={closeCart}
                    to={`/produto/${item.slug}`}
                  >
                    {item.image?.src ? (
                      <img
                        alt={
                          item.image.alt ??
                          item.title
                        }
                        src={item.image.src}
                      />
                    ) : (
                      <span>Sem imagem</span>
                    )}
                  </Link>

                  <div className="cart-item__content">
                    <Link
                      className="cart-item__title"
                      onClick={closeCart}
                      to={`/produto/${item.slug}`}
                    >
                      {item.title}
                    </Link>

                    {item.attributes ? (
                      <div className="cart-item__variant">
                        {Object.entries(
                          item.attributes,
                        ).map(([name, value]) => (
                          <span key={name}>
                            {getAttributeLabel(name)}:{' '}
                            {value}
                          </span>
                        ))}
                      </div>
                    ) : item.variantLabel ? (
                      <p className="cart-item__variant">
                        {getVariantTypeLabel(
                          item.variantType,
                        )}
                        : {item.variantLabel}
                      </p>
                    ) : null}

                    {item.variantSku ? (
                      <p className="cart-item__sku">
                        SKU: {item.variantSku}
                      </p>
                    ) : null}

                    <strong className="cart-item__price">
                      {formatCurrencyFromCents(
                        item.priceCents,
                      )}
                    </strong>

                    <div className="cart-item__actions">
                      <div
                        className="cart-item__quantity"
                        aria-label={`Quantidade de ${item.title}`}
                      >
                        <button
                          aria-label="Diminuir quantidade"
                          onClick={() =>
                            decreaseItemQuantity(
                              item.cartItemId,
                            )
                          }
                          type="button"
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          aria-label="Aumentar quantidade"
                          onClick={() =>
                            increaseItemQuantity(
                              item.cartItemId,
                            )
                          }
                          type="button"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="cart-item__remove"
                        onClick={() =>
                          removeItem(
                            item.cartItemId,
                          )
                        }
                        type="button"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <footer className="cart-drawer__footer">
            <div className="cart-drawer__summary">
              <span>
                {totalItems}{' '}
                {totalItems === 1
                  ? 'item'
                  : 'itens'}
              </span>

              <strong>
                {formatCurrencyFromCents(
                  totalPriceCents,
                )}
              </strong>
            </div>

            <p className="cart-drawer__notice">
              O pagamento e os dados de entrega serão
              concluídos com segurança na Yampi.
            </p>

            {checkoutResult.error ? (
              <p className="cart-drawer__error">
                {checkoutResult.error}
              </p>
            ) : null}

            {checkoutResult.url ? (
              <a
                className="btn cart-drawer__checkout"
                href={checkoutResult.url}
                rel="noopener noreferrer"
              >
                Finalizar compra
              </a>
            ) : (
              <button
                className="btn btn--disabled cart-drawer__checkout"
                disabled
                type="button"
              >
                Finalizar compra
              </button>
            )}

            <button
              className="cart-drawer__continue"
              onClick={closeCart}
              type="button"
            >
              Continuar comprando
            </button>

            <button
              className="cart-drawer__clear"
              onClick={clearCart}
              type="button"
            >
              Limpar carrinho
            </button>
          </footer>
        ) : null}
      </aside>
    </>
  );
}