import React from 'react'

interface UserInfo {
    userId?: string;
    role?: string;
    userData?: any;
    atributos?: any[];
}

export function calcularEdad(fechaNacimiento:any) {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
}
