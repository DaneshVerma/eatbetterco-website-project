import AnimatedSection from "../animation/AnimatedSection";


const ProductImageBox = ({ image }) => {
  return (
    <AnimatedSection delay={0.1}>
      <div className="h-40 bg-[#f4f4f4] mb-4 rounded"></div>
      {/* Replace bg div with <img src={image} /> when image is ready */}
    </AnimatedSection>
  );
};

export default ProductImageBox;
