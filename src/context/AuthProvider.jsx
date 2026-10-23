import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "user";

// lit l'utilisateur sauvegardé (null si rien ou si le navigateur bloque le stockage)
function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

// Fournit l'utilisateur à toute l'application
// (pas de serveur pour l'instant : l'utilisateur est seulement gardé dans le navigateur)
function AuthProvider({ children }) {
  // { name, email } ou null si personne n'est connecté
  const [user, setUser] = useState(loadUser);

  // sauvegarde à chaque changement : on reste connecté après un rechargement
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // stockage indisponible : l'utilisateur reste seulement en mémoire
    }
  }, [user]);

  // on ne garde jamais le mot de passe
  function login({ name, email }) {
    setUser({ name, email });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
