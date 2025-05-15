'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import Map from '@/components/perfil/user/Map';

export default function MapaPage() {
  const locations: { lat: number; lng: number; popupText: string; type: 'hotel' | 'restaurante' | 'actividad' | 'me' }[] = [
    { lat: 19.4326, lng: -99.1332, popupText: 'CDMX - Hotel Ejemplo', type: 'hotel' }, // Marcador rosa
    { lat: 19.4375, lng: -99.135, popupText: 'Restaurante Buen Sabor', type: 'restaurante' }, // Marcador naranja
    { lat: 19.434, lng: -99.14, popupText: 'Tour en bicicleta', type: 'actividad' }, // Marcador azul
    { lat: 19.433, lng: -99.132, popupText: 'Mi ubicación', type: 'me' } // Marcador rojo
  ];

  const center: [number, number] = [19.4326, -99.1332];
  const zoom = 13;

  // Estado para manejar la ubicación seleccionada
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; popupText: string } | null>(null);

    useEffect(() => {
    console.log('click en ubicacion');
  }, [selectedLocation]);
  // Función para manejar la selección de un marcador
  const handleLocationSelect = (location: { lat: number; lng: number; popupText: string }) => {
    setSelectedLocation(location);  // Actualizar el estado con la ubicación seleccionada
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mapa de prueba</h1>
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
