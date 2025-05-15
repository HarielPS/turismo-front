import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


export async function middleware(req: NextRequest) {
    // Verifica si el token existe en las cookies
//   const noCacheHeaders = new Headers({
//     'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
//     Pragma: 'no-cache',
//     Expires: '0',
//   });

console.log("Middleware ejecutado para", req.nextUrl.pathname);
  const token = req.cookies.get("token")?.value || "";

  const publicPaths = [
    "/",
    "/session/Acceso",
  ];

  if (publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/session/Acceso", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

    const { payload } = await jwtVerify(token, secret, {
        algorithms: ['HS256'], 
      });
      // console.log("Token payload:", payload);
    // const { role } = payload as { role: string };
    const { role, sub: userId } = payload as { role: string; sub: string };

    if (req.nextUrl.pathname.startsWith("/Usuario") && role !== "usuario") {
      return NextResponse.redirect(new URL("/session/Acceso", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/Proveedor") && role !== "proveedor") {
      return NextResponse.redirect(new URL("/session/Acceso", req.url));
    }

    // Verificar si el usuario tiene preferencias
    if (req.nextUrl.pathname.startsWith("/Usuario")) {
      const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;
      console.log(`URL del backend: ${backendUrl}/usuarios/${userId}`);

      if (!backendUrl) {
        throw new Error("La URL del backend no está definida en las variables de entorno.");
      }

      const res = await fetch(`${backendUrl}/usuarios/${userId}`);
      if (!res.ok) {
        throw new Error('No se pudo verificar al usuario');
      }

      const usuario = await res.json();
      // console.log("Información del usuario:", usuario);

      // Si el campo preferencias es null o no existe, redirigir a /session/Acceso/Preferencias
      if (!usuario.preferencias  || usuario.preferencias.length === 0) {
        return NextResponse.redirect(new URL("/session/Acceso/Preferencias", req.url));
      }
    }

    // Si es usuario y tiene preferencia y entra a la ruta de preferencias, redirigir a /Usuario
    if (req.nextUrl.pathname === "/session/Acceso/Preferencias") {
      const backendUrl = process.env.NEXT_PUBLIC_RUTA_BACK;
      if (!backendUrl) {
        throw new Error("La URL del backend no está definida en las variables de entorno.");
      }
    
      const res = await fetch(`${backendUrl}/usuarios/${userId}`);
      if (!res.ok) {
        throw new Error("No se pudo verificar al usuario");
      }
    
      const usuario = await res.json();
    
      // Si el usuario ya tiene preferencias, redirigir a /Usuario
      if (usuario.preferencias && usuario.preferencias.length > 0) {
        return NextResponse.redirect(new URL("/Usuario", req.url));
      }
    }

    // return NextResponse.next();
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;

  } catch (error) {
    console.error("Error al verificar el token:", error);
    return NextResponse.redirect(new URL("/session/Acceso", req.url));
  }
}

export const config = {
  matcher: [
    "/Usuario/:path*",
    "/Proveedor/:path*",
    "/session/Acceso/Preferencias",
  ],
};
