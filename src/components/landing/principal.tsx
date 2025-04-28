import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GlobeAmericasIcon } from '@heroicons/react/20/solid';

// Datos de ejemplo
const pueblosMagicos = [
    { id: 1, nombre: "Taxco, Guerrero" },
    { id: 2, nombre: "San Miguel de Allende, Guanajuato" },
    { id: 3, nombre: "Tepoztlán, Morelos" },
    { id: 4, nombre: "Pátzcuaro, Michoacán" },
    { id: 5, nombre: "Real de Catorce, San Luis Potosí" },
  ];

  interface Pueblo {
    id: number;
    nombre: string;
  }

const Principal = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredPueblos, setFilteredPueblos] = useState<Pueblo[]>([]);
    const [selectedPueblo, setSelectedPueblo] = useState<Pueblo | null>(null);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);    

    useEffect(() => {
        if (searchTerm.length > 0) {
          const filtered = pueblosMagicos.filter(pueblo =>
            pueblo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredPueblos(filtered);
          setShowSuggestions(true);
      
          // Verifica coincidencia exacta (ignorando mayúsculas)
          const match = pueblosMagicos.find(
            (pueblo) => pueblo.nombre.toLowerCase() === searchTerm.toLowerCase()
          );
          if (match) {
            setShowSuggestions(false);
          }
        } else {
          setFilteredPueblos([]);
          setShowSuggestions(false);
        }
      }, [searchTerm]);

    const handleSelectPueblo = (pueblo: Pueblo): void => {
        setSelectedPueblo(pueblo);
        setSearchTerm(pueblo.nombre);
        setShowSuggestions(false);
    };

  return (
    <div id='Inicio' className="relative h-screen w-full overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
      <Image
        src="/landing/Principal.jpg" // Reemplaza con tu ruta de imagen
        alt="Fondo principal"
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        priority
      />

        {/* Degradado negro de la imagen */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-transparent"></div>
      </div>

      {/* Contenido sobre la imagen */}

      {/* Texto principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4">
        <h1 className="text-4xl md:text-5xl text-center font-bold mb-4">
            Explora la Magia de México: Tus Rutas a Pueblos Encantados
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-center mb-8">
            Descubre rutas únicas y personalizadas para vivir experiencias inolvidables en los Pueblos Mágicos.
        </p>
        
        {/* Motor de búsqueda */}
        <div className='flex flex-row xs:flex-col items-center w-full max-w-2xl relative'>
        <div className="flex items-center w-full max-w-2xl relative">
                <div className="flex items-center w-full rounded-t-xl bg-amber-400">
                  <div className="flex items-center bg-white w-full p-4 rounded-lg ">
                      {/* icono del search */}
                      <div className="xs:hidden mr-4 text-black border-r border-gray-500 pr-4">
                          <GlobeAmericasIcon className="w-6 h-6" />
                      </div>

                      <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                          placeholder="Busca un Pueblo Mágico..."
                          className="text-black w-full focus:outline-none"
                      />
                  </div>

                </div>

              {/* Lista de sugerencias */}
              {showSuggestions && filteredPueblos.length > 0 && (
                  <div className="absolute top-[90%] border-t border-gray-300 left-0 w-full max-w-2xl mt-1 rounded-b-xl overflow-auto bg-white text-black shadow-lg border z-2">
                  {filteredPueblos.map((pueblo: Pueblo) => (
                      <div
                      key={pueblo.id}
                      onClick={() => handleSelectPueblo(pueblo)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-200 transition-colors"
                      >
                      {pueblo.nombre}
                      </div>
                  ))}
                  </div>
              )}
          </div>

          
          <button className="mt-0 xs:mt-8 xs:w-full bg-blue-500 text-white font-bold px-4 py-4 rounded-xl ml-2 xs:ml-0 hover:bg-blue-600 transition-colors cursor-pointer">
              Buscar
          </button>
        </div>
        


        {/* Pueblo seleccionado */}
        {/* {selectedPueblo && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="font-medium">Seleccionado: <span className="text-blue-300">{selectedPueblo.nombre}</span></p>
            </div>
        )} */}



      </div>
    </div>
  );
};

export default Principal;