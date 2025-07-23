import HeroSection from "../components/HeroSection";
import WhyEatBetter from "../components/WhyEatBetter";
import Testimonial from "../components/Testimonial";
import CuratedProducts from "../components/CuratedProducts";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='relative'
      >
        <HeroSection />
        <WhyEatBetter />
        <Testimonial />
        <CuratedProducts />
      </motion.div>
    </div>
  );
};

export default HomePage;
