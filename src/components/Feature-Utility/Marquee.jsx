// components/Marquee.jsx
import React from "react";

const Marquee = () => {
  return (
    <div className='overflow-hidden bg-[#fff9f0] py-5 border-t border-b border-[#e2e0d5]'>
      <div className='animate-marquee whitespace-nowrap text-2xl font-serif text-[#2f2f2f] tracking-wider'>
        <span className='mx-8 italic'>Delicious • Natural • Wholesome</span>
        <span className='mx-8 '>Delicious • Natural • Wholesome</span>
        <span className='mx-8 italic'>Delicious • Natural • Wholesome</span>
        <span className='mx-8'>Delicious • Natural • Wholesome</span>
        <span className='mx-8 italic'>Delicious • Natural • Wholesome</span>
        <span className='mx-8'>Delicious • Natural • Wholesome</span>
      </div>
    </div>
  );
};

export default Marquee;
