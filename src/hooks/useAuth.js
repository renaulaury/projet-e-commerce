import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Hook : accès à l'utilisateur everywhere
export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth doit être utilisé à l'intérieur de <AuthProvider>");
  }
  return auth;
}
