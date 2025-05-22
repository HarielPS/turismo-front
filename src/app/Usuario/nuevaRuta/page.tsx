"use client"
import React, { useEffect,useState } from 'react'
import Map from '@/components/perfil/user/mapa/Map'
import RutasBox from '@/components/perfil/user/mapa/rutas';
import { MapProps } from '@/components/perfil/user/interfaces/mapa';
import { Servicio } from '@/components/perfil/user/interfaces/mapa';
import { getEstadoYHoraCierre } from '@/components/perfil/user/mapa/FuncionHora';

const NuevaRuta = () => {
  const center: [number, number] = [19.72236794777676, -99.2084672475309];
  const zoom = 13;
  // const locations = [
  //   {
  //     _id: '1',
  //     lat: 19.4326,
  //     lng: -99.1332,
  //     popupText: 'CDMX - Hotel Ejemplo',
  //     type: 'hotel' as 'hotel',
  //     feature_1: 'Feature 1',
  //     feature_2: 'Feature 2',
  //     feature_3: 'Feature 3',
  //     feature_4: 'Feature 4',
  //     name: 'Hotel Ejemplo',
  //     description: 'Un hotel de ejemplo en CDMX',
  //     status: "Abierto" as "Abierto" | "Cerrado",
  //     fecha: '2024-06-01',
  //     closingTime: '22:00',
  //     img: 'https://via.placeholder.com/150'
  //   },
  //   {
  //     _id: '2',
  //     lat: 19.4375,
  //     lng: -99.135,
  //     popupText: 'Restaurante Buen Sabor',
  //     type: 'restaurante' as 'restaurante',
  //     feature_1: 'Feature 1',
  //     feature_2: 'Feature 2',
  //     feature_3: 'Feature 3',
  //     feature_4: 'Feature 4',
  //     name: 'Restaurante Buen Sabor',
  //     description: 'Un restaurante de ejemplo',
  //     status: "Abierto" as "Abierto" | "Cerrado",
  //     fecha: '2024-06-01',
  //     closingTime: '23:00',
  //     img: 'https://via.placeholder.com/150'
  //   },
  //   {
  //     _id: '3',
  //     lat: 19.434,
  //     lng: -99.14,
  //     popupText: 'Tour en bicicleta',
  //     type: 'actividad' as 'actividad',
  //     feature_1: 'Feature 1',
  //     feature_2: 'Feature 2',
  //     feature_3: 'Feature 3',
  //     feature_4: 'Feature 4',
  //     name: 'Tour en bicicleta',
  //     description: 'Una actividad de ejemplo',
  //     status: "Abierto" as "Abierto" | "Cerrado",
  //     fecha: '2024-06-02',
  //     closingTime: '18:00',
  //     img: 'https://via.placeholder.com/150'
  //   },
  //   {
  //     _id: '4',
  //     lat: 19.433,
  //     lng: -99.132,
  //     popupText: 'Mi ubicación',
  //     type: 'me' as 'me',
  //     feature_1: 'Feature 1',
  //     feature_2: 'Feature 2',
  //     feature_3: 'Feature 3',
  //     feature_4: 'Feature 4',
  //     name: 'Mi ubicación',
  //     description: 'Esta es mi ubicación',
  //     status: "Abierto" as "Abierto" | "Cerrado",
  //     fecha: '2024-06-01',
  //     closingTime: '00:00',
  //     img: 'https://via.placeholder.com/150'
  //   }
  // ];

  // Estado para manejar la ubicación seleccionada
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [locations, setLocations] = useState<Servicio[]>([]);
    const [eventosData, setEventosData] = useState<any[]>([]); 
    const [selectedEventoId, setSelectedEventoId] = useState<string | null>(null);
    const selectedEvento = eventosData.find(e => e._id === selectedEventoId);
  
    // Fetch eventos desde tu API interna (Next.js route)
    useEffect(() => {
      async function fetchEventos() {
        try {
          const res = await fetch('/api/servicios');
          const data = await res.json();
  
          // data.eventos es el arreglo que devuelve tu API
          const eventos = data.eventos;
  
          const locs: Servicio[] = eventos.map((item: any): Servicio => {
          const { status, closingTime } = getEstadoYHoraCierre(item.horarios, item.fecha); // función que tú defines
  
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
  
          
  
          setLocations(locs);
          setEventosData(eventos);
        } catch (error) {
          console.error('Error cargando eventos:', error);
        }
      }
  
      fetchEventos();
    }, []);

    useEffect(() => {
      console.log(locations);
    }, [locations]);

  const [servicios, setServicios] = useState<MapProps[]>([]);

  const handleLocationSelect = (id: string) => {
    console.log(`Location selected: ${id}`);
  };

  return (
    <div className='flex'>
      {/* Seleccion de ruta */}
      <div className="relative z-3 w-1/3 left-0 h-screen overflow-y-auto justify-between items-center p-4 bg-background shadow-md shadow-text border-text border-1 rounded-lg">
        <RutasBox 
          servicio={servicios}
          setServicios={setServicios}
          locations={locations}
        />
      </div>

      {/* Mapa  */}
      <div className='absolute inset-0 z-0'>
        <Map locations={locations} center={center} zoom={zoom} onLocationSelect={handleLocationSelect} />
      </div>

    </div>
  )
}

export default NuevaRuta