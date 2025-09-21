import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Marquee from "./components/Feature-Utility/Marquee";
import ScrollToTop from "./components/Feature-Utility/ScrollTop";
import { ToastContainer } from "react-toastify";
import RouteComponent from "./routes/RouteComponent";

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
      <RouteComponent />
      <Marquee />
      <Footer />
    </div>
  );
};

export default App;
