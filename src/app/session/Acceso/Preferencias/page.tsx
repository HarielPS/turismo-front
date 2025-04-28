"use client";

import React, { useState } from "react";

const Preferencias = () => {
  const [preferencias, setPreferencias] = useState({
    preferencia1: '',
    preferencia2: '',
    // otras preferencias
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tokenRow = document.cookie.split('; ').find(row => row.startsWith('token=')); // Obtener token
    const token = tokenRow ? tokenRow.split('=')[1] : null; // Manejar caso donde no exista el token
    if (!token) {
      alert('Token no encontrado');
      return;
    }

    // Lógica para enviar preferencias al backend
    const response = await fetch(`${process.env.BACKEND_URL}/usuarios/preferencias`, {
      method: 'POST',
      body: JSON.stringify({ preferencias }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // Redirigir al usuario después de guardar las preferencias
      window.location.href = "/Usuario";  // Redirige a la página de usuario
    } else {
      // Manejar error
      alert('Hubo un error al guardar las preferencias');
    }
  };

  return (
    <div>
      <h1>Preferencias</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Preferencia 1</label>
          <input
            type="text"
            value={preferencias.preferencia1}
            onChange={(e) => setPreferencias({ ...preferencias, preferencia1: e.target.value })}
          />
        </div>
        <div>
          <label>Preferencia 2</label>
          <input
            type="text"
            value={preferencias.preferencia2}
            onChange={(e) => setPreferencias({ ...preferencias, preferencia2: e.target.value })}
          />
        </div>
        <button type="submit">Guardar Preferencias</button>
      </form>
    </div>
  );
};

export default Preferencias;
