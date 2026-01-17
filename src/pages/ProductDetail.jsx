import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "../api/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart(); // ✅ USAR EL CARRITO

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">⬅ Volver</Link>

      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <strong>S/ {product.price}</strong>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          🛒 Agregar al carrito
        </button>
      </div>

      <h4>Categorías</h4>
      <ul>
        {product.categories.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}