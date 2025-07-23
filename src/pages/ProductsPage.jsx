import { useState, useMemo } from "react";
import AnimatedSection from "../components/animation/AnimatedSection";
import AnimatedStaggerList from "../components/animation/AnimatedStaggerList";
import ProductCard from "../components/productsComponents/ProductCard";

const highLights = ["Sweet", "Ayurvedic", "High-Protein"];

const productsData = [
  {
    id: 1,
    name: "Gond Laddu",
    desc: "Hand-rolled with jaggery",
    price: 299,
    category: "Laddos",
    imgUrl: "https://eatbetterco.com/cdn/shop/files/gondladdu1.jpg",
    hoverImgUrl: "https://eatbetterco.com/cdn/shop/files/gondladdu2.jpg",
  },
  {
    id: 2,
    name: "Moong Dal Ladoo",
    desc: "Hand-rolled with jaggery",
    price: 249,
    category: "Laddos",
    imgUrl: "https://eatbetterco.com/cdn/shop/files/moong1.jpg",
    hoverImgUrl: "https://eatbetterco.com/cdn/shop/files/moong2.jpg",
  },
  {
    id: 3,
    name: "Ragi Chakli",
    desc: "Crispy savory snack",
    price: 199,
    category: "Namkeen",
    imgUrl: "https://eatbetterco.com/cdn/shop/files/chakli1.jpg",
    hoverImgUrl: "https://eatbetterco.com/cdn/shop/files/chakli2.jpg",
  },
  {
    id: 4,
    name: "Oats & Aita Cookies",
    desc: "Wholesome cookies",
    price: 159,
    category: "Dry Fruit Snacks",
    imgUrl: "https://eatbetterco.com/cdn/shop/files/cookies1.jpg",
    hoverImgUrl: "https://eatbetterco.com/cdn/shop/files/cookies2.jpg",
  },
  {
    id: 5,
    name: "Paan Ladoo",
    desc: "Minty, sweet treat",
    price: 229,
    category: "Laddos",
    imgUrl: "https://eatbetterco.com/cdn/shop/files/paan1.jpg",
    hoverImgUrl: "https://eatbetterco.com/cdn/shop/files/paan2.jpg",
  },
  {
    id: 6,
    name: "Himachali Chana",
    desc: "Roasted chickpeas",
    price: 149,
    category: "Namkeen",
    imgUrl: "https://eatbetterco.com/cdn/shop/files/chana1.jpg",
    hoverImgUrl: "https://eatbetterco.com/cdn/shop/files/chana2.jpg",
  },
  {
    id: 7,
    name: "Nutri Combo Pack",
    desc: "Best combo of healthy treats",
    price: 499,
    category: "Combo Packs",
    imgUrl: "https://eatbetterco.com/cdn/shop/files/combo1.jpg",
    hoverImgUrl: "https://eatbetterco.com/cdn/shop/files/combo2.jpg",
  },
  {
    id: 8,
    name: "Protein Bar",
    desc: "Power packed",
    price: 179,
    category: "High-Protein",
    imgUrl: "https://eatbetterco.com/cdn/shop/files/bar1.jpg",
    hoverImgUrl: "https://eatbetterco.com/cdn/shop/files/bar2.jpg",
  },
];

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [sortBy, setSortBy] = useState("default");
  const categories = [
    "All",
    "Combo Packs",
    "Laddos",
    "Namkeen",
    "Dry Fruit Snacks",
    "High-Protein",
  ];
  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterCategory && filterCategory !== "All") {
      filtered = filtered.filter((p) => p.category === filterCategory);
    }
    if (sort === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "a-z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "z-a") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
    return filtered;
  }, [search, sort, filterCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='bg-[#fff9f0] min-h-screen pt-20 px-6 py-12'>
      <AnimatedSection>
        <h1 className='text-3xl md:text-5xl font-serif mb-2 text-center'>
          PRODUCTS
        </h1>
        <p className='text-lg text-center mb-6'>Our Creations</p>
      </AnimatedSection>

      <AnimatedStaggerList
        items={highLights}
        className='flex flex-wrap justify-center gap-3 mb-6'
        renderItem={(cat) => (
          <span className='bg-[#efefef] text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-[#e2e2e2] transition'>
            {cat}
          </span>
        )}
      />

      <div className='flex flex-col md:flex-row justify-between md:justify-end items-center mb-6 gap-4'>
        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border px-4 py-2 rounded-md shadow-sm w-full md:w-1/3'
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className='border px-4 py-2 rounded-md shadow-sm text-sm bg-white'
        >
          <option value=''>Sort By</option>
          <option value='low-to-high'>Price: Low to High</option>
          <option value='high-to-low'>Price: High to Low</option>
          <option value='a-z'>A-Z</option>
          <option value='z-a'>Z-A</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className='border px-4 py-2 rounded-md shadow-sm text-sm bg-white'
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <AnimatedStaggerList
        items={paginatedProducts}
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
        renderItem={(product) => <ProductCard key={product.id} {...product} />}
      />

      {/* Pagination */}
      <div className='flex justify-right mt-10 gap-2'>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-4 py-2 rounded border text-sm shadow-sm hover:bg-[#d6e2c5] transition duration-200 ${
              currentPage === idx + 1
                ? "bg-[#c6d2b3] font-semibold"
                : "bg-white"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
