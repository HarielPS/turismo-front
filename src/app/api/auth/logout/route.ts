import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  // Borra la cookie "token"
  const cookieStore = await cookies();
  cookieStore.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0, 
  });

  return NextResponse.json({ message: 'Logged out' });
}
