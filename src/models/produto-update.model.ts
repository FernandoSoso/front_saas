export interface ProdutoUpdateDTO {
  nome?: string | null;
  valor?: number | null;
  quantidade?: number | null;
  unidade_medida?: string | null;
  empresa_uuid?: string | null;
  descricao?: string | null;
}
