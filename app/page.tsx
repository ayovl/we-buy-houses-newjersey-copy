'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import OptimizedImage from '../components/OptimizedImage';
import LazyLoad from '../components/LazyLoad';
import MobileMotion from '../components/MobileMotion';
import ViewportOptimizer from '../components/ViewportOptimizer';
import { usePerformanceMonitoring, useDeviceOptimization } from '../hooks/usePerformance';
import { 
  Shield, 
  Award, 
  BarChart3,
  CheckCircle,
  Star,
  ArrowRight,
  X,
  Gift,
  Palette,
  Type,
  FileText,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Menu,
  AlertTriangle,
  Ban,
  Smartphone,
  MousePointer,
  Frown,
  Snail,
  TrendingUp,
  Zap,
  DollarSign
} from 'lucide-react';

// Mobile-optimized animation variants with reduced complexity
const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

const fadeInUp = {
  initial: { opacity: 0, y: isMobile() ? 10 : 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: isMobile() ? 0.3 : 0.6, ease: 'easeOut' }
};

// Optimized custom hook for scroll animations with better mobile performance
const useScrollAnimation = (threshold = 0.1, triggerOnce = true) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    amount: isMobile() ? 0.05 : threshold, // Lower threshold for mobile
    margin: isMobile() ? "-50px 0px" : "-100px 0px" // Reduced margin for mobile
  });
  
  return [ref, isInView] as const;
};

// Mobile-optimized stagger animations
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: isMobile() ? 0.05 : 0.1, // Faster stagger on mobile
      delayChildren: 0
    }
  }
};

// Optimized child variant for staggered animations
const staggerChild = {
  initial: { opacity: 0, y: isMobile() ? 10 : 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: isMobile() ? 0.3 : 0.6, ease: 'easeOut' }
  }
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNavBackground, setShowNavBackground] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    requests: ''
  });

  // Initialize performance monitoring
  usePerformanceMonitoring();
  useDeviceOptimization();

  // Memoized device detection for better performance
  const isIOSDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }, []);

  // Optimized scroll handler with debouncing for mobile performance
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setShowNavBackground(scrollY > 50);
    setShowScrollToTop(scrollY > 300);
  }, []);

  // Viewport Height Management - Optimized for mobile
  useEffect(() => {
    const updateViewportHeight = () => {
      const height = `${window.innerHeight}px`;
      setViewportHeight(height);
      document.documentElement.style.setProperty('--vh', height);
    };

    const handleOrientationChange = () => {
      // Delay for iOS to complete orientation change
      setTimeout(updateViewportHeight, 150);
    };

    // Initial setup
    updateViewportHeight();

    if (isIOSDevice) {
      // For iOS: only listen to orientation changes to prevent jerky behavior
      window.addEventListener('orientationchange', handleOrientationChange, { passive: true });
    } else {
      // For other devices: use resize listener with throttling
      let resizeTimeout: NodeJS.Timeout;
      const throttledResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateViewportHeight, 100);
      };
      window.addEventListener('resize', throttledResize, { passive: true });
      
      return () => {
        window.removeEventListener('resize', throttledResize);
        clearTimeout(resizeTimeout);
      };
    }

    return () => {
      if (isIOSDevice) {
        window.removeEventListener('orientationchange', handleOrientationChange);
      }
    };
  }, [isIOSDevice]);

  // Optimized scroll detection with passive listeners
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 16); // ~60fps throttling
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  // Create refs for different sections with optimized thresholds for mobile
  const [heroRef, heroInView] = useScrollAnimation(0.1);
  const [problemRef, problemInView] = useScrollAnimation(0.1);
  const [solutionRef, solutionInView] = useScrollAnimation(0.1);  const [pricingRef, pricingInView] = useScrollAnimation(0.1);
  const [ctaRef, ctaInView] = useScrollAnimation(0.1);
  const [testimonialRef, testimonialInView] = useScrollAnimation(0.1);
  const [contactRef, contactInView] = useScrollAnimation(0.1);
  const [meetingRef, meetingInView] = useScrollAnimation(0.1);

  // Memoized form handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  // Memoized submit handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to thank you page
    window.location.href = '/thank-you';
  }, []);

  // Memoized scroll functions
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu when section is clicked
    setIsMobileMenuOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  }, []);  return (    <div className="min-h-screen text-white relative overflow-x-hidden">
      <ViewportOptimizer />
      
      {/* Desktop-Only Gradient Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[rgb(19,17,28)] to-[rgb(13,13,20)] hidden md:block"></div>
      
      {/* Subtle Background Effects - Desktop Only */}
      <div className="fixed inset-0 -z-10 pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl will-change-auto"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl will-change-auto"></div>
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl will-change-auto"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl will-change-auto"></div>
      </div>
      
      {/* Mobile-Only Lightweight Background - Solid Color */}
      <div className="fixed inset-0 -z-10 md:hidden" style={{backgroundColor: 'rgb(19, 17, 28)'}}></div>{/* Navigation - Mobile Performance Optimized */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        showNavBackground || isMobileMenuOpen
          ? 'bg-black/40 md:bg-black/20 md:backdrop-blur-md border-white/10' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex justify-between md:justify-center items-center h-16 relative">            {/* Logo - Absolute positioned on desktop for centering */}
            <div className="flex items-center md:absolute md:left-0">
              <OptimizedImage 
                src="/logo.png" 
                alt="WebBrand Pro" 
                width={34} 
                height={34} 
                className="mr-3" 
                priority={true}
                sizes="34px"
              />
            </div>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('problem')} className="text-gray-300 hover:text-white transition-colors">Problem</button>
              <button onClick={() => scrollToSection('solution')} className="text-gray-300 hover:text-white transition-colors">Solution</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-white transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">Contact</button>
              <a href="https://arslanmaab.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">About Me</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>          {/* Mobile Menu - Glitch-Free Animation */}
          <div className={`md:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-200 ${
            isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-black/90 border-b border-white/10">
              <div className="px-6 py-4 space-y-4">
                <button onClick={() => scrollToSection('problem')} className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2">Problem</button>
                <button onClick={() => scrollToSection('solution')} className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2">Solution</button>
                <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2">Pricing</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2">Contact</button>
                <a href="https://arslanmaab.vercel.app/" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white transition-colors py-2">About Me</a>
              </div>
            </div>
          </div>
        </div>
      </nav>{/* Hero Section - Chrome Mobile Viewport Fixed */}
      <section ref={heroRef} className="flex items-center justify-center px-6 lg:px-8 relative keep-mobile-animation" style={{ height: viewportHeight }}>        <div className="max-w-7xl mx-auto text-center">          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight tracking-tight"
            initial={fadeInUp.initial}
            animate={heroInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
            style={{
              textShadow: '0 0 30px rgba(147, 51, 234, 0.3), 0 0 60px rgba(147, 51, 234, 0.1)',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
            }}
          >
            Your Current Website <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 animate-pulse">
              Isn't Converting
            </span>          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={fadeInUp.initial}
            animate={heroInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
            style={{
              textShadow: '0 0 20px rgba(147, 51, 234, 0.2), 0 0 40px rgba(147, 51, 234, 0.1)',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
            }}
          >
            A new and improved <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 font-semibold">cashforpropertiesnyc.com</span> is ready for you.
          </motion.p><motion.button
            onClick={() => scrollToSection('pricing')}
            className="group relative bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-500 hover:via-purple-400 hover:to-pink-400 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 overflow-hidden"
            initial={fadeInUp.initial}
            animate={heroInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
            style={{
              boxShadow: '0 8px 32px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Animated background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />            {/* Button content */}
            <span className="relative flex items-center gap-2 justify-center">
              Get Your Website Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.button>
        </div>          {/* Learn More Button (replacing scroll indicator) */}
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center keep-mobile-animation">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >            <motion.button
              className="flex flex-col items-center cursor-pointer group bg-transparent hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300"
              onClick={() => scrollToSection('problem')}
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <span className="text-gray-400 text-sm mb-2 group-hover:text-white transition-colors">
                Learn More
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </motion.button>
          </motion.div>
        </div>
      </section>      {/* Problem Section */}
      <section id="problem" ref={problemRef} className="py-16 lg:py-20 xl:py-24 px-6 lg:px-16 xl:px-24 relative">
        {/* Subtle gradient that blends into solution section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/5"></div>
        <div className="max-w-5xl mx-auto relative z-10">          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16 leading-tight"
            initial={fadeInUp.initial}
            animate={problemInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}          >
            The Problem with <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-2xl md:text-3xl lg:text-4xl break-all">cashforpropertiesnyc.com</span>
          </motion.h2><motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
            initial={staggerContainer.initial}
            animate={problemInView ? staggerContainer.animate : staggerContainer.initial}
          >{[
              { icon: AlertTriangle, title: "Poor Design", description: "Making your business appear untrustworthy and unprofessional." },
              { icon: Ban, title: "Wasted Ad Spend", description: "Paying for ads only to see visitors click away." },
              { icon: Smartphone, title: "Bad First Impression", description: "Causing potential clients to leave quickly." },
              { icon: MousePointer, title: "No Clear CTA", description: "Lack of a clear call-to-action is hurting your conversions." },
              { icon: Frown, title: "Unmotivating", description: "Failing to motivate users to explore your offerings." },
              { icon: Snail, title: "Slow Loading", description: "Slow-loading, causing users to leave before they see your value." }            ].map((item, index) => (              <motion.div
                key={index}
                className="relative group"
                variants={staggerChild}
              >                {/* Enhanced card with professional styling */}
                <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-md border border-white/25 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 relative overflow-hidden min-h-[200px] flex flex-col">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-60"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="mb-4">
                      <item.icon className="w-10 h-10 text-red-400 mb-3" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed flex-1">{item.description}</p>
                  </div>
                  
                  {/* Hover effect border glow */}
                  <div className="absolute inset-0 rounded-xl border border-red-400/0 group-hover:border-red-400/20 transition-colors duration-300"></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-3xl rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* Solution Section */}
      <section id="solution" ref={solutionRef} className="py-16 lg:py-20 xl:py-24 px-6 lg:px-8 relative">
        {/* Seamless gradient overlay that continues from problem section and blends into CTA section */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-purple-900/8 to-purple-900/8"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/3 to-pink-900/8"></div>
          <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16"
            initial={fadeInUp.initial}
            animate={solutionInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            A Professionally Designed Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Delivers Results</span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
            initial={staggerContainer.initial}
            animate={solutionInView ? staggerContainer.animate : staggerContainer.initial}
          >            {[
              { 
                stat: "240%", 
                title: "Attract More Clients", 
                description: "Professional websites can convert up to 240% more visitors into clients",
                icon: TrendingUp,
                proofLink: "https://www.uncommonlogic.com/case-studies/cro-240-increase-conversion-rate/"
              },
              { 
                stat: "75%", 
                title: "Appear Trust Worthy", 
                description: "75% of users judge credibility based on website design and visual appeal",
                icon: Shield,
                proofLink: "https://rareformnewmedia.com/credibility-in-web-design/"
              },
              { 
                stat: "94%", 
                title: "Appear Professional", 
                description: "94% of first impressions are design-related and impact user trust immediately",
                icon: Zap,
                proofLink: "https://cxl.com/blog/first-impressions-matter-the-importance-of-great-visual-design/#h-first-impressions-are-94-design-related"
              },
              { 
                stat: "132%", 
                title: "Revenue Increase", 
                description: "Well-designed websites can boost revenue by 132% through better user experience",
                icon: DollarSign,
                proofLink: "https://thegood.com/results/swissgear/"
              }
            ].map((item, index) => (<motion.div
                key={index}
                className="relative group"
                variants={staggerChild}
              >                {/* Premium solution card with enhanced backdrop and refined animations */}
                <div className="bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-md border border-white/30 p-7 rounded-xl text-center hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
                  {/* Subtle diagonal background pattern - matching problem cards style */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-60"></div>{/* Content container */}
                  <div className="relative z-10">
                    {/* Enhanced statistics badge with fixed size */}
                    <div className="absolute -top-3 -right-3 w-16 h-8 bg-gradient-to-r from-purple-500/15 via-white/10 to-pink-500/15 border border-purple-400/40 rounded-full text-xs font-medium text-white backdrop-blur-md group-hover:bg-gradient-to-r group-hover:from-purple-500/25 group-hover:via-white/15 group-hover:to-pink-500/25 group-hover:border-purple-400/60 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center select-none touch-manipulation" style={{WebkitTapHighlightColor: 'transparent', WebkitTouchCallout: 'none', WebkitUserSelect: 'none'}}>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white font-semibold pointer-events-none">
                        {item.stat}
                      </span>
                    </div>
                    
                    {/* Enhanced icon with refined styling */}
                    <div className="relative mb-6">
                      <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-400/25 via-pink-400/20 to-blue-400/25 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-400/40 group-hover:border-purple-400/60 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 relative">
                        <item.icon className="w-7 h-7 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
                      </div>
                    </div>
                    
                    {/* TITLE - Maximum prominence in visual hierarchy */}
                    <h3 className="text-2xl font-bold mb-4 text-white leading-tight group-hover:text-purple-50 transition-colors duration-300">{item.title}</h3>
                    
                    {/* Enhanced description */}
                    <p className="text-gray-200 text-sm leading-relaxed mb-6 group-hover:text-gray-100 transition-colors duration-300">{item.description}</p>                    {/* Clean text-only See Proof button */}
                    {item.proofLink && (
                      <a 
                        href={item.proofLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-purple-300 hover:text-purple-200 text-xs font-medium transition-colors duration-300 hover:underline underline-offset-2"
                      >
                        <span>See proof</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}          </motion.div>
        </div>
      </section>{/* Mid-Page CTA */}
      <section ref={ctaRef} className="py-16 lg:py-20 xl:py-24 px-6 lg:px-8 relative">        {/* Subtle seamless background that blends with the rest */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/8 to-transparent"></div>        
        <div className="max-w-4xl mx-auto text-center relative z-10"><motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
            initial={fadeInUp.initial}
            animate={ctaInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Stop losing potential clients.
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"            initial={fadeInUp.initial}
            animate={ctaInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            Let's build a website that works for you.
          </motion.p>
          <motion.button
            onClick={() => scrollToSection('pricing')}
            className="bg-[hsl(267,75%,56%)] hover:bg-[hsl(267,75%,66%)] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            initial={fadeInUp.initial}
            animate={ctaInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            Jump to Pricing
          </motion.button>
        </div>
      </section>      {/* Testimonials Section */}
      <section ref={testimonialRef} className="py-16 lg:py-20 xl:py-24 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16"
            initial={fadeInUp.initial}
            animate={testimonialInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Clients Like You</span>
          </motion.h2>          <motion.div 
            className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
            initial={staggerContainer.initial}
            animate={testimonialInView ? staggerContainer.animate : staggerContainer.initial}
          >{[
              {
                rating: 5,
                quote: "Arsian is a pleasure to work with, understands the project and delivers above the expectations. Very easy to work with.",
                author: "Client from Upwork",
                verified: true
              },
              {
                rating: 5,
                quote: "Arslan performs the task at hand quickly and effectively asking question to ensure the project is done right. Extremely professional",
                author: "Client from Upwork",
                verified: true
              }            ].map((testimonial, index) => (              <motion.div                key={index}
                className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg overflow-hidden will-change-transform"
                variants={staggerChild}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >                {/* Optimized hover effects using transform only */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-pink-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-out" />
                
                {/* Top section with rating and verified badge */}
                <div className="relative flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  {testimonial.verified && (
                    <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>
                
                {/* Quote with enhanced typography */}
                <div className="relative mb-6">
                  <div className="absolute -top-2 -left-1 text-4xl text-purple-400/30 font-serif leading-none select-none">"</div>
                  <p className="text-gray-200 text-lg leading-relaxed pl-6 italic font-light">
                    {testimonial.quote}
                  </p>
                  <div className="absolute -bottom-4 -right-1 text-4xl text-purple-400/30 font-serif leading-none rotate-180 select-none">"</div>
                </div>
                  {/* Author and link section */}
                <div className="relative">
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.author || 'Upwork Client'}</p>
                    <p className="text-gray-400 text-xs">Verified Client</p>
                  </div>                  <a 
                    href="https://www.upwork.com/freelancers/~01f45017511d101318" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block mt-3 text-gray-400 hover:text-purple-400 text-xs font-normal transition-colors duration-100 ease-out"
                  >
                    View on Upwork
                  </a>
                </div>
                
                {/* Optimized border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/60 via-pink-500/60 to-purple-500/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-150 ease-out origin-left" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* Complete Solution Pricing Section */}
      <section id="pricing" ref={pricingRef} className="py-16 lg:py-20 xl:py-24 px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-white/20 shadow-xl p-8 md:p-12 rounded-2xl relative overflow-hidden"
            initial={fadeInUp.initial}
            animate={pricingInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Website Package
              </h2>
              <p className="text-gray-300 text-lg">
                Fully Branded, Conversion-Optimized Website<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold"> That Drive Results</span>
              </p>
            </div>

            {/* Features Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
              initial={staggerContainer.initial}
              animate={pricingInView ? staggerContainer.animate : staggerContainer.initial}
            >              {/* Feature Card 1: Website Design & Development */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg h-64 flex flex-col"
                variants={staggerChild}
              >
                <h3 className="text-lg font-bold mb-3 text-white">Website Design</h3>
                <ul className="space-y-2 flex-1">
                  {[
                    "Fully custom website",
                    "Responsive design",
                    "Up to 10 pages",
                    "Contact form setup"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Feature Card 2: SEO & Copywriting */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg h-64 flex flex-col"
                variants={staggerChild}
              >
                <h3 className="text-lg font-bold mb-3 text-white">SEO & Copywriting</h3>
                <ul className="space-y-2 flex-1">
                  {[
                    "SEO optimized",
                    "Fast loading",
                    "Clear user flow",
                    "Conversion-optimized copy"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Feature Card 3: Branding */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg h-64 flex flex-col"
                variants={staggerChild}
              >
                <h3 className="text-lg font-bold mb-3 text-white">Branding</h3>
                <ul className="space-y-2 flex-1">
                  {[
                    "Professional styling",
                    "Color coordination",
                    "Brand consistency",
                    "Visual cohesion"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>              {/* Feature Card 4: FREE Premium Branding Package */}
              <motion.div 
                className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-400 p-6 rounded-lg relative overflow-hidden h-64 flex flex-col shadow-lg shadow-purple-500/20"
                variants={staggerChild}
              >
                {/* Enhanced FREE badge with neon-like glow */}
                <div className="absolute top-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-br-lg text-xs font-bold shadow-lg shadow-purple-500/50">
                  FREE
                </div>
                
                <div className="absolute top-2 right-2">
                  <Gift className="w-5 h-5 text-cyan-300 drop-shadow-sm" />
                </div>

                <h3 className="text-lg font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">FREE Branding Refresh</h3>                <ul className="space-y-2 flex-1">
                  {[
                    "Brand identity ",
                    "New logo design",
                    "Social media profile assets",
                    "Professional letterhead design",
                    "Custom business card design"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-cyan-300 mr-3 flex-shrink-0 drop-shadow-sm" />
                      <span className="text-sm text-gray-200 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Feature Card 5: Hosting & Setup */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg h-64 flex flex-col"
                variants={staggerChild}
              >
                <h3 className="text-lg font-bold mb-3 text-white">Hosting & Setup</h3>
                <ul className="space-y-2 flex-1">
                  {[
                    "Fully free setup included",
                    "Custom domain", 
                    "Deployed & live with blazing-fast performance",
                    "Free hosting included"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Feature Card 6: Lifetime Support */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg h-64 flex flex-col"
                variants={staggerChild}
              >
                <h3 className="text-lg font-bold mb-3 text-white">Technical Support</h3>
                <ul className="space-y-2 flex-1">
                  {[
                    "Tech support included",
                    "Never worry about updates or bugs again", 
                    "Updates and edits"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>            {/* Professional trust badges */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { 
                    icon: Shield, 
                    text: "7-Day Money-Back", 
                    color: "text-emerald-400", 
                    bgColor: "bg-gray-800/40", 
                    borderColor: "border-emerald-400/30"
                  },
                  { 
                    icon: Award, 
                    text: "1 Year Support", 
                    color: "text-blue-400", 
                    bgColor: "bg-gray-800/40", 
                    borderColor: "border-blue-400/30"
                  },
                  { 
                    icon: BarChart3, 
                    text: "4-Day Delivery", 
                    color: "text-amber-400", 
                    bgColor: "bg-gray-800/40", 
                    borderColor: "border-amber-400/30"
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`inline-flex items-center gap-2 ${item.bgColor} border ${item.borderColor} px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-100 hover:border-opacity-70 will-change-transform`}
                  >
                    {/* Icon */}
                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} strokeWidth={2.5} />
                    
                    {/* Text */}
                    <span className="text-white text-xs font-medium">{item.text}</span>
                    
                    {/* Verification mark */}
                    <CheckCircle className="w-3 h-3 text-green-400" strokeWidth={3} />
                  </div>
                ))}
              </div>
            </div>{/* Professional contact */}
            <div className="mb-8 p-6 bg-gradient-to-r from-slate-800/30 to-slate-700/20 border border-slate-600/30 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                Want to discuss before moving forward?
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="flex items-center space-x-3 text-white bg-gradient-to-r from-slate-700/40 to-slate-800/30 hover:from-slate-600/50 hover:to-slate-700/40 px-6 py-3 rounded-lg border border-slate-500/40 hover:border-slate-400/60 transition-all duration-300 hover:scale-[1.01] shadow-sm hover:shadow-md">
                  <Phone className="w-5 h-5 text-slate-300" />
                  <span className="font-semibold text-sm">Schedule a Call</span>
                </button>
                <div className="text-gray-400 text-sm hidden sm:block">or</div>
                <a href="mailto:arsalmaab@gmail.com" className="flex items-center space-x-3 text-white bg-gradient-to-r from-slate-700/40 to-slate-800/30 hover:from-slate-600/50 hover:to-slate-700/40 px-6 py-3 rounded-lg border border-slate-500/40 hover:border-slate-400/60 transition-all duration-300 hover:scale-[1.01] hover:underline shadow-sm hover:shadow-md">
                  <Mail className="w-5 h-5 text-slate-300" />
                  <span className="font-semibold text-sm">Email</span>
                </a>
              </div>
            </div>{/* Pricing & CTA Section */}
            <div className="space-y-8">
              {/* Pricing & Guarantee Row */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">{/* Guarantee - Left Side */}
                <div className="flex justify-center lg:justify-start">
                  <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-400/60 rounded-xl px-6 py-3.5 backdrop-blur-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/25 transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center border border-green-400/40">
                      <Shield className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-green-200 font-bold text-base leading-tight">Money Back Guarantee</span>
                      <span className="text-green-300/80 text-sm leading-tight">Full refund if not satisfied</span>
                    </div>
                  </div>
                </div>

                {/* Pricing - Right Side */}
                <div className="flex items-baseline justify-center lg:justify-end space-x-3">
                  <span className="text-3xl lg:text-4xl font-semibold text-gray-500 relative">
                    $5,000
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gray-500 opacity-80"></div>
                    </div>
                  </span>
                  <span className="text-5xl lg:text-6xl font-bold text-white">$3,500</span>
                  <span className="text-xl text-gray-300 font-medium">USD</span>
                </div>
              </div>

              {/* Subtle Divider */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative bg-gradient-to-r from-[hsl(267,75%,56%)] to-[hsl(267,75%,66%)] hover:from-[hsl(267,75%,66%)] hover:to-[hsl(267,75%,76%)] text-white px-12 lg:px-16 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 border border-[hsl(267,75%,56%)]/50 w-full max-w-sm shadow-lg"
                >
                  <span className="relative z-10">Get Your Website Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">4-day delivery • Tech support included</span>
                </div>

                <button 
                  onClick={() => scrollToSection('problem')}
                  className="group text-purple-300 hover:text-purple-200 font-medium text-sm flex items-center space-x-2 transition-all duration-200 hover:scale-105 py-2 px-3 rounded-lg hover:bg-white/5"
                >
                  <span>Why do you need this website?</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Meeting Section */}
      <section className="py-16 lg:py-20 xl:py-24 px-6 lg:px-8 relative" ref={meetingRef}>
        <div className="max-w-4xl mx-auto text-center">          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
            initial={fadeInUp.initial}
            animate={meetingInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Have Questions? <span className="text-[hsl(267,75%,56%)]">Let's Talk.</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={fadeInUp.initial}
            animate={meetingInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Schedule a free, no-obligation 15-minute call to discuss your project in detail.
          </motion.p>          <motion.button
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105"
            initial={fadeInUp.initial}
            animate={meetingInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            Schedule on Calendly
          </motion.button>
        </div>
      </section>      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-16 lg:py-20 xl:py-24 px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
            initial={fadeInUp.initial}
            animate={contactInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Contact Me <span className="text-[hsl(267,75%,56%)]">Directly</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={fadeInUp.initial}
            animate={contactInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            For any other inquiries, feel free to send an email.
          </motion.p>          <motion.a
            href="mailto:arsalmaab@gmail.com"
            className="text-[hsl(267,75%,56%)] hover:text-[hsl(267,75%,66%)] text-xl font-semibold hover:underline"
            initial={fadeInUp.initial}
            animate={contactInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            arsalmaab@gmail.com
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-8 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 WebBrand Pro. All rights reserved.</p>
          <p className="text-gray-400 text-center my-4 md:my-0">Made with ❤️ for amazing clients</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl max-w-md w-full border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Final Step: Project Details</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-[hsl(267,75%,56%)] text-white"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-[hsl(267,75%,56%)] text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Optional Changes or Requests</label>
                <textarea
                  name="requests"
                  value={formData.requests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-[hsl(267,75%,56%)] text-white resize-none"
                  placeholder="Any specific requests or changes you'd like..."
                />
              </div>
              
              <p className="text-sm text-gray-300 text-center">
                Your new website will be live at <strong>cashforpropertiesnyc.com</strong> in 4 days. 
                We'll email your brand assets and login details upon completion.
              </p>
              
              <button
                type="submit"
                className="w-full bg-[hsl(267,75%,56%)] hover:bg-[hsl(267,75%,66%)] text-white py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                Proceed to Payment - $3,950
              </button>
            </form>
          </motion.div>        </div>
      )}      {/* Scroll to Top Button - Modern Glassmorphism Design */}
      <AnimatePresence mode="wait">
        {showScrollToTop && (          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 text-white p-3 rounded-full shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 hidden md:block group overflow-hidden"
            initial={{ 
              opacity: 0, 
              y: 60,
              scale: 0.8
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              y: 60,
              scale: 0.8
            }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94], // Smooth cubic-bezier
              opacity: { duration: 0.3 },
              y: { duration: 0.4 },
              scale: { duration: 0.3 }
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            style={{ 
              zIndex: 9999,
              willChange: 'transform, opacity'
            }}
            aria-label="Scroll to top"
          >            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            
            {/* Icon with subtle animation */}
            <ChevronUp className="w-6 h-6 relative z-10 group-hover:translate-y-[-1px] transition-transform duration-200" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
