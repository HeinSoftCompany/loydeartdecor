export function getProductPriceRange(product) {
  const variantPrices = (product?.variants ?? [])
    .map((variant) => variant.priceCents)
    .filter(
      (price) =>
        Number.isInteger(price) &&
        price >= 0,
    );

  const fallbackPrice =
    Number.isInteger(product?.priceCents)
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