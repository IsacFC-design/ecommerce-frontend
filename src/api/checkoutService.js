export async function createCheckoutSession(payload) {
  const response = await fetch(
    "https://ecommerce-mvp-1.onrender.com/checkout/create-session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Error al crear la sesión de pago");
  }

  return response.json(); // { url }
}