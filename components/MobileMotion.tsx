'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface MobileMotionProps extends MotionProps {
  children: ReactNode;
  disableOnMobile?: boolean;
  mobileVariant?: any;
}

export default function MobileMotion({ 
  children, 
  disableOnMobile = false,
  mobileVariant,
  ...motionProps 
}: MobileMotionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Check if device is mobile
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // If user prefers reduced motion, render without motion
  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  // If mobile optimizations are requested
  if (isMobile && (disableOnMobile || mobileVariant)) {
    if (disableOnMobile) {
      return <div>{children}</div>;
    }
    
    if (mobileVariant) {
      return (
        <motion.div {...motionProps} {...mobileVariant}>
          {children}
        </motion.div>
      );
    }
  }

  // Default motion behavior
  return <motion.div {...motionProps}>{children}</motion.div>;
}
