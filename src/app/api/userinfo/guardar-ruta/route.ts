import { NextRequest, NextResponse } from 'next/server';
import { getVerifiedUser } from '../route';

export async function GET() {
  const { userId, error, status } = await getVerifiedUser();
  console.log('Entro al GET de guardar-ruta');
  if (error) return NextResponse.json({ error }, { status });

  const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;
  if (!backendUrl) return NextResponse.json({ error: 'Backend URL missing' }, { status: 500 });

  try {
    const res = await fetch(`${backendUrl}/usuarios/${userId}`);
    const userData = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: userData.message }, { status: res.status });
    }
    console.log('Rutas guardadas:', userData.guardado);
    return NextResponse.json({ guardados: userData.guardado });
  } catch (err) {
    console.error('Error al obtener rutas guardadas:', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId, error, status } = await getVerifiedUser();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;
  if (!backendUrl) {
    return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
  }

  try {
    const ruta = await req.json();

    const res = await fetch(`${backendUrl}/usuarios/${userId}/guardar-ruta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ruta),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Error al guardar la ruta' }, { status: res.status });
    }

    return NextResponse.json({ message: 'Ruta guardada con éxito', ruta: data });
  } catch (err) {
    console.error('Error en guardar-ruta:', err);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}
