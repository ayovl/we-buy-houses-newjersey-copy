import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ConfirmationEmailTemplate } from '@/components/ConfirmationEmailTemplate';
import { render } from '@react-email/render';

// Initialize Resend lazily to avoid build-time errors
const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
};

export async function POST(req: NextRequest) {
  try {
    console.log('📧 Send confirmation email API called');
    
    const { email, name, transactionId } = await req.json();
    
    console.log('📝 Email details:', { email, name, transactionId });

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Render the React email template to HTML
    console.log('🎨 Rendering React email template...');
    const emailHtml = await render(ConfirmationEmailTemplate({ userName: name }));
    
    console.log('📮 Sending email via Resend...');
    const resend = getResendClient();
    const result = await resend.emails.send({
      from: 'no-reply@vorve.tech',
      to: email,
      subject: 'Thank you for your order - Vorve.tech',
      html: emailHtml,
    });
    
    console.log('✅ Confirmation email sent successfully:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Confirmation email sent',
      emailId: result.data?.id 
    });
    
  } catch (error) {
    console.error('💥 Error sending confirmation email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
