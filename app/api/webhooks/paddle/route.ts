import { NextRequest, NextResponse } from 'next/server';
import { paddle, PADDLE_CONFIG } from '@/lib/paddle';
import { EventName } from '@paddle/paddle-node-sdk';
import { Resend } from 'resend';
import { ConfirmationEmailTemplate } from '@/components/ConfirmationEmailTemplate';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple GET endpoint to test webhook accessibility
export async function GET() {
  return NextResponse.json({ 
    message: 'Paddle webhook endpoint is accessible',
    timestamp: new Date().toISOString(),
    webhookSecretConfigured: !!PADDLE_CONFIG.webhookSecret 
  });
}

export async function POST(request: NextRequest) {
  console.log('🔔 WEBHOOK RECEIVED - Paddle webhook called');
  
  try {
    // Get the raw body and signature
    const body = await request.text();
    const signature = request.headers.get('paddle-signature');

    console.log('📝 Webhook details:', {
      hasSignature: !!signature,
      bodyLength: body.length,
      contentType: request.headers.get('content-type'),
      userAgent: request.headers.get('user-agent')
    });

    if (!signature) {
      console.error('❌ No Paddle signature found');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    if (!PADDLE_CONFIG.webhookSecret) {
      console.error('❌ Webhook secret not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // Verify the webhook signature
    try {
      console.log('🔐 Verifying webhook signature...');
      const eventData = await paddle.webhooks.unmarshal(body, PADDLE_CONFIG.webhookSecret, signature);
      
      console.log('✅ Webhook verified successfully');
      console.log('📧 Received event:', eventData.eventType);
      console.log('📊 Event data keys:', Object.keys(eventData.data));

      // Handle different event types
      switch (eventData.eventType) {
        case EventName.TransactionCompleted:
          console.log('💰 Processing transaction.completed event');
          console.log('🔍 Transaction ID:', eventData.data.id);
          
          // Cast to any to handle dynamic customer data addition
          let transactionData: any = eventData.data;
          if (!transactionData.customer && transactionData.customerId) {
            console.log('🔍 Fetching customer data for ID:', transactionData.customerId);
            try {
              const customerInfo = await paddle.customers.get(transactionData.customerId);
              transactionData.customer = customerInfo;
              console.log('✅ Customer data fetched and added to transaction');
            } catch (error) {
              console.error('❌ Failed to fetch customer data:', error);
            }
          }
          
          await handleTransactionCompleted(transactionData);
          break;
        
        case EventName.TransactionPaymentFailed:
          console.log('❌ Processing transaction.payment_failed event');
          await handlePaymentFailed(eventData.data);
          break;
        
        case EventName.SubscriptionCreated:
          console.log('🔄 Processing subscription.created event');
          await handleSubscriptionCreated(eventData.data);
          break;
        
        case EventName.CustomerCreated:
          console.log('👤 Processing customer.created event');
          await handleCustomerCreated(eventData.data);
          break;
        
        default:
          console.log(`❓ Unhandled event type: ${eventData.eventType}`);
      }

      return NextResponse.json({ 
        success: true, 
        eventType: eventData.eventType,
        message: 'Webhook processed successfully' 
      });
    } catch (verificationError) {
      console.error('🚫 Webhook verification failed:', verificationError);
      return NextResponse.json({ 
        error: 'Invalid signature',
        details: verificationError instanceof Error ? verificationError.message : 'Unknown verification error'
      }, { status: 401 });
    }
  } catch (error) {
    console.error('💥 Webhook processing error:', error);
    return NextResponse.json({ 
      error: 'Webhook processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function handleTransactionCompleted(transaction: any) {
  console.log('💰 Transaction completed handler called for ID:', transaction.id);
  
  try {
    console.log('📧 Attempting to send confirmation email...');
    await sendConfirmationEmail(transaction);
    
    console.log('📬 Attempting to send notification email...');
    await sendNotificationEmail(transaction);
    
    console.log('✅ All emails processed successfully');
    
  } catch (error) {
    console.error('💥 Error handling completed transaction:', error);
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
  console.log('📧 sendConfirmationEmail function called');
  
  // Try multiple possible locations for customer data
  let customerEmail = null;
  let customerName = 'Valued Customer';
  
  // Check different possible structures
  if (transaction.customer?.email) {
    customerEmail = transaction.customer.email;
    customerName = transaction.customer.name || customerName;
    console.log('✅ Found customer in transaction.customer');
  } else if (transaction.customer_id && transaction.include?.customer?.email) {
    customerEmail = transaction.include.customer.email;
    customerName = transaction.include.customer.name || customerName;
    console.log('✅ Found customer in transaction.include.customer');
  } else if (transaction.details?.customer?.email) {
    customerEmail = transaction.details.customer.email;
    customerName = transaction.details.customer.name || customerName;
    console.log('✅ Found customer in transaction.details.customer');
  } else if (transaction.billing_details?.email) {
    customerEmail = transaction.billing_details.email;
    customerName = transaction.billing_details.name || customerName;
    console.log('✅ Found customer in transaction.billing_details');
  }
  
  console.log('📝 Email processing:', {
    hasEmail: !!customerEmail,
    hasName: !!customerName
  });
  
  if (!customerEmail) {
    console.error('❌ No customer email found in transaction');
    return;
  }

  try {
    console.log('🎨 Rendering React email template...');
    const emailHtml = await render(ConfirmationEmailTemplate({ userName: customerName }));
    
    console.log('📮 Sending email via Resend...');
    const result = await resend.emails.send({
      from: 'no-reply@vorve.tech',
      to: [customerEmail],
      subject: 'Thank you for your order - Vorve.tech',
      html: emailHtml,
    });
    
    console.log('✅ Confirmation email sent successfully');
  } catch (error) {
    console.error('💥 Error sending confirmation email:', error);
  }
}

async function sendNotificationEmail(transaction: any) {
  try {
    const amount = transaction.details?.totals?.total ? (transaction.details.totals.total / 100).toFixed(2) : '0.00';
    
    await resend.emails.send({
      from: 'Paddle Notifications <notifications@vorve.tech>',
      to: ['arsalmaab@gmail.com'],
      subject: `💰 New Payment Received - $${amount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4F46E5;">New Payment Received! 🎉</h1>
          
          <div style="background: #F9FAFB; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h2>Transaction Details</h2>
            <p><strong>Amount:</strong> $${amount} USD</p>
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
    
    console.log('📬 Notification email sent successfully');
  } catch (error) {
    console.error('💥 Error sending notification email:', error);
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
