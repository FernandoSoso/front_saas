import { useMemo } from 'react';
import { container } from 'tsyringe';
import { MensagemService } from '../services/mensagem-service.ts';
import { EmpresaService } from '../services/empresa-service.ts';
import { ProdutoService } from '../services/produto-service.ts'; // Import ProdutoService
import { UsuarioService } from '../services/usuario-service.ts'; // Import UsuarioService
import { PedidoService } from '../services/pedido-service.ts';   // Import PedidoService

/**
 * Hook customizado para resolver e fornecer instâncias de serviços
 * a partir do contêiner de injeção de dependência.
 * O `useMemo` garante que a resolução ocorra apenas uma vez por componente.
 */
export const useServices = () => {
  return useMemo(() => ({
    mensagemService: container.resolve(MensagemService),
    empresaService: container.resolve(EmpresaService),
    produtoService: container.resolve(ProdutoService), // Register ProdutoService
    usuarioService: container.resolve(UsuarioService), // Register UsuarioService
    pedidoService: container.resolve(PedidoService),   // Register PedidoService
    // authService: container.resolve(AuthService),
  }), []);
};
