// pages/ProductDetailPage.jsx
import { useParams } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import AnimatedSection from "../components/animation/AnimatedSection";
import ProductIngredients from "../components/productDetailComponents/ProductIngredients";
import ProductImageBox from "../components/productDetailComponents/ProductImageBox";
import ProductHeader from "../components/productDetailComponents/ProductHeader";

const productData = {
  1: {
    name: "Gond Laddu",
    image: "#",
    description: "A heritage snack, rooted in Indian tradition.",
    ingredients: ["Ghee", "Almonds", "Dates"],
  },
  2: {
    name: "Moong Dal Laddu",
    image: "#",
    description: "Power-packed with protein & love.",
    ingredients: ["Moong", "Honey", "Ghee"],
  },
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = productData[id];

  const handleBuy = () => {
    if (!isLoggedIn()) {
      alert("Please login to continue");
    } else {
      alert("Thanks for your order! We’ll send you some laddus 🎉");
    }
  };

  if (!product) {
    return <div className='text-center pt-32'>Product not found</div>;
  }

  return (
    <AnimatedSection>
      <div className='px-6 py-12 pt-20 bg-[#fff9f0] max-w-4xl mx-auto'>
        <ProductImageBox image={product.image} />
        <ProductHeader name={product.name} description={product.description} />
        <ProductIngredients ingredients={product.ingredients} />

        <AnimatedSection delay={0.5}>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-2'>
            <button
              onClick={handleBuy}
              className='bg-[#2f4f2f] text-white px-6 py-3 rounded w-full sm:w-auto hover:scale-102  duration-200 ease-in-out hover:bg-[#263e26] transition cursor-pointer'
            >
              Try This Now
            </button>
          </div>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
};

export default ProductDetailPage;
