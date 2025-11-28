import { ProdutoPedidoCreateDTO } from './produto-pedido.model';
import { EnderecoCreateDTO } from './endereco-create.model';
// import { StatusPedidoEnum } from './status-pedido.enum'; // Removed import

export interface PedidoUpdateDTO {
  nome?: string | null;
  concluido?: boolean | null;
  status?: string | null; // Changed to string
  empresa_uuid?: string | null;
  comprador_uuid?: string | null;
  produtos?: ProdutoPedidoCreateDTO[] | null;
  endereco_entrega?: EnderecoCreateDTO | null;
}
