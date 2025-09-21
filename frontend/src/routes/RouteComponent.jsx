import AuthPage from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import OurStory from "../pages/OurStory";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/Profile";

const RouteComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/ourstory' element={<OurStory />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/product/:id' element={<ProductDetailPage />} />
      <Route path='login' element={<AuthPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default RouteComponent;
