import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setLoading(true);

    getProducts(category)
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Productos</h1>

      {/*  FILTRO POR CATEGORÍA */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        <option value="">Todas las categorías</option>
        <option value="smartphones">Smartphones</option>
        <option value="audio">Audio</option>
        <option value="computadoras">Computadoras</option>
        <option value="tecnologia">Tecnología</option>
      </select>

      {/*  LISTADO DE PRODUCTOS */}
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
