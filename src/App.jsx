import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";

function App() {
  return (

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

  );
}

export default App;