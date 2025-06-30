import { NextRequest, NextResponse } from 'next/server';
import { paddle, PADDLE_CONFIG } from '@/lib/paddle';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Get the raw body and signature
    const body = await request.text();
    const signature = request.headers.get('paddle-signature');

    if (!signature) {
      console.error('No Paddle signature found');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify the webhook signature
    try {
      // FIX: Await the unmarshal call
      const eventData = await paddle.webhooks.unmarshal(body, PADDLE_CONFIG.webhookSecret, signature);
      
      console.log('Received Paddle webhook:', eventData.eventType);

      // Handle different event types
      switch (eventData.eventType) {
        case 'transaction.completed':
          await handleTransactionCompleted(eventData.data);
          break;
        
        case 'transaction.payment_failed':
          await handlePaymentFailed(eventData.data);
          break;
        
        case 'subscription.created':
          await handleSubscriptionCreated(eventData.data);
          break;
        
        case 'customer.created':
          await handleCustomerCreated(eventData.data);
          break;
        
        default:
          console.log(`Unhandled event type: ${eventData.eventType}`);
      }

      return NextResponse.json({ success: true });
    } catch (verificationError) {
      console.error('Webhook verification failed:', verificationError);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleTransactionCompleted(transaction: any) {
  console.log('Transaction completed:', transaction.id);
  
  try {
    // Send confirmation email to customer
    await sendConfirmationEmail(transaction);
    
    // Send notification email to you
    await sendNotificationEmail(transaction);
    
    // Here you could also:
    // - Update your database
    // - Send data to analytics
    // - Trigger other business processes
    
  } catch (error) {
    console.error('Error handling completed transaction:', error);
  }
}

async function handlePaymentFailed(transaction: any) {
  console.log('Payment failed:', transaction.id);
  
  try {
    // Send payment failure email to customer
    await sendPaymentFailedEmail(transaction);
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

async function handleSubscriptionCreated(subscription: any) {
  console.log('Subscription created:', subscription.id);
  // Handle subscription logic if needed
}

async function handleCustomerCreated(customer: any) {
  console.log('Customer created:', customer.id);
  // Handle new customer logic if needed
}

async function sendConfirmationEmail(transaction: any) {
  const customerEmail = transaction.customer?.email;
  if (!customerEmail) return;

  try {
    await resend.emails.send({
      from: 'Vorve.tech <noreply@vorve.tech>',
      to: [customerEmail],
      subject: 'Payment Confirmed - Your Pitch Deck Project Starts Now! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Payment Confirmed! 🎉</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Your pitch deck project is officially underway</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin: 20px 0; backdrop-filter: blur(10px);">
            <h2 style="margin: 0 0 20px 0; font-size: 22px;">Order Details</h2>
            <p><strong>Transaction ID:</strong> ${transaction.id}</p>
            <p><strong>Amount:</strong> $${(transaction.details?.totals?.total / 100).toFixed(2)} USD</p>
            <p><strong>Service:</strong> Complete Solution Package</p>
            <p><strong>Date:</strong> ${new Date(transaction.created_at).toLocaleDateString()}</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin: 20px 0; backdrop-filter: blur(10px);">
            <h2 style="margin: 0 0 20px 0; font-size: 22px;">What Happens Next?</h2>
            <ol style="padding-left: 20px; line-height: 1.8;">
              <li><strong>Discovery Call (24-48 hours):</strong> I'll reach out to schedule our initial consultation</li>
              <li><strong>Requirements Gathering:</strong> We'll discuss your goals, audience, and key messages</li>
              <li><strong>Creation Process (5-7 days):</strong> AI-powered content creation and professional design</li>
              <li><strong>Review & Revisions:</strong> Unlimited revisions during our 14-day revision period</li>
              <li><strong>Final Delivery:</strong> Complete pitch deck in multiple formats + bonus materials</li>
            </ol>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 30px; margin: 20px 0; backdrop-filter: blur(10px);">
            <h2 style="margin: 0 0 20px 0; font-size: 22px;">Your Investment Includes:</h2>
            <ul style="padding-left: 20px; line-height: 1.8;">
              <li>Professional 10-15 slide pitch deck</li>
              <li>AI-optimized content & messaging</li>
              <li>Custom design & branding</li>
              <li>Investor-ready financial projections</li>
              <li>1-hour presentation coaching session</li>
              <li>Multiple format exports (PPT, PDF, Figma)</li>
              <li>30-day email support</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Questions? Reply to this email or reach out directly:</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>Email:</strong> arsalmaab@gmail.com</p>
            <p style="font-size: 14px; opacity: 0.8; margin-top: 20px;">
              Thank you for choosing Vorve.tech. Let's create something amazing together! 🚀
            </p>
          </div>
        </div>
      `,
    });
    
    console.log('Confirmation email sent to:', customerEmail);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

async function sendNotificationEmail(transaction: any) {
  try {
    await resend.emails.send({
      from: 'Paddle Notifications <notifications@vorve.tech>',
      to: ['arsalmaab@gmail.com'],
      subject: `💰 New Payment Received - $${(transaction.details?.totals?.total / 100).toFixed(2)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4F46E5;">New Payment Received! 🎉</h1>
          
          <div style="background: #F9FAFB; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h2>Transaction Details</h2>
            <p><strong>Customer:</strong> ${transaction.customer?.email}</p>
            <p><strong>Amount:</strong> $${(transaction.details?.totals?.total / 100).toFixed(2)} USD</p>
            <p><strong>Transaction ID:</strong> ${transaction.id}</p>
            <p><strong>Date:</strong> ${new Date(transaction.created_at).toLocaleString()}</p>
          </div>
          
          <div style="background: #EFF6FF; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3>Next Steps:</h3>
            <ol>
              <li>Reach out to the customer within 24-48 hours</li>
              <li>Schedule the discovery call</li>
              <li>Begin the project workflow</li>
            </ol>
          </div>
          
          <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
            This is an automated notification from your Paddle integration.
          </p>
        </div>
      `,
    });
    
    console.log('Notification email sent');
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}

async function sendPaymentFailedEmail(transaction: any) {
  const customerEmail = transaction.customer?.email;
  if (!customerEmail) return;

  try {
    await resend.emails.send({
      from: 'Vorve.tech <noreply@vorve.tech>',
      to: [customerEmail],
      subject: 'Payment Issue - Let\'s Get This Resolved',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #F9FAFB;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #DC2626; margin: 0; font-size: 24px;">Payment Issue Detected</h1>
            <p style="color: #6B7280; margin: 10px 0 0 0;">Don't worry - we can help resolve this quickly</p>
          </div>
          
          <div style="background: white; border-radius: 12px; padding: 30px; margin: 20px 0; border-left: 4px solid #DC2626;">
            <h2 style="color: #111827; margin: 0 0 15px 0;">What Happened?</h2>
            <p style="color: #6B7280; line-height: 1.6;">
              We encountered an issue processing your payment for the Complete Solution Package. 
              This could be due to insufficient funds, an expired card, or a temporary banking issue.
            </p>
          </div>
          
          <div style="background: white; border-radius: 12px; padding: 30px; margin: 20px 0;">
            <h2 style="color: #111827; margin: 0 0 15px 0;">How to Resolve:</h2>
            <ol style="color: #6B7280; line-height: 1.8; padding-left: 20px;">
              <li>Check your payment method details</li>
              <li>Ensure sufficient funds are available</li>
              <li>Contact your bank if needed</li>
              <li>Try the payment again</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_DOMAIN}/pricing" 
               style="background: #4F46E5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Try Payment Again
            </a>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6B7280; font-size: 14px;">
              Need help? Reply to this email or contact us at arsalmaab@gmail.com
            </p>
          </div>
        </div>
      `,
    });
    
    console.log('Payment failed email sent to:', customerEmail);
  } catch (error) {
    console.error('Error sending payment failed email:', error);
  }
}
