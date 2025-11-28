import { ProdutoPedidoCreateDTO } from './produto-pedido.model';
import { EnderecoCreateDTO } from './endereco-create.model';

export interface PedidoCreateDTO {
  nome: string;
  empresa_uuid: string;
  comprador_uuid: string;
  produtos?: ProdutoPedidoCreateDTO[];
  endereco_entrega?: EnderecoCreateDTO | null;
}
