import { useContext } from "react";
import { AppContext } from "../context/AppContext";

// Hook : accès à l'utilisateur everywhere
export function useAuth() {
  const app = useContext(AppContext);
  if (!app) {
    throw new Error("useAuth doit être utilisé à l'intérieur de <AppProvider>");
  }
  const { user, login, logout } = app;
  return { user, login, logout };
}
