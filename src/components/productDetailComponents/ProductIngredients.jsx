import AnimatedSection from "../animation/AnimatedSection";

const ProductIngredients = ({ ingredients }) => {
  return (
    <AnimatedSection delay={0.4}>
      <div className="text-center mb-4">
        <h3 className="text-xl font-serif mb-2">Ingredients</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {ingredients.map((item, i) => (
            <span
              key={i}
              className="bg-[#f4f1e8] px-4 py-2 rounded-full text-sm border"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProductIngredients;
