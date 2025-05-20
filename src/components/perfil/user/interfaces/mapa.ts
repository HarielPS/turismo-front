export type Servicio = {
    lat: number;
    lng: number;
    name?: string;
    rating?: number;
    reviewCount?: number;
    feature_1: string;
    feature_2: string;
    feature_3: string;
    status: 'Abierto' | 'Cerrado';
    fecha: string;
    closingTime: string | "Hoy no hay horario";
    type: 'hotel' | 'restaurante' | 'actividad' | 'me';
    img: string;
};

export interface MapProps {
  locations: Servicio[];
  center: [number, number];
  zoom: number;
  onLocationSelect: (location: { lat: number; lng: number; popupText: string }) => void;
}

export interface MapPopupProps {
     name?: string;
    rating?: number;
    reviewCount?: number;
    feature_1: string;
    feature_2: string;
    feature_3: string;
    status: 'Abierto' | 'Cerrado';
    fecha: string;
    closingTime: string | "Hoy no hay horario";
    type: 'hotel' | 'restaurante' | 'actividad' | 'me';
    img: string;
}