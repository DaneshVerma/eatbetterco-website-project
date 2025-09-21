// components/AnimatedSection.jsx
import { motion } from "framer-motion";

const AnimatedSection = ({
  children,
  delay = 0,
  className = "",
  inView = true,
}) => {
  const initial = { opacity: 0, y: 10 };
  const target = { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      {...(inView
        ? { whileInView: target, viewport: { once: true, amount: 0.2 } }
        : { animate: target })}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
