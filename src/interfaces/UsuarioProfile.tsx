import { PreferenciaItem } from "./PreferenciaItem";

export interface Usuario {
  nombre_viajero: string;
  primer_Apellido_viajero: string;
  segundo_Apellido_viajero: string;
  correo_viajero: string;
  pass_viajero: string;
  sexo_viajero: string;
  fecha_nacimiento_viajero: string;
  telefono_viajero: string;
  preferencias: PreferenciaItem[];
  alta_usuario: boolean;
  fecha_creacion: string;
  fecha_login?: string;
  img?: string;
  descripcion?: string;
  profesion_viajero?: string;
}
