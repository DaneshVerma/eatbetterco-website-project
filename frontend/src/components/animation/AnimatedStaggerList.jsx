// components/AnimatedStaggerList.jsx
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedStaggerList = ({ items = [], renderItem, className = "" }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {items.map((data, index) => (
        <motion.div key={index} variants={item}>
          {renderItem(data, index)}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedStaggerList;
