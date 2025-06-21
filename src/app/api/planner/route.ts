// src/app/api/planner/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '../auth/route';

// Endpoint GET /api/planner → Genera itinerario automático
export async function GET(request: Request) {
  console.log("Iniciando endpoint /api/planner");
  
  // 1. Verificar token
  const { decoded, error, status } = await verifyToken();
  if (error || !decoded) {
    return NextResponse.json({ error: error || 'Invalid token' }, { status: status || 401 });
  }

  // 2. Extraer parámetros de la URL
  const { searchParams } = new URL(request.url);
  const fecha_inicio = searchParams.get('fecha_inicio');
  const fecha_fin = searchParams.get('fecha_fin');
  
  if (!fecha_inicio || !fecha_fin) {
    return NextResponse.json(
      { error: 'Se requieren fecha_inicio y fecha_fin' },
      { status: 400 }
    );
  }

  // 3. Configurar URL del backend NestJS
  const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;
  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Backend URL no configurada' },
      { status: 500 }
    );
  }

  try {
    // 4. Llamar al endpoint de generación de itinerario
    const plannerUrl = `${backendUrl}/planner/${decoded.sub}?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`;
    console.log("URL de solicitud al backend:", plannerUrl);
    
    const res = await fetch(plannerUrl);
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    
    const itinerario = await res.json();
    console.log("Itinerario recibido:", itinerario);
    
    // 5. Devolver respuesta al frontend
    return NextResponse.json(itinerario);
    
  } catch (err) {
    console.error("Error en /api/planner:", err);
    return NextResponse.json(
      { 
        error: 'Error al generar itinerario', 
        details: err instanceof Error ? err.message : String(err) 
      },
      { status: 500 }
    );
  }
}

// Endpoint POST /api/planner → Para itinerarios personalizados (opcional)
export async function POST(request: Request) {
  const { decoded, error, status } = await verifyToken();
  if (error || !decoded) {
    return NextResponse.json({ error: error || 'Invalid token' }, { status: status || 401 });
  }

  try {
    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;
    
    const res = await fetch(`${backendUrl}/planner/personalizado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        id_usuario: decoded.sub
      }),
    });

    const data = await res.json();
    
    return NextResponse.json(data);
    
  } catch (err) {
    console.error("Error en POST /api/planner:", err);
    return NextResponse.json(
      { error: 'Error al guardar itinerario' },
      { status: 500 }
    );
  }
}