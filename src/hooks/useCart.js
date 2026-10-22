import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Hook : accès au panier everywhere
export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>");
  }
  return cart;
}
