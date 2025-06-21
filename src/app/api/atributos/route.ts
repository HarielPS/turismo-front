// src/app/api/atributos/route.ts
import { NextResponse } from 'next/server';
import { getVerifiedUser } from '../userinfo/route';

export async function POST(request: Request) {
  const { error, status } = await getVerifiedUser();
  
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const { ids } = await request.json();
  
  if (!ids || !Array.isArray(ids)) {
    return NextResponse.json({ error: 'Invalid IDs array' }, { status: 400 });
  }

  const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;
  try {
    const res = await fetch(`${backendUrl}/atributos/ids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids })
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch atributos');
    }
    
    const atributos = await res.json();
    return NextResponse.json({ atributos });
  } catch (err) {
    console.error('Error fetching atributos:', err);
    return NextResponse.json({ error: 'Failed to fetch atributos' }, { status: 500 });
  }
}