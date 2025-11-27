import { useEffect, useState } from "react"
import Header from "../../components/Header"
import { useParams } from "react-router-dom"
import { getPedido, concluirPedido } from "../../service/pedidoService";
import TabelaItensPedido from "./components/TabelaItensPedido";

const DetalhesPedido = () => {

    const [pedido, setPedido] = useState(null)
    const {pedidoId} = useParams()

    const carregarProduto = async () => {
        try {
            const res = await getPedido(pedidoId); 
            setPedido(res.data);             
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() =>{
        carregarProduto()
    }, [])

    const concluir = () => {
        concluirPedido(pedidoId)
        carregarProduto(pedidoId)
    }

    // Enquanto ainda não carregou
    if (!pedido) {
        return (
            <div className="bg-[#FEF7EA] w-full min-h-screen h-full">
                <Header />
                <div className="mx-[100px] mt-[50px]">
                    <h1 className="text-2xl font-semibold">Carregando...</h1>
                </div>
            </div>
        )
    }

    return(
        <>
            <div className="bg-[#FEF7EA] w-full min-h-screen h-full ">
                <Header/>
                <div className="mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
                    <div className="space-y-10">
                        <h1 className="font-semibold text-4xl">Detalhes do pedido</h1>
                        <div className="flex pb-5 pt-10 rounded-2xl bg-white border-[#A8201A] border-2 w-full relative">
                            
                            <div 
                                onClick={() => concluir()}
                                className="right-[-2px] top-[-30px] absolute text-xl font-bold flex items-center justify-center bg-white border-[#A8201A] border-2 rounded-2xl rounded-br-none py-3 px-5 cursor-pointer hover:text-white hover:bg-[#A8201A] text-[#A8201A]"
                            >
                                <h1>concluir</h1>
                            </div>

                            <div className="flex w-1/3">
                                <div className="text-xl font-semibold h-full w-1/3">
                                    <h2 className="border p-1 border-l-0 h-1/6 flex items-center justify-center w-full">Id</h2>
                                    <h2 className="border p-1 border-l-0 h-1/6 border-t-0 flex items-center justify-center w-full">Nome</h2>
                                    <h2 className="border p-1 border-l-0 h-1/6 border-t-0 flex items-center justify-center w-full">Status</h2>
                                    <h2 className="border p-1 border-l-0 h-1/6 border-t-0 flex items-center justify-center w-full">Comprador</h2>
                                    <h2 className="border p-1 border-l-0 h-1/6 border-t-0 flex items-center justify-center w-full">Telefone</h2>
                                    <h2 className="border p-1 border-l-0 h-1/6 border-t-0 flex items-center justify-center w-full">E-mail</h2>    
                                </div>

                                <div className="text-md h-full w-2/3">
                                    <h2 className="border px-1 border-l-0 h-1/6 flex items-center justify-center w-full">
                                        {pedido?.id}
                                    </h2>

                                    <h2 className="border px-1 border-l-0 border-t-0 h-1/6 flex items-center justify-center w-full">
                                        {pedido?.nome}
                                    </h2>

                                    <h2 className="border px-1 border-l-0 border-t-0 h-1/6 flex items-center justify-center w-full">
                                        {pedido?.status}
                                    </h2>

                                    <h2 className="border px-1 border-t-0 border-l-0 h-1/6 flex items-center justify-center w-full">
                                        {pedido?.comprador?.nome}
                                    </h2>

                                    <h2 className="border px-1 border-l-0 border-t-0 h-1/6 flex items-center justify-center w-full">
                                        {pedido?.comprador?.telefone}
                                    </h2>

                                    <h2 className="border px-1 border-l-0 border-t-0 h-1/6 flex items-center justify-center w-full">
                                        {pedido?.comprador?.email}
                                    </h2>
                                </div>
                            </div>

                            {/* COLUNA À DIREITA */}
                            <div className="flex w-2/3">
                                <div className="text-xl font-semibold h-full w-1/3">
                                    <h2 className="border p-1 border-l-0 h-1/7 flex items-center justify-center w-full">Logradouro</h2>
                                    <h2 className="border p-1 border-l-0 border-t-0 h-1/7 flex items-center justify-center w-full">Número</h2>
                                    <h2 className="border p-1 border-l-0 border-t-0 h-1/7 flex items-center justify-center w-full">Complemento</h2>
                                    <h2 className="border p-1 border-l-0 border-t-0 h-1/7 flex items-center justify-center w-full">Bairro</h2>
                                    <h2 className="border p-1 border-l-0 border-t-0 h-1/7 flex items-center justify-center w-full">Cidade</h2>
                                    <h2 className="border p-1 border-l-0 border-t-0 h-1/7 flex items-center justify-center w-full">Estado</h2>
                                    <h2 className="border p-1 border-l-0 border-t-0 h-1/7 flex items-center justify-center w-full">CEP</h2>
                                
                                </div>

                                <div className="text-md h-full w-2/3">
                                    <h2 className="border px-1 border-l-0 h-1/7 border-r-0 flex items-center justify-center w-full">
                                        {pedido?.endereco_entrega?.logradouro}
                                    </h2>

                                    <h2 className="border px-1 border-t-0 border-l-0 border-r-0 h-1/7 flex items-center justify-center w-full">
                                        {pedido?.endereco_entrega?.numero}
                                    </h2>

                                    <h2 className="border px-1 border-t-0 border-l-0 border-r-0 h-1/7 flex items-center justify-center w-full">
                                        {pedido?.endereco_entrega?.complemento}
                                    </h2>

                                    <h2 className="border px-1 border-t-0 border-l-0 border-r-0 h-1/7 flex items-center justify-center w-full">
                                        {pedido?.endereco_entrega?.bairro}
                                    </h2>

                                    <h2 className="border px-1 border-t-0 border-l-0 border-r-0 h-1/7 flex items-center justify-center w-full">
                                        {pedido?.endereco_entrega?.cidade}
                                    </h2>

                                    <h2 className="border px-1 border-t-0 border-l-0 border-r-0 h-1/7 flex items-center justify-center w-full">
                                        {pedido?.endereco_entrega?.estado}
                                    </h2>

                                    <h2 className="border px-1 border-t-0 border-l-0 border-r-0 h-1/7 flex items-center justify-center w-full">
                                        {pedido?.endereco_entrega?.cep}
                                    </h2>
                                </div>
                            </div>

                        </div>

                    </div>

                    <h1 className="font-semibold text-4xl">Itens do pedido</h1>
                    <TabelaItensPedido produtos={pedido?.produtos} />
                </div>            
            </div>
        </>
    )
}

export default DetalhesPedido
