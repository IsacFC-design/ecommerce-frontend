import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createCheckoutSession } from "../api/checkoutService"; 

export default function Checkout() {
  const { cart, increase, decrease, removeFromCart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 🔄 Para manejar estado de carga

  // 🛒 Función para manejar el pago con Stripe
  const handleStripePayment = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    setIsLoading(true);
    
    try {
      // 1. Preparar los items para enviar al backend
      const lineItems = cart.map(item => ({
        price_data: {
          currency: 'pen', // Soles peruanos
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Stripe requiere en centavos
        },
        quantity: item.quantity,
      }));

      // 2. Llamar al servicio de checkout
      const data = await createCheckoutSession({
        line_items: lineItems,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/cart`,
      });

      // 3. Redirigir a Stripe
      window.location.href = data.url;
      
    } catch (error) {
      console.error("Error en el pago:", error);
      alert("Hubo un error al procesar el pago. Intenta nuevamente.");
      setIsLoading(false);
    }
  };

  // 🛍️ Función para "pagar ahora" (simulada - antes de Stripe)
  const handleMockPayment = () => {
    clearCart();
    navigate("/success");
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <Link to="/">Volver a productos</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Checkout</h1>

      {/* Lista de productos en el carrito */}
      {cart.map((p) => (
        <div
          key={p.id}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: "15px",
            paddingBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3>{p.name}</h3>
            <p>S/ {p.price}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button 
              onClick={() => decrease(p.id)}
              style={{ padding: "5px 10px" }}
            >
              -
            </button>
            <span style={{ minWidth: "30px", textAlign: "center" }}>
              {p.quantity}
            </span>
            <button 
              onClick={() => increase(p.id)}
              style={{ padding: "5px 10px" }}
            >
              +
            </button>

            <button
              onClick={() => removeFromCart(p.id)}
              style={{ marginLeft: "20px", color: "red", background: "none", border: "none" }}
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      ))}

      {/* Resumen del total */}
      <div style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #eee",
        borderRadius: "8px",
        background: "#f9f9f9"
      }}>
        <h2>Total: S/ {total.toFixed(2)}</h2>
        
        <div style={{ marginTop: "20px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {/* Botón para pagar con Stripe */}
          <button
            onClick={handleStripePayment}
            disabled={isLoading}
            style={{
              padding: "15px 30px",
              fontSize: "16px",
              background: isLoading ? "#ccc" : "#6772e5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: isLoading ? "not-allowed" : "pointer",
              flex: 1,
              minWidth: "200px"
            }}
          >
            {isLoading ? "Procesando..." : "💳 Pagar con Stripe"}
          </button>

          {/* Botón para pago simulado (opcional - para testing) */}
          <button
            onClick={handleMockPayment}
            style={{
              padding: "15px 30px",
              fontSize: "16px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              flex: 1,
              minWidth: "200px"
            }}
          >
            ✅ Pagar ahora (Simulado)
          </button>
        </div>
        
        {/* Nota informativa */}
        <p style={{ marginTop: "15px", fontSize: "14px", color: "#666" }}>
          <strong>Nota:</strong> "Pagar con Stripe" te redirigirá a una pasarela de pago segura. 
          Puedes usar la tarjeta de prueba: <code>4242 4242 4242 4242</code>
        </p>
      </div>

      {/* Enlace para seguir comprando */}
      <div style={{ marginTop: "20px" }}>
        <Link to="/">← Seguir comprando</Link>
      </div>
    </div>
  );
}