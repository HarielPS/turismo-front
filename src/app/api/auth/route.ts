// src/app/api/check-auth/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false, reason: 'No token' }, { status: 401 });
  }

  try {
    const decoded = jwtDecode<{ role?: string }>(token);

    if (decoded.role?.toLowerCase() === 'proveedor') {
      return NextResponse.json({ authenticated: true });
    } else {
      return NextResponse.json({ authenticated: false, reason: 'Invalid role' }, { status: 403 });
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return NextResponse.json({ authenticated: false, reason: 'Invalid token' }, { status: 400 });
  }
}
