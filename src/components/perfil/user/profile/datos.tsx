import React from 'react'
import { calcularEdad } from './datosFunctions'

// Definimos el tipo de las props
interface DatosInfoProps {
    img?: string;
    nombre?: string;
    primer_apellido?: string;
    segundo_apellido?: string;
    fecha_nacimiento?: string;
    sexo?: string;
    profesion?: string;
    email?: string;
    rol?: string;
}

const DatosInfo: React.FC<DatosInfoProps> = ({
    img = "/user/img_usuario.png",
    nombre = "No disponible",
    primer_apellido = "No disponible",
    segundo_apellido = "No disponible",
    fecha_nacimiento = "No disponible",
    sexo = "No disponible",
    profesion = "No disponible",
    email = "No disponible",
    rol = "No disponible"
}) => {

  const fecha = new Date(fecha_nacimiento);
  const fechaFormateada = fecha.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
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
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm mb-1 font-medium text-text">Nombre</label>
            <div className="w-full p-2 rounded bg-background border border-gray-300 text-text">
              {[nombre, 
                primer_apellido, 
                segundo_apellido]
                .filter(Boolean)
                .join(' ') || "No disponible"}
            </div>
          </div>

          {/* Campo Edad  y fecha nacimiento*/}
          <div className='flex flex-wrap w-full sm:items-end'>
            <div className='w-full sm:w-1/2 sm:pr-2'>
              <label className="block text-sm mb-1 font-medium text-text">
                Edad 
              </label>
              <div className="w-full p-2 rounded bg-background border border-gray-300">
                { calcularEdad(fecha_nacimiento) || "No disponible"}
              </div>
            </div>

            {/* Campo Fecha de Nacimiento */}
            <div className='w-full sm:w-1/2 sm:pr-2'>
              <label className="block text-sm mb-1 mt-1 font-medium text-text">Fecha de Nacimiento</label>
              <div className="w-full p-2 rounded bg-background border border-gray-300 ">
                {fechaFormateada || "No disponible"}
              </div>
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
              <label className="block text-sm mb-1 font-medium text-text">
                Sexo
              </label>
              <div className="w-full p-2 rounded bg-background border border-gray-300 ">
                {sexo|| "No disponible"}
              </div>
            </div>
          </div>

          {/* Campo Profecion */}
          <div>
            <label className="block text-sm mb-1 font-medium text-text">profesión</label>
            <div className="w-full p-2 rounded bg-background border border-gray-300 ">
              {profesion || "No disponible"}
            </div>
          </div>

          {/* Campo Correo */}
          <div>
            <label className="block text-sm mb-1 font-medium text-text">Correo</label>
            <div className="w-full p-2 rounded bg-background border border-gray-300 ">
              {email || "No disponible"}
            </div>
          </div>


        </div>

      </div>
  )
}

export default DatosInfo 