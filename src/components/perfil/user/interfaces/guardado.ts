export interface Actividad {
  id: string;
  tipo: 'servicio' | 'hotel' | 'alimento';
  estado?: 'reserva' | 'eliminar'; 
}

export interface Guardado {
  id: string;
  status: 'reserva' | 'eliminar';
  fecha_guardado: string;
  actividades: Actividad[];
}
