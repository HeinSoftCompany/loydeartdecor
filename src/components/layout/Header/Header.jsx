import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Container from '../../ui/Container/Container.jsx';
import DesktopMegaMenu from '../../navigation/DesktopMegaMenu/DesktopMegaMenu.jsx';

import { useCart } from '../../../context/CartContext.jsx';
import { products } from '../../../data/products.js';
import { formatCurrencyFromCents } from '../../../utils/currency.js';

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M20 20L16.65 16.65"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M3 4H5L7.2 14.2C7.4 15.1 8.2 15.7 9.1 15.7H17.2C18.1 15.7 18.9 15.1 19.1 14.2L20.3 8H6.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />

      <circle
        cx="9.5"
        cy="19"
        fill="currentColor"
        r="1.2"
      />

      <circle
        cx="17.5"
        cy="19"
        fill="currentColor"
        r="1.2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="22"
      viewBox="0 0 24 24"
      width="22"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function normalizeText(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function formatCategoryName(value = '') {
  return value
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function createProductSearchText(product) {
  const variantTerms = (product.variants ?? []).flatMap(
    (variant) => [
      variant.id,
      variant.sku,
      variant.label,
      variant.type,
      ...Object.values(variant.attributes ?? {}),
    ],
  );

  return [
    product.title,
    product.slug,
    product.description,
    product.group,
    product.subcategory,
    ...variantTerms,
  ]
    .filter(Boolean)
    .map(normalizeText)
    .join(' ');
}

function getProductPriceRange(product) {
  const variantPrices = (product.variants ?? [])
    .map((variant) => variant.priceCents)
    .filter(
      (priceCents) =>
        Number.isInteger(priceCents) &&
        priceCents >= 0,
    );

  const fallbackPrice =
    Number.isInteger(product.priceCents)
      ? product.priceCents
      : 0;

  const prices =
    variantPrices.length > 0
      ? variantPrices
      : [fallbackPrice];

  const minPriceCents = Math.min(...prices);
  const maxPriceCents = Math.max(...prices);

  return {
    minPriceCents,
    maxPriceCents,
    hasPriceRange:
      minPriceCents !== maxPriceCents,
  };
}

export default function Header({ navData }) {
  const { totalItems, openCart } = useCart();

  const [isSearchOpen, setIsSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');

  const headerRef = useRef(null);
  const searchInputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const normalizedQuery = normalizeText(searchQuery);

  const searchResults = useMemo(() => {
    if (normalizedQuery.length < 2) {
      return [];
    }

    return products
      .filter((product) =>
        createProductSearchText(product).includes(
          normalizedQuery,
        ),
      )
      .slice(0, 8);
  }, [normalizedQuery]);

  function openSearch() {
    setIsSearchOpen(true);
  }

  function closeSearch() {
    setIsSearchOpen(false);
    setSearchQuery('');
  }

  function toggleSearch() {
    if (isSearchOpen) {
      closeSearch();
      return;
    }

    openSearch();
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    const firstResult = searchResults[0];

    if (!firstResult) {
      return;
    }

    navigate(`/produto/${firstResult.slug}`);
    closeSearch();
  }

  function handleOpenCart() {
    closeSearch();
    openCart();
  }

  useEffect(() => {
    if (!isSearchOpen) {
      return undefined;
    }

    const focusTimer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    function handleClickOutside(event) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        closeSearch();
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeSearch();
      }
    }

    document.addEventListener(
      'pointerdown',
      handleClickOutside,
    );

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      window.clearTimeout(focusTimer);

      document.removeEventListener(
        'pointerdown',
        handleClickOutside,
      );

      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [isSearchOpen]);

  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  return (
    <header
      className="header"
      ref={headerRef}
    >
      <Container className="header__row">
        <Link
          className="logo"
          to="/"
          aria-label="Ir para a página inicial"
        >
          <span className="logo__mark" />
          <span>LOYDE ART</span>
          <span>& DECORAÇÃO</span>
        </Link>

        <DesktopMegaMenu groups={navData} />

        <div className="header__icons">
          <button
            className={`icon-btn ${
              isSearchOpen ? 'is-active' : ''
            }`}
            aria-controls="header-search"
            aria-expanded={isSearchOpen}
            aria-label={
              isSearchOpen
                ? 'Fechar pesquisa'
                : 'Buscar produtos'
            }
            onClick={toggleSearch}
            type="button"
          >
            <SearchIcon />
          </button>

          <button
            className="icon-btn"
            aria-label={`Abrir carrinho com ${totalItems} ${
              totalItems === 1
                ? 'item'
                : 'itens'
            }`}
            onClick={handleOpenCart}
            type="button"
          >
            <CartIcon />

            {totalItems > 0 ? (
              <span
                className="cart-count"
                aria-hidden="true"
              >
                {totalItems > 99
                  ? '99+'
                  : totalItems}
              </span>
            ) : null}
          </button>
        </div>
      </Container>

      <section
        className={`header-search ${
          isSearchOpen ? 'is-open' : ''
        }`}
        id="header-search"
        aria-hidden={!isSearchOpen}
      >
        <Container className="header-search__container">
          <form
            className="header-search__form"
            onSubmit={handleSearchSubmit}
            role="search"
          >
            <div className="header-search__heading">
              <label htmlFor="product-search">
                Buscar produtos
              </label>

              <button
                className="header-search__close"
                aria-label="Fechar pesquisa"
                onClick={closeSearch}
                type="button"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="header-search__field">
              <SearchIcon />

              <input
                ref={searchInputRef}
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Digite o nome do produto..."
                autoComplete="off"
              />

              {searchQuery ? (
                <button
                  className="header-search__clear"
                  aria-label="Limpar pesquisa"
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  type="button"
                >
                  Limpar
                </button>
              ) : null}
            </div>
          </form>

          <div
            className="header-search__results"
            aria-live="polite"
          >
            {!searchQuery ? (
              <p className="header-search__message">
                Pesquisar...
              </p>
            ) : null}

            {searchQuery &&
            normalizedQuery.length < 2 ? (
              <p className="header-search__message">
                Digite pelo menos duas letras para
                pesquisar.
              </p>
            ) : null}

            {normalizedQuery.length >= 2 &&
            searchResults.length === 0 ? (
              <p className="header-search__message">
                Nenhum produto encontrado para
                “{searchQuery}”.
              </p>
            ) : null}

            {searchResults.length > 0 ? (
              <>
                <p className="header-search__count">
                  {searchResults.length}{' '}
                  {searchResults.length === 1
                    ? 'produto encontrado'
                    : 'produtos encontrados'}
                </p>

                <ul className="header-search__list">
                  {searchResults.map((product) => {
                    const {
                      minPriceCents,
                      maxPriceCents,
                      hasPriceRange,
                    } = getProductPriceRange(product);

                    return (
                      <li key={product.id}>
                        <Link
                          className="header-search__result"
                          to={`/produto/${product.slug}`}
                          onClick={closeSearch}
                        >
                          <div className="header-search__image">
                            {product.images?.[0]?.src ? (
                              <img
                                src={
                                  product.images[0].src
                                }
                                alt={
                                  product.images[0].alt ??
                                  product.title
                                }
                              />
                            ) : (
                              <span>Sem imagem</span>
                            )}
                          </div>

                          <div className="header-search__product-info">
                            <strong>
                              {product.title}
                            </strong>

                            <small>
                              {formatCategoryName(
                                product.group,
                              )}
                            </small>
                          </div>

                          <div className="header-search__price">
                            {hasPriceRange ? (
                              <>
                                <span>
                                  A partir de
                                </span>

                                <strong>
                                  {formatCurrencyFromCents(
                                    minPriceCents,
                                  )}
                                </strong>

                                <small>
                                  até{' '}
                                  {formatCurrencyFromCents(
                                    maxPriceCents,
                                  )}
                                </small>
                              </>
                            ) : (
                              <strong>
                                {formatCurrencyFromCents(
                                  minPriceCents,
                                )}
                              </strong>
                            )}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <p className="header-search__hint">
                  Pressione Enter para abrir o primeiro
                  resultado.
                </p>
              </>
            ) : null}
          </div>
        </Container>
      </section>
    </header>
  );
}