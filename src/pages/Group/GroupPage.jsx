import { Navigate, Link, useParams } from 'react-router-dom';
import Container from '../../components/ui/Container/Container.jsx';
import SectionTitle from '../../components/ui/SectionTitle/SectionTitle.jsx';
import ProductGrid from '../../components/product/ProductGrid/ProductGrid.jsx';
import { findGroupBySlug } from '../../data/navigation.js';
import { getProductsByGroup } from '../../data/products.js';

export default function GroupPage() {
  const { groupSlug } = useParams();
  const group = findGroupBySlug(groupSlug);

  if (!group) return <Navigate to="/nao-encontrado" replace />;

  const groupProducts = getProductsByGroup(group.slug);

  return (
    <section className="page-section catalog-page">
      <Container>
        <div className="catalog-hero">
          <p className="catalog-hero__eyebrow">Categoria</p>
          <h1>{group.label}</h1>
          <p>{group.description}</p>
        </div>

        <div className="subcategory-links">
          {group.items.map((item) => (
            <Link key={item.id} to={`/${group.slug}/${item.slug}`}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="catalog-toolbar">
          <SectionTitle>{group.label}</SectionTitle>
          <div className="catalog-toolbar__meta">{groupProducts.length} produtos</div>
        </div>

        <ProductGrid products={groupProducts} />
      </Container>
    </section>
  );
}