import { EnderecoCreateDTO } from './endereco-create.model';

export interface EmpresaUpdateDTO {
  nome?: string | null;
  cnpj?: string | null;
  descricao?: string | null;
  pedido_minimo?: number | null;
  endereco?: EnderecoCreateDTO | null;
}
