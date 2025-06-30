'use client';

import { motion } from 'framer-motion';

export default function RefundPolicy() {
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
            Refund Policy
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-gray-300 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                This refund policy outlines the circumstances under which refunds may be requested and processed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. 7-Day Money-Back Guarantee</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We offer a 7-day money-back guarantee for all new subscriptions. You may request a full refund within 
                7 days of your initial purchase if:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>You are not satisfied with the quality of our service</li>
                <li>The service does not meet the described functionality</li>
                <li>You have used the service for legitimate business purposes only</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Refund Eligibility</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-green-400">Eligible for Refund:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>New subscriptions within 7 days of purchase</li>
                <li>Billing errors or duplicate charges</li>
                <li>Technical issues preventing service use</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-red-400">Not Eligible for Refund:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Requests made after the 7-day period</li>
                <li>Change of mind after extensive service usage</li>
                <li>Violation of our Terms of Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. How to Request a Refund</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal list-inside text-gray-300 space-y-3">
                <li>
                  <strong>Contact Support:</strong> Email us at support@vorve.tech with &quot;Refund Request&quot; in the subject line
                </li>
                <li>
                  <strong>Provide Information:</strong> Include your account email, order number, and reason for the refund request
                </li>
                <li>
                  <strong>Allow Processing Time:</strong> We will review your request within 2-3 business days
                </li>
                <li>
                  <strong>Await Confirmation:</strong> You will receive an email confirmation once your refund is approved
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Refund Processing</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Processing Timeline:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li><strong>Review Period:</strong> 2-3 business days for request evaluation</li>
                <li><strong>Approval Notification:</strong> Email confirmation within 24 hours of approval</li>
                <li><strong>Payment Processing:</strong> 5-10 business days for funds to appear in your account</li>
                <li><strong>Payment Method:</strong> Refunds are processed to the original payment method</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-blue-400">Refund Methods:</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                All refunds are processed through Paddle, our payment processor:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Credit/Debit Cards:</strong> 5-10 business days</li>
                <li><strong>PayPal:</strong> 3-5 business days</li>
                <li><strong>Bank Transfers:</strong> 5-10 business days</li>
                <li><strong>Digital Wallets:</strong> 3-7 business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Subscription Cancellations</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You can cancel your subscription at any time:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li><strong>Immediate Cancellation:</strong> Access continues until the end of your billing period</li>
                <li><strong>No Automatic Refund:</strong> Cancellation does not automatically trigger a refund</li>
                <li><strong>Data Retention:</strong> Your data is retained for 30 days after cancellation</li>
                <li><strong>Reactivation:</strong> You can reactivate your account within 30 days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Partial Refunds</h2>
              <p className="text-gray-300 leading-relaxed">
                In exceptional circumstances, we may offer partial refunds at our discretion. This typically applies to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4">
                <li>Extended service outages affecting your usage</li>
                <li>Significant changes to service features during your subscription</li>
                <li>Billing errors that result in overcharges</li>
                <li>Technical issues that limit service functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Dispute Resolution</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you&#39;re not satisfied with our refund decision:
              </p>
              <ol className="list-decimal list-inside text-gray-300 space-y-2">
                <li>Contact our customer service manager at manager@vorve.tech</li>
                <li>Provide detailed information about your case</li>
                <li>Allow 5-7 business days for escalated review</li>
                <li>Consider mediation through Paddle&#39;s dispute resolution process</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Chargebacks and Disputes</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Before initiating a chargeback with your bank or credit card company:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Please contact us first to resolve the issue directly</li>
                <li>Chargebacks may result in account suspension</li>
                <li>We will provide documentation to payment processors as needed</li>
                <li>Fraudulent chargebacks may be pursued legally</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Enterprise and Custom Plans</h2>
              <p className="text-gray-300 leading-relaxed">
                Enterprise and custom subscription plans may have different refund terms as specified in your 
                individual agreement. Please refer to your contract or contact your account manager for specific 
                refund policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Policy Changes</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify this refund policy at any time. Changes will be effective immediately 
                upon posting on our website. Continued use of our service after changes constitutes acceptance of 
                the new policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                For refund requests or questions about this policy:
              </p>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="space-y-2">
                  <p className="text-gray-300"><strong>Email:</strong> support@vorve.tech</p>
                  <p className="text-gray-300"><strong>Subject Line:</strong> Refund Request</p>
                  <p className="text-gray-300"><strong>Response Time:</strong> Within 24-48 hours</p>
                  <p className="text-gray-300"><strong>Business Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
                </div>
              </div>
            </section>

            <div className="mt-12 p-6 bg-blue-900/30 rounded-lg border border-blue-400/30">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Need Help?</h3>
              <p className="text-gray-300">
                Our customer success team is here to help you get the most out of Vorve.tech. 
                Before requesting a refund, consider reaching out for support - we&#39;re often able to 
                resolve issues and improve your experience with our service.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
