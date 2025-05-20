'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import Map from '@/components/perfil/user/mapa/Map';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Servicio } from '@/components/perfil/user/interfaces/mapa';
import { getEstadoYHoraCierre } from '@/components/perfil/user/mapa/FuncionHora';

export default function MapaPage() {

  const [locations, setLocations] = useState<Servicio[]>([]);

  const center: [number, number] = [19.72236794777676, -99.2084672475309];
  // 19.72236794777676, -99.2084672475309 -> tepotzotlan
  const zoom = 13;

  // Estado para manejar la ubicación seleccionada
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; popupText: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch eventos desde tu API interna (Next.js route)
  useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await fetch('/api/servicios'); // o la ruta correcta
        const data = await res.json();

        // data.eventos es el arreglo que devuelve tu API
        const eventos = data.eventos;

        // Transformar cada evento al formato esperado
        // const locs = eventos.map((item: any) => ({
        //   lat: item.coordenadas.lat,
        //   lng: item.coordenadas.long,
        //   popupText: item.nombre,
        //   img: item.img_profile,
        //   type: 'actividad',
        // }));

        const locs: Servicio[] = eventos.map((item: any): Servicio => {
        const { status, closingTime } = getEstadoYHoraCierre(item.horarios, item.fecha); // función que tú defines

        return {
          lat: item.coordenadas.lat,
          lng: item.coordenadas.long,
          name: item.nombre,
          rating: item.calificacion ?? 0,
          reviewCount: item.comentarios?.length ?? 0,
          feature_1: item.categoria?.nombre || '',
          feature_2: item.tipo?.nombre || '',
          feature_3: item.subtipo?.nombre || '',
          status,
          fecha: item.fecha ? item.fecha.descripcion : '',
          closingTime,
          type: 'actividad',
          img: item.img_profile,
        };
      });

        

        setLocations(locs);
      } catch (error) {
        console.error('Error cargando eventos:', error);
      }
    }

    fetchEventos();
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  // useEffect(() => {
  //   console.log('click en ubicacion');
  // }, [selectedLocation]);


  // Función para manejar la selección de un marcador
  const handleLocationSelect = (location: { lat: number; lng: number; popupText: string }) => {
    setSelectedLocation(location);
  };

  return (
    <div className="h-screen">

          <div className="absolute w-full sm:w-1/3 z-4 top-5 sm:ml-20">
            <input
              type="text"
              placeholder="Buscar categoría..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="border bg-detail border-text text-text p-2 w-full rounded-xl pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {/* Ícono de búsqueda */}
            <div className="absolute left-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {/* Botón para limpiar (solo visible cuando hay texto) */}
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                aria-label="Limpiar búsqueda"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

      {/* <h1 className="text-2xl font-bold mb-4">Mapa de prueba</h1> */}
      <Map locations={locations} center={center} zoom={zoom} onLocationSelect={handleLocationSelect} />
      
      {/* Mostrar la ubicación seleccionada en otro componente o en este mismo */}
      {selectedLocation && (
        <div>
          <h2>Ubicación seleccionada:</h2>
          <p>{selectedLocation.popupText}</p>
          <p>Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}</p>
        </div>
      )}
    </div>
  );
}
