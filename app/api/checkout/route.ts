import { NextRequest, NextResponse } from 'next/server';
import { paddle, getCheckoutConfig, CustomerMetadata, PRODUCTS } from '@/lib/paddle';
import { z } from 'zod';

// Validation schema for checkout data
const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name is too long'),
  email: z.string().email('Invalid email address'),
  requests: z.string().max(5000, 'Requests are too long').optional(),
  company: z.string().max(100, 'Company name is too long').optional(),
  phone: z.string().max(20, 'Phone number is too long').optional(),
});

export async function POST(req: NextRequest) {
  try {
    console.log('=== Checkout API Called ===');
    
    const body = await req.json();
    console.log('Request body:', body);

    const validation = checkoutSchema.safeParse(body);

    if (!validation.success) {
      console.log('Validation failed:', validation.error.flatten().fieldErrors);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { fullName, email, requests, company, phone } = validation.data;

    // Check environment variables
    console.log('Environment check:', {
      hasApiKey: !!process.env.PADDLE_API_KEY,
      environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT,
      priceId: PRODUCTS.COMPLETE_SOLUTION.id
    });

    // Prepare customer metadata for Paddle
    const customerData: CustomerMetadata = {
      email,
      name: fullName,
      company: company || '',
      phone: phone || '',
      projectDetails: requests || '',
    };

    try {
      // Check if Paddle is properly configured
      if (!process.env.PADDLE_API_KEY) {
        console.error('PADDLE_API_KEY is not set');
        return NextResponse.json(
          { success: false, error: 'Payment service not configured' },
          { status: 500 }
        );
      }

      console.log('Creating Paddle customer...', { email, name: fullName });
      
      // 1. Create or fetch the Paddle customer
      const customer = await paddle.customers.create({
        email,
        name: fullName,
      });

      console.log('Customer created:', customer.id);

      // 2. Create a Paddle transaction (one-time checkout)
      const transactionData = {
        items: [
          {
            priceId: PRODUCTS.COMPLETE_SOLUTION.id,
            quantity: 1,
          },
        ],
        customerId: customer.id,
        customData: {
          company: company || '',
          phone: phone || '',
          projectDetails: requests || '',
        },
      };
      
      console.log('Creating transaction with data:', transactionData);
      
      const transaction = await paddle.transactions.create(transactionData);

      console.log('Transaction created:', transaction.id);
      
      // 3. Return the transaction info (including priceId for Paddle overlay)
      return NextResponse.json({
        success: true,
        priceId: PRODUCTS.COMPLETE_SOLUTION.id,
        transactionId: transaction.id,
        message: 'Checkout session created successfully',
      });
      
    } catch (paddleError: any) {
      console.error('=== Paddle Error Details ===');
      console.error('Full error object:', paddleError);
      console.error('Error message:', paddleError.message);
      console.error('Error code:', paddleError.code);
      
      if (paddleError.response) {
        console.error('Response status:', paddleError.response.status);
        console.error('Response data:', paddleError.response.data);
      }
      
      // Return more specific error information
      const errorMessage = paddleError.message || 'Unknown Paddle error';
      const errorCode = paddleError.code || 'unknown_error';
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Paddle API error: ${errorMessage}`,
          code: errorCode,
          details: paddleError.response?.data || null
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('=== General Checkout Error ===');
    console.error('Error:', error);
    
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Handle GET requests for checkout status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const checkoutId = searchParams.get('id');
  
  if (!checkoutId) {
    return NextResponse.json(
      { error: 'Checkout ID is required' },
      { status: 400 }
    );
  }
  
  try {
    // Fetch transaction by ID
    const transaction = await paddle.transactions.get(checkoutId);
    return NextResponse.json({
      success: true,
      transaction: {
        id: transaction.id,
        status: transaction.status,
        customer: transaction.customer,
        items: transaction.items,
      },
    });
    
  } catch (error) {
    console.error('Error fetching checkout:', error);
    return NextResponse.json(
      { error: 'Failed to fetch checkout' },
      { status: 500 }
    );
  }
}
