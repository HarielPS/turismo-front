export const subirInformacionInfo = async (userId, nuevosDatos) => {
  console.log('🔥 subirInformacionInfo llamada con datos:', nuevosDatos);  // <--- Aquí

  try {
    const res = await fetch('/api/userinfo', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevosDatos),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || 'Error al subir datos del usuario');
    }

    return result;
  } catch (error) {
    console.error('Error al subir información:', error);
    throw error;
  }
};
