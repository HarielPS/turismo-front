// types/UsuarioInfoResult.ts
import { Usuario } from './UsuarioProfile';

export interface Atributo {
  _id: string;
  nombre: string;
  tipo: string;
  // puedes añadir más campos si tu backend devuelve más
}

export interface UsuarioInfoResult {
  userId?: string;
  role?: string;
  userData?: Usuario;
  atributos?: Atributo[];
}
