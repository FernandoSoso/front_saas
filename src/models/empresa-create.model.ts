import { EnderecoCreateDTO } from './endereco-create.model';

export interface EmpresaCreateDTO {
  nome: string;
  cnpj: string;
  descricao: string;
  pedido_minimo?: number;
  endereco: EnderecoCreateDTO;
}
