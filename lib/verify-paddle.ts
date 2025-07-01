// Quick verification script - run this in development
// This will help verify your production setup is working

export function verifyPaddleConfig() {
  const config = {
    environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT,
    clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
  };

  console.log('=== PADDLE CONFIGURATION VERIFICATION ===');
  
  // Check environment
  if (config.environment === 'production') {
    console.log('✅ Environment: production');
  } else {
    console.error('❌ Environment not set to production:', config.environment);
  }
  
  // Check client token
  if (config.clientToken?.startsWith('live_')) {
    console.log('✅ Client token: production (live_...)');
  } else {
    console.error('❌ Client token not production:', config.clientToken?.substring(0, 10));
  }
  
  // Check price ID
  if (config.priceId?.startsWith('pri_')) {
    console.log('✅ Price ID: valid format');
  } else {
    console.error('❌ Price ID invalid:', config.priceId);
  }
  
  // Check domain
  if (config.domain?.includes('vorve.tech')) {
    console.log('✅ Domain: production domain set');
  } else {
    console.log('ℹ️ Domain:', config.domain);
  }
  
  const allValid = 
    config.environment === 'production' &&
    config.clientToken?.startsWith('live_') &&
    config.priceId?.startsWith('pri_') &&
    config.domain?.includes('vorve.tech');
    
  if (allValid) {
    console.log('🎉 ALL CONFIGURATION IS CORRECT FOR PRODUCTION!');
  } else {
    console.error('⚠️ CONFIGURATION ISSUES DETECTED - Check above errors');
  }
  
  return allValid;
}

// Auto-run in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  setTimeout(() => verifyPaddleConfig(), 1000);
}
