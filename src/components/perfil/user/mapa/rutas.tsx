import React, { useState } from 'react';
import { MapProps, ServicioAll } from '../interfaces/mapa';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

interface RutasBoxProps {
  servicio: any[]; // cambio: ahora es un array de servicios
  setServicios: React.Dispatch<React.SetStateAction<any[]>>;
  locations: any[];
}

const RutasBox: React.FC<RutasBoxProps> = ({ servicio, setServicios, locations }) => {
  const generarRutaAleatoria = () => {
    const actividades = locations.filter(loc => loc.type === 'actividad');
    const seleccionadas = [...actividades]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    setServicios(seleccionadas);
    console.log("Ruta generada:", seleccionadas);
  };

  const handleGuardar = () => {
    console.log("Aquí va la lógica para guardar la ruta");
  };

  return (
    <div className='flex flex-col text-text bg-background'>
      <h1 className='mb-5 text-xl font-bold'>Tu Ruta</h1>

      <button 
        onClick={handleGuardar} 
        className='bg-primary text-white cursor-pointer p-2 rounded-2xl mb-5'
      >
        Guardar Ruta
      </button>

      <input 
        type="text" 
        placeholder='Pueblo' 
        className='mb-5 p-2 rounded-xl border border-text' 
      />

      <div className='flex items-center gap-3 mb-5'>
        <button 
          type='button'
          onClick={generarRutaAleatoria}
          className='bg-primary text-white cursor-pointer p-2 rounded-2xl'
        >
          <ArrowPathIcon className='w-5 h-5' />
        </button> 
        <p>Generar Ruta</p>
      </div>

      {/* Mostrar los servicios de la ruta */}
      <div className="grid grid-cols-1 gap-4">
        {servicio.map((s, index) => (
          <div key={index} className='border border-gray-300 p-4 rounded-xl shadow-md bg-detail'>
            <h4 className='text-sm text-text font-semibold'>{s.name || "Sin nombre"}</h4>
            {/* <p className='text-sm text-gray-600 mb-2'>{s.descripcion || "Sin descripción"}</p> */}
            {s.img && (
              <img 
                src={s.img} 
                alt={`Imagen de ${s.name}`} 
                className='w-full h-40 object-cover rounded-lg mt-2' 
              />
            )}
            <p className='text-xs text-gray-500 mt-2'>Tipo: {s.type || "Desconocido"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RutasBox;
