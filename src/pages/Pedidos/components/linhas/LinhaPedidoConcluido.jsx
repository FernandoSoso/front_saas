import { Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";


const LinhaPedidoConcluido = ({pedido, par}) => {
    const navigate = useNavigate()

    return(
        <tr className={`${par? "bg-white" : "bg-stone-100"} text-center text-md p-[30px]`}>
            <td className="p-6">{pedido.id}</td>
            <td className="p-6">{pedido.nome}</td>
            <td className="p-6">
                {pedido.produtos.slice(0, 3).map((produto) => (
                    <div className="mb-2" key={produto.id}>
                        <p>{produto.quantidade}x {produto.nome} — R$ {produto.preco}</p>
                    </div>
                ))}

                {pedido.produtos.length > 3 && (
                    <p className="text-stone-500 mt-2">E mais...</p>
                )}
            </td>
            <td className="p-6 "><p className="text-green-900 font-bold flex justify-center items-center gap-2"> <Circle size={14} fill="currentColor" stroke="currentColor" />Concluído</p></td>
            <td onClick={() => navigate(`/pedido/${pedido.id}`)} className="p-6 flex justify-center items-center"><p className="hover:font-extrabold hover:text-black hover:border-black cursor-pointer text-blue-900 border-2 font-bold border-blue-900 text-center h-10 rounded-full w-[70%] flex justify-center items-center">Ver detalhes</p></td>
        </tr>
    )
}

export default LinhaPedidoConcluido