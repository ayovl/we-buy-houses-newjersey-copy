'use client';

import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
  title?: string;
  subtitle?: string;
  messagePlaceholder?: string;
  messageLabel?: string;
  messageOptional?: boolean;
}

// Base validation schema
const baseContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
});

const createContactSchema = (messageOptional: boolean) => {
  return baseContactSchema.extend({
    message: messageOptional 
      ? z.string().max(1000, 'Message is too long').optional().default('')
      : z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
  });
};

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const ContactFormModal: React.FC<ContactFormModalProps> = ({ 
  isOpen, 
  onClose, 
  triggerRef,
  title = "Get in Touch",
  subtitle = "Let's discuss your project",
  messagePlaceholder = "Tell me about your project or how I can help you...",
  messageLabel = "Message",
  messageOptional = false
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      const schema = createContactSchema(messageOptional);
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      console.log('Contact form response:', { status: response.status, result });

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Failed to send message. Please try again.');
        console.error('Contact form error:', result);
      }
    } catch (error) {
      console.error('Contact form network error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  if (!isMounted) {
    return null; // Don't render anything on the server or before hydration
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"> {/* Restored flex items-center justify-center */}
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
            {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md mx-auto px-4" // Restored relative, mx-auto for centering with flex
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main modal container with your website's design language */}
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/25 rounded-2xl shadow-2xl relative overflow-hidden group max-h-[90vh] flex flex-col">
              {/* Enhanced background effects matching your website's design */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-pink-500/8 opacity-70"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent)] opacity-50"></div>
              
              {/* Header */}
              <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30 backdrop-blur-sm">
                    <Mail className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                    <p className="text-sm text-gray-300">{subtitle}</p>
                  </div>
                </div>                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200 backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="relative z-10 p-6 overflow-y-auto">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/40 rounded-full mx-auto mb-4 backdrop-blur-sm">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-300 text-sm">{submitMessage}</p>
                  </motion.div>
                ) : (                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="inline w-4 h-4 mr-2 text-purple-400" />
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400 backdrop-blur-sm ${
                          errors.name ? 'border-red-400/50' : 'border-white/20'
                        }`}
                        placeholder="Your full name"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="inline w-4 h-4 mr-2 text-purple-400" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400 backdrop-blur-sm ${
                          errors.email ? 'border-red-400/50' : 'border-white/20'
                        }`}
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        <MessageSquare className="inline w-4 h-4 mr-2 text-purple-400" />
                        {messageLabel}{messageOptional && " (Optional)"}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 resize-none text-white placeholder-gray-400 backdrop-blur-sm ${
                          errors.message ? 'border-red-400/50' : 'border-white/20'
                        }`}
                        placeholder={messagePlaceholder}
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                      )}
                      <p className="mt-1 text-xs text-gray-400">
                        {formData.message.length}/1000 characters
                      </p>
                    </div>

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-400/20 rounded-xl backdrop-blur-sm"
                      >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-400">{submitMessage}</p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/50 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ContactFormModal;
