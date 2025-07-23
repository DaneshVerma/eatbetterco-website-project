// pages/OurStoryPage.jsx
import { motion } from "framer-motion";
import AnimatedStaggerList from "../components/animation/AnimatedStaggerList";
import TypingText from "../components/Feature-Utility/TypingText";
import OurJourneyInteractive from "../components/stroyComponents/OurJourneyInteractive";

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const OurStoryPage = () => {
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={fadeInUpVariant}
      className='pt-20 px-6 md:px-12 pb-16 bg-[#fff9f0] min-h-screen'
    >
      {/* Founder Section */}
      <section className='grid md:grid-cols-2 gap-8 items-center mb-20'>
        <motion.div
          className='w-full md:h-80 rounded-lg shadow-sm md:order-2 overflow-hidden bg-gray-300'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
        >
          <video
            poster='https://cdn.shopify.com/s/files/1/0272/5606/2025/files/thumbnail-mam.jpg?v=1725516866'
            src='https://cdn.shopify.com/videos/c/o/v/e8eba1ca88b5476d9ee487d2da1979df.mp4'
            controls
            className='w-full h-full object-cover'
          ></video>
        </motion.div>
        <motion.div
          className='md:order-1'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
        >
          <h3 className='text-4xl font-serif mb-4 text-[#2f2f2f]'>
            Meet Mridula Kanoria
          </h3>
          <p className='text-sm leading-relaxed text-gray-700'>
            In a world where we’re always on the move, snacks were always in
            demand in my family. But I found most of them unhealthy or bland.
            Over the past 20 years, I experimented with healthy, homemade
            options — and that journey led to Eat Better Co.
            <br />
            Our recipes combine age-old food wisdom with modern-day nutritional
            needs. Only the best of ingredients, carefully selected, make their
            way into our snacks.
            <br />
            Hygiene and cleanliness in my workshop are at obsessive levels. I
            hope our nutritious and delicious snacks help you and your family to
            Eat Better and live healthier lives.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className='mb-20 h-40 text-center'>
        <motion.h3
          className='text-xl md:text-4xl font-serif mb-3'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
        >
          Our Mission
        </motion.h3>
        <motion.p
          className='max-w-2xl mx-auto text-lg text-gray-700'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
        >
          <TypingText
            text='c To revive age-old Indian food wisdom and make snacking better.
          Healthier. And more honest. No preservatives. No fads. Just
          beautifully handcrafted, Indian superfood-based snacks.'
          speed={30}
          />
        </motion.p>
      </section>

      {/* Brand Journey Section */}
      <section className='mb-24'>
        <motion.h4
          className='text-3xl font-semibold mb-6 text-left'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
        >
        <OurJourneyInteractive />
      
        </motion.h4>

      
      </section>

      {/* Shark Tank Splash Video */}
      <section className='text-center'>
        <motion.div
          className='flex flex-col items-center mb-6'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
        >
          <img
            src='src/assets/logo/EB-LOGO-02.svg' // replace with your actual Eat Better Co logo
            alt='Eat Better Co'
            className='w-1/4 aspect-square mb-6 rounded-full border border-amber-950 object-contain'
          />
          <h2 className='text-2xl md:text-3xl font-semibold text-[#4a3d30]'>
            As seen on Shark Tank India 🦈
          </h2>
        </motion.div>

        <motion.div
          className='rounded-lg overflow-hidden max-w-4xl mx-auto aspect-video bg-gray-300 shadow-md'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariant}
        >
          <video
            poster='https://cdn.shopify.com/s/files/1/0272/5606/2025/files/Thumbnail-pitch-thumbnail.jpg?v=1740661024'
            src='https://cdn.shopify.com/videos/c/o/v/dffaa863a37c4e79a099a70a5b8943f8.mp4'
            controls
            className='w-full h-full object-cover'
          ></video>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default OurStoryPage;
