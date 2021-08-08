export interface Vendedor {
  id?: number;
  nombres: string;
  apellidos: string;
  password: string;
  correo: string;
  suscripcion: Suscripcion;
}

export interface Suscripcion {
  token: string;
  fechaFin: string;
}

