import HeroSection from "../components/HeroSection";
import WhyEatBetter from "../components/WhyEatBetter";
import Testimonial from "../components/Testimonial";
import CuratedProducts from "../components/CuratedProducts";
import AnimatedSection from "../components/animation/AnimatedSection";
import { useLocation } from "react-router-dom";


const HomePage = () => {
  const location = useLocation();
  return (
    <div className='relative'>
      <AnimatedSection key={location.pathname}>
        <HeroSection />
        <WhyEatBetter />
        <Testimonial />
        <CuratedProducts />
      </AnimatedSection>
    </div>
  );
};

export default HomePage;
