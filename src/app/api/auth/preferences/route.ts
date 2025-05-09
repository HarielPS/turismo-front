// src/app/api/auth/preferences/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '../route';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  const { decoded, error, status } = await verifyToken();
  
  console.log('Entro a la ruta de API de preferencias');
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const { preferencias } = await req.json();

  const preferenciasFormateadas = preferencias.map((id: string) => ({
    atributoID: new ObjectId(id),
    // atributoID: id,
    conteo: 1,
  }));

  if (!decoded) {
    return NextResponse.json({ error: 'Token inválido o no proporcionado' }, { status: 400 });
  }

  console.log('url del PUT: ', `${process.env.NEXT_PUBLIC_RUTA_BACK}/usuarios/${decoded.sub}/preferencias`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_RUTA_BACK}/usuarios/${decoded.sub}/preferencias`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ preferencias: preferenciasFormateadas }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Error al guardar preferencias' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}