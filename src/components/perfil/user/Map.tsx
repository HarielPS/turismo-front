'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  lat: number;
  lng: number;
  popupText?: string;
  type: 'hotel' | 'restaurante' | 'actividad' | 'me';
}

interface MapProps {
  locations: Location[];
  center: [number, number];
  zoom: number;
  onLocationSelect: (location: { lat: number; lng: number; popupText: string }) => void;  // Prop para manejar la selección
}

const Map = ({ locations = [], center = [0, 0], zoom, onLocationSelect }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const { theme } = useTheme();

  const createFixedSizeIcon = (colorUrl: string) => {
    return new L.Icon({
      iconUrl: colorUrl,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  const iconHotel = createFixedSizeIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png');
  const iconRestaurante = createFixedSizeIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png');
  const iconActividad = createFixedSizeIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png');
  const iconMe = createFixedSizeIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png');

  const getIconByType = (type: string) => {
    switch (type) {
      case 'hotel': return iconHotel;
      case 'restaurante': return iconRestaurante;
      case 'actividad': return iconActividad;
      case 'me': return iconMe;
      default: return iconMe;
    }
  };

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map('map').setView(center, zoom);
    mapRef.current = map;

    const tileLayer = L.tileLayer(getTileUrl(theme), {
      attribution: '&copy; OpenStreetMap contributors',
    });

    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;

    locations.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lng], { icon: getIconByType(loc.type) })
        .addTo(map)
        .bindPopup(loc.popupText || '')
        .on('click', () => onLocationSelect({ lat: loc.lat, lng: loc.lng, popupText: loc.popupText || '' }));

      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());
    });
  }, [locations, center, zoom, theme]);

  useEffect(() => {
    if (tileLayerRef.current) {
      tileLayerRef.current.setUrl(getTileUrl(theme));
    }
  }, [theme]);

  return <div id="map" className="w-full h-[500px] rounded-xl shadow z-0" />;
};

// Manejador de temas
function getTileUrl(theme: string | undefined): string {
  return theme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
}

export default Map;
