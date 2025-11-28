import LinhaPedidoPendente from "../linhas/LinhaPedidosPendentes"
import { Pedido } from "../../../../models/pedido.model";

interface TabelaPedidosPendentesProps {
    pedidos: Pedido[];
    recarregarPedidos: () => void;
}

const TabelaPedidosPendentes = ({pedidos, recarregarPedidos}: TabelaPedidosPendentesProps) => {
    return(
      <div className="rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="font-bold text-md bg-stone-200">
                <tr>
                    <th className="p-4">Nome do Pedido</th> {/* Added column */}
                    <th className="p-4">Comprador</th>
                    <th className="p-4">Produtos</th>
                    <th className="p-4">Valor Total</th> {/* Added column */}
                    <th className="p-4">Cidade de Entrega</th> {/* Added column */}
                    <th className="p-4">Ações</th>
                    <th className="p-4">Detalhes do pedido</th>
                </tr>
            </thead>

             <tbody>
                {pedidos.map((pedido: Pedido, index: number) => (
                    <LinhaPedidoPendente
                        key={pedido.uuid}
                        pedido={pedido}
                        par={index % 2 === 0}
                        recarregarPedidos={recarregarPedidos}
                    />
                ))}
            </tbody>
        </table>
      </div>
    )
}

export default TabelaPedidosPendentes
