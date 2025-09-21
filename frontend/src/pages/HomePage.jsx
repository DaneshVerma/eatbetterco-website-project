import HeroSection from "../components/HeroSection";
import WhyEatBetter from "../components/WhyEatBetter";
import Testimonial from "../components/Testimonial";
import CuratedProducts from "../components/CuratedProducts";
import AnimatedSection from "../components/animation/AnimatedSection";

const HomePage = () => {
  return (
    <div className='relative'>
      <AnimatedSection inView={false} className='min-h-screen'>
        <HeroSection />
        <WhyEatBetter />
        <Testimonial />
        <CuratedProducts />
      </AnimatedSection>
    </div>
  );
};

export default HomePage;
