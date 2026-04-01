import { Navigate, useParams } from 'react-router-dom';
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
    <section className="page-section">
      <Container>
        <div className="page-hero">
          <p className="page-hero__eyebrow">Subcategoria</p>
          <h1>{subcategory.label}</h1>
          <p>
            Você está em <strong>{group.label}</strong> / {subcategory.label}
          </p>
        </div>

        <SectionTitle>{subcategory.label}</SectionTitle>
        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
