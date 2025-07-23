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

const App = () => {
  return (
    <div className='font-sans select-none  text-[#2f2f2f]'>

      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/ourstory' element={<Ourstroy />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:id' element={<ProductDetailPage />} />
        <Route path='login' element={<AuthPage />} />
      </Routes>
      <Marquee />
      <Footer />
    </div>
  );
};

export default App;
