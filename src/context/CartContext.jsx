import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getProductYampiToken } from '../utils/yampiCheckout.js';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'loyde-art-cart-v1';
const MAX_ITEM_QUANTITY = 99;

function normalizeQuantity(value) {
  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isInteger(parsedValue)) {
    return 1;
  }

  return Math.min(
    Math.max(parsedValue, 1),
    MAX_ITEM_QUANTITY,
  );
}

function readStoredCart() {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items),
      );
    } catch {
      // O carrinho continua funcionando durante a sessão
      // mesmo se o navegador bloquear o localStorage.
    }
  }, [items]);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((currentValue) => !currentValue);
  }, []);

  const addItem = useCallback(
    ({ product, variant = null, quantity = 1 }) => {
      if (!product?.id) {
        throw new Error('O produto informado é inválido.');
      }

      const yampiToken = getProductYampiToken(
        product,
        variant,
      );

      if (!yampiToken) {
        throw new Error(
          'Este produto ainda não possui um link válido da Yampi.',
        );
      }

      const normalizedQuantity =
        normalizeQuantity(quantity);

      const variantIdentifier =
        variant?.sku ||
        variant?.id ||
        yampiToken;

      const cartItemId =
        `${product.id}:${variantIdentifier}`;

      const priceCents =
        variant?.priceCents ??
        product.priceCents ??
        0;

      const image =
        variant?.image ??
        product.images?.[0] ??
        null;

      const newItem = {
        cartItemId,
        productId: product.id,
        slug: product.slug,
        title: product.title,
        priceCents,
        image,
        quantity: normalizedQuantity,
        yampiToken,

        variantId: variant?.id ?? null,
        variantSku: variant?.sku ?? null,
        variantLabel: variant?.label ?? null,
        variantType: variant?.type ?? null,
        attributes: variant?.attributes ?? null,
      };

      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.cartItemId === cartItemId,
        );

        if (!existingItem) {
          return [...currentItems, newItem];
        }

        return currentItems.map((item) => {
          if (item.cartItemId !== cartItemId) {
            return item;
          }

          return {
            ...item,
            quantity: Math.min(
              item.quantity + normalizedQuantity,
              MAX_ITEM_QUANTITY,
            ),
          };
        });
      });

      setIsCartOpen(true);
    },
    [],
  );

  const removeItem = useCallback((cartItemId) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.cartItemId !== cartItemId,
      ),
    );
  }, []);

  const setItemQuantity = useCallback(
    (cartItemId, quantity) => {
      const normalizedQuantity =
        normalizeQuantity(quantity);

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: normalizedQuantity,
              }
            : item,
        ),
      );
    },
    [],
  );

  const increaseItemQuantity = useCallback(
    (cartItemId) => {
      setItems((currentItems) =>
        currentItems.map((item) => {
          if (item.cartItemId !== cartItemId) {
            return item;
          }

          return {
            ...item,
            quantity: Math.min(
              item.quantity + 1,
              MAX_ITEM_QUANTITY,
            ),
          };
        }),
      );
    },
    [],
  );

  const decreaseItemQuantity = useCallback(
    (cartItemId) => {
      setItems((currentItems) =>
        currentItems.flatMap((item) => {
          if (item.cartItemId !== cartItemId) {
            return [item];
          }

          if (item.quantity <= 1) {
            return [];
          }

          return [
            {
              ...item,
              quantity: item.quantity - 1,
            },
          ];
        }),
      );
    },
    [],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [items],
  );

  const totalPriceCents = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.priceCents * item.quantity,
        0,
      ),
    [items],
  );

  const contextValue = useMemo(
    () => ({
      items,
      isCartOpen,
      totalItems,
      totalPriceCents,
      addItem,
      removeItem,
      setItemQuantity,
      increaseItemQuantity,
      decreaseItemQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      items,
      isCartOpen,
      totalItems,
      totalPriceCents,
      addItem,
      removeItem,
      setItemQuantity,
      increaseItemQuantity,
      decreaseItemQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    ],
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart deve ser utilizado dentro de CartProvider.',
    );
  }

  return context;
}