// src/app/api/eventos/route.ts
import { NextResponse } from 'next/server';
// import { getVerifiedUser } from '../userinfo/route'; // opcional si necesitas auth

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;

  try {
    const res = await fetch(`${backendUrl}/restaurantes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch restaurantes');
    }

    const restaurantes = await res.json();
    return NextResponse.json({ restaurantes });
  } catch (err) {
    console.error('Error fetching Restaurantes:', err);
    return NextResponse.json({ error: 'Failed to fetch Restaurantes' }, { status: 500 });
  }
}
