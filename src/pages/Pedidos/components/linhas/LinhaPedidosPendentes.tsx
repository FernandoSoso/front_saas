import { useNavigate } from "react-router-dom"
import { useServices } from "../../../../hooks/useServices";
import { Pedido } from "../../../../models/pedido.model";
// import { StatusPedidoEnum } from "../../../../models/status-pedido.enum"; // Removed import
import PedidoDetalhesModal from "../../../../components/PedidoDetalhesModal";
import { useState } from "react";

interface LinhaPedidoPendenteProps {
    pedido: Pedido;
    par: boolean;
    recarregarPedidos: () => void;
}

const LinhaPedidoPendente = ({pedido, par, recarregarPedidos}: LinhaPedidoPendenteProps) => {
    const navigate = useNavigate();
    const { pedidoService } = useServices();
    const [modalAberto, setModalAberto] = useState(false);

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value; // newStatus is now string
        if (!pedido.uuid) return;

        try {
            await pedidoService.updatePedido(pedido.uuid, { status: newStatus });
            alert(`Status do pedido ${pedido.nome} atualizado para ${newStatus}!`);
            recarregarPedidos();
        } catch (error) {
            console.error("Erro ao atualizar status do pedido:", error);
            alert("Erro ao atualizar status do pedido.");
        }
    };

    // Updated allowedStatuses to be an array of strings
    const allowedStatuses = [
        "SOLICITADO",
        "EM_ANALISE",
        "APROVADO",
        "EM_PRODUCAO",
        "EXPEDIDO",
        "ENTREGUE",
    ];

    return(
        <>
            <tr className={`${par? "bg-white" : "bg-stone-100"} text-center text-md p-[30px]`}>
                <td className="p-6">{pedido.nome}</td>
                <td className="p-6">{pedido.comprador?.nome}</td>
                <td className="p-6">
                    {pedido.produtos.slice(0, 2).map((produto) => (
                        <div className="mb-2" key={produto.uuid}>
                            <p>{produto.quantidade_pedida}x {produto.nome} — R$ {produto.valor?.toFixed(2)}</p>
                        </div>
                    ))}

                    {pedido.produtos.length > 2 && (
                        <p className="text-stone-500 mt-2">E mais...</p>
                    )}
                </td>
                <td className="p-6">R$ {pedido.valor_total?.toFixed(2)}</td>
                <td className="p-6">{pedido.endereco_entrega?.cidade || 'N/A'}</td>
                <td className="p-6 ">
                    <select
                        value={pedido.status || ''}
                        onChange={handleStatusChange}
                        className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    >
                        {allowedStatuses.map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                                {statusOption.replace(/_/g, ' ')}
                            </option>
                        ))}
                    </select>
                </td>
                <td onClick={() => setModalAberto(true)} className="p-6 flex justify-center items-center">
                    <p className="mx-auto hover:font-extrabold hover:text-black hover:border-black cursor-pointer text-blue-900 border-2 font-bold border-blue-900 text-center h-10 rounded-full w-[70%] flex justify-center items-center">Ver detalhes</p>
                </td>
            </tr>

            <PedidoDetalhesModal
                aberto={modalAberto}
                fechar={() => setModalAberto(false)}
                pedido={pedido}
            />
        </>
    )
}

export default LinhaPedidoPendente
