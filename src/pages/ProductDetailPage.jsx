// pages/ProductDetailPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { productsData } from "../data/products";
import { isLoggedIn } from "../utils/auth";
import AnimatedSection from "../components/animation/AnimatedSection";
import ProductIngredients from "../components/productDetailComponents/ProductIngredients";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import ProductImageBox from "../components/productDetailComponents/ProductImageBox";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  console.log("Selected product:", product.imgUrl);

  const handleBuy = () => {
    if (!isLoggedIn()) {
      toast.error("Please login to continue");
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        img1: product.imgUrl,
      });
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (!product) {
    return <div className='text-center pt-32'>Product not found</div>;
  }

  return (
    <AnimatedSection>
      <div className='px-4 py-16 pt-28 bg-[#fff9f0] max-w-6xl mx-auto'>
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className='text-sm mb-6 text-amber-900 font-bold hover:underline'
        >
          ← Back to Products
        </button>

        <div className='flex flex-col md:flex-row gap-10 items-start'>
          {/* Image */}
          <div className='aspect-square overflow-hidden rounded-lg shadow-md'>
            <ProductImageBox image={product.imgUrl} />
          </div>

          {/* Info */}
          <div className='w-full md:w-1/2'>
            <h1 className='text-3xl font-serif font-semibold mb-2'>
              {product.name}
            </h1>
            <p className='text-gray-600 mb-2'>{product.desc}</p>

            <p className='text-sm text-gray-500 mb-1'>
              <span className='font-semibold'>Category:</span>{" "}
              {product.category}
            </p>
            <ProductIngredients ingredients={product.ingredients} />
            <p className='text-gray-600 mb-2'>{product.description}</p>
            <p className='mt-4 text-xl font-bold text-[#2f2f2f] mb-4'>
              ₹{product.price}
            </p>

            <button
              onClick={handleBuy}
              className='mt-2 bg-[#2f4f2f] text-white px-6 py-3 rounded hover:bg-[#263e26] transition w-full sm:w-auto'
            >
              Try This Now
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProductDetailPage;
