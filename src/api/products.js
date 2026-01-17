const API_URL = "https://ecommerce-mvp-1eo3.onrender.com";

export async function getProducts(category) {
  const url = category
    ? `${API_URL}/products?category=${category}`
    : `${API_URL}/products`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("Error al obtener productos");

  return res.json();
}


export async function getProductBySlug(slug) {
  const res = await fetch(`${API_URL}/products/slug/${slug}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}

