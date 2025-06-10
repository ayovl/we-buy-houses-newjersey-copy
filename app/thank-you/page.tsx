'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Mail, Calendar } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(19,17,28)] to-[rgb(13,13,20)] text-white relative overflow-x-hidden">
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
            <div className="text-xl font-bold text-white">WebBrand Pro</div>
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
            We have received your request and we're excited to get started! You will receive an email shortly with the next steps. Your new website and brand assets will be delivered within 4 business days.
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
                  <span>You'll receive a confirmation email within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                  <span>We'll schedule a brief call to discuss your preferences</span>
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
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a href="mailto:arsalmaab@gmail.com" className="text-blue-400 hover:underline">
                    arsalmaab@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">We'll contact you within 24 hours</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6 rounded-lg mb-8"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={{ ...fadeInUp.transition, delay: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-4">In the meantime, feel free to check out my work</h3>
            <a 
              href="https://arslanmaab.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[hsl(267,75%,56%)] hover:bg-[hsl(267,75%,66%)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              View My Portfolio <ArrowRight className="w-5 h-5 ml-2" />
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
    </div>
  );
}