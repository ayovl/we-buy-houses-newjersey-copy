'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';

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
      // Call your API to create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to create checkout');
      }

      console.log('Checkout API response:', result);
      console.log('window.Paddle available:', !!window.Paddle);
      console.log('result.priceId:', result.priceId);

      // Open Paddle checkout overlay with the correct options
      if (window.Paddle && result.priceId) {
        const checkoutOptions = {
          items: [{ priceId: result.priceId, quantity: 1 }],
          settings: {
            displayMode: 'overlay' as const,
            theme: 'dark' as const,
            frameTarget: 'self' as const,
            frameInitialHeight: 450,
            frameStyle: 'width: 100%; background-color: transparent; border: none;',
            successUrl: `${window.location.origin}/thank-you?success=true&transaction_id=${result.transactionId}`,
          },
        };
        
        console.log('Opening Paddle checkout with options:', checkoutOptions);
        
        try {
          window.Paddle.Checkout.open(checkoutOptions);
          console.log('Paddle checkout opened successfully');
        } catch (paddleError) {
          console.error('Error opening Paddle checkout:', paddleError);
          throw paddleError;
        }
      } else {
        console.error('Cannot open checkout:', {
          paddleAvailable: !!window.Paddle,
          priceId: result.priceId,
          resultKeys: Object.keys(result)
        });
        throw new Error('Paddle is not loaded or priceId missing');
      }

      return result;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  };

  return { openCheckout, isLoaded };
}
