import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, increase, decrease, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return <p>🛒 El carrito está vacío</p>;
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>Carrito</h2>

      {cart.map((p) => (
        <div key={p.id} style={{ marginBottom: "10px" }}>
          <strong>{p.name}</strong> <br />
          S/ {p.price} x {p.quantity}
          <br />
          <button onClick={() => decrease(p.id)}>-</button>
          <button onClick={() => increase(p.id)}>+</button>
          <button onClick={() => removeFromCart(p.id)}>❌</button>
        </div>
      ))}

      <h3>Total: S/ {total.toFixed(2)}</h3>
    </div>
  );
}