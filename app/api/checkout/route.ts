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
    const body = await req.json();

    const validation = checkoutSchema.safeParse(body);

    if (!validation.success) {
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

    // Prepare customer metadata for Paddle
    const customerData: CustomerMetadata = {
      email,
      name: fullName,
      company: company || '',
      phone: phone || '',
      projectDetails: requests || '',
    };

    try {
      // 1. Create or fetch the Paddle customer
      const customer = await paddle.customers.create({
        email,
        name: fullName,
      });

      // 2. Create a Paddle transaction (one-time checkout)
      const transaction = await paddle.transactions.create({
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
        // Optionally add successUrl, cancelUrl, etc.
      });
      
      // 3. Return the transaction info (including priceId for Paddle overlay)
      return NextResponse.json({
        success: true,
        priceId: PRODUCTS.COMPLETE_SOLUTION.id,
        transactionId: transaction.id,
        message: 'Checkout session created successfully',
      });
      
    } catch (paddleError: any) {
      console.error('Paddle checkout creation error:', paddleError);
      
      // Handle specific Paddle errors
      if (paddleError.code === 'invalid_field') {
        return NextResponse.json(
          { success: false, error: 'Invalid checkout data provided' },
          { status: 400 }
        );
      }
      
      if (paddleError.code === 'authentication_failed') {
        return NextResponse.json(
          { success: false, error: 'Payment service authentication failed' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: 'Failed to create checkout session. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Checkout API error:', error);
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
