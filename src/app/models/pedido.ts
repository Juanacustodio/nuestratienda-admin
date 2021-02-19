import {Cliente} from './cliente';

export interface Pedido {
  id: string;
  fecha: any;
  estado: string;
  estadoColor: string;
  envio: number;
  total: number;
  pedido: Array<any>;
  clienteID: string;
  cliente: Cliente;
}
