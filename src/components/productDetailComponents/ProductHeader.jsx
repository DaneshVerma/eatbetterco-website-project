import AnimatedSection from "../animation/AnimatedSection";

const ProductHeader = ({ name, description }) => {
  return (
    <>
      <AnimatedSection delay={0.2}>
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-2">
          {name}
        </h1>
        <p className="italic text-center text-lg mb-3">a taste of tradition</p>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <p className="text-sm md:text-base leading-relaxed text-center max-w-2xl mx-auto mb-3">
          {description}
        </p>
      </AnimatedSection>
    </>
  );
};

export default ProductHeader;
