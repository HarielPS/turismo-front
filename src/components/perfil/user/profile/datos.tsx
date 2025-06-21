"use client";
import React from 'react'
import { calcularEdad } from './datosFunctions'
import { useEffect } from 'react';

interface DatosInfoProps {
  img?: string;
  rol?: string;
  editable?: boolean;
  formData?: any;
  setFormData?: (data: any) => void;
}

const DatosInfo: React.FC<DatosInfoProps> = ({
    img = "/user/img_usuario.png",
    rol = "No disponible",
    editable = false,
    formData = {},
    setFormData = () => {},
}) => {
  // Extraer campos de formData o asignar valor por defecto
  // const {
  //   nombre,
  //   nombre_viajero,
  //   primer_apellido,
  //   segundo_apellido,
  //   fecha_nacimiento,
  //   sexo,
  //   profesion,
  //   email
  // } = formData || {};

  // useEffect(() => {
  //   console.log("DatosInfo formData:", formData);
  // }, [formData]);
  
  // Versión mejorada de formatearFecha
  interface FormatearFechaOptions {
    locale?: string;
    options?: Intl.DateTimeFormatOptions;
  }

  const formatearFecha = (
    fechaISO: string | undefined,
    opts?: FormatearFechaOptions
  ): string | null => {
    if (!fechaISO) return null;

    try {
      const fecha = new Date(fechaISO);
      // Validación extra para fechas inválidas
      if (isNaN(fecha.getTime())) return null;

      return fecha.toLocaleDateString(
        opts?.locale || 'es-ES',
        opts?.options || {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }
      ).replace(/\//g, '/'); // Aseguramos el formato con barras
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return null;
    }
  };

  // Versión más robusta de convertirFechaISO
  interface ConvertirFechaISOResult {
    isoDate: string | null;
  }

  const convertirFechaISO = (fechaTexto: string | undefined): string | null => {
    if (!fechaTexto || fechaTexto === "No disponible") return null;
    
    try {
      // Si ya está en formato ISO (YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}$/.test(fechaTexto)) {
        return fechaTexto;
      }
      
      // Si está en formato DD/MM/YYYY
      const partes = fechaTexto.split('/');
      if (partes.length === 3) {
        const [dia, mes, año] = partes;
        return `${año.padStart(4, '0')}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
      }
      
      return null;
    } catch (error) {
      console.error("Error al convertir fecha:", error);
      return null;
    }
  };

  // Uso en el componente
  const fechaFormateada = formatearFecha(formData.fecha_nacimiento_viajero) || "No disponible";

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 sm:items-center w-full gap-4'>
        {/* Sección de imagen de perfil */}
        <div className='flex justify-center items-center rounded-lg '>
          <div className='w-2/3 aspect-square'>
              <img 
                src={img || "/user/img_usuario.png"} 
                alt="Foto de perfil" 
                className='h-full'
              />
          </div>
        </div>

        {/* Sección de información del usuario */}
        <div className='bg-detail p-4 rounded-lg space-y-3'>
        
          <div className='bg-detail rounded-lg space-y-3'>
            {/* Contenedor de campos (grid responsive) */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 '>
              
              {/* ----- Nombre ----- */}
              <div>
                <label className="block text-sm mb-1 font-medium text-text">
                  Nombre
                </label>
                {editable ? (
                  <input
                    type="text"
                    value={formData.nombre_viajero || ""}
                    onChange={(e) => setFormData({ ...formData, nombre_viajero: e.target.value })}
                    className="w-full p-2 rounded bg-background border border-gray-300 text-text"
                  />
                ) : (
                  <div className="w-full p-2 rounded bg-background border border-gray-300 text-text">
                    {formData.nombre_viajero || "—"}
                  </div>
                )}
              </div>

              {/* ----- Primer Apellido ----- */}
              <div>
                <label className="block text-sm mb-1 font-medium text-text">
                  Primer Apellido
                </label>
                {editable ? (
                  <input
                    type="text"
                    value={formData.primer_Apellido_viajero || ""}
                    onChange={(e) => setFormData({ ...formData, primer_Apellido_viajero: e.target.value })}
                    className="w-full p-2 rounded bg-background border border-gray-300 text-text"
                  />
                ) : (
                  <div className="w-full p-2 rounded bg-background border border-gray-300 text-text">
                    {formData.primer_Apellido_viajero || "—"}
                  </div>
                )}
              </div>

              {/* ----- Segundo Apellido ----- */}
              <div>
                <label className="block text-sm mb-1 font-medium text-text">
                  Segundo Apellido
                </label>
                {editable ? (
                  <input
                    type="text"
                    value={formData.segundo_Apellido_viajero || ""}
                    onChange={(e) => setFormData({ ...formData, segundo_Apellido_viajero: e.target.value })}
                    className="w-full p-2 rounded bg-background border border-gray-300 text-text"
                  />
                ) : (
                  <div className="w-full p-2 rounded bg-background border border-gray-300 text-text">
                    {formData.segundo_Apellido_viajero || "—"}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Campo Edad  y fecha nacimiento*/}
          <div className='flex flex-wrap w-full sm:items-end'>
            {/* Edad */}
            <div className='w-full sm:w-1/2 sm:pr-2'>
              <label className="block text-sm mb-1 font-medium text-text">
                Edad 
              </label>
              <div className="w-full p-2 rounded bg-background border border-gray-300">
                { calcularEdad(formData.fecha_nacimiento_viajero) || "No disponible"}
              </div>
            </div>

            {/* Campo Fecha de Nacimiento */}
            <div className='w-full sm:w-1/2 sm:pr-2'>
              <label className="block text-sm mb-1 mt-1 font-medium text-text">Fecha de Nacimiento</label>

              {editable ? (
                <input
                  type="date"
                  value={formData?.fecha_nacimiento_viajero || convertirFechaISO(formData.fecha_nacimiento) || ""}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    fecha_nacimiento_viajero: e.target.value
                  })}
                  className="w-full p-2 rounded bg-background border border-gray-300 text-text"
                  max={new Date().toISOString().split('T')[0]}
                />
              ) : (
                <div className="w-full p-2 rounded bg-background border border-gray-300">
                  {fechaFormateada || "No disponible"}
                </div>
              )}

              
            </div>
          </div>

          {/* Campo rol  y sexo*/}
          <div className='flex flex-wrap w-full '>
            <div className='w-full sm:w-1/2 sm:pr-2'>
              <label className="block text-sm mb-1 font-medium text-text">
                Rol
              </label>
              <div className="w-full p-2 rounded bg-background border border-gray-300">
                { rol || "No disponible"}
              </div>
            </div>

            <div className='w-full sm:w-1/2 sm:pl-2'>
              <label className="block text-sm mb-1 font-medium text-text">Sexo</label>
              {editable ? (
                <select
                  value={formData.sexo_viajero || ""}
                  onChange={(e) => setFormData({ ...formData, sexo_viajero: e.target.value })}
                  className="w-full p-2 rounded bg-background border border-gray-300 text-text"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              ) : (
                <div className="w-full p-2 rounded bg-background border border-gray-300">
                  {formData.sexo_viajero || "No disponible"}
                </div>
              )}
            </div>
          </div>

          {/* Campo Profecion */}
          <div>
            <label className="block text-sm mb-1 font-medium text-text">Profesión</label>
            {editable ? (
              <input
                type="text"
                value={formData.profesion_viajero || ""}
                onChange={(e) => setFormData({ ...formData, profesion_viajero: e.target.value })}
                className="w-full p-2 rounded bg-background border border-gray-300 text-text"
              />
            ) : (
              <div className="w-full p-2 rounded bg-background border border-gray-300">
                {formData.profesion_viajero || "No disponible"}
              </div>
            )}
          </div>

          {/* Campo Correo */}
          <div>
            <label className="block text-sm mb-1 font-medium text-text">Correo</label>
            {editable ? (
              <input
                type="email"
                value={formData.correo_viajero || ""}
                onChange={(e) => setFormData({ ...formData, correo_viajero: e.target.value })}
                className="w-full p-2 rounded bg-background border border-gray-300 text-text"
              />
            ) : (
              <div className="w-full p-2 rounded bg-background border border-gray-300">
                {formData.correo_viajero || "No disponible"}
              </div>
            )}
          </div>

        </div>

      </div>
  )
}

export default DatosInfo 
