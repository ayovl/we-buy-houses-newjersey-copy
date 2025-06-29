'use client';

import { useState, useRef } from 'react';
import Image from 'next/image'; // Added import
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Mail, Calendar, Phone, Copy, X } from 'lucide-react';
import ContactFormModal from '@/components/ContactFormModal';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ThankYou() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const contactButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(19,17,28)] to-[rgb(13,13,20)] text-white relative overflow-x-hidden px-4 sm:px-6 lg:px-8">
      {/* Subtle Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
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
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="https://arslanmaab.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">About Me</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Thank You Content */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-8 relative">
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

          <motion.div 
            className="grid md:grid-cols-2 gap-8 mb-12"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-[hsl(267,75%,56%)]">What Happens Next?</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                  <span>You'll receive a confirmation email shortly.</span>
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

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-[hsl(267,75%,56%)]">Need to Reach Us?</h3>
              <div className="space-y-6">
                {/* Email Contact Card */}
                <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-lg">
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-blue-400" strokeWidth={2} />
                        </div>
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="text-white font-semibold">arsalmaab@gmail.com</div>
                        <button
                          className="text-gray-300 text-xs hover:text-white transition-colors duration-200 flex items-center space-x-1 group mx-auto sm:mx-0"
                          onClick={() => {
                            navigator.clipboard.writeText('arsalmaab@gmail.com');
                            // Consider adding a toast notification here for feedback
                          }}
                        >
                          <span>Click to copy</span>
                          <Copy className="w-3 h-3 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                    <motion.button
                      ref={contactButtonRef}
                      onClick={() => setIsContactFormOpen(true)}
                      className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-purple-500/25 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Email Now
                    </motion.button>
                  </div>
                </div>

                {/* Simple Horizontal Divider */}
                <div className="flex justify-center">
                  <div className="w-24 h-px bg-slate-600/40"></div>
                </div>

                {/* Schedule Call Button */}
                <motion.button
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30 backdrop-blur-sm border border-purple-500/30 text-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.open('https://calendly.com/arsalmaab/30min', '_blank');
                  }}
                >
                  Schedule a Call
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6 rounded-lg mb-8"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-4">Learn about me</h3>
            <a 
              href="https://arslanmaab.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[hsl(267,75%,56%)] hover:bg-[hsl(267,75%,66%)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              About Me <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </motion.div>

          <motion.div 
            className="text-center"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 1.0 }}
          >
            <a 
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </a>
          </motion.div>
        </div>
      </section>

      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        triggerRef={contactButtonRef} // Make sure this ref is correctly assigned
      />
    </div>
  );
}