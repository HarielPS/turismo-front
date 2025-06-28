import { NextRequest, NextResponse } from 'next/server';
import { getVerifiedUser } from '../../route';

export async function PATCH(req: NextRequest, { params }: { params: { rutaId: string } }) {
  const { userId, error, status } = await getVerifiedUser();
  if (error) return NextResponse.json({ error }, { status });

  const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;
  if (!backendUrl) return NextResponse.json({ error: 'Backend URL missing' }, { status: 500 });

  const body = await req.json();

  try {
    const res = await fetch(`${backendUrl}/usuarios/${userId}/actualizar-guardado/${params.rutaId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error actualizando ruta:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
