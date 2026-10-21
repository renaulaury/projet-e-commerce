import "./ProductCard.css";

// Carte d'un produit : image, titre, avis et prix
function ProductCard({ product }) {
  return (
    <article className="product-card">
      {/* carré de fond derrière l'image */}
      <div className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
      </div>
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__reviews">
        ★ {product.rating.rate} · {product.rating.count} avis
      </p>
      {/* toFixed(2) : toujours 2 décimales (ex : 22.30) */}
      <p className="product-card__price">{product.price.toFixed(2)} €</p>
    </article>
  );
}

export default ProductCard;
