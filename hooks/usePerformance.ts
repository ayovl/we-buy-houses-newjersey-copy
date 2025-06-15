'use client';

import { useEffect } from 'react';

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Only monitor in development and on mobile
    if (process.env.NODE_ENV === 'development' && window.innerWidth <= 768) {
      // Monitor frame rate
      let frameCount = 0;
      let lastTime = performance.now();
      
      const monitorFPS = () => {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
          const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
          if (fps < 30) {
            console.warn(`Low FPS detected: ${fps} fps`);
          }
          frameCount = 0;
          lastTime = currentTime;
        }
        
        requestAnimationFrame(monitorFPS);
      };
      
      requestAnimationFrame(monitorFPS);
      
      // Monitor memory usage
      const monitorMemory = () => {
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          const used = Math.round(memory.usedJSHeapSize / 1048576);
          const total = Math.round(memory.totalJSHeapSize / 1048576);
          
          if (used > 50) { // Alert if using more than 50MB
            console.warn(`High memory usage: ${used}MB / ${total}MB`);
          }
        }
      };
      
      const memoryInterval = setInterval(monitorMemory, 5000);
      
      return () => {
        clearInterval(memoryInterval);
      };
    }
  }, []);
};

export const useDeviceOptimization = () => {
  useEffect(() => {
    // Device-specific optimizations
    const userAgent = navigator.userAgent;
    
    // Detect low-end devices
    const isLowEndDevice = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 1;
      const deviceMemory = (navigator as any).deviceMemory || 1;
      
      return hardwareConcurrency <= 2 || deviceMemory <= 2;
    };
    
    if (isLowEndDevice()) {
      // Reduce animation complexity for low-end devices
      document.documentElement.style.setProperty('--animation-reduce', '1');
      console.log('Low-end device detected, reducing animations');
    }
    
    // iOS Safari optimizations
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      // Prevent zoom on input focus
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        );
      }
    }
  }, []);
};
