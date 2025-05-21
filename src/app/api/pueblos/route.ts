import { NextResponse } from 'next/server';
// import { getVerifiedUser } from '../userinfo/route'; // opcional si necesitas auth

export async function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;

  try {
    const res = await fetch(`${backendUrl}/pueblo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch pueblos');
    }

    const pueblos = await res.json();
    return NextResponse.json(pueblos);
  } catch (err) {
    console.error('Error fetching pueblos:', err);
    return NextResponse.json({ error: 'Failed to fetch eventos' }, { status: 500 });
  }
}
