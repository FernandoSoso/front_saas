import { useNavigate, useParams } from "react-router-dom"
import { concluirPedido } from "../../../../service/pedidoService";

const LinhaPedidoPendente = ({pedido, par, recarregarPedidos}) => {
    const navigate = useNavigate()

    const { pedidoId } = useParams()

    return(
            <tr className={`${par? "bg-white" : "bg-stone-100"} text-centertext-md p-[30px]`}>
                <td className="p-6">{pedido.id}</td>
                <td className="p-6">{pedido.nome}</td>
                <td className="p-6">
                    {pedido.produtos.slice(0, 2).map((produto) => (
                        <div className="mb-2" key={produto.id}>
                            <p>{produto.quantidade}x {produto.nome} — R$ {produto.preco}</p>
                        </div>
                    ))}

                    {pedido.produtos.length > 2 && (
                        <p className="text-stone-500 mt-2">E mais...</p>
                    )}
                </td>
                <td className="p-6 "
                    ><p 
                        className=" hover:bg-green-900 cursor-pointer text-white font-bold bg-green-700 rounded-full h-10 flex items-center justify-center"
                        onClick={() => {
                            concluirPedido(pedidoId)
                            recarregarPedidos()
                        }}
                    >
                        Concluir pedido
                        </p>
                    </td>
                <td className="p-6 " onClick={() => navigate(`/pedido/${pedido.id}`)}><p className="mx-auto hover:font-extrabold hover:text-black hover:border-black cursor-pointer text-blue-900 border-2 font-bold border-blue-900 text-center h-10 rounded-full w-[70%] flex justify-center items-center">Ver detalhes</p></td>
            </tr>
        )
}

export default LinhaPedidoPendente