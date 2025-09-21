import AuthPage from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import OurStory from "../pages/OurStory";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage";
import { Route, Routes } from "react-router-dom";


const RouteComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/ourstory' element={<OurStory />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/product/:id' element={<ProductDetailPage />} />
      <Route path='login' element={<AuthPage />} />
      <Route path='/cart' element={<CartPage />} />
    </Routes>
  );
};

export default RouteComponent;
