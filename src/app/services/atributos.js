export async function obtenerAtributos() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_RUTA_BACK}/atributos`);
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Error al obtener atributos: ${errorMessage}`);
      }
      return res.json();
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw new Error('No se pudo obtener atributos');
    }
  }
  