import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container/Container.jsx';

export default function NotFoundPage() {
  return (
    <section className="page-section">
      <Container>
        <div className="page-hero">
          <p className="page-hero__eyebrow">404</p>
          <h1>Página não encontrada</h1>
          <p>O caminho acessado não existe ou foi alterado.</p>
          <Link className="btn" to="/">
            Voltar para a home
          </Link>
        </div>
      </Container>
    </section>
  );
}
