import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>✅ Compra realizada con éxito</h1>
      <p>Gracias por tu compra.</p>

      <Link to="/">Volver a la tienda</Link>
    </div>
  );
}

