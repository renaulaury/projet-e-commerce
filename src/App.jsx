import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/CartPage/CartPage";
import CartProvider from "./context/CartProvider";

function App() {
  return (
    // CartProvider autour de tout : le panier est accessible sur toutes les pages
    <CartProvider>
      <BrowserRouter>
        {/* Header et Footer hors de Routes : affichés sur toutes les pages */}
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* :slug lue avec useParams */}
          <Route path="/categorie/:slug" element={<HomePage />} />
          <Route path="/panier" element={<CartPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
