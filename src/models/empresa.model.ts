import { Endereco } from './endereco.model';
import { Pedido } from './pedido.model';
import { Usuario } from './usuario.model';
import { Produto } from './produto.model';

export class Empresa {
  uuid?: string;
  nome?: string;
  cnpj?: string;
  descricao?: string; // Added based on OpenAPI spec
  pedido_minimo?: number;
  endereco?: Endereco; // Embedded Endereco object
  pedidos?: Pedido[];
  usuarios?: Usuario[];
  produtos?: Produto[];
}
