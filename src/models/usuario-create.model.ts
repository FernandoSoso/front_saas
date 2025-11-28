export interface UsuarioCreateDTO {
  nome: string;
  email: string;
  senha?: string; // Making senha optional as per the DTO example
  empresa_uuid: string;
  permissao_ids?: number[] | null;
}
