import { createContext } from "react";

// Contexte de l'utilisateur : partagé entre le Header (Salut "nom") et la page d'inscription
export const AuthContext = createContext(null);
