import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { ContactEmailTemplate } from '@/components/ContactEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
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

    const { name, email, message } = validation.data;

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // This will be from your verified domain
      to: ['arsalmaab@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      react: ContactEmailTemplate({ name, email, message }),
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

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
