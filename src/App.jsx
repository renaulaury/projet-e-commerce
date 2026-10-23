import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/CartPage/CartPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CartProvider from "./context/CartProvider";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (    
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* :slug lue avec useParams */}
            <Route path="/categorie/:slug" element={<HomePage />} />
            <Route path="/panier" element={<CartPage />} />
            {/* retour de Stripe après paiement */}
            <Route path="/commande/succes" element={<SuccessPage />} />
            <Route path="/inscription" element={<RegisterPage />} />
            <Route path="/connexion" element={<LoginPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
