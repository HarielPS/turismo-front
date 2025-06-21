'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type {MapProps } from '@/components/perfil/user/interfaces/mapa';
import ReactDOMServer from 'react-dom/server';
import MapPopup from './MapPopup';


const Map = ({ locations = [], center = [0, 0], zoom, onLocationSelect }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
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

  // Inicializa el mapa una sola vez
  useEffect(() => {
    if (!mapRef.current) 
    {
      const map = L.map('map', {
        zoomControl: true
      }).setView(center, zoom);
      mapRef.current = map;

      // Set zoom control position after map creation
      map.zoomControl.setPosition('bottomright');

      const tileLayer = L.tileLayer(getTileUrl(theme), {
        attribution: '&copy; OpenStreetMap contributors',
      });

      tileLayer.addTo(map);
      tileLayerRef.current = tileLayer;

    }
  }, []);

  // Actualiza los estilos del mapa cuando cambia el tema
  useEffect(() => {
    if (tileLayerRef.current) {
      tileLayerRef.current.setUrl(getTileUrl(theme));
    }
  }, [theme]);

  // Centra el mapa si cambia el centro o el zoom
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

   useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    locations.forEach(loc => {
      const popupContent = ReactDOMServer.renderToString(
        <MapPopup
          name={loc.name || ''}
          rating={loc.rating || 0.0} 
          reviewCount={loc.reviewCount || 0}
          type={loc.type}
          feature_1={loc.feature_1 || ''}
          feature_2={loc.feature_2 || ''}
          feature_3={loc.feature_3 || ''}
          status={loc.status || ''}
          closingTime={loc.closingTime || ''}
          img={loc.img || ''}
          fecha={loc.fecha || ''}
        />
      );

      const marker = L.marker([loc.lat, loc.lng], { icon: getIconByType(loc.type) })
        .addTo(mapRef.current!)
        .bindPopup(popupContent)
        .on('click', () => onLocationSelect(loc._id));

      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());

      markersRef.current.push(marker);
    });
  }, [locations, onLocationSelect]);

  // return <div id="map" className="w-full h-[500px] rounded-xl shadow z-0" />;
  return <div id="map" className="w-full h-screen shadow z-0" />;

};

// Manejador de temas
function getTileUrl(theme: string | undefined): string {
  return theme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
}

export default Map;
