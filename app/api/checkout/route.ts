import { NextRequest, NextResponse } from 'next/server';

// This route is no longer needed for checkout - Paddle handles checkout directly
// Keeping minimal structure for any future checkout-related API needs

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { message: 'Checkout API - use Paddle overlay directly' },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { message: 'Checkout handled by Paddle overlay, emails sent via webhooks' },
    { status: 200 }
  );
}
