import { Link } from "react-router-dom";
import AnimatedSection from "./animation/AnimatedSection";
import heroImage from "../assets/images/home/hero.png"; //

const HeroSection = () => {
  return (
    <AnimatedSection className='sticky top-0'>
      <section className='flex flex-col-reverse md:flex-row bg-[#fff9f0] md:h-[100vh] items-center px-10 py-12'>
        {/* Text Side */}
        <AnimatedSection
          delay={0.1}
          className='flex-1 text-center md:text-left'
        >
          <h2 className='text-3xl font-extrabold md:text-6xl font-serif mb-4'>
            Snacks rooted in Indian tradition, crafted for today.
          </h2>
          <Link
            to='products'
            className='relative group text-[#fff9f0] border-0 outline-0 bg-amber-950 px-6 text-md py-2 rounded-lg mt-2 transition-all cursor-pointer inline-block'
          >
            Buy a bite
            {/* Bite 1 */}
            <span className='absolute right-[4px] top-[0%] -translate-y-1/2 w-4 h-4 bg-[#fff9f0] rounded-full scale-0 group-hover:scale-100 transition duration-250'></span>
            {/* Bite 2 */}
            <span className='absolute right-[-5px] top-[0%] w-3.5 h-3.5 bg-[#fff9f0] rounded-full scale-0 group-hover:scale-110 transition duration-300'></span>
            {/* Bite 3 */}
            <span className='absolute right-[-8px] top-[15%] w-3 h-3 bg-[#fff9f0] rounded-full scale-0 group-hover:scale-100 transition duration-350'></span>
          </Link>
        </AnimatedSection>

        {/* Image Side */}
        <AnimatedSection delay={0.2} className='flex-1'>
          
          <img
            src={heroImage}
            alt='laddu'
            loading="lazy"
            className='rounded-lg w-full h-full drop-shadow-amber-200 drop-shadow-2xl  mx-auto'
          />
        </AnimatedSection>
      </section>
    </AnimatedSection>
  );
};

export default HeroSection;
