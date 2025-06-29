'use client';

import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-gray-300 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using Vorve.tech ("Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="text-gray-300 leading-relaxed"> 
                We provide professional Websites with intelligent design recommendations optimization.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current 
                at all times. 
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>You must be at least 18 years old to use our service</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Payment for our services is processed through Paddle, our payment processor. By making a purchase, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Provide accurate payment information</li>
                <li>Pay all charges incurred under your account</li>
                <li>Accept that all sales are final unless otherwise stated in our refund policy</li>
                <li>Understand that fees are charged in advance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You agree not to use the service to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Upload malicious code or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for spam or unsolicited communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed">
                The service and its original content, features, and functionality are and will remain the exclusive 
                property of Vorve.tech and its licensors. The service is protected by copyright, trademark, and 
                other laws. You retain ownership of content you create using our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use 
                of the service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We may terminate or suspend your account and bar access to the service immediately, without prior 
                notice or liability, under our sole discretion, for any reason whatsoever, including without 
                limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                In no event shall Vorve.tech, nor its directors, employees, partners, agents, suppliers, or 
                affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                resulting from your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which our 
                company is registered, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service, please contact me at arsalmaab@gmail.com
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
