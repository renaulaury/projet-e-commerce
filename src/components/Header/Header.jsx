import { Link, NavLink } from "react-router";
import { categories } from "../../data/categories";
import "./Header.css";

// En-tête : logo, liens des catégories et panier
function Header() {
  return (
    <header className="header">
      <div className="container header__bar">
        <Link to="/" className="header__logo">
          FAKE STORE
        </Link>

        {/* NavLink ajoute la classe "active" sur le lien de la page en cours */}
        <nav className="header__nav">
          <NavLink to="/" end>
            Tous les produits
          </NavLink>
          {categories.map((category) => (
            <NavLink key={category.slug} to={`/categorie/${category.slug}`}>
              {category.label}
            </NavLink>
          ))}
        </nav>

        <a href="#" className="header__cart">
          Panier (0)
        </a>
      </div>
    </header>
  );
}

export default Header;
