import { Link, NavLink } from "react-router";
import { categories } from "../../data/categories";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

// En-tête : logo, liens des catégories, recherche, compte et panier
function Header() {
  const { count } = useCart();
  const { user, logout } = useAuth();

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

        <SearchBar />

        {/* connecté : Salut "nom" / Déco, sinon S'inscrire / Connexion */}
        <nav className="header__account">
          {user ? (
            <>
              <span className="header__user">Salut {user.name}</span>
              <span aria-hidden="true">/</span>
              <button type="button" className="header__logout" onClick={logout}>
                Déco
              </button>
            </>
          ) : (
            <>
              <NavLink to="/inscription">S'inscrire</NavLink>
              <span aria-hidden="true">/</span>
              <NavLink to="/connexion">Connexion</NavLink>
            </>
          )}
        </nav>

        <Link to="/panier" className="header__cart" aria-label={`Panier : ${count} article(s)`}>
          {/* icône sac de courses */}
          <svg
            className="header__cart-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 7h12l-1 13H7L6 7z" />
            <path d="M9 7V5a3 3 0 0 1 6 0v2" />
          </svg>
          {/* pastille affichée seulement si le panier n'est pas vide ;
              key={count} relance l'animation à chaque ajout */}
          {count > 0 && (
            <span key={count} className="header__cart-badge">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
