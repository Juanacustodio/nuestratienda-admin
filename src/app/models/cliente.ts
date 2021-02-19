import {Direccion} from './direccion';

export interface Cliente {
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  direccion: Direccion;
  celular: string;
  documento: string;
}
