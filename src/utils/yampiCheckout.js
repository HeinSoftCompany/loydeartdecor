const YAMPI_CHECKOUT_HOST = 'loydeartdecor.pay.yampi.com.br';

export const YAMPI_CHECKOUT_BASE_URL =
  `https://${YAMPI_CHECKOUT_HOST}`;

const YAMPI_TOKEN_PATTERN = /^[A-Z0-9]+$/i;

export function extractYampiToken(value) {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const normalizedValue = value.trim();

  if (YAMPI_TOKEN_PATTERN.test(normalizedValue)) {
    return normalizedValue;
  }

  try {
    const parsedUrl = new URL(normalizedValue);

    if (
      parsedUrl.protocol !== 'https:' ||
      parsedUrl.hostname !== YAMPI_CHECKOUT_HOST
    ) {
      return null;
    }

    const match = parsedUrl.pathname.match(/^\/r\/([^/]+)/);

    if (!match) {
      return null;
    }

    const token = decodeURIComponent(match[1]);

    return YAMPI_TOKEN_PATTERN.test(token) ? token : null;
  } catch {
    return null;
  }
}

export function getProductYampiToken(product, variant = null) {
  const possibleValues = [
    variant?.yampiToken,
    variant?.yampiLink,
    product?.yampiToken,
    product?.yampiLink,
  ];

  for (const value of possibleValues) {
    const token = extractYampiToken(value);

    if (token) {
      return token;
    }
  }

  return null;
}

export function buildYampiCheckoutUrl(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('O carrinho está vazio.');
  }

  const checkoutItems = items.map((item) => {
    const token = extractYampiToken(item.yampiToken);
    const quantity = Number.parseInt(item.quantity, 10);

    if (!token) {
      throw new Error(
        `O produto "${item.title}" não possui um token válido da Yampi.`,
      );
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(
        `A quantidade do produto "${item.title}" é inválida.`,
      );
    }

    return `${token}:${quantity}`;
  });

  return `${YAMPI_CHECKOUT_BASE_URL}/r/${checkoutItems.join(',')}`;
}