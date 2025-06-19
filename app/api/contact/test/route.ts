import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Contact API is working',
    hasApiKey: !!process.env.RESEND_API_KEY,
    apiKeyLength: process.env.RESEND_API_KEY?.length || 0,
    timestamp: new Date().toISOString(),
  });
}
