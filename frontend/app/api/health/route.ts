import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        ok: true,
        timestamp: new Date().toISOString(),
        service: 'Emergency-Mind API',
        version: '1.0.0'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: {
        message: 'Health check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 });
  }
}
