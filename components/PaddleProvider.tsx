'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { PRODUCTS } from '@/lib/paddle';

interface PaddleContextType {
  paddle: Paddle | undefined;
  isLoaded: boolean;
  error: string | null;
}

const PaddleContext = createContext<PaddleContextType>({
  paddle: undefined,
  isLoaded: false,
  error: null,
});

interface PaddleProviderProps {
  children: ReactNode;
}

export function PaddleProvider({ children }: PaddleProviderProps) {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initPaddle = async () => {
      try {
        // Get environment from your config
        const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'sandbox';
        const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

        if (!clientToken) {
          throw new Error('Paddle client token is not configured');
        }

        // Initialize Paddle
        const paddleInstance = await initializePaddle({
          environment: environment as 'production' | 'sandbox',
          token: clientToken,
          checkout: {
            settings: {
              displayMode: 'overlay',
              theme: 'dark',
              locale: 'en',
            },
          },
        });

        if (paddleInstance) {
          setPaddle(paddleInstance);
          setIsLoaded(true);
          console.log('Paddle initialized successfully');
        } else {
          throw new Error('Failed to initialize Paddle');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Paddle initialization error:', errorMessage);
      }
    };

    initPaddle();
  }, []);

  return (
    <PaddleContext.Provider value={{ paddle, isLoaded, error }}>
      {children}
    </PaddleContext.Provider>
  );
}

export function usePaddle() {
  const context = useContext(PaddleContext);
  if (!context) {
    throw new Error('usePaddle must be used within a PaddleProvider');
  }
  return context;
}

// Custom hook for creating checkout
export function useCheckout() {
  const { paddle, isLoaded } = usePaddle();

  const openCheckout = async (customerData: {
    fullName: string;
    email: string;
    requests?: string;
    company?: string;
    phone?: string;
  }) => {
    if (!paddle || !isLoaded) {
      throw new Error('Paddle is not initialized');
    }

    try {
      // Use the price ID from our configuration
      const priceId = PRODUCTS.COMPLETE_SOLUTION.id;
      
      console.log('Opening checkout with priceId:', priceId);
      console.log('Customer data:', customerData);

      // Open Paddle checkout overlay directly
      const checkoutOptions = {
        items: [{ priceId: priceId, quantity: 1 }],
        customer: {
          email: customerData.email,
          name: customerData.fullName,
        },
        customData: {
          fullName: customerData.fullName,
          email: customerData.email,
          company: customerData.company || '',
          phone: customerData.phone || '',
          projectDetails: customerData.requests || '',
        },
        settings: {
          displayMode: 'overlay' as const,
          theme: 'dark' as const,
          frameTarget: 'self' as const,
          frameInitialHeight: 450,
          frameStyle: 'width: 100%; background-color: transparent; border: none;',
          successUrl: `${window.location.origin}/thank-you?success=true`,
        },
        eventCallback: (data: any) => {
          console.log('🔔 Paddle event received:', data);
          console.log('📊 Event name:', data.name);
          console.log('📋 Event data:', JSON.stringify(data, null, 2));
          
          // Send immediate Resend email when checkout completes
          if (data.name === 'checkout.completed') {
            console.log('✅ Checkout completed, sending confirmation email...');
            console.log('📧 Customer data for email:', {
              email: customerData.email,
              name: customerData.fullName
            });
            
            // Send confirmation email immediately
            fetch('/api/send-confirmation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: customerData.email,
                name: customerData.fullName,
                transactionId: data.data?.transaction_id || 'unknown'
              })
            }).then(res => {
              console.log('📮 Confirmation email API response status:', res.status);
              return res.json();
            }).then(result => {
              console.log('✅ Confirmation email API result:', result);
            }).catch(err => {
              console.error('💥 Failed to send confirmation email:', err);
            });
          }
          
          // Also try other potential event names
          if (data.name === 'checkout.payment.completed' || data.name === 'payment.completed') {
            console.log('💳 Payment completed event detected, sending email...');
            
            fetch('/api/send-confirmation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: customerData.email,
                name: customerData.fullName,
                transactionId: data.data?.transaction_id || 'unknown'
              })
            }).then(res => {
              console.log('📮 Payment email API response:', res.status);
            }).catch(err => {
              console.error('💥 Payment email failed:', err);
            });
          }
        }
      };
      
      console.log('Opening Paddle checkout with options:', checkoutOptions);
      
      if (!window.Paddle) {
        throw new Error('Paddle is not loaded on window object');
      }
      
      window.Paddle.Checkout.open(checkoutOptions);
      console.log('✅ Paddle checkout opened successfully');
      
      // TEMPORARY FIX: Send email immediately when checkout opens
      // This ensures the customer gets the email even if events don't fire
      console.log('🚀 Sending immediate confirmation email as backup...');
      setTimeout(() => {
        fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: customerData.email,
            name: customerData.fullName,
            transactionId: 'immediate-send'
          })
        }).then(res => {
          console.log('🔥 Immediate email API response:', res.status);
          return res.json();
        }).then(result => {
          console.log('🔥 Immediate email result:', result);
        }).catch(err => {
          console.error('🔥 Immediate email failed:', err);
        });
      }, 2000); // Wait 2 seconds after checkout opens

      return { success: true };
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  };

  return { openCheckout, isLoaded };
}
