import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

// Hook perso : charge les produits (d'une catégorie ou tous) et gère chargement + erreur
export function useProducts(category) {
  // on garde le résultat ET la catégorie à laquelle il correspond
  const [result, setResult] = useState({ category: null, products: [], error: null });

  // nom de la catégorie demandée ("all" sur la page de tous les produits)
  const current = category ?? "all";

  // appel API au montage, puis à chaque changement de catégorie
  useEffect(() => {
    getProducts(category)
      .then((data) => setResult({ category: current, products: data, error: null }))
      .catch((err) => setResult({ category: current, products: [], error: err.message }));
  }, [category, current]);

  // chargement tant que le résultat n'est pas celui de la catégorie demandée
  const loading = result.category !== current;

  return { products: result.products, loading, error: result.error };
}
