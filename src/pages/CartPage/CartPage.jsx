import { Link } from "react-router";
import { useCart } from "../../hooks/useCart";
import "./CartPage.css";

// Page panier : liste des articles, quantités et total
function CartPage() {
  const { items, count, total, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="container cart">
        <h1 className="cart__title">Votre panier</h1>
        <p className="cart__empty">Votre panier est vide.</p>
        <Link to="/" className="cart__button">
          Continuer mes achats
        </Link>
      </main>
    );
  }

  return (
    <main className="container cart">
      <h1 className="cart__title">Votre panier</h1>

      <ul className="cart__list">
        {items.map((item) => (
          <li key={item.id} className="cart__item">
            <div className="cart__image-wrapper">
              <img src={item.image} alt={item.title} className="cart__image" />
            </div>

            <div className="cart__info">
              <h3 className="cart__item-title">{item.title}</h3>
              <p className="cart__item-price">{item.price.toFixed(2)} €</p>
            </div>

            {/* - / + : à 0 le produit est retiré du panier */}
            <div className="cart__quantity">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label="Retirer un"
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label="Ajouter un"
              >
                +
              </button>
            </div>

            <p className="cart__line-total">
              {(item.price * item.quantity).toFixed(2)} €
            </p>

            <button
              type="button"
              className="cart__remove"
              onClick={() => removeFromCart(item.id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <div className="cart__summary">
        <p>
          {count} article(s) · Total : <strong>{total.toFixed(2)} €</strong>
        </p>
        <Link to="/" className="cart__button">
          Continuer mes achats
        </Link>
      </div>
    </main>
  );
}

export default CartPage;
