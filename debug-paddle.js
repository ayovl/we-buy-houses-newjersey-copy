// Debug utility to verify Paddle environment configuration
// Run this in your browser console after loading the page

console.log('=== PADDLE ENVIRONMENT DEBUG ===');
console.log('Environment:', process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT);
console.log('Client Token (first 10):', process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.substring(0, 10));
console.log('Price ID:', process.env.NEXT_PUBLIC_PADDLE_PRICE_ID);
console.log('Domain:', process.env.NEXT_PUBLIC_DOMAIN);

// Check if variables are properly set
const isProduction = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'production';
console.log('Is Production Mode:', isProduction);

if (!isProduction) {
  console.error('❌ PROBLEM: Not in production mode!');
  console.log('Current environment:', process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT);
} else {
  console.log('✅ Production mode detected');
}

if (!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.startsWith('live_')) {
  console.error('❌ PROBLEM: Client token does not start with "live_"');
  console.log('Token starts with:', process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.substring(0, 5));
} else {
  console.log('✅ Live client token detected');
}

if (!process.env.NEXT_PUBLIC_PADDLE_PRICE_ID?.startsWith('pri_')) {
  console.error('❌ PROBLEM: Price ID does not start with "pri_"');
} else {
  console.log('✅ Valid price ID detected');
}
