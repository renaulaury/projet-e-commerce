import "./Footer.css";

// Pied de page : infos de la boutique
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__logo">FAKE STORE</p>
        <p>Projet e-commerce réalisé avec React et la Fake Store API.</p>
        <p className="footer__copyright">© 2026 Fake Store</p>
      </div>
    </footer>
  );
}

export default Footer;
