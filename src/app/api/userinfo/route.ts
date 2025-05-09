// src/app/api/userinfo/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '../auth/route';

export async function GET() {
  const { decoded, error, status } = await verifyToken();
  
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  return NextResponse.json({ 
    userId: decoded.sub, 
    role: (decoded as any).role 
  });
}