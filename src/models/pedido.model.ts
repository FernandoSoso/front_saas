import { Comprador } from './comprador.model';
import { Empresa } from './empresa.model';
import { ProdutoPedidoResponseDTO } from './produto-pedido.model';
import {Endereco} from "./endereco.model.ts";

export class Pedido {
  uuid?: string;
  nome?: string;
  concluido?: boolean;
  status?: string; // Changed to string
  empresa?: Empresa;
  comprador?: Comprador;
  produtos: ProdutoPedidoResponseDTO[] = [];
  valor_total?: number;
  endereco_entrega?: Endereco | null;
}
