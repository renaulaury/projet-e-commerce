const BASE_URL = "https://fakestoreapi.com";

// Récup liste produits (tous, ou d'une seule catégorie si on la donne)
export async function getProducts(category) {
  // encodeURIComponent : gère l'apostrophe et l'espace de "men's clothing"
  const url = category
    ? `${BASE_URL}/products/category/${encodeURIComponent(category)}`
    : `${BASE_URL}/products`;

  const response = await fetch(url);

  // on vérifie nous-mêmes les erreurs (fetch fait pas 404/500)
  if (!response.ok) {
    throw new Error("Impossible de charger les produits");
  }

  // conversion JSON en tabl prod
  return response.json();
}
