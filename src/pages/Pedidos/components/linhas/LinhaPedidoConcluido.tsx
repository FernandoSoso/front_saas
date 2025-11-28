import { Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Pedido } from "../../../../models/pedido.model";
import PedidoDetalhesModal from "../../../../components/PedidoDetalhesModal"; // Import the new modal
import { useState } from "react"; // Import useState

interface LinhaPedidoConcluidoProps {
    pedido: Pedido;
    par: boolean;
    recarregarPedidos: () => void;
}

const LinhaPedidoConcluido = ({pedido, par}: LinhaPedidoConcluidoProps) => {
    const navigate = useNavigate();
    const [modalAberto, setModalAberto] = useState(false); // State for modal visibility

    return(
        <>
            <tr className={`${par? "bg-white" : "bg-stone-100"} text-center text-md p-[30px]`}>
                <td className="p-6">{pedido.nome}</td>
                <td className="p-6">{pedido.comprador?.nome}</td>
                <td className="p-6">
                    {pedido.produtos.slice(0, 3).map((produto) => (
                        <div className="mb-2" key={produto.uuid}>
                            <p>{produto.quantidade_pedida}x {produto.nome} — R$ {produto.valor?.toFixed(2)}</p>
                        </div>
                    ))}

                    {pedido.produtos.length > 3 && (
                        <p className="text-stone-500 mt-2">E mais...</p>
                    )}
                </td>
                <td className="p-6">R$ {pedido.valor_total?.toFixed(2)}</td>
                <td className="p-6">{pedido.endereco_entrega?.cidade || 'N/A'}</td>
                <td className="p-6 ">
                    <p className="text-green-900 font-bold flex justify-center items-center gap-2"> 
                        <Circle size={14} fill="currentColor" stroke="currentColor" />
                        {pedido.status}
                    </p>
                </td>
                <td onClick={() => setModalAberto(true)} className="p-6 flex justify-center items-center"> {/* Open modal on click */}
                    <p className="hover:font-extrabold hover:text-black hover:border-black cursor-pointer text-blue-900 border-2 font-bold border-blue-900 text-center h-10 rounded-full w-[70%] flex justify-center items-center">Ver detalhes</p>
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

export default LinhaPedidoConcluido
