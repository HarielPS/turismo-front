// utils/bajarUsuarioInfo.ts
// import { UsuarioInfoResult } from '@/interfaces/UsuarioInfoResult';

export const bajarUsuarioInfo = async () => {
  try {
    const resFull = await fetch('/api/userinfo');
    const data = await resFull.json();

    if (!resFull.ok) throw new Error(data.error || 'Error al obtener datos del usuario');

    let atributos = [];
    if (data.userData?.preferencias?.length > 0) {
      const ids = data.userData.preferencias.map((p) => p.atributoID);
      const resAtributos = await fetch('/api/atributos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids })
      });

      const atributosData = await resAtributos.json();
      if (!resAtributos.ok) throw new Error(atributosData.error || 'Error al obtener atributos');

      atributos = atributosData.atributos;
    }

    return {
      userId: data.userId,
      role: data.role,
      userData: data.userData,
      atributos
    };
  } catch (error) {
    console.error('Error al bajar información del usuario:', error);
    throw error;
  }
};
