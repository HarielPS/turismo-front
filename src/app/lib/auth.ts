// src/lib/auth.ts
"use client";
import { cookies } from 'next/headers';

type AuthResult = {
  isAuthenticated: boolean;
  hasPreferences?: boolean;
  user?: any;
  role?: string;
};

export async function checkAuth(): Promise<AuthResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { isAuthenticated: false };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_RUTA_BACK}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { isAuthenticated: false };
    }

    const data = await response.json();
    return {
      isAuthenticated: true,
      hasPreferences: data.user?.preferencias,
      user: data.user,
      role: data.role,
    };
  } catch (error) {
    return { isAuthenticated: false };
  }
}

// Versión para cliente (si necesitas verificar desde componentes)
export async function clientCheckAuth(): Promise<AuthResult> {
  try {
    const response = await fetch('/api/auth/verify');
    
    if (!response.ok) {
      return { isAuthenticated: false };
    }

    return await response.json();
  } catch (error) {
    return { isAuthenticated: false };
  }
}