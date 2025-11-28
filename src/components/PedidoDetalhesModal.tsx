import React from 'react';
import { X } from 'lucide-react';
import { Pedido } from '../models/pedido.model';

interface PedidoDetalhesModalProps {
  aberto: boolean;
  fechar: () => void;
  pedido: Pedido | null;
}

const PedidoDetalhesModal: React.FC<PedidoDetalhesModalProps> = ({ aberto, fechar, pedido }) => {
  if (!aberto || !pedido) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={fechar}>
      <div className="bg-white p-6 rounded-xl shadow-xl w-[600px] max-h-[90vh] overflow-y-auto relative space-y-4" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-2 right-3 text-xl font-bold hover:bg-stone-500 cursor-pointer p-2 rounded-full"
          onClick={fechar}
        >
          <X size={20} />
        </button>
        <h1 className="w-full text-center text-2xl font-semibold mb-4">Detalhes do Pedido: {pedido.nome}</h1>

        <div className="space-y-2">
          <h2 className="font-bold text-lg">Informações Gerais</h2>
          <p><strong>UUID:</strong> {pedido.uuid}</p>
          <p><strong>Status:</strong> {pedido.status?.replace(/_/g, ' ')}</p> {/* Status is now string */}
          <p><strong>Concluído:</strong> {pedido.concluido ? 'Sim' : 'Não'}</p>
          <p><strong>Valor Total:</strong> R$ {pedido.valor_total?.toFixed(2)}</p>
        </div>

        <div className="space-y-2">
          <h2 className="font-bold text-lg">Comprador</h2>
          <p><strong>Nome:</strong> {pedido.comprador?.nome}</p>
          <p><strong>Email:</strong> {pedido.comprador?.email}</p>
          <p><strong>Telefone:</strong> {pedido.comprador?.telefone}</p>
        </div>

        {pedido.endereco_entrega && (
          <div className="space-y-2">
            <h2 className="font-bold text-lg">Endereço de Entrega</h2>
            <p><strong>Logradouro:</strong> {pedido.endereco_entrega.logradouro}, {pedido.endereco_entrega.numero} {pedido.endereco_entrega.complemento && `(${pedido.endereco_entrega.complemento})`}</p>
            <p><strong>Bairro:</strong> {pedido.endereco_entrega.bairro}</p>
            <p><strong>Cidade/Estado:</strong> {pedido.endereco_entrega.cidade} - {pedido.endereco_entrega.estado}</p>
            <p><strong>CEP:</strong> {pedido.endereco_entrega.cep}</p>
          </div>
        )}

        <div className="space-y-2">
          <h2 className="font-bold text-lg">Produtos</h2>
          {pedido.produtos && pedido.produtos.length > 0 ? (
            <ul className="list-disc list-inside">
              {pedido.produtos.map((produto) => (
                <li key={produto.uuid}>
                  {produto.quantidade_pedida}x {produto.nome} ({produto.unidade_medida}) - R$ {produto.valor?.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum produto neste pedido.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PedidoDetalhesModal;
