import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const STORAGE_KEY = "cart";

// lit le panier sauvegardé (vide si rien ou si le navigateur bloque le stockage)
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

// Fournit le panier à toute l'application
function CartProvider({ children }) {
  // chaque ligne : { id, title, price, image, quantity }
  const [items, setItems] = useState(loadCart);

  // sauvegarde à chaque changement : le panier survit au rechargement de la page
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // stockage indisponible : le panier reste seulement en mémoire
    }
  }, [items]);

  // produit déjà dans le panier : +1 sur la quantité, sinon nouvelle ligne
  // ... = spread, copie le prod (ou le panier) avant modif
  function addToCart(product) {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const { id, title, price, image } = product;
      return [...current, { id, title, price, image, quantity: 1 }];
    });
  }

  // change la quantité d'un produit ; à 0 ou moins, le produit est retiré
  function updateQuantity(id, quantity) {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  function removeFromCart(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  // vide le panier (après un paiement réussi)
  function clearCart() {
    setItems([]);
  }

  // nombre total d'articles (somme des quantités), affiché sur l'icône
  const count = items.reduce((total, item) => total + item.quantity, 0);
  // prix total du panier
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, count, total, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
