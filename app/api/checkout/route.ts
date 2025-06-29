import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { ConfirmationEmailTemplate } from '@/components/ConfirmationEmailTemplate';

// Initialize Resend lazily
const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    // In a real app, you might want to throw an error or have a fallback
    console.error('RESEND_API_KEY is not configured. Email will not be sent.');
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
};

// Validation schema for checkout data
const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name is too long'),
  email: z.string().email('Invalid email address'),
  requests: z.string().max(5000, 'Requests are too long').optional(), // Optional, as per form
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

    const { fullName, email } = validation.data;

    const resend = getResendClient();

    if (!resend) {
      console.error('Resend client not available (API key likely missing). Confirmation email cannot be sent.');
      return NextResponse.json(
        {
          success: false,
          error: 'Email service is currently unavailable. Please try again later.',
          details: 'Resend client initialization failed.'
        },
        { status: 503 } // Service Unavailable
      );
    }

    // Send confirmation email using Resend
    const { data, error } = await resend.emails.send({
      from: '"Arslan Maab" <noreply@vorve.tech>',
      to: [email], // Send to the customer's email
      subject: `🎉 Your Project is Confirmed, ${fullName}!`,
      react: ConfirmationEmailTemplate({ userName: fullName }),
      replyTo: 'arsalmaab@gmail.com', // Your support/reply-to email
    });

    if (error) {
      console.error('Resend error (Checkout Email):', error);
      // Even if email fails, payment might have succeeded.
      // For this task, we'll return an error, but in a real app, you'd handle this carefully.
      return NextResponse.json(
        { success: false, error: 'Failed to send confirmation email. Transaction aborted. Please try again.' },
        { status: 500 } // Internal server error, but could be more specific
      );
    }

    console.log('Confirmation email sent successfully to:', email, 'ID:', data?.id);

    // Simulate successful payment processing
    return NextResponse.json(
      {
        success: true,
        message: 'Checkout processed and confirmation email sent!',
        emailId: data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Checkout API error:', error);
    // Generic error for unexpected issues
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
