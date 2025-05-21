export type Servicio = {
    _id: string;
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
  onLocationSelect: (id: string) => void;
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

export interface ServicioAll {
  _id: string;
  nombre: string;
  img_profile: string;
  calificacion: number;
  descripcion: string;
  imagenes: Imagen[];
  duracion: number;
  precio: number;
  tel: string;
  email: string;
  web: string;
  horarios: Horario[];
  fecha: Fecha | null;
  comentarios: Comentario[];
  localidad: string;
  categoria: Categoria;
  tipo: Tipo;
  subtipo: Tipo | null;
  jerarquia: number;
  tangible: boolean;
  pueblo: string;
  coordenadas: Coordenadas;
  ubicacion: string;
}

interface Imagen {
  _id: string;
  url: string;
}

interface Fecha {
  inicio: string;       
  fin: string;         
  descripcion: string;
}

interface Horario {
  _id: string;
  dia: string;
  apertura: string;
  cierre: string;
}

interface Comentario {
  _id: string;
  usuario?: Usuario | null;
  comentario: string;
  calificacion: number;
  img: Imagen[] | null;
  fecha: string;
}

interface Usuario {
  _id: string;
  nombre_viajero: string;
  primer_Apellido_viajero: string;
  segundo_Apellido_viajero: string;
  correo_viajero: string;
  pass_viajero: string;
  sexo_viajero: string;
  fecha_nacimiento_viajero: string;
  telefono_viajero: string;
  preferencias: Preferencia[];
  alta_usuario: boolean;
  fecha_creacion: string;
  fecha_login: string;
  __v: number;
}

interface Preferencia {
  atributoID: string;
  conteo: number;
  _id: string;
}

interface Categoria {
  _id: string;
  nombre: string;
  nivel: number;
  padre: null;
  img: string;
}

interface Tipo {
  _id: string;
  nombre: string;
  nivel: number;
  padre: string;
}

interface Coordenadas {
  lat: number;
  long: number;
  _id: string;
}