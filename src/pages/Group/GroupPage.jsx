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
    <section className="page-section">
      <Container>
        <div className="page-hero">
          <p className="page-hero__eyebrow">Grupo principal</p>
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

        <SectionTitle>Produtos em {group.label}</SectionTitle>
        <ProductGrid products={groupProducts} />
      </Container>
    </section>
  );
}
