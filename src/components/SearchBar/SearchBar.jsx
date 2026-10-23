import { useLocation, useNavigate, useSearchParams } from "react-router";
import "./SearchBar.css";

// Barre de recherche : le texte tapé est gardé dans l'URL (?recherche=...)
function SearchBar() {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const query = searchParams.get("recherche") ?? "";

  // on reste sur la page produits en cours (accueil ou catégorie), sinon retour à l'accueil
  const isProductPage = pathname === "/" || pathname.startsWith("/categorie/");

  function handleChange(event) {
    const value = event.target.value;
    navigate(
      {
        pathname: isProductPage ? pathname : "/",
        search: value ? `?recherche=${encodeURIComponent(value)}` : "",
      },
      // replace : pas une entrée d'historique par lettre tapée
      { replace: isProductPage }
    );
  }

  return (
    <form className="search-bar" role="search" onSubmit={(event) => event.preventDefault()}>
      {/* icône loupe */}
      <svg
        className="search-bar__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
      <input
        type="search"
        className="search-bar__input"
        placeholder="Rechercher un produit"
        aria-label="Rechercher un produit"
        value={query}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchBar;
