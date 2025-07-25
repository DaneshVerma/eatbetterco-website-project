const features = [
  {
    title: "No Preservatives",
    description: "Wholesome goodness without the nasties",
    imgUrl: "/images/icons/laboratory.gif",
  },
  {
    title: "Ayurvedic Recipes",
    description: "Nourishing ingredients, rooted in Ayurveda",
    imgUrl: "/images/icons/mortar.gif",
  },
  {
    title: "Made Locally",
    description: "Crafted in small batches across India",
    imgUrl: "/images/icons/india.gif",
  },
];

const WhyEatBetter = () => {
  return (
    <section className='px-12 py-30 bg-amber-200 relative z-10'>
      <h3 className='text-4xl mb-10 font-["Geist"] text-center'>Why Eat Better?</h3>

      <div className='flex flex-col md:flex-row justify-center gap-8'>
        {features.map((item, index) => (
          <div
            key={index}
            className='flex flex-col items-center bg-[#fff9f0] p-6 rounded-xl shadow-md w-full md:w-1/3 transition-all duration-300 hover:scale-[1.02]'
          >
            <div className='w-28 h-28 bg-white flex items-center justify-center rounded-full mb-4'>
              <img
                src={item.imgUrl}
                alt={item.title}
                className='w-16 h-16 object-contain'
              />
            </div>
            <h4 className='text-2xl font-semibold font-["Geist"] mb-2'>{item.title}</h4>
            <p className='text-gray-700 font-["Geis mono"] text-base'>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyEatBetter;
