import ProductList from "../../components/ProductList/ProductList";
import { useProducts } from "../../hooks/useProducts";
import "./HomePage.css";

// Page d'accueil avec prods
function HomePage() {
  // récup produits + états chargement / erreur via le hook useProducts
  const { products, loading, error } = useProducts();

  if (loading) return <p className="home__message">Chargement...</p>;
  if (error) return <p className="home__message">Erreur : {error}</p>;

  return (
    <main className="container home">
      <h1 className="home__title">Tous nos supers produits</h1>
      <ProductList products={products} />
    </main>
  );
}

export default HomePage;
