import { useParams } from "react-router";
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

  if (loading) return <p className="home__message">Chargement...</p>;
  if (error) return <p className="home__message">Erreur : {error}</p>;

  return (
    <main className="container home">
      <h1 className="home__title">
        {category ? category.label : "Tous nos supers produits"}
      </h1>
      <ProductList products={products} />
    </main>
  );
}

export default HomePage;
