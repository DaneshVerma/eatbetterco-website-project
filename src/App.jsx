import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AuthPage from "./pages/AuthPage";
import Ourstroy from "./pages/OurStory";
import Footer from "./components/Footer";
import Marquee from "./components/Feature-Utility/Marquee";
import ScrollToTop from "./components/Feature-Utility/ScrollTop";
import { ToastContainer } from "react-toastify";
import CartPage from "./pages/CartPage";
import { useLocation } from "react-router-dom";

const App = () => {

  return (
    <div className='font-sans select-none  text-[#2f2f2f]'>
      <ToastContainer
        position='top-center'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />  
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/ourstory' element={<Ourstroy />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:id' element={<ProductDetailPage />} />
        <Route path='login' element={<AuthPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
      <Marquee />
      <Footer />
    </div>
  );
};

export default App;
