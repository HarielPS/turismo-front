"use client"
import React, { useState } from 'react';
import { MapProps, Servicio } from '@/components/perfil/user/interfaces/mapa';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { getEstadoYHoraCierre } from '@/components/perfil/user/mapa/FuncionHora';

interface RutasBoxProps {
  servicio: Servicio[];
  setServicios: (servicios: Servicio[]) => void;
  locations: Servicio[];
}

const RutasBox: React.FC<RutasBoxProps> = ({ servicio, setServicios, locations }) => {
  const [loadingItinerario, setLoadingItinerario] = useState(false);
  const [errorItinerario, setErrorItinerario] = useState<string | null>(null);
  const [showHotels, setShowHotels] = useState(true);
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [showActivities, setShowActivities] = useState(true);

  // Función para formatear fechas
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Generar ruta aleatoria incluyendo todos los tipos seleccionados
  const generarRutaAleatoria = () => {
    const filtered = locations.filter(loc => {
      if (loc.type === 'hotel') return showHotels;
      if (loc.type === 'restaurante') return showRestaurants;
      if (loc.type === 'actividad') return showActivities;
      return false;
    });

    const seleccionadas = [...filtered]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    setServicios(seleccionadas);
    console.log("Ruta aleatoria generada:", seleccionadas);
  };

  // Generar itinerario inteligente
  const generarItinerarioInteligente = async () => {
    setLoadingItinerario(true);
    setErrorItinerario(null);
    
    try {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 5);
      
      const res = await fetch(
        `/api/planner?fecha_inicio=${formatDate(today)}&fecha_fin=${formatDate(endDate)}`
      );
      
      if (!res.ok) throw new Error('Error al obtener itinerario');
      
      const { itinerario } = await res.json();
      
      // Mapear todos los elementos del itinerario
      const mappedItems = [
        ...(itinerario.actividades || []).map((act: any): Servicio => ({
          _id: act._id,
          lat: act.coordenadas?.lat || 0,
          lng: act.coordenadas?.long || 0,
          name: act.nombre,
          rating: act.calificacion ?? 0,
          reviewCount: act.comentarios?.length ?? 0,
          feature_1: act.categoria?.nombre || '',
          feature_2: act.tipo?.nombre || '',
          feature_3: act.subtipo?.nombre || '',
          status: getEstadoYHoraCierre(act.horarios, act.fecha).status,
          fecha: act.fecha?.descripcion || '',
          closingTime: getEstadoYHoraCierre(act.horarios, act.fecha).closingTime,
          type: 'actividad',
          img: act.img_profile || '',
        })),
        ...(itinerario.hoteles || []).map((hotel: any): Servicio => ({
          _id: hotel._id,
          lat: hotel.coordenadas?.lat || 0,
          lng: hotel.coordenadas?.long || 0,
          name: hotel.nombre,
          rating: hotel.calificacion ?? 0,
          reviewCount: hotel.comentarios?.length ?? 0,
          feature_1: 'Hotel',
          feature_2: hotel.categoria || '',
          feature_3: '',
          status: getEstadoYHoraCierre(hotel.horarios, null).status,
          fecha: '',
          closingTime: getEstadoYHoraCierre(hotel.horarios, null).closingTime,
          type: 'hotel',
          img: hotel.img_profile || '',
        })),
        ...(itinerario.restaurantes || []).map((rest: any): Servicio => ({
          _id: rest._id,
          lat: rest.coordenadas?.lat || 0,
          lng: rest.coordenadas?.long || 0,
          name: rest.nombre,
          rating: rest.calificacion ?? 0,
          reviewCount: rest.comentarios?.length ?? 0,
          feature_1: 'Restaurante',
          feature_2: rest.categoria || '',
          feature_3: '',
          status: getEstadoYHoraCierre(rest.horarios, null).status,
          fecha: '',
          closingTime: getEstadoYHoraCierre(rest.horarios, null).closingTime,
          type: 'restaurante',
          img: rest.img_profile || '',
        }))
      ];

      setServicios(mappedItems);
      console.log("Itinerario completo generado:", mappedItems);
      
    } catch (err) {
      console.error("Error al generar itinerario:", err);
      setErrorItinerario(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoadingItinerario(false);
    }
  };

  const handleGuardar = () => {
    console.log("Guardando ruta completa:", servicio);
    // Lógica para guardar en el backend
  };

  // Filtros para mostrar/ocultar tipos
  const toggleHotels = () => setShowHotels(!showHotels);
  const toggleRestaurants = () => setShowRestaurants(!showRestaurants);
  const toggleActivities = () => setShowActivities(!showActivities);

  return (
    <div className='flex flex-col text-text bg-background p-4 h-full'>
      <h1 className='mb-5 text-xl font-bold'>Planificador de Ruta</h1>

      {/* Controles de filtro */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button 
          onClick={toggleActivities}
          className={`px-3 py-1 rounded-full text-sm ${showActivities ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Actividades
        </button>
        <button 
          onClick={toggleHotels}
          className={`px-3 py-1 rounded-full text-sm ${showHotels ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Hoteles
        </button>
        <button 
          onClick={toggleRestaurants}
          className={`px-3 py-1 rounded-full text-sm ${showRestaurants ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          Restaurantes
        </button>
      </div>

      {/* Botón de guardado */}
      <button 
        onClick={handleGuardar} 
        className='bg-primary text-white cursor-pointer p-2 rounded-lg mb-4 hover:bg-primary-dark transition'
      >
        Guardar Ruta
      </button>

      {/* Generadores de ruta */}
      <div className='flex flex-col gap-3 mb-5'>
        <div className='flex items-center gap-3'>
          <button 
            onClick={generarRutaAleatoria}
            className='bg-secondary text-white p-2 rounded-lg hover:bg-secondary-dark transition flex items-center gap-2'
          >
            <ArrowPathIcon className='w-4 h-4' />
            <span>Ruta Aleatoria</span>
          </button>
        </div>
        
        <div className='flex items-center gap-3'>
          <button 
            onClick={generarItinerarioInteligente}
            className='bg-accent text-white p-2 rounded-lg hover:bg-accent-dark transition flex items-center gap-2 disabled:opacity-50'
            disabled={loadingItinerario}
          >
            {loadingItinerario ? (
              <span>Cargando...</span>
            ) : (
              <>
                <ArrowPathIcon className='w-4 h-4' />
                <span>Itinerario Inteligente</span>
              </>
            )}
          </button>
        </div>
        
        {errorItinerario && (
          <p className='text-red-500 text-sm mt-2'>{errorItinerario}</p>
        )}
      </div>

      {/* Lista de servicios */}
      <div className="flex-1 overflow-y-auto">
        <h2 className='text-lg font-semibold mb-3'>Tu selección ({servicio.length})</h2>
        
        {servicio.length === 0 ? (
          <p className='text-gray-500'>No hay elementos en tu ruta</p>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {servicio.map((item, index) => (
              <div 
                key={`${item._id}-${index}`} 
                className={`border rounded-lg p-3 ${item.type === 'hotel' ? 'border-blue-200 bg-blue-50' : item.type === 'restaurante' ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
              >
                <div className="flex items-start gap-3">
                  {item.img && (
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-md object-cover" 
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{item.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${item.type === 'hotel' ? 'bg-blue-100 text-blue-800' : item.type === 'restaurante' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 text-sm">★ {item.rating?.toFixed(1) || 'N/A'}</span>
                      {(item.reviewCount ?? 0) > 0 && (
                        <span className="text-xs text-gray-500 ml-1">({item.reviewCount ?? 0})</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{item.feature_1} {item.feature_2 && `• ${item.feature_2}`}</p>
                    {item.status && (
                      <p className="text-xs mt-1">
                        Estado: <span className={item.status === 'Abierto' ? 'text-green-600' : 'text-red-600'}>{item.status}</span>
                        {item.closingTime && ` • Cierra a las ${item.closingTime}`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RutasBox;