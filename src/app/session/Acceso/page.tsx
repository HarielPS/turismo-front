// nuevo page 3v

"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AnimatedCircle from '../../../components/session/fondo/AnimatedCircles';
import FormInicioSession from '../../../components/session/FormInicioSession';
import FormInicioRegistro from '../../../components/session/FormInicioRegistro';
import TextoRegistro from '../../../components/session/TextoRegistro';
import TextoSession from '@/components/session/TextoSession';
import FormInicioRegistroProveedor from '@/components/session/FormInicioRegistroProveedor';

// Componente para el boton 
const RegistroOpciones = ({ activeUser, setActiveUser }: {
  activeUser: 'User' | 'Proveedor' | null;
  setActiveUser: (value: 'User' | 'Proveedor') => void;
}) => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <div className="flex justify-center w-full gap-2 p-2 mt-20">
      <button
        className={`px-4 py-2 rounded-md border border-text font-medium transition-colors ${
          activeUser === 'User' ? 'bg-blue-500 text-white shadow' : 'text-text hover:bg-gray-200'
        }`}
        onClick={() => setActiveUser('User')}
      >
        Quiero ser un Usuario
      </button>

      <button
        className={`px-4 py-2 rounded-md border border-text font-medium transition-colors ${
          activeUser === 'Proveedor' ? 'bg-blue-500 text-white shadow' : 'text-text hover:bg-gray-200'
        }`}
        onClick={() => setActiveUser('Proveedor')}
      >
        Quiero ser un Proveedor
      </button>
    </div>

    <div className='flex flex-col w-full'>
      <div className={`w-full ${activeUser === 'Proveedor' ? 'block' : 'hidden'}`}>
        <FormInicioRegistroProveedor />
      </div>

      <div className={`w-full ${activeUser === 'User' ? 'block' : 'hidden'}`}>
        <FormInicioRegistro />
      </div>
    </div>
  </div>
);

const Acceso = () => {
  const [isRight, setIsRight] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<'User' | 'Proveedor'>('User');
  const searchParams = useSearchParams();

  useEffect(() => {
    // Verificar si hay un parámetro 'register' en la URL
    const registerParam = searchParams.get('register');
    if (registerParam === 'true') {
      setIsRight(true);
    }
  }, [searchParams]);

  const togglePosition = () => {
    setIsRight(!isRight);
  };

  return (
    <div className=''>
      <AnimatedCircle isRight={isRight}>
        <div className='flex flex-col md:flex-row w-full h-full'>

          {/* Mitad izquierda - Acceso */}
          <div className="flex items-center justify-center md:w-1/2">
            <div className={`h-full w-full ${isRight ? 'hidden' : 'block'}`}>             
              <TextoSession onRegisterClick={togglePosition} />
            </div>

            <div className={`p-2 ${isRight ? 'block' : 'hidden'}`}>
              <div className='hidden md:flex flex-col justify-center items-center'>
                <RegistroOpciones activeUser={activeUser} setActiveUser={setActiveUser} />
              </div>

              <div className='block md:hidden'>
                <TextoRegistro onRegisterClick={togglePosition} />
              </div>
            </div>
          </div>

          {/* Mitad derecha - Registro */}
          <div className="flex md:items-center justify-center md:w-1/2">
            <div className={`flex items-center justify-center h-full w-full ${isRight ? 'hidden' : 'block'}`}>
              <FormInicioSession />
            </div>

            <div className={isRight ? 'block' : 'hidden'}>
              <div className='hidden md:block'>
                <TextoRegistro onRegisterClick={togglePosition} />
              </div>

              <div className='block md:hidden'>
                <RegistroOpciones activeUser={activeUser} setActiveUser={setActiveUser} />
              </div>
            </div>
          </div>

        </div>
      </AnimatedCircle>
    </div>
  );
};

export default Acceso;
