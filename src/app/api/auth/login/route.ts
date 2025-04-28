import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { correo, password } = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_RUTA_BACK}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, pass: password }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Login failed' }, { status: 401 });
  }

  const data = await res.json();

  // Guarda token en cookie segura
  const cookieStore = await cookies();
  cookieStore.set('token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  return NextResponse.json({ role: data.role });
}
