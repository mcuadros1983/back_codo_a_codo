import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import NotFoundPages from "./components/NotFoundPages";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:id/edit" element={<ProductForm />} />
        <Route path="*" element={<NotFoundPages />} />
      </Routes>
    </>
  );
}
