import { useState } from "react";
import { motion } from "framer-motion";

const ProductCard = ({ name, desc, price, img1, img2 }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='bg-white rounded-lg shadow-md p-4 text-left'
    >
      <div className='aspect-square w-full mb-4 overflow-hidden rounded'>
        <img
          className='w-full h-full object-cover transition duration-300'
          src={hovered ? img2 : img1}
          alt={name}
        />
      </div>
      <h4 className='text-lg font-semibold mb-1'>{name}</h4>
      <p className='text-sm text-gray-700 mb-1'>{desc}</p>
      <p className='text-md font-bold text-[#2f2f2f] mb-3'>₹{price}</p>
      <button className='bg-[#d6e2c5] text-[#2f2f2f] px-4 py-2 rounded hover:bg-[#c6d2b3] transition'>
        Shop Now
      </button>
    </motion.div>
  );
};

export default ProductCard;
