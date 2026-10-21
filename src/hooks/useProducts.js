import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

// Hook perso : charge les produits et gère chargement + erreur
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // appel API une seule fois au montage
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      // fin du chargement, succès ou erreur
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}