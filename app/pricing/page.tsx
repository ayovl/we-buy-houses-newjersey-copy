'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCheckout } from '../../components/PaddleProvider';
import { 
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Award,
  Zap,
  Gift
} from 'lucide-react';

export default function PricingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    requests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Paddle checkout
  const { openCheckout, isLoaded: paddleLoaded } = useCheckout();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const handleGetStarted = async () => {
    if (!paddleLoaded) {
      setError('Payment system is loading. Please wait...');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await openCheckout({
        fullName: formData.fullName || 'Customer',
        email: formData.email || '',
        requests: formData.requests || 'Started from pricing page',
        company: formData.company || '',
        phone: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open checkout');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="py-6 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Vorve.tech
          </Link>
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Pricing & Plans
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional AI-powered pitch deck services designed to help you win more deals, 
              secure funding, and make compelling presentations that convert.
            </p>
          </motion.div>

          {/* Main Pricing Card */}
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-gray-900/90 backdrop-blur-sm border border-slate-400/40 shadow-2xl px-8 py-12 lg:px-16 lg:py-20 rounded-3xl relative overflow-hidden max-w-5xl mx-auto mb-16"
          >
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-12">
                <motion.h2 
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-bold mb-4 text-white"
                >
                  Complete Solution Package
                </motion.h2>
                <motion.p 
                  variants={fadeInUp}
                  className="text-gray-300 text-lg max-w-2xl mx-auto"
                >
                  Everything you need for professional pitch decks that win deals and secure funding
                </motion.p>
              </div>

              {/* Pricing */}
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-6xl md:text-7xl font-bold text-white">$2,997</span>
                  <span className="text-gray-400 text-xl ml-2">/project</span>
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>100% Money-back guarantee</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>14-day revision period</span>
                  </div>
                </div>
              </motion.div>

              {/* Features Grid */}
              <motion.div 
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-8 mb-12"
              >
                {/* Left Column */}
                <motion.div variants={fadeInUp} className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                    <Star className="w-6 h-6 text-yellow-400 mr-3" />
                    Core Deliverables
                  </h3>
                  
                  {[
                    'Professional 10-15 slide pitch deck',
                    'AI-optimized content & messaging',
                    'Custom design & branding',
                    'Investor-ready financial projections',
                    'Compelling storytelling framework',
                    'Multiple format exports (PPT, PDF, Figma)'
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Right Column */}
                <motion.div variants={fadeInUp} className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                    <Zap className="w-6 h-6 text-blue-400 mr-3" />
                    Bonus Services
                  </h3>
                  
                  {[
                    'Market research & competitive analysis',
                    'Industry-specific templates library',
                    'Presentation coaching session (1 hour)',
                    'LinkedIn optimization recommendations',
                    '30-day email support',
                    'Future update templates'
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Process Timeline */}
              <motion.div variants={fadeInUp} className="mb-12">
                <h3 className="text-2xl font-semibold text-white mb-8 text-center">Delivery Timeline</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-white mb-2">Discovery</h4>
                    <p className="text-gray-400 text-sm">Initial consultation & requirements gathering (1-2 days)</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-white mb-2">Creation</h4>
                    <p className="text-gray-400 text-sm">AI-powered content creation & design (5-7 days)</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-white mb-2">Delivery</h4>
                    <p className="text-gray-400 text-sm">Final presentation & revisions (2-3 days)</p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={fadeInUp} className="text-center">
                <button
                  onClick={handleGetStarted}
                  className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                </button>
                <p className="text-gray-400 text-sm mt-4">
                  Ready to get started? Let&#39;s create your winning pitch deck.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <Shield className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Money-Back Guarantee</h3>
              <p className="text-gray-300">
                Not satisfied? Get your money back within 14 days, no questions asked.
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <Award className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Proven Results</h3>
              <p className="text-gray-300">
                Our pitch decks have helped clients raise over $50M in funding and close major deals.
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <Gift className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Bonus Materials</h3>
              <p className="text-gray-300">
                Receive exclusive templates, coaching, and ongoing support to maximize your success.
              </p>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "What's included in the Complete Solution Package?",
                  answer: "You'll receive a professionally designed 10-15 slide pitch deck, AI-optimized content, custom branding, financial projections, presentation coaching, and ongoing support."
                },
                {
                  question: "How long does it take to complete?",
                  answer: "The typical turnaround time is 7-10 business days from the initial consultation to final delivery, including revision rounds."
                },
                {
                  question: "Do you offer revisions?",
                  answer: "Yes! We include unlimited revisions during the 14-day revision period to ensure you're completely satisfied with the final product."
                },
                {
                  question: "What if I'm not satisfied?",
                  answer: "We offer a 100% money-back guarantee within 14 days of delivery. Your satisfaction is our top priority."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Pitch?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join hundreds of successful entrepreneurs and business leaders who&#39;ve used our AI-powered 
                pitch deck services to win deals and secure funding.
              </p>
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Form Modal - Placeholder for now */}
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Get Started</h3>
            <p className="text-gray-300 mb-6">
              Ready to create your winning pitch deck? Contact us to begin your project.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsContactFormOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <a
                href="mailto:support@vorve.tech?subject=Pitch Deck Project Inquiry"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
