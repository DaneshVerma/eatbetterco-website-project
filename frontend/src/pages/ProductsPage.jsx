import { useState, useMemo } from "react";
import AnimatedSection from "../components/animation/AnimatedSection";
import AnimatedStaggerList from "../components/animation/AnimatedStaggerList";
import ProductCard from "../components/productsComponents/ProductCard";
import { productsData } from "../data/products";
const highLights = ["Sweet", "Ayurvedic", "High-Protein"];

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    "All",
    "Combo",
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  return (
    <div className='bg-[#fff9f0] min-h-screen pt-20 px-6 py-12'>
      <AnimatedSection>
        <h1 className='text-3xl md:text-4xl font-["Geist"] mb-2 text-center'>
          Our Creations
        </h1>
      </AnimatedSection>

      <AnimatedStaggerList
        items={highLights}
        className='flex flex-wrap justify-center gap-3 mb-4'
        renderItem={(cat) => (
          <span className='bg-[#efefef] font-["Geist mono"]  text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-[#e2e2e2] transition'>
            {cat}
          </span>
        )}
      />

      {/* Search, Sort, Filter */}
      <div className='flex flex-col-reverse md:flex-row justify-between items-center gap-4 mb-8'>
        <div className='flex gap-3 flex-wrap'>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className='bg-[#f7fbe7] font-["Geist mono"]  border border-[#cfe1b9] text-sm px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a1cc7f] transition'
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
            className='bg-[#f7fbe7] border border-[#cfe1b9] font-["Geist mono"] text-sm px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a1cc7f] transition'
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <input
          type='text'
          placeholder='Search products...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full md:w-1/3 px-4 py-2 font-["Geist mono"] rounded-md border border-[#cfe1b9] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a1cc7f] transition'
        />
      </div>

      {/* Product Cards */}
      <AnimatedStaggerList
        items={paginatedProducts}
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
        renderItem={(product) => <ProductCard key={product.id} {...product} />}
      />

      {/* Pagination */}
      <div className='flex justify-center mt-10 gap-2 flex-wrap'>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-4 py-2 rounded border text-sm shadow-sm transition duration-200 ${
              currentPage === idx + 1
                ? "bg-[#7a9e49] text-white font-semibold"
                : "bg-white hover:bg-[#d6e2c5]"
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
