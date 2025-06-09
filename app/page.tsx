'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Shield, 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp, 
  Eye, 
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
  Menu
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
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    requests: ''
  });

  // Scroll detection for navigation background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowNavBackground(scrollY > 50); // Show background after scrolling 50px
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
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu when section is clicked
    setIsMobileMenuOpen(false);
  };  return (
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
                width={35} 
                height={35} 
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
      </nav>{/* Hero Section - Mobile Performance Optimized */}
      <section ref={heroRef} className="h-screen flex items-center justify-center px-6 lg:px-8 relative keep-mobile-animation">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"            initial={fadeInUp.initial}
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
      </section>{/* Problem Section */}
      <section id="problem" ref={problemRef} className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
            initial={fadeInUp.initial}
            animate={problemInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            The Problem with <span className="text-red-400">cashforpropertiesnyc.com</span>
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={staggerContainer.initial}
            animate={problemInView ? staggerContainer.animate : staggerContainer.initial}
          >
            {[
              { icon: Shield, title: "Poor Design", description: "Making your business appear untrustworthy and unprofessional." },
              { icon: DollarSign, title: "Wasted Ad Spend", description: "Paying for ads only to see visitors click away." },
              { icon: Users, title: "Bad First Impression", description: "Causing potential clients to leave quickly." },
              { icon: Target, title: "No Clear CTA", description: "Lack of a clear call-to-action is hurting your conversions." },
              { icon: TrendingUp, title: "Unmotivating", description: "Failing to motivate users to explore your offerings." },
              { icon: Eye, title: "Slow Loading", description: "Slow-loading, causing users to leave before they see your value." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg hover:scale-105 transition-transform duration-300"
                variants={staggerChild}
              >
                <item.icon className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* Solution Section */}
      <section id="solution" ref={solutionRef} className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"            initial={fadeInUp.initial}
            animate={solutionInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            A Professionally Designed Website <span className="text-green-400">Delivers Results</span>
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={staggerContainer.initial}
            animate={solutionInView ? staggerContainer.animate : staggerContainer.initial}
          >
            {[
              { stat: "43%", title: "Higher Conversion Rate", description: "Professional websites convert 43% more visitors into clients" },
              { stat: "75%", title: "Trust Factor", description: "75% of users judge credibility based on website design" },
              { stat: "94%", title: "First Impressions", description: "94% of first impressions are design-related" },
              { stat: "132%", title: "Revenue Increase", description: "Well-designed websites can boost revenue by 132%" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300"
                variants={staggerChild}
              >
                <div className="text-4xl font-bold text-[hsl(267,75%,56%)] mb-2">{item.stat}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* Mid-Page CTA */}
      <section ref={ctaRef} className="py-20 px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
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
      <section ref={testimonialRef} className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16"
            initial={fadeInUp.initial}
            animate={testimonialInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Trusted by <span className="text-[hsl(267,75%,56%)]">Businesses Like Yours</span>
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={staggerContainer.initial}
            animate={testimonialInView ? staggerContainer.animate : staggerContainer.initial}
          >
            {[
              {
                rating: 5,
                quote: "Arslan delivered a fantastic website that exceeded all our expectations. The process was smooth, and the result was a game-changer for our online presence.",
                author: "Client from Upwork"
              },
              {
                rating: 5,
                quote: "Professional, responsive, and incredibly talented. Our new website has significantly improved our conversion rates and client engagement.",
                author: "Business Owner"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg"
                variants={staggerChild}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold">{testimonial.author}</p>
                <a href="#" className="text-[hsl(267,75%,56%)] text-sm hover:underline">View on Upwork →</a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* The Offer Section */}
      <section id="offer" ref={benefitsRef} className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6"
            initial={fadeInUp.initial}
            animate={benefitsInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            Your All-In-One <span className="text-[hsl(267,75%,56%)]">Website Solution</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 text-center mb-16"
            initial={fadeInUp.initial}
            animate={benefitsInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            Get a Fully Branded, Conversion-Optimized Website That Drives Results.
          </motion.p>
            <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            initial={staggerContainer.initial}
            animate={benefitsInView ? staggerContainer.animate : staggerContainer.initial}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg"
              variants={staggerChild}
            >
              <h3 className="text-2xl font-bold mb-4">Website Design & Development</h3>
              <ul className="space-y-3">
                {[
                  "Fully custom website",
                  "Responsive design",
                  "Up to 10 pages",
                  "Contact form setup"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg"
              variants={staggerChild}
            >
              <h3 className="text-2xl font-bold mb-4">SEO & Copywriting</h3>
              <ul className="space-y-3">
                {[
                  "SEO optimized",
                  "Fast loading",
                  "Clear user flow",
                  "Conversion-optimized copy"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-[hsl(267,75%,56%)]/20 to-pink-500/20 border-2 border-[hsl(267,75%,56%)]/50 p-6 rounded-lg relative overflow-hidden"
              variants={staggerChild}
            >
              <div className="absolute top-2 right-2">
                <Gift className="w-6 h-6 text-[hsl(267,75%,56%)]" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[hsl(267,75%,56%)]">FREE Branding Package</h3>
              <p className="text-sm text-gray-300 mb-4">Included at no extra cost!</p>
              <ul className="space-y-3">
                {[
                  { icon: Palette, text: "Logo refresh" },
                  { icon: FileText, text: "Color palette & brand guidelines" },
                  { icon: Type, text: "Typography selection" }
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <item.icon className="w-5 h-5 text-[hsl(267,75%,56%)] mr-3" />
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-[hsl(267,75%,56%)]/10 rounded-lg border border-[hsl(267,75%,56%)]/30">
                <p className="text-sm text-center font-semibold text-[hsl(267,75%,56%)]">
                  Worth $800+ - Yours FREE!
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Hosting & Support */}          <motion.div 
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg mb-8"
            initial={fadeInUp.initial}
            animate={benefitsInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Hosting & Setup</h3>
                <ul className="space-y-3">
                  {[
                    "Free setup",
                    "Custom domain",
                    "Deployed live",
                    "Free hosting"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Lifetime Support</h3>
                <ul className="space-y-3">
                  {[
                    "Minor edits",
                    "Uptime monitoring",
                    "Updates for life",
                    "Technical support"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Trust Badges */}          <motion.div 
            className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 p-6 rounded-lg"
            initial={fadeInUp.initial}
            animate={benefitsInView ? fadeInUp.animate : fadeInUp.initial}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <div className="flex flex-wrap justify-center gap-8 text-center">
              {[
                { icon: Shield, text: "7-Day Money-Back Guarantee", color: "text-green-400" },
                { icon: Award, text: "Lifetime Technical Support", color: "text-blue-400" },
                { icon: BarChart3, text: "Blazing-Fast Hosting Included", color: "text-purple-400" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/5 px-4 py-3 rounded-lg border border-white/10">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="font-semibold text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-[hsl(267,75%,56%)]/50 p-8 rounded-2xl text-center relative overflow-hidden"
            initial={fadeInUp.initial}
            animate={pricingInView ? fadeInUp.animate : fadeInUp.initial}
            transition={fadeInUp.transition}
          >
            {/* Enhanced Ribbon */}
            <div className="absolute -top-1 -right-1">
              <div className="bg-gradient-to-r from-[hsl(267,75%,56%)] via-purple-500 to-pink-500 text-white px-8 py-3 text-sm font-bold transform rotate-12 translate-x-4 -translate-y-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Gift className="w-4 h-4" />
                  <span>Complete Solution</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to <span className="text-[hsl(267,75%,56%)]">Succeed Online</span>
              </h2>
              
              {/* Price */}
              <div className="mb-6">
                <div className="text-6xl md:text-7xl font-bold text-[hsl(267,75%,56%)] mb-2">
                  $3,950
                  <span className="text-2xl text-gray-300 ml-2">USD</span>
                </div>
                <p className="text-lg text-gray-300">
                  <span className="line-through">Real value: $5,100</span> – You're saving over $1,000!
                </p>
              </div>

              {/* What's Included - Highlighted Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h4 className="font-bold text-lg mb-2">Complete Website</h4>
                  <p className="text-sm text-gray-300">Custom design, 10 pages, mobile-responsive</p>
                </div>
                <div className="bg-gradient-to-br from-[hsl(267,75%,56%)]/20 to-pink-500/20 p-4 rounded-lg border-2 border-[hsl(267,75%,56%)]/50">
                  <div className="flex items-center justify-center mb-2">
                    <Gift className="w-5 h-5 text-[hsl(267,75%,56%)] mr-2" />
                    <h4 className="font-bold text-lg text-[hsl(267,75%,56%)]">FREE Branding</h4>
                  </div>
                  <p className="text-sm">Logo, colors, typography - worth $800+</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h4 className="font-bold text-lg mb-2">Lifetime Support</h4>
                  <p className="text-sm text-gray-300">Hosting, updates, and technical support</p>
                </div>
              </div>

              {/* Prominent Contact Info */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-lg font-semibold text-blue-300 mb-3">
                  📞 Schedule a call or email before moving forward
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center space-x-2 text-blue-300">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">Schedule a Call</span>
                  </div>
                  <div className="text-gray-400">or</div>
                  <div className="flex items-center space-x-2 text-blue-300">
                    <Mail className="w-5 h-5" />
                    <a href="mailto:arsalmaab@gmail.com" className="font-medium hover:underline">
                      arsalmaab@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[hsl(267,75%,56%)] hover:bg-[hsl(267,75%,66%)] text-white px-12 py-4 rounded-lg text-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 mb-6"
              >
                Get Your New Website Now
              </button>

              {/* Important Details */}
              <div className="space-y-2 text-sm text-gray-300 mb-6">
                <p>✅ Your new website will be live at <strong>cashforpropertiesnyc.com</strong> in 4 days</p>
                <p>💯 100% satisfaction or a full refund</p>
              </div>              {/* Context Link */}
              <button 
                onClick={() => scrollToSection('problem')}
                className="text-[hsl(267,75%,56%)] hover:underline text-sm mb-4 flex items-center justify-center mx-auto"
              >
                Why Do You Need This, Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* Lock-in Statement */}
              <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                <p className="text-green-400 font-semibold">
                  🔒 Fully Managed. No Hosting Fees. No Tech Headaches.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>      {/* Schedule Meeting Section */}
      <section className="py-20 px-6 lg:px-8 relative" ref={meetingRef}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
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
      <section id="contact" ref={contactRef} className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
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
          </motion.div>
        </div>
      )}
    </div>
  );
}
