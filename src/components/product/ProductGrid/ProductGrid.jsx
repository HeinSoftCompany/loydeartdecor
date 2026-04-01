import ProductCard from '../ProductCard/ProductCard.jsx';

export default function ProductGrid({ products }) {
  if (!products.length) {
    return <p className="empty-state">Nenhum produto encontrado nesta categoria no momento.</p>;
  }

  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
