'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const buttonVariants = {
    hidden: { opacity: 0, y: 25 }, // Start transparent and offset
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25, // Quicker
        ease: "easeOut", // Starts fast, then decelerates
      }
    },
    exit: {
      opacity: 0,
      y: 25, // Match the y offset for consistency
      transition: {
        duration: 0.2, // Quicker exit
        ease: "easeIn" // Starts slow, then accelerates (for disappearing)
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-3 bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg hover:shadow-xl transition-colors duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
