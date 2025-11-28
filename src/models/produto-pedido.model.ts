export interface ProdutoPedidoCreateDTO {
  produto_uuid: string;
  quantidade: number;
}

export interface ProdutoPedidoResponseDTO {
  uuid: string;
  nome: string;
  valor: number;
  unidade_medida: string;
  quantidade_pedida: number;
}
