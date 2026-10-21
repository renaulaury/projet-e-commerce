import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      {/* Header et Footer hors de Routes : affichés sur toutes les pages */}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* :slug = partie variable de l'URL, lue avec useParams */}
        <Route path="/categorie/:slug" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
