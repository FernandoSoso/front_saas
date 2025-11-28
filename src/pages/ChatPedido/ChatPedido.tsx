import Header from "../../components/Header.tsx"
import ChatBot from "./componets/ChatBot/ChatBot.tsx"
import {useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Pedido} from "../../models/pedido.model.ts";
import {useServices} from "../../hooks/useServices.ts";
import {toast} from "sonner";
import { ProdutoPedidoCreateDTO } from "../../models/produto-pedido.model.ts"; // Import for PedidoUpdateDTO

const ChatPedido = () => {
    const [pedido, setPedido] = useState<Pedido>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {empresaUuid} = useParams<{ empresaUuid: string }>();

    const total = pedido?.produtos.reduce((acc, produto) => {
        return acc + produto.valor * produto.quantidade_pedida;
    }, 0) ?? 0;

    const {pedidoService} = useServices()

    const initialMessage = "Bom dia! Tudo bem? Caso você deseje buscar informações dos seus pedidos, nos informe seu CPF ou CNPJ!";

    async function doPedido() {
        if (!pedido?.uuid) {
            toast.error("Nenhum pedido para finalizar.");
            return;
        }
        try {
            // Assuming 'Concluido' is a valid status string
            const updatedPedido = await pedidoService.updatePedido(pedido.uuid, { status: "CONCLUIDO", concluido: true });
            setPedido(updatedPedido.data); // Update local state with response
            toast.success('Pedido finalizado com sucesso!');
            navigate('/') // Navigate after successful finalization
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);
            toast.error("Falha ao finalizar pedido.");
        }
    }

    async function removeItem(productUuid: string) { // Renamed parameter for clarity
        if (!pedido?.uuid || !pedido.produtos) {
            toast.error("Nenhum pedido ou produtos para remover.");
            return;
        }

        try {
            // Filter out the product to be removed
            const updatedProdutos: ProdutoPedidoCreateDTO[] = pedido.produtos
                .filter(p => p.uuid !== productUuid)
                .map(p => ({
                    produto_uuid: p.uuid,
                    quantidade: p.quantidade_pedida // Map to ProdutoPedidoCreateDTO structure
                }));

            // Call updatePedido with the new list of products
            const response = await pedidoService.updatePedido(pedido.uuid, { produtos: updatedProdutos });
            setPedido(response.data); // Update local state with the new pedido from the API
            toast.success('Item removido do pedido com sucesso!');
        } catch (error) {
            console.error("Erro ao remover item do pedido:", error);
            toast.error("Falha ao remover item do pedido.");
        }
    }

    return (
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full ">
            <Header/>
            <div className="mx-[100px] mt-[50px] pb-[40px] flex justify-between gap-8">

                {pedido && (
                    <div
                        className="w-1/3 h-[500px] mt-[80px] bg-white rounded-2xl shadow-2xl flex flex-col justify-between items-center">
                        <div className="space-y-6">
                            <h1 className="mt-3 font-semibold text-2xl text-center">Itens do pedido</h1>
                            <table className="w-full"> {/* Added w-full for table */}
                                <tbody> {/* Added tbody */}
                                {pedido?.produtos.map((produto) => (
                                    <tr className="mb-2 flex justify-between my-4 space-x-5 items-center"
                                        key={produto.uuid}>

                                        <td>{produto.quantidade_pedida} {produto?.unidade_medida ?? 'un'} {produto.nome} —
                                            R$ {produto.valor?.toFixed(2)}</td> {/* Fixed toFixed */}
                                        <td><p
                                            onClick={() => removeItem(produto.uuid)}
                                            className=" hover:bg-[#5c1911] cursor-pointer text-[12px] px-2 text-white font-bold bg-[#AF493E] rounded-full h-10 flex justify-center items-center">
                                            Remover item
                                        </p></td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="w-full flex flex-col justify-center items-center space-y-3">
                            <p className="w-2/3 ml-5 text-start">Total: R${total.toFixed(2)}</p> {/* Fixed toFixed */}
                            <p onClick={doPedido}
                               className="mb-10 w-2/3 hover:bg-green-900 cursor-pointer text-white font-bold bg-green-700 rounded-full h-10 flex items-center justify-center">
                                Fazer pedido</p>
                        </div>
                    </div>
                )}

                <div className={`${pedido ? 'w-2/3' : 'w-full'} space-y-10`}>
                    <h1 className="font-semibold text-4xl text-center">Agente inteligente de pedidos</h1>
                    <ChatBot
                        empresaUuid={empresaUuid}
                        pedido={pedido}
                        onReceivePedido={(updatedPedido) => { // Renamed parameter for clarity
                            setPedido(updatedPedido)
                        }}
                        initialMessage={initialMessage}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatPedido
