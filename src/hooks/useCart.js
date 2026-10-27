import { useContext } from "react";
import { AppContext } from "../context/AppContext";

// Hook : accès au panier everywhere
export function useCart() {
  const app = useContext(AppContext);
  if (!app) {
    throw new Error("useCart doit être utilisé à l'intérieur de <AppProvider>");
  }
  const { items, count, total, addToCart, updateQuantity, removeFromCart, clearCart } = app;
  return { items, count, total, addToCart, updateQuantity, removeFromCart, clearCart };
}
