import AnimatedSection from "../animation/AnimatedSection";

const ProductImageBox = ({ image }) => {
  return (
    <AnimatedSection delay={0.1}>
      <div className="aspect-square overflow-hidden rounded-lg shadow-md max-w-[450px] mx-auto">
        <img
          src={image}
          alt="product"
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "/fallback.jpg")}
        />
      </div>
    </AnimatedSection>
  );
};

export default ProductImageBox;
