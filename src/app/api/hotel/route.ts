// src/app/api/eventos/route.ts
import { NextResponse } from 'next/server';
// import { getVerifiedUser } from '../userinfo/route'; // opcional si necesitas auth

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;

  try {
    const res = await fetch(`${backendUrl}/hoteles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch hoteles');
    }

    const hoteles = await res.json();
    return NextResponse.json({ hoteles });
  } catch (err) {
    console.error('Error fetching hoteles:', err);
    return NextResponse.json({ error: 'Failed to fetch hoteles' }, { status: 500 });
  }
}
