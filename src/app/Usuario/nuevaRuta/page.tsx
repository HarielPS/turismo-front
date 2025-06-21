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

  // Estado para manejar la ubicación seleccionada
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [locations, setLocations] = useState<Servicio[]>([]);
    const [eventosData, setEventosData] = useState<any[]>([]); 
    const [selectedEventoId, setSelectedEventoId] = useState<string | null>(null);
    const selectedEvento = eventosData.find(e => e._id === selectedEventoId);
  
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

  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    // Cuando locations cambia, actualiza servicios
    setServicios(locations);
  }, [locations]);

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
