import TypingText from "./Feature-Utility/TypingText";

const Testimonial = () => {
  return (
    <section className='px-6 md:py-30 md:h-[50vh]  py-12  sticky top-0 text-center italic bg-[#fff9f0]'>
      <h4 className='text-3xl h-20
       max-w-xl mx-auto'>
        <TypingText text='  “Eat Better snacks are the perfect combination of delicious and healthy!”' />{" "}
      </h4>
      <p className='mt-4 text-lg font-semibold'>— Rina Kapoor</p>
    </section>
  );
};

export default Testimonial;
