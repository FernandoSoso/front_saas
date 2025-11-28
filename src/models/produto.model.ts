import { Empresa } from './empresa.model';

export class Produto {
  uuid?: string;
  nome?: string;
  valor: number = 0;
  quantidade: number = 0;
  unidade_medida?: string;
  descricao?: string;
  empresa?: Empresa; // Changed to embedded Empresa object
}
