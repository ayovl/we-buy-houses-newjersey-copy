import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { ContactEmailTemplate } from '@/components/ContactEmailTemplate';
import { PricingEmailTemplate } from '@/components/PricingEmailTemplate';

// Initialize Resend lazily to avoid build-time errors
const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
};

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  message: z.string().max(1000, 'Message is too long').optional().default(''),
  source: z.enum(['contact', 'pricing']).optional().default('contact'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate the request body
    const validation = contactSchema.safeParse(body);
    
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

    const { name, email, message, source } = validation.data;

    // Check if API key is configured and get Resend client
    try {
      const resend = getResendClient();
      
      // Determine which template and subject to use based on source
      const isFromPricing = source === 'pricing';
      const emailTemplate = isFromPricing 
        ? PricingEmailTemplate({ name, email, message })
        : ContactEmailTemplate({ name, email, message });
      
      const subject = isFromPricing
        ? `🔥 HOT LEAD: ${name} wants your website service!`
        : `New Contact Form Submission from ${name}`;
      
      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>', // This will be from your verified domain
        to: ['arsalmaab@gmail.com'],
        subject: subject,
        react: emailTemplate,
        replyTo: email, // This allows you to reply directly to the sender
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to send email' },
          { status: 500 }
        );
      }

      console.log('Email sent successfully:', data);

      return NextResponse.json(
        { 
          success: true, 
          message: 'Email sent successfully!',
          id: data?.id 
        },
        { status: 200 }
      );
      
    } catch (initError) {
      console.error('Email service initialization error:', initError);
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
