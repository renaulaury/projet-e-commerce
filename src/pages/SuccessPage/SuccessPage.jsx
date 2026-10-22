import { useEffect } from "react";
import { Link } from "react-router";
import { useCart } from "../../hooks/useCart";
import "../CartPage/CartPage.css";

// Page de retour de Stripe après un paiement réussi
function SuccessPage() {
  const { clearCart } = useCart();

  // commande payée : on vide le panier
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- une seule fois, à l'arrivée sur la page
  }, []);

  return (
    <main className="container cart">
      <h1 className="cart__title">Merci pour votre commande !</h1>
      <p className="cart__empty">Votre paiement a bien été accepté.</p>
      <Link to="/" className="cart__button">
        Retour à la boutique
      </Link>
    </main>
  );
}

export default SuccessPage;
