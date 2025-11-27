import { useEffect, useState } from "react"
import Header from "../../components/Header"
import EditModal from "./components/EditaModal"
import { useParams } from "react-router-dom"
import { getProduto } from "../../service/produtoService"

const Produto = () => {

    const [produto, setProduto] = useState(null)
    const { produtoId } = useParams(); 
    const [aberto, setAberto] = useState(false)

    const carregarProduto = async () => {
        try {
            const res = await getProduto(produtoId); 
            setProduto(res.data);             
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() =>{
        carregarProduto(produtoId)
    }, [])

    return(
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full">
            <Header/>

            <div className="mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
                <h1 className="font-semibold text-4xl">Produto</h1>

                {/* WRAPPER COM BORDA + RADIUS */}
                <div className="w-full border-2 border-[#A8201A] rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead className="font-bold text-md bg-stone-200">
                            <tr>
                                <th className="p-4 text-start">Id</th>
                                <th className="p-4 text-start">Produto</th>
                                <th className="p-4 text-start">Quantidade</th>
                                <th className="p-4 text-start">Unidade medida</th>
                                <th className="p-4 text-start">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {produto && (
                                <tr className="bg-white text-md">
                                    <td className="p-6">{produto.id}</td>
                                    <td className="p-6">{produto.nome}</td>
                                    <td className="p-6">{produto.quantidade}</td>
                                    <td className="p-6">{produto.unidade_medida}</td>
                                    <td className="p-6 flex justify-start">
                                        <p
                                            onClick={() => setAberto(true)}
                                            className="text-center hover:text-black hover:border-black cursor-pointer text-green-700 border-2 font-bold border-green-700 p-3 rounded-full w-[40%]"
                                        >
                                            Editar
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {!produto && (
                    <h1 className="w-full py-5 text-center">Produto não encontrado!</h1>
                )}
            </div>

            <EditModal 
                aberto={aberto} 
                fechar={() => setAberto(false)} 
                produto={produto} 
                recarregarProduto={() => carregarProduto(produtoId)}
            />
        </div>
    )
}

export default Produto
