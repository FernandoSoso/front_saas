import LinhaPedidoConcluido from "../linhas/LinhaPedidoConcluido";
import { Pedido } from "../../../../models/pedido.model";

interface TabelaPedidosConcluidosProps {
    pedidos: Pedido[];
    recarregarPedidos: () => void;
}

const TabelaPedidosConcluidos = ({pedidos, recarregarPedidos}: TabelaPedidosConcluidosProps) => {

    return(
      <div className="rounded-md overflow-hidden">
        <table className="w-full">
            <thead className="font-semibold text-md bg-stone-200">
                <tr>
                    <th className="p-4">Nome do Pedido</th> {/* Added column */}
                    <th className="p-4">Comprador</th>
                    <th className="p-4">Produtos</th>
                    <th className="p-4">Valor Total</th> {/* Added column */}
                    <th className="p-4">Cidade de Entrega</th> {/* Added column */}
                    <th className="p-4">Status</th>
                    <th className="p-4">Detalhes do pedido</th>
                </tr>
            </thead>

            <tbody>
                {pedidos.map((pedido: Pedido, index: number) => (
                    <LinhaPedidoConcluido
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

export default TabelaPedidosConcluidos;
