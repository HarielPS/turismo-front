// src/app/api/userinfo/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '../auth/route';

// Función común para verificar el token y extraer datos básicos
export async function getVerifiedUser() {
  const { decoded, error, status } = await verifyToken();
  
  if (error || !decoded) {
    return { error: error || 'Invalid token', status: status || 401 };
  }

  return { 
    userId: decoded.sub, 
    role: (decoded as any).role,
    error: null,
    status: null 
  };
}

// Endpoint GET /api/userinfo → Solo devuelve ID y rol (como antes)
export async function GET() {
  console.log("Iniciando endpoint /api/userinfo");
  
  const { decoded, error, status } = await verifyToken();
  console.log("Token decodificado:", decoded); // Verifica que decoded.sub exista

  if (error || !decoded) {
    return NextResponse.json({ error: error || 'Invalid token' }, { status: status || 401 });
  }

  const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;
  console.log("Backend URL:", backendUrl); // Verifica que la URL esté configurada

  try {
    const userUrl = `${backendUrl}/usuarios/${decoded.sub}`;
    console.log("URL de solicitud al backend:", userUrl); // Verifica la URL final
    
    const res = await fetch(userUrl);
    console.log("Respuesta del backend:", res); // Verifica el status
    
    const userData = await res.json();
    console.log("Datos del usuario desde backend:", userData); // Verifica los datos
    
    return NextResponse.json({ userId: decoded.sub, role: (decoded as any).role, userData });
  } catch (err) {
    console.error("Error en /api/userinfo:", err);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
// usarla: 
// const resBasic = await fetch('/api/userinfo');
// const { userId, role } = await resBasic.json();


// Endpoint POST /api/userinfo/full → Devuelve toda la info del usuario desde la DB
export async function POST() {
  const { userId, role, error, status } = await getVerifiedUser();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  // Obtener datos completos del usuario desde tu backend
  const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;
  if (!backendUrl) {
    return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`${backendUrl}/usuarios/${userId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await res.json();

    return NextResponse.json({ 
      userId,
      role,
      userData // Todos los datos del usuario
    });
  } catch (err) {
    console.error('Error fetching user data:', err);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}

// usarla:
// const resFull = await fetch('/api/userinfo', {
//   method: 'POST',
// });
// const { userId, role, userData } = await resFull.json();