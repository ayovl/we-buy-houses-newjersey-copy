'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Custom hook for triggering animations when elements enter the viewport
const useScrollAnimation = (threshold = 0.2, triggerOnce = true) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    once: triggerOnce, // Only trigger the animation once
    amount: threshold, // The amount of the element that needs to be visible
    margin: "-100px 0px" // Start animation 100px before the element enters viewport
  });
  
  return [ref, isInView] as const; // Use 'as const' to preserve the exact tuple type
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0 // Remove unnecessary delay for better performance
    }
  }
};

// Optimized child variant for staggered animations
const staggerChild = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
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

  // iOS Device Detection
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  };

  // Viewport Height Management - Chrome Mobile Fix
  useEffect(() => {
    const updateViewportHeight = () => {
      const height = `${window.innerHeight}px`;
      setViewportHeight(height);
      document.documentElement.style.setProperty('--vh', height);
    };

    const handleOrientationChange = () => {
      // Delay for iOS to complete orientation change
      setTimeout(updateViewportHeight, 100);
    };

    // Initial setup
    updateViewportHeight();

    if (isIOS()) {
      // For iOS: only listen to orientation changes to prevent jerky behavior
      window.addEventListener('orientationchange', handleOrientationChange);
    } else {
      // For other devices: use resize listener
      window.addEventListener('resize', updateViewportHeight);
    }

    return () => {
      if (isIOS()) {
        window.removeEventListener('orientationchange', handleOrientationChange);
      } else {
        window.removeEventListener('resize', updateViewportHeight);
      }
    };
  }, []);
  // Scroll detection for navigation background and scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowNavBackground(scrollY > 50); // Show background after scrolling 50px
      setShowScrollToTop(scrollY > 300); // Show scroll to top after scrolling 300px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    // Create refs for different sections with scroll-triggered animations
  const [heroRef, heroInView] = useScrollAnimation(0.2);
  const [problemRef, problemInView] = useScrollAnimation(0.2);
  const [solutionRef, solutionInView] = useScrollAnimation(0.2);
  const [benefitsRef, benefitsInView] = useScrollAnimation(0.2);
  const [pricingRef, pricingInView] = useScrollAnimation(0.2);
  const [ctaRef, ctaInView] = useScrollAnimation(0.2);
  const [testimonialRef, testimonialInView] = useScrollAnimation(0.2);
  const [contactRef, contactInView] = useScrollAnimation(0.2);
  const [meetingRef, meetingInView] = useScrollAnimation(0.2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to thank you page
    window.location.href = '/thank-you';
  };  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu when section is clicked
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      {/* Fixed Background - Prevents White Tiling */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[rgb(19,17,28)] to-[rgb(13,13,20)]"></div>
      
      {/* Subtle Background Effects - Mobile Performance Optimized */}
      <div className="fixed inset-0 -z-10 pointer-events-none hidden md:block">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl will-change-auto"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl will-change-auto"></div>
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl will-change-auto"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl will-change-auto"></div>
      </div>
      
      {/* Mobile-Only Simple Background - No Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none md:hidden bg-[rgb(19,17,28)]"></div>      {/* Navigation - Mobile Performance Optimized */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        showNavBackground || isMobileMenuOpen
          ? 'bg-black/40 md:bg-black/20 md:backdrop-blur-md border-white/10' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex justify-between md:justify-center items-center h-16 relative">
            {/* Logo - Absolute positioned on desktop for centering */}
            <div className="flex items-center md:absolute md:left-0">
              <Image 
                src="/logo.png" 
                alt="WebBrand Pro" 
                width={34} 
                height={34} 
                className="mr-3" 
                priority
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
      <section ref={heroRef} className="flex items-center justify-center px-6 lg:px-8 relative keep-mobile-animation" style={{ height: viewportHeight }}>
        <div className="max-w-7xl mx-auto text-center">          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"initial={fadeInUp.initial}
            animate={heroInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Your Current Website <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Isn't Converting
            </span>
          </motion.h1>          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={fadeInUp.initial}
            animate={heroInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            A new and improved cashforpropertiesnyc.com is ready for you.
          </motion.p>          <motion.button
            onClick={() => scrollToSection('pricing')}
            className="bg-[hsl(267,75%,56%)] hover:bg-[hsl(267,75%,66%)] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            initial={fadeInUp.initial}
            animate={heroInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Get Your Website Now
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
      <section id="problem" ref={problemRef} className="py-12 lg:py-16 px-6 lg:px-16 xl:px-24 relative"><div className="max-w-5xl mx-auto">          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16 leading-tight"
            initial={fadeInUp.initial}
            animate={problemInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}          >
            The Problem with <br className="sm:hidden" />
            <span className="text-red-400 text-2xl md:text-3xl lg:text-4xl break-all">cashforpropertiesnyc.com</span>
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
      <section id="solution" ref={solutionRef} className="py-20 lg:py-32 px-6 lg:px-8 relative">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10"></div>
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
              >                {/* Premium solution card with advanced backdrop and refined animations */}
                <div className="bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-md border border-white/30 p-7 rounded-xl text-center hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group">
                  {/* Advanced colorful backdrop - better than problem cards by default */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/12 via-pink-400/8 to-blue-400/12 opacity-85"></div>
                    {/* Subtle color shading layers for premium feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/8 via-transparent to-pink-500/6 opacity-70"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-blue-400/6 via-transparent to-purple-400/8 opacity-60"></div>
                  
                  {/* Content container */}
                  <div className="relative z-10">
                    {/* Empty/outline statistics badge */}
                    <div className="absolute -top-3 -right-3 px-3 py-2 bg-white/10 border border-white/25 rounded-full text-xs font-medium text-white/90 backdrop-blur-sm group-hover:bg-white/15 group-hover:border-purple-400/40 group-hover:text-white transition-all duration-300">
                      {item.stat}
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
                    <p className="text-gray-200 text-sm leading-relaxed mb-6 group-hover:text-gray-100 transition-colors duration-300">{item.description}</p>

                    {/* Minimal See Proof button */}
                    {item.proofLink && (
                      <a 
                        href={item.proofLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/15 rounded text-white/60 hover:text-white/80 hover:bg-white/8 text-xs font-light transition-all duration-300"
                      >
                        <span>See proof</span>
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom accent badge */}
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={solutionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 px-6 py-3 rounded-full backdrop-blur-sm">
              <p className="text-sm font-medium text-gray-300">
                <span className="text-purple-400">Proven results</span> from professional web design
              </p>
            </div>
          </motion.div>
        </div>
      </section>      {/* Mid-Page CTA */}
      <section ref={ctaRef} className="py-20 lg:py-32 px-6 lg:px-8 relative overflow-hidden">
        {/* Enhanced Background with Subtle Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-pink-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        {/* Subtle Geometric Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/8 rounded-full blur-xl"></div>
        
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
      <section ref={testimonialRef} className="py-20 lg:py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16"
            initial={fadeInUp.initial}
            animate={testimonialInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Clients Like You</span>
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={staggerContainer.initial}
            animate={testimonialInView ? staggerContainer.animate : staggerContainer.initial}
          >
            {[
              {
                rating: 5,
                quote: "Arsian is a pleasure to work with, understands the project and delivers above the expectations. Very easy to work with.",
                author: "Client from Upwork"
              },
              {
                rating: 5,
                quote: "Arslan performs the task at hand quickly and effectively asking question to ensure the project is done right. Extremely professional"
              }
            ].map((testimonial, index) => (              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg"
                variants={staggerChild}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.author}</p>
                <a href="https://www.upwork.com/freelancers/~01f45017511d101318" target="_blank" rel="noopener noreferrer" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-sm hover:underline">View on Upwork →</a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* The Offer Section */}
      <section id="offer" ref={benefitsRef} className="py-20 lg:py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-16"
            initial={fadeInUp.initial}
            animate={benefitsInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Your Website Solution <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Includes</span>
          </motion.h2>{/* Unified 6-Card Grid Layout */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12"
            initial={staggerContainer.initial}
            animate={benefitsInView ? staggerContainer.animate : staggerContainer.initial}
          >
            {/* Card 1: Website Design & Development */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg h-64 flex flex-col"
              variants={staggerChild}
            >              <h3 className="text-xl font-bold mb-4">Website Design & Development</h3>
              <ul className="space-y-2 flex-1">
                {[
                  "Fully custom website",
                  "Responsive design",
                  "Up to 10 pages",
                  "Contact form setup"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 2: SEO & Copywriting */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg h-64 flex flex-col"
              variants={staggerChild}
            >              <h3 className="text-xl font-bold mb-4">SEO & Copywriting</h3>
              <ul className="space-y-2 flex-1">
                {[
                  "SEO optimized",
                  "Fast loading",
                  "Clear user flow",
                  "Conversion-optimized copy"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 3: Basic Branding */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg h-64 flex flex-col"
              variants={staggerChild}
            >              <h3 className="text-xl font-bold mb-4">Basic Branding</h3>
              <ul className="space-y-2 flex-1">
                {[
                  "Professional styling",
                  "Color coordination",
                  "Brand consistency",
                  "Visual cohesion"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 4: FREE Premium Branding Package */}
            <motion.div 
              className="bg-gradient-to-br from-[hsl(267,75%,56%)]/20 to-pink-500/20 border-2 border-[hsl(267,75%,56%)]/50 p-6 rounded-lg relative overflow-hidden h-64 flex flex-col"
              variants={staggerChild}
            >
              <div className="absolute top-2 right-2">
                <Gift className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">FREE Premium Branding</h3>
              <p className="text-xs text-gray-300 mb-3">Bonus package included!</p>
              <ul className="space-y-2 flex-1">
                {[
                  { icon: Palette, text: "Logo refresh" },
                  { icon: FileText, text: "Brand guidelines" },
                  { icon: Type, text: "Typography selection" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <item.icon className="w-4 h-4 text-cyan-400 mr-3 flex-shrink-0" />
                    <span className="font-medium text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto p-2 bg-[hsl(267,75%,56%)]/10 rounded-lg border border-[hsl(267,75%,56%)]/30">
                <p className="text-xs text-center font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Worth $800+ - Yours FREE!
                </p>
              </div>
            </motion.div>

            {/* Card 5: Hosting & Setup */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg h-64 flex flex-col"
              variants={staggerChild}
            >              <h3 className="text-xl font-bold mb-4">Hosting & Setup</h3>
              <ul className="space-y-2 flex-1">
                {[
                  "Free setup",
                  "Custom domain", 
                  "Deployed live",
                  "Free hosting"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 6: Lifetime Support */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg h-64 flex flex-col"
              variants={staggerChild}
            >              <h3 className="text-xl font-bold mb-4">Lifetime Support</h3>
              <ul className="space-y-2 flex-1">
                {[
                  "Minor edits",
                  "Uptime monitoring", 
                  "Updates for life",
                  "Technical support"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div></div>
      </section>      {/* Professional Pricing Section */}
      <section id="pricing" ref={pricingRef} className="py-20 lg:py-32 px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">          <motion.div 
            className="bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-5xl border-2 border-white/30 shadow-2xl shadow-purple-500/20 p-8 md:p-10 rounded-2xl text-center relative overflow-hidden"
            initial={fadeInUp.initial}
            animate={pricingInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            {/* Subtle background pattern for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/8 via-transparent to-pink-400/8 opacity-60"></div>
            {/* Professional Badge */}
            <div className="absolute -top-2 -right-2">
              <div className="bg-gradient-to-r from-[hsl(267,75%,56%)] to-[hsl(267,75%,66%)] text-white px-4 py-1.5 text-xs font-semibold transform rotate-12 translate-x-2 -translate-y-1 shadow-lg rounded-md">
                <div className="flex items-center space-x-1">
                  <Gift className="w-3 h-3" />
                  <span>COMPLETE SOLUTION</span>
                </div>
              </div>
            </div>            {/* Header Section */}
            <div className="relative z-10 mb-8">              
              <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                Professional Website Solution
              </h2>
            </div>            {/* Professional Service Grid */}            <div className="grid md:grid-cols-3 gap-4 mb-8">              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/15 p-5 rounded-xl border-2 border-purple-400/50 relative overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
                {/* Professional badge */}
                <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-400 to-blue-400 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                  CORE
                </div>
                
                <div className="mt-4">
                  <h4 className="font-bold text-xl mb-3 text-white leading-tight">Complete Website</h4>
                  <p className="text-purple-100 text-sm leading-relaxed mb-4">Custom design, 10 pages, mobile-responsive, professional branding</p>
                  
                  {/* Feature highlights */}
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-purple-200">
                      <div className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2"></div>
                      Mobile-responsive design
                    </div>
                    <div className="flex items-center text-xs text-purple-200">
                      <div className="w-1.5 h-1.5 bg-purple-300 rounded-full mr-2"></div>
                      Up to 10 custom pages
                    </div>
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent pointer-events-none"></div>
              </div>              <div className="bg-gradient-to-br from-pink-500/25 to-purple-500/20 p-5 rounded-xl border-2 border-pink-400/60 relative overflow-hidden shadow-lg hover:shadow-pink-500/20 transition-all duration-300 hover:scale-[1.02]">
                {/* Sparkle accent in top corner */}
                <div className="absolute top-3 right-3 flex items-center space-x-1">
                  <Gift className="w-5 h-5 text-pink-300" />
                  <div className="w-1 h-1 bg-pink-300 rounded-full animate-pulse"></div>
                </div>
                
                {/* FREE badge */}
                <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                  FREE
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-xl mb-2 text-white leading-tight">Premium Branding Package</h4>
                  <p className="text-pink-100 text-sm leading-relaxed mb-3">Complete brand identity with logo, colors & guidelines</p>
                  
                  {/* Value highlight */}
                  <div className="flex items-center justify-between">
                    <div className="bg-gradient-to-r from-pink-400/30 to-purple-400/20 text-pink-200 px-3 py-1.5 rounded-lg text-sm font-semibold border border-pink-400/30">
                      Worth $800+
                    </div>
                    <div className="text-pink-300 text-xs font-medium">Included</div>
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 to-transparent pointer-events-none"></div>
              </div>              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/15 p-5 rounded-xl border-2 border-blue-400/50 relative overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]">
                {/* Support badge */}
                <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                  SUPPORT
                </div>
                
                <div className="mt-4">
                  <h4 className="font-bold text-xl mb-3 text-white leading-tight">Lifetime Support</h4>
                  <p className="text-blue-100 text-sm leading-relaxed mb-4">Hosting, maintenance, updates, and technical support included</p>
                  
                  {/* Feature highlights */}
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-blue-200">
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-2"></div>
                      Free hosting & maintenance
                    </div>
                    <div className="flex items-center text-xs text-blue-200">
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-2"></div>
                      24/7 technical support
                    </div>
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent pointer-events-none"></div>
              </div>
            </div>            {/* Professional Guarantees */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/8 to-blue-500/8 border border-purple-500/20 rounded-lg">
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { icon: Shield, text: "7-Day Money-Back Guarantee", color: "text-purple-400" },
                  { icon: Award, text: "Lifetime Technical Support", color: "text-blue-400" },
                  { icon: BarChart3, text: "Blazing-Fast Hosting Included", color: "text-purple-400" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="font-medium text-white text-xs text-center">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>            {/* Project Timeline */}
            <div className="mb-6 p-5 bg-gradient-to-r from-white/8 to-white/5 border border-white/15 rounded-xl shadow-lg">
              <div className="text-center mb-3">
                <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wide">Project Delivery</h4>
              </div>              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                  <div className="w-2.5 h-2.5 bg-purple-400 rounded-full flex-shrink-0 shadow-sm"></div>
                  <span className="text-center text-gray-200 font-medium">
                    <strong className="text-white">cashforpropertiesnyc.com</strong> goes live in <strong className="text-purple-400">4 business days</strong>
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="w-2.5 h-2.5 bg-blue-400 rounded-full flex-shrink-0 shadow-sm"></div>
                  <span className="text-center text-gray-200 font-medium">
                    <strong className="text-white">100% satisfaction</strong> or <strong className="text-blue-400">full refund</strong> guaranteed
                  </span>
                </div>
              </div>
            </div>            {/* Value Proposition Above Price */}
            <div className="mb-6 text-center">
              <p className="text-base text-gray-300 max-w-xl mx-auto">
                Everything you need to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">establish a powerful online presence</span>
              </p>
            </div>

            {/* Price Display */}            <div className="mb-6 p-6 bg-gradient-to-br from-white/8 to-white/5 border-2 border-purple-400/40 rounded-xl">
              <div className="text-center">
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-white">$3,500</span>
                  <span className="text-lg text-gray-300 ml-2">one-time</span>
                </div>
                <p className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold text-lg mb-2">Complete Website Solution</p>
                <p className="text-gray-300 text-sm">Everything included • No hidden fees • No recurring costs</p></div>
            </div>

            {/* Professional Contact Section */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/8 to-purple-500/8 border border-blue-500/20 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-200 mb-3">
                Want to Discuss before moving forwad?
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center space-x-2 text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium text-sm">Schedule Consultation</span>
                </div>
                <div className="text-gray-400 text-sm hidden sm:block">or</div>
                <div className="flex items-center space-x-2 text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:arsalmaab@gmail.com" className="font-medium text-sm hover:underline">
                    arsalmaab@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Professional CTA */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[hsl(267,75%,56%)] to-[hsl(267,75%,66%)] hover:from-[hsl(267,75%,66%)] hover:to-[hsl(267,75%,76%)] text-white px-12 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 mb-6 border border-[hsl(267,75%,56%)]/50 w-full md:w-auto"
            >
              Get Your Website Now
            </button>

            {/* Professional Footer */}
            <div className="flex flex-col items-center space-y-3">              <button 
                onClick={() => scrollToSection('problem')}
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 font-medium text-sm flex items-center space-x-2 transition-colors duration-200"
              >
                <span>Why do you need a better website?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>              <div className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/20 px-4 py-2 rounded-lg">
                <p className="text-purple-400 font-semibold flex items-center justify-center space-x-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  <span>Fully Managed • No Hosting Fees • No Technical Hassles</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>{/* Schedule Meeting Section */}
      <section className="py-20 lg:py-32 px-6 lg:px-8 relative" ref={meetingRef}>
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
      <section id="contact" ref={contactRef} className="py-20 lg:py-32 px-6 lg:px-8 relative">
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
