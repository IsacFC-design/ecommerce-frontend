import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Link } from "react-router-dom";
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { cart } = useCart();


  useEffect(() => {
    setLoading(true);

    getProducts(category, search)
      .then((res) => {
        console.log("API RESPONSE:", res); 
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));

  }, [category, search]);

  return (
    <div style={{ padding: "20px" }}>

      <Link to="/checkout">
        🛒 Carrito ({cart.length})
      </Link>
      <h1>Productos</h1>

      <Cart />

      {/*  Buscador */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      />

      {loading && <p>Cargando productos...</p>}

      {!loading && products.length === 0 && (
        <p>No se encontraron productos</p>
      )}

      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: "20px" }}>
          <h3>
            <Link to={`/products/${p.slug}`}>{p.name}</Link>
          </h3>
          <p>{p.description}</p>
          <strong>S/ {p.price}</strong>
        </div>
      ))}
    </div>
  );
}
