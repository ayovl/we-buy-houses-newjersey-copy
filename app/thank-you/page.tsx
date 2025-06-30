'use client';

import { useState, useRef, useEffect, useCallback } from 'react'; // Added useEffect, useCallback
import Image from 'next/image';
import Link from 'next/link'; // Added Link
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Mail, Calendar, Phone, Copy, X, Menu } from 'lucide-react'; // Added Menu
import ContactFormModal from '@/components/ContactFormModal';

// Assuming OptimizedImage is not strictly needed here, using next/image
// If OptimizedImage is a simple wrapper, it could be copied or imported.
// For now, standard Image component will be used.

const fadeInUp = {
  initial: { opacity: 0, y: 20 }, // y: 20 is a moderate translation, could be reduced slightly if still too much
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' } // Faster duration and easing for mobile friendliness
};

export default function ThankYou() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  // Removed showNavBackground state and scroll handling logic
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to close mobile menu, can be passed to nav links if they were actual buttons
  const closeMobileMenu = () => setIsMobileMenuOpen(false);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(19,17,28)] to-[rgb(13,13,20)] text-white relative overflow-x-hidden">
      {/* Subtle Background Effects - hidden on small screens */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl hidden sm:block"></div>
      </div>

      {/* Replicated Navigation from app/page.tsx - with static background */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b bg-black/40 md:bg-black/20 md:backdrop-blur-md border-white/10`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16"> {/* Used lg:px-16 from main page for consistency */}
          <div className="flex justify-between md:justify-center items-center h-16 relative">
            <div className="flex items-center md:absolute md:left-0">
              <Link href="/" passHref>
                <div className="flex items-center cursor-pointer" onClick={closeMobileMenu}>
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={34}
                    height={34}
                    className="mr-3"
                    priority={true}
                    sizes="34px"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu - Simplified for Thank You page */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <a href="https://arslanmaab.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">About</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Mobile Menu - Simplified for Thank You page */}
          <div className={`md:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-200 ${
            isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-black/90 border-b border-white/10">
              <div className="px-6 py-4 space-y-4">
                <Link href="/" className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2" onClick={closeMobileMenu}>Home</Link>
                <a href="https://arslanmaab.vercel.app/" target="_blank" rel="noopener noreferrer" className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2" onClick={closeMobileMenu}>About</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Thank You Content - Added pt-16 (h-16 of nav) to push content below fixed nav */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative pt-24 md:pt-16"> {/* Increased top padding more */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
          >
            <CheckCircle className="w-24 h-24 text-purple-400 mx-auto mb-6" />
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            Thank You! <span className="text-[hsl(267,75%,56%)]">Your Project is Confirmed.</span>
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.4 }}
          >
            Your new website and brand assets will be delivered within 4 business days.
          </motion.p>

          {/* Removed the grid md:grid-cols-2 and individual card wrappers for "What Happens Next" and "Need to Reach Us" */}
          {/* They will now be separate motion.divs, taking full width on all screens by default unless specified */}

          <motion.div 
            className="w-full max-w-lg mx-auto mb-12" // Centered, max-width for content
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.6 }}
          >
            {/* This div could retain some card-like styling if desired for "What Happens Next", or be plain */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">What Happens Next?</span>
              </h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                  <span>You&apos;ll receive a confirmation email shortly.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                  <span>Your website will be live in 4 business days</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                  <span>Brand assets and login details will be delivered</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* "Need to Reach Us?" Section - No parent card, content directly on background */}
          <motion.div
            className="w-full max-w-lg mx-auto mb-12 text-center" // Centered, max-width for content
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.7 }} // Adjusted delay
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Need to Reach Us?</span>
            </h3>
            <div className="space-y-6">
              {/* Email Contact Area - Styled similar to main page but without the outer card */}
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                {/* Email Info (Icon, Email, Copy Button) */}
                <div className="flex items-center space-x-3 text-left">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" strokeWidth={2} />
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">arsalmaab@gmail.com</div>
                    <button
                      className="text-gray-300 text-xs hover:text-white transition-colors duration-200 flex items-center space-x-1 group"
                      onClick={() => {
                        navigator.clipboard.writeText('arsalmaab@gmail.com');
                        // Consider adding a toast notification here
                      }}
                    >
                      <span>Click to copy</span>
                      <Copy className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Vertical Divider for sm screens and up, hidden on xs */}
                <div className="hidden sm:block h-10 w-px bg-slate-600/40 self-center"></div>
                {/* Horizontal Divider for xs screens */}
                <div className="block sm:hidden w-full h-px bg-slate-600/40 my-2"></div>


                {/* Email Now Button */}
                <motion.button
                  ref={contactButtonRef}
                  onClick={() => setIsContactFormOpen(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Email Now
                </motion.button>
              </div>

              {/* Simple Horizontal Divider (between email section and schedule call button) */}
              <div className="flex justify-center py-2"> {/* Added padding for spacing */}
                <div className="w-32 h-px bg-slate-600/40"></div>
              </div>

              {/* Schedule Call Button */}
              <motion.button
                className="w-full max-w-xs mx-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/30 backdrop-blur-sm border border-purple-500/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.open('https://calendly.com/arsalmaab/30min', '_blank');
                }}
              >
                Schedule a Call
              </motion.button>
            </div>
          </motion.div>

          {/* "Learn about me" Section - Reintroduced a subtle container */}
          <motion.div 
            className="w-full max-w-lg mx-auto my-12 text-center"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.8 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm shadow-lg"> {/* Subtle container */}
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Learn about me</span>
              </h3>
              <a
                href="https://arslanmaab.vercel.app/"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[hsl(267,75%,56%)] hover:bg-[hsl(267,75%,66%)] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30 border border-purple-500/50"
              // Style similar to a primary CTA button
            >
              About Me <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            </div> {/* Close subtle container div */}
          </motion.div>

          <motion.div 
            className="text-center mt-16" // Added margin-top for spacing
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 1.0 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-purple-300 hover:text-purple-200 border border-purple-400/40 hover:border-purple-400/70 hover:bg-purple-500/10 focus:ring-2 focus:ring-purple-500/50 focus:outline-none font-medium rounded-lg text-sm px-6 py-3 transition-all duration-300 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        triggerRef={contactButtonRef} // Make sure this ref is correctly assigned
      />

      {/* Footer replicated from app/page.tsx with adjusted links */}
      <footer className="relative py-16 px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-transparent to-black/20 mt-24"> {/* Added mt-24 for spacing */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            <motion.div
              className="text-center md:text-left" // Adjusted alignment for consistency
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-white font-semibold text-lg mb-6">Navigation</h4>
              <nav className="space-y-3">
                <motion.div whileHover={{ x: 4 }}>
                  <Link href="/" className="block text-slate-400 hover:text-purple-400 transition-all duration-200 text-sm" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 4 }}>
                  <a href="https://arslanmaab.vercel.app/" target="_blank" rel="noopener noreferrer" className="block text-slate-400 hover:text-purple-400 transition-all duration-200 text-sm" onClick={closeMobileMenu}>
                    About
                  </a>
                </motion.div>
                <motion.div whileHover={{ x: 4 }}>
                  <a
                    href="#"
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsContactFormOpen(true);
                      closeMobileMenu();
                    }}
                    className="block text-slate-400 hover:text-purple-400 transition-all duration-200 text-sm" // Removed w-full and text-left as <a> by default is inline and will align with other <a>/Link
                  >
                    Contact
                  </a>
                </motion.div>
              </nav>
            </motion.div>

            <motion.div
              className="text-center md:text-left" // Adjusted alignment
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-white font-semibold text-lg mb-6">Get in Touch</h4>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center justify-center md:justify-start space-x-3" // Adjusted alignment
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <div className="text-left">
                    <button
                      onClick={() => { setIsContactFormOpen(true); closeMobileMenu(); }}
                      className="text-slate-400 hover:text-white transition-colors duration-200 text-sm block"
                    >
                      arsalmaab@gmail.com
                    </button>
                    <span className="text-slate-500 text-xs">Available 24/7</span>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center justify-center md:justify-start space-x-3" // Adjusted alignment
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <div className="text-left">
                    <a href="https://calendly.com/arsalmaab/30min" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm block">
                      Schedule a Call
                    </a>
                    <span className="text-slate-500 text-xs">Free consultation</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          </motion.div>
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-6 text-center" // Changed to justify-between
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4"> {/* Adjusted gap and flex direction for smaller screens */}
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Vorve. All rights reserved.
              </p>
              <div className="hidden sm:block w-px h-4 bg-slate-600"></div> {/* sm:block for consistency */}
              <p className="text-slate-500 text-sm flex items-center justify-center">
                Made with
                <motion.span
                  className="text-red-400 mx-1.5"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
                by Arsal Maab
              </p>
            </div>

            <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
              <motion.div whileHover={{ y: -1 }}>
                <Link
                  href="/privacy"
                  className="hover:text-slate-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -1 }}>
                <Link
                  href="/terms"
                  className="hover:text-slate-400 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}