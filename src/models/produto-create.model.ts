export interface ProdutoCreateDTO {
  nome: string;
  valor: number;
  quantidade: number;
  unidade_medida: string;
  empresa_uuid: string;
  descricao?: string | null;
}
