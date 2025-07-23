import { useState } from "react";
import { motion } from "framer-motion";

const journeyItems = [
  {
    title: "Idea Born in the Kitchen – 2020",
    desc: "idea was sparked in a home kitchen with a mission to reinvent Indian snacking.",
    img: "src/assets/images/story/1.webp  ",
  },
  {
    title: "First Laddu Batch Delivered – 2021",
    desc: "With homemade ingredients, our first batch of laddus reached close friends and family.",
    img: "src/assets/images/story/2.png",
  },
  {
    title: "Featured on Shark Tank – 2023",
    desc: "In 2023, Eat Better Co got featured on Shark Tank India and received nationwide love.",
    img: "src/assets/images/story/3.png",
  },
  {
    title: "Pan-India Reach via D2C – 2024",
    desc: "our products had reached every corner of India through direct-to-consumer channels.",
    img: "src/assets/images/story/4.png",
  },
];

const OurJourneyInteractive = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section className='mb-24'>
      <h4 className='text-3xl font-semibold mb-6 text-left'>Our Journey</h4>

      <div className='flex flex-col-reverse md:h-[70vh] md:flex-row gap-6'>
        {/* Left Strips */}
        <div className='flex-1 flex flex-col md:justify-between justify-center md:h-full h-1/4 gap-2'>
          {journeyItems.map((item, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              initial='rest'
              whileHover='hover'
              animate='rest'
              className='relative  md:p-7 p-1 rounded-lg border border-[#ddd] bg-white group shadow-sm cursor-pointer overflow-hidden transition-all duration-300'
            >
              {/* Background fill */}
              <motion.div className='absolute inset-0 bg-amber-200 w-0 group-hover:w-full transition-all duration-500 ease-in-out origin-left z-0' />

              {/* Content */}
              <motion.div className='relative z-10'>
                {/* Title */}
                <motion.p
                  variants={{
                    rest: { y: 5, textAlign: "left" },
                    hover: { y: -6 },
                  }}
                  transition={{ duration: 0.3 }}
                  className='text-lg md:text-xl font-medium text-[#2f2f2f] md:mb-0 mb-2 text-center md:text-left'
                >
                  {item.title}
                </motion.p>

                {/* Description – Always visible on mobile, hover on desktop */}
                <motion.p className='text-sm text-gray-700 text-left md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500'>
                  {item.desc}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Right Shared Image */}
        <div className='flex-1 '>
          <div className='w-full h-full overflow-hidden bg-amber-600 rounded-lg shadow'>
            <img
              src={
                journeyItems[activeIndex]?.img ||
                "src/assets/images/story/main.jpg"
              }
              alt='Journey Image'
              className='w-full md:h-full h-60  object-cover transition-all duration-500'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourneyInteractive;
