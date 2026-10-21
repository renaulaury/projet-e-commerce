const BASE_URL = "https://fakestoreapi.com";

// Récup liste produits
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);

  // on vérifie nous-mêmes les erreurs (fetch fait pas 404/500)
  if (!response.ok) {
    throw new Error("Impossible de charger les produits");
  }

  // conversion JSON en tabl prod
  return response.json();
}
