import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

// 1 card = 1 prod
function ProductList({ products }) {
  return (
    <div className="product-list">
      {/* key : id unique pour le suivi du produit */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;