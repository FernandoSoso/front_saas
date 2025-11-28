import { useEffect, useState } from "react"
import Header from "../../components/Header.tsx"
import EditModal from "./components/EditaModal"
import { useParams }  from "react-router-dom"
import { useServices } from "../../hooks/useServices" // Import useServices
import { Produto } from "../../models/produto.model" // Import Produto model

const ProdutoPage = () => { // Renamed to ProdutoPage to avoid conflict with Produto model

    const [produto, setProduto] = useState<Produto | null>(null) // Type the state
    const { produtoId } = useParams<{ produtoId: string }>(); // Type useParams
    const [aberto, setAberto] = useState(false)

    const { produtoService } = useServices(); // Use produtoService

    const carregarProduto = async () => {
        if (!produtoId) return;
        try {
            const res = await produtoService.getProdutoByUuid(produtoId); // Use the new service method
            setProduto(res.data);             
        } catch (err) {
            console.error("Erro ao carregar produto:", err); // Log error
        }
    };

    useEffect(() =>{
        carregarProduto();
    }, [produtoId, produtoService]); // Add dependencies

    return(
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full">
            <Header/>

            <div className="mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
                <h1 className="font-semibold text-4xl">Detalhes do Produto</h1>

                {/* WRAPPER COM BORDA + RADIUS */}
                <div className="w-full border-2 border-[#A8201A] rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead className="font-bold text-md bg-stone-200">
                            <tr>
                                <th className="p-4 text-start">UUID</th> {/* Changed to UUID */}
                                <th className="p-4 text-start">Nome</th>
                                <th className="p-4 text-start">Valor</th>
                                <th className="p-4 text-start">Quantidade</th>
                                <th className="p-4 text-start">Unidade de Medida</th>
                                <th className="p-4 text-start">Descrição</th>
                                <th className="p-4 text-start">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {produto && (
                                <tr className="bg-white text-md">
                                    <td className="p-6">{produto.uuid}</td>
                                    <td className="p-6">{produto.nome}</td>
                                    <td className="p-6">{produto.valor?.toFixed(2)}</td> {/* Display valor */}
                                    <td className="p-6">{produto.quantidade}</td>
                                    <td className="p-6">{produto.unidade_medida}</td>
                                    <td className="p-6">{produto.descricao || 'N/A'}</td> {/* Display descricao */}
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

            {produto && ( // Only render EditModal if product exists
                <EditModal 
                    aberto={aberto} 
                    fechar={() => setAberto(false)} 
                    produto={produto} 
                    recarregarProduto={carregarProduto}
                />
            )}
        </div>
    )
}

export default ProdutoPage
