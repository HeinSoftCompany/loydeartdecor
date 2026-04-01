import Container from '../../ui/Container/Container.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__top">
        <div>
          <h4>Departamentos</h4>
          <ul>
            <li>Últimos artigos em estoque!</li>
            <li>Arte em Barro</li>
            <li>Cozinha</li>
            <li>Decoração</li>
            <li>Mesa Posta</li>
            <li>Tecidos</li>
          </ul>
        </div>

        <div>
          <h4>Navegação</h4>
          <ul>
            <li>Quem somos</li>
            <li>Como Comprar</li>
            <li>Trocas e devoluções</li>
            <li>Perguntas Frequentes</li>
          </ul>
        </div>

        <div>
          <h4>Entre em contato</h4>
          <ul>
            <li>contato@loydeart.com.br</li>
            <li>Recife • Pernambuco</li>
          </ul>
          <div className="socials">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="YouTube">▶</a>
            <a href="#" aria-label="TikTok">♪</a>
            <a href="#" aria-label="X">X</a>
          </div>
        </div>
      </Container>

      <Container className="footer__payment">
        <div>
          <h4>Meios de pagamento</h4>
          <div className="footer__icons-wrap">
            {['VISA', 'MC', 'ELO', 'AMEX', 'PIX', 'BOL', 'DISC', 'HIPER'].map((item) => (
              <div className="pay-chip" key={item}>{item}</div>
            ))}
          </div>
        </div>

        <div>
          <h4>Meios de envio</h4>
          <div className="footer__icons-wrap">
            <div className="pay-chip">Transportadora</div>
            <div className="pay-chip">Yampi</div>
          </div>
        </div>
      </Container>

      <Container className="footer__bottom">
        <div>Copyright Loyde Art &amp; Decoração · 2026. Todos os direitos reservados.</div>
        <div className="brand-credit"><span>Desenvolvido por</span><strong>HeinSoft Company</strong></div>
      </Container>
    </footer>
  );
}
