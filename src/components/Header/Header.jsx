import "./Header.css";

// En-tête : logo et panier
function Header() {
  return (
    <header className="header">
      <div className="container header__bar">
        <a href="/" className="header__logo">
          FAKE STORE
        </a>

        <a href="#" className="header__cart">
          Panier (0)
        </a>
      </div>
    </header>
  );
}

export default Header;
