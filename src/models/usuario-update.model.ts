export interface UsuarioUpdateDTO {
  nome?: string | null;
  email?: string | null;
  senha?: string | null;
  empresa_uuid?: string | null;
  permissao_ids?: number[] | null;
}
