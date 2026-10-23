import { useParams, useSearchParams } from "react-router";
import ProductList from "../../components/ProductList/ProductList";
import { useProducts } from "../../hooks/useProducts";
import { categories } from "../../data/categories";
import "./HomePage.css";

// Page d'accueil avec prods (tous, ou ceux d'une catégorie)
function HomePage() {
  // slug de l'URL : /categorie/bijoux -> "bijoux" (undefined sur "/")
  const { slug } = useParams();
  const category = categories.find((item) => item.slug === slug);

  // récup produits + états chargement / erreur via le hook useProducts
  const { products, loading, error } = useProducts(category?.api);

  // texte de la barre de recherche : ?recherche=... dans l'URL
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("recherche") ?? "").trim().toLowerCase();

  if (loading) return <p className="home__message">Chargement...</p>;
  if (error) return <p className="home__message">Erreur : {error}</p>;

  // filtre sur le nom du produit (sans tenir compte des majuscules)
  const filteredProducts = query
    ? products.filter((product) => product.title.toLowerCase().includes(query))
    : products;

  return (
    <main className="container home">
      <h1 className="home__title">
        {category ? category.label : "Tous nos supers produits"}
      </h1>
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <p className="home__message">Aucun produit ne correspond à votre recherche.</p>
      )}
    </main>
  );
}

export default HomePage;
