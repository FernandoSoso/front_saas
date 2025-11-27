import { useParams } from "react-router-dom";
import Header from "../../components/Header"
import ChatBot from "./componets/ChatBot/ChatBot"

const ChatPedido = () => {

    const produtos = [
        { id: 104, nome: "Carne Moída", quantidade: 1, preco: 29.90 },
        { id: 105, nome: "Frango Inteiro", quantidade: 1, preco: 18.40 },
        { id: 106, nome: "Costela Bovina", quantidade: 2, preco: 44.90 }
    ]

    const total = produtos.reduce((acc, produto) => {
        return acc + produto.preco * produto.quantidade;
    }, 0);

    const {empresaId} = useParams()

    return(
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full ">
            <Header/>
            <div className="  mx-[100px] mt-[50px] pb-[40px] flex justify-between">
                
                <div className="w-1/3 h-[500px] mt-[80px] bg-white rounded-2xl shadow-2xl flex flex-col justify-between items-center">
                    <div className="space-y-6">
                        <h1 className="mt-3 font-semibold text-2xl text-center">Itens do pedido</h1>
                            {produtos.map((produto) => (
                                <div className="mb-2 flex justify-between my-4 space-x-5 items-center" key={produto.id}>
                                    <p>{produto.quantidade}x {produto.nome} — R$ {produto.preco}</p>
                                    <p className=" hover:bg-[#5c1911] cursor-pointer text-[12px] px-2 text-white font-bold bg-[#AF493E] rounded-full h-10 flex items-center justify-center">Remover item</p>
                                </div>
                        ))}
                    </div>
                        
                    <div className="w-full flex flex-col justify-center items-center space-y-3">
                        <p className="w-2/3 ml-5 text-start">Total: R${total}</p>
                        <p className="mb-10 w-2/3 hover:bg-green-900 cursor-pointer text-white font-bold bg-green-700 rounded-full h-10 flex items-center justify-center">Concluir pedido</p>
                    </div>
                </div>

                <div className="w-2/3 space-y-10">
                    <h1 className="font-semibold text-4xl text-center">Agente inteligente de pedidos</h1>
                    <ChatBot />
                </div>
            </div>
        </div>
    )
}

export default ChatPedido