import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollReveal = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: false, 
    threshold: 0.1,
  });

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
