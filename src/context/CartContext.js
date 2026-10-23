import { createContext } from "react";

// Contexte du panier : partagé entre le Header (compteur) et les cartes produit (bouton)
export const CartContext = createContext(null);
