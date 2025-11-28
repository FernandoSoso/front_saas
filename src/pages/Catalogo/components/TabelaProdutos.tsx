import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LinhaProduto from "./LinhaProduto";
import Modal            from "./Modal";
import { useServices } from "../../../hooks/useServices.ts";
import { Produto } from "../../../models/produto.model.ts";
import { useAuth } from "../../../contexts/AuthContext";

const TabelaProdutos = () => {
   
    const [modalAberto, setModalAberto] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const { empresaId: paramEmpresaId } = useParams<{ empresaId: string }>();

    const { isAuthenticated, empresaUuid: authEmpresaUuid } = useAuth();
    const currentEmpresaUuid = isAuthenticated ? authEmpresaUuid : paramEmpresaId;

    const { produtoService } = useServices();

    const carregarCatalogo = async () => {
        if (!currentEmpresaUuid) {
            console.warn("UUID da empresa não disponível para carregar o catálogo.");
            setProdutos([]);
            return;
        }
        try {
            const res = await produtoService.getProdutosByEmpresaUuid(currentEmpresaUuid);
            setProdutos(res.data);             
        } catch (err) {
            console.error("Erro ao carregar catálogo:", err);
            setProdutos([]);
        }
    };

    useEffect(() => {
        carregarCatalogo();
    }, [currentEmpresaUuid, produtoService, isAuthenticated]);

    return(
        <>
            <div className="relative">
                {isAuthenticated && currentEmpresaUuid === authEmpresaUuid && (
                    <div 
                        onClick={() => setModalAberto(true)} 
                        className="z-10 absolute right-[-16px] top-[-40px] bg-white mr-4 w-[15%] text-center text-[#A8201A] border-2  font-bold cursor-pointer hover:bg-[#A8201A] hover:text-white border-[#A8201A]  p-4 rounded-xl rounded-br-none">
                            CADASTRAR
                    </div>
                )}
                <div className="relative py-10 border-2 bg-white border-[#A8201A] overflow-hidden rounded-2xl">
                   
                    <div className=" overflow-hidden ">
                        <table className="w-full">
                            <thead className="font-bold text-md bg-stone-200">
                                <tr>
                                    <th className="p-4">Produto</th>
                                    <th className="p-4">Valor</th> {/* Added column */}
                                    <th className="p-4">Quantidade</th>
                                    <th className="p-4">Descrição</th> {/* Added column */}
                                    <th className="p-4">Ações</th> {/* Changed from "Detalhes do produto" to "Ações" */}
                                </tr>
                            </thead>

                            <tbody>
                                {produtos.map((produto: Produto, index: number) => (
                                    <LinhaProduto
                                        key={produto.uuid}
                                        produto={produto}
                                        par={index % 2 === 0}
                                        atualizarCatalogo={carregarCatalogo}
                                    />
                                ))}
                            </tbody>
                        </table>

                        {produtos.length === 0 &&
                            <h1 className="w-full py-5 text-center">Nenhum produto encontrado!</h1>
                        }
                    </div>
                </div>
            </div>
        
            <Modal 
                aberto={modalAberto} 
                fechar={() => setModalAberto(false)}
                atualizarCatalogo = {carregarCatalogo}
                empresaUuid={currentEmpresaUuid}
            />
        </>
    )
}

export default TabelaProdutos
