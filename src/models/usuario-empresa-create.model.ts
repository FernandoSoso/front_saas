import { EnderecoCreateDTO } from './endereco-create.model';

export interface UsuarioEmpresaCreateDTO {
  nome_usuario: string;
  email: string;
  senha: string;
  nome_empresa: string;
  cnpj: string;
  descricao: string;
  pedido_minimo?: number;
  endereco: EnderecoCreateDTO;
  permissao_ids?: number[] | null;
}
