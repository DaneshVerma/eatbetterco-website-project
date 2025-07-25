// components/Marquee.jsx
import "./marquee.css"; // Custom CSS for smooth animation

const Marquee = () => {
  return (
    <div className='overflow-hidden bg-[#fff9f0] py-5 border-y border-[#e2e0d5]'>
      <div className='marquee-track'>
        <div className='marquee-content font-["Geist"] text-2xl text-[#2f2f2f] tracking-wider'>
          <span className='mx-8 italic'>Delicious • Natural • Wholesome</span>
          <span className='mx-8'>Delicious • Natural • Wholesome</span>
          <span className='mx-8 italic'>Delicious • Natural • Wholesome</span>
          <span className='mx-8'>Delicious • Natural • Wholesome</span>
          <span className='mx-8 italic'>Delicious • Natural • Wholesome</span>
          <span className='mx-8'>Delicious • Natural • Wholesome</span>
        </div>
        {/* Duplicate content */}
        <div className='marquee-content text-2xl font-["Geist"]  text-[#2f2f2f] tracking-wider'>
          <span className='mx-8 italic'>Delicious • Natural • Wholesome</span>
          <span className='mx-8'>Delicious • Natural • Wholesome</span>
          <span className='mx-8 italic'>Delicious • Natural • Wholesome</span>
          <span className='mx-8'>Delicious • Natural • Wholesome</span>
          <span className='mx-8 italic'>Delicious • Natural • Wholesome</span>
          <span className='mx-8'>Delicious • Natural • Wholesome</span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
