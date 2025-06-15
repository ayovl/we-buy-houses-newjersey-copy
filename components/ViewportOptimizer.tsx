'use client';

import { useEffect } from 'react';

export default function ViewportOptimizer() {
  useEffect(() => {
    // Set CSS custom properties for better mobile viewport handling
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial values
    setViewportHeight();

    // Update on resize with debouncing
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(setViewportHeight, 150);
    };

    // Update on orientation change for mobile
    const handleOrientationChange = () => {
      // Small delay to ensure the viewport has updated
      setTimeout(setViewportHeight, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      clearTimeout(timeoutId);
    };
  }, []);

  return null; // This component doesn't render anything
}
