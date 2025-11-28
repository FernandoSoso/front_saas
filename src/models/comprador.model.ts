import { Pedido } from './pedido.model';

export class Comprador {
  id?: number;
  uuid?: string;
  nome?: string;
  documento?: string;
  telefone?: string;
  email?: string;
  pedidos?: Pedido[];
}
