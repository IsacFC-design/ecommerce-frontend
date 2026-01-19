import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
  const { cart, increase, decrease, removeFromCart, total } = useCart();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  if (cart.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <Link to="/">Volver a productos</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      {cart.map((p) => (
        <div
          key={p.id}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: "15px",
            paddingBottom: "10px",
          }}
        >
          <h3>{p.name}</h3>
          <p>S/ {p.price}</p>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => decrease(p.id)}>-</button>
            <span>{p.quantity}</span>
            <button onClick={() => increase(p.id)}>+</button>

            <button
              onClick={() => removeFromCart(p.id)}
              style={{ marginLeft: "20px", color: "red" }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <h2>Total: S/ {total}</h2>

      <button
        onClick={() => {
          clearCart();
          navigate("/success");
        }}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        Pagar ahora
      </button>
    </div>
  );
}