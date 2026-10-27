import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";

const USER_KEY = "user";
const CART_KEY = "cart";

// lit une valeur save (fallback si rien ou si le navigateur bloque le stockage)
function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

// Fournit l'utilisateur et le panier à toute l'appli
// (pas de serveur pour l'instant : tout est gardé dans le navigateur)
function AppProvider({ children }) {
  // { name, email } ou null si personne n'est connecté
  const [user, setUser] = useState(() => load(USER_KEY, null));
  // chaque ligne : { id, title, price, image, quantity }
  const [items, setItems] = useState(() => load(CART_KEY, []));

  // save à chaque changement : on reste connecté après un rechargement
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch {
      // stockage indispo : l'utilisateur reste seulement en mémoire
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // stockage indispo : le panier reste seulement en mémoire
    }
  }, [items]);

  // --- utilisateur ---

  // on ne garde jamais le mot de passe
  function login({ name, email }) {
    setUser({ name, email });
  }

  function logout() {
    setUser(null);
  }

  // --- panier ---

  // produit déjà dans le panier : +1 sur la qté, sinon nouvelle ligne
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

  // change qté d'un produit (à 0 ou moins, le produit est retiré)
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

  // nombre total d'articles (somme des qtés), affiché sur l'icône
  const count = items.reduce((total, item) => total + item.quantity, 0);
  // prix total du panier
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        user, login, logout,
        items, count, total, addToCart, updateQuantity, removeFromCart, clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
