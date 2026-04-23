import { Navigate, useParams, Link } from 'react-router-dom';
import Container from '../../components/ui/Container/Container.jsx';
import SectionTitle from '../../components/ui/SectionTitle/SectionTitle.jsx';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid.jsx';
import { findSubcategory } from '../../data/navigation.js';
import { getProductsBySubcategory } from '../../data/products.js';

export default function SubcategoryPage() {
  const { groupSlug, subcategorySlug } = useParams();
  const result = findSubcategory(groupSlug, subcategorySlug);

  if (!result) return <Navigate to="/nao-encontrado" replace />;

  const { group, subcategory } = result;
  const products = getProductsBySubcategory(group.slug, subcategory.slug);

  return (
    <section className="page-section catalog-page">
      <Container>
        <div className="catalog-hero">
          <p className="catalog-hero__eyebrow">Subcategoria</p>
          <h1>{subcategory.label}</h1>
          <p>
            <Link to={`/${group.slug}`}>{group.label}</Link> / <strong>{subcategory.label}</strong>
          </p>
        </div>

        <div className="catalog-toolbar">
          <SectionTitle>{subcategory.label}</SectionTitle>
          <div className="catalog-toolbar__meta">{products.length} produtos</div>
        </div>

        <ProductGrid products={products} />
      </Container>
    </section>
  );
}