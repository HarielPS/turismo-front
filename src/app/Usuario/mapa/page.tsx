'use client';

import { useEffect, useState } from 'react';
import Map from '@/components/perfil/user/mapa/Map';
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Servicio } from '@/components/perfil/user/interfaces/mapa';
import { getEstadoYHoraCierre } from '@/components/perfil/user/mapa/FuncionHora';
import Infoevent from '@/components/perfil/user/mapa/Infoevent';

export default function MapaPage() {


  const center: [number, number] = [19.72236794777676, -99.2084672475309];
  const zoom = 13;

  // Estado para manejar la ubicación seleccionada
  // const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; popupText: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [locations, setLocations] = useState<Servicio[]>([]);
  const [eventosData, setEventosData] = useState<any[]>([]); 
  const [selectedEventoId, setSelectedEventoId] = useState<string | null>(null);
  const selectedEvento = eventosData.find(e => e._id === selectedEventoId);

  // Fetch eventos desde tu API interna (Next.js route)
  // useEffect(() => {
  //   async function fetchEventos() {
  //     try {
  //       const res = await fetch('/api/servicios');
  //       const data = await res.json();

  //       // data.eventos es el arreglo que devuelve tu API
  //       const eventos = data.eventos;

  //       const locs: Servicio[] = eventos.map((item: any): Servicio => {
  //       const { status, closingTime } = getEstadoYHoraCierre(item.horarios, item.fecha); // función que tú defines

  //       return {
  //         _id: item._id,
  //         lat: item.coordenadas.lat,
  //         lng: item.coordenadas.long,
  //         name: item.nombre,
  //         rating: item.calificacion ?? 0,
  //         reviewCount: item.comentarios?.length ?? 0,
  //         feature_1: item.categoria?.nombre || '',
  //         feature_2: item.tipo?.nombre || '',
  //         feature_3: item.subtipo?.nombre || '',
  //         status,
  //         fecha: item.fecha ? item.fecha.descripcion : '',
  //         closingTime,
  //         type: 'actividad',
  //         img: item.img_profile,
  //       };
  //     });

        

  //       setLocations(locs);
  //       setEventosData(eventos);
  //     } catch (error) {
  //       console.error('Error cargando eventos:', error);
  //     }
  //   }

  //   fetchEventos();
  // }, []);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [resServicios, resHoteles, resRestaurantes] = await Promise.all([
          fetch('/api/servicios'),
          fetch('/api/hotel'),
          fetch('/api/restaurante')
        ]);

        const [dataServicios, dataHoteles, dataRestaurantes] = await Promise.all([
          resServicios.json(),
          resHoteles.json(),
          resRestaurantes.json()
        ]);

        const eventos = dataServicios.eventos || [];
        const hoteles = dataHoteles.hoteles || [];
        const restaurantes = dataRestaurantes.restaurantes || [];

        const serviciosMapped: Servicio[] = eventos.map((item: any): Servicio => {
          const { status, closingTime } = getEstadoYHoraCierre(item.horarios, item.fecha);

          return {
            _id: item._id,
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

        const hotelesMapped: Servicio[] = hoteles.map((item: any): Servicio => {
          const { status, closingTime } = getEstadoYHoraCierre(item.horarios, null);
          return {
            _id: item._id,
            lat: item.coordenadas.lat,
            lng: item.coordenadas.long,
            name: item.nombre,
            rating: item.calificacion ?? 0,
            reviewCount: 0,
            feature_1: 'Hotel',
            feature_2: '',
            feature_3: '',
            status,
            fecha: '',
            closingTime,
            type: 'hotel',
            img: item.img_profile,
          };
        });

        const restaurantesMapped: Servicio[] = restaurantes.map((item: any): Servicio => {
          const { status, closingTime } = getEstadoYHoraCierre(item.horarios, null);
          return {
            _id: item._id,
            lat: item.coordenadas.lat,
            lng: item.coordenadas.long,
            name: item.nombre,
            rating: item.calificacion ?? 0,
            reviewCount: 0,
            feature_1: 'Restaurante',
            feature_2: '',
            feature_3: '',
            status,
            fecha: '',
            closingTime,
            type: 'restaurante',
            img: item.img_profile,
          };
        });

        const allLocations = [...serviciosMapped, ...hotelesMapped, ...restaurantesMapped];

        setLocations(allLocations);
        // setEventosData(eventos);
        setEventosData([...eventos, ...hoteles, ...restaurantes]);
      } catch (error) {
        console.error('Error cargando datos del mapa:', error);
      }
    }

    fetchAllData();
  }, []);


  useEffect(() => {
    console.log(locations);
  }, [locations]);

  // Función para manejar la selección de un marcador
  const handleLocationSelect = (id: string) => {
    setSelectedEventoId(id);
    setIsPanelVisible(true);
  };

  // Función para panel
  const handlePanelToggle = () => {
    setIsPanelVisible(!isPanelVisible);
    setSelectedEventoId(null)
  };

return (
  <div className="relative h-screen w-full overflow-hidden">
    {/* Mapa (ocupará todo el espacio disponible) */}
    <div className="absolute inset-0 z-0">
      <Map locations={locations} center={center} zoom={zoom} onLocationSelect={handleLocationSelect} />
    </div>

    {/* Panel de información (aparece/desaparece) */}
    {selectedEvento && (
    <div className={`absolute h-full w-full sm:w-1/4 z-2 rounded-r-xl shadow-lg transition-all duration-300 transform ${isPanelVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      <Infoevent servicio={selectedEvento} onClose={handlePanelToggle} />     
    </div>
    )}

    {/* Barra de búsqueda (posicionada sobre el mapa) */}
    <div className={`absolute z-4 w-full sm:w-1/3 top-5 transition-all duration-300 ${isPanelVisible ? 'sm:ml-[25%]' : 'sm:ml-4'}`}>
      <div className="relative mx-4">
        <input
          type="text"
          placeholder="Buscar categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border bg-detail border-text text-text p-2 w-full rounded-xl pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {/* Ícono de búsqueda */}
        <div className="absolute left-3 top-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {/* Botón para limpiar */}
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
    </div>




  </div>
);
}
