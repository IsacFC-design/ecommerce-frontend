import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
      </Routes>

  );
}

export default App;