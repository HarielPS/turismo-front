"use client"
import React from 'react'
import { useEffect, useState } from 'react'

const Perfil = () => {
  const [userInfo, setUserInfo] = useState<{
    userId?: string;
    role?: string;
    userData?: any;
    atributos?: any[];
  }>({});

  const fetchUserInfo = async () => {
    try {
      const resFull = await fetch('/api/userinfo');
      const data = await resFull.json();
      
      if (!resFull.ok) throw new Error(data.error || 'Failed to fetch');
      
      setUserInfo({
        userId: data.userId,
        role: data.role,
        userData: data.userData
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Mapear preferencias correctamente
  const preferencias = userInfo.userData?.preferencias
    ?.map((pref: any) => pref.atributoID) // ← Cambio aquí (pref.atributoID directamente)
    .join(", ") || "No hay preferencias";

  return (
    <div className='flex p-5'>
      <h1>Perfil</h1>
      <div className='flex flex-col'>
        <h2>Usuario ID: {userInfo.userId}</h2>
        <h2>Rol: {userInfo.role}</h2>
        <h2>Nombre: {userInfo.userData?.nombre_viajero}</h2>
        <h2>Primer Apellido: {userInfo.userData?.primer_Apellido_viajero}</h2>
        <h2>Segundo Apellido: {userInfo.userData?.segundo_Apellido_viajero}</h2>
        <h2>Email: {userInfo.userData?.correo_viajero}</h2>
        <h2>Teléfono: {userInfo.userData?.telefono_viajero}</h2>
        <h2>Sexo: {userInfo.userData?.sexo_viajero}</h2>
        <h2>Preferencias: {preferencias}</h2>
      </div>
    </div>
  )
}

export default Perfil