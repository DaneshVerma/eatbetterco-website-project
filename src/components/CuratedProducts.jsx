import { Link } from "react-router-dom";

const products = [
  {
    name: "Ultimate Snack Box - Healthy Snacks",
    imgUrl:
      "https://eatbetterco.com/cdn/shop/files/UltimateHealthySnackBox.jpg?v=1740378051&width=720",
  },
  {
    name: "Millet Namkeen Combo ",
    imgUrl:
      "https://eatbetterco.com/cdn/shop/files/MilletNamkeenCombo.jpg?v=1739968095&width=720",
  },

  {
    name: "Peanut Chikki",
    imgUrl:
      "https://eatbetterco.com/cdn/shop/files/EatBetterLaddoo_bd8ca4df-9f93-40c9-9514-0d11b2dafe0d.jpg?v=1739967814&width=720",
  },
];

const CuratedProducts = () => {
  return (
    <section className='px-6 py-10 bg-amber-200 sticky top-0 text-center'>
      <h3 className='text-3xl font-serif mb-10'>Curated Products</h3>

      <div className='flex flex-wrap justify-center gap-5'>
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className={`w-full sm:w-[48%] lg:w-[30%] bg-white rounded-lg shadow-md p-4 transition-all hover:scale-105 duration-400`}
            >
              <div className='aspect-square w-full h-60 mb-4 overflow-hidden rounded'>
                <img
                  className='w-full h-full transition-all duration-200 hover:scale-105 object-cover'
                  src={product.imgUrl}
                  alt={product.name}
                />
              </div>
              <h4 className='text-lg font-semibold mb-1'>{product.name}</h4>
              <p className='text-sm text-gray-700 mb-3'>
                For energy & vitality
              </p>
              <Link
                to={"products"}
                className='bg-[#d6e2c5] text-[#2f2f2f] px-4 py-2 rounded hover:bg-[#c6d2b3] transition'
              >
                Explore
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CuratedProducts;
