const API_URL = "https://ecommerce-mvp-1eo3.onrender.com";

export async function getProducts(category = "", name = "") {
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (name) params.append("name", name);

  const res = await fetch(`${API_URL}/products?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  return res.json();
}

export async function getProductBySlug(slug) {
  const res = await fetch(`${API_URL}/products/slug/${slug}`);

  if (!res.ok) {
    throw new Error("Producto no encontrado");
  }

  return res.json();
}