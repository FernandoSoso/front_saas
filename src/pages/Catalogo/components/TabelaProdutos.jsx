import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LinhaProduto from "./LinhaProduto";
import Modal from "./Modal";
import {listarCatalogo} from "../../../service/empresaService"

const TabelaProdutos = () => {
   
    const [modalAberto, setModalAberto] = useState(false)
    const [produtos, setProdutos] = useState([])
    const { empresaId } = useParams(); 

    const carregarCatalogo = async () => {
        try {
            const res = await listarCatalogo(empresaId); 
            setProdutos(res.data);             
        } catch (err) {
        
        }
    };

    useEffect(() => {
        carregarCatalogo();
    }, []);

    return(
        <>
            <div className="relative">
                <div 
                    onClick={() => setModalAberto(true)} 
                    className="z-10 absolute right-[-16px] top-[-40px] bg-white mr-4 w-[15%] text-center text-[#A8201A] border-2  font-bold cursor-pointer hover:bg-[#A8201A] hover:text-white border-[#A8201A]  p-4 rounded-xl rounded-br-none">
                        CADASTRAR
                </div>
                <div className="relative py-10 border-2 bg-white border-[#A8201A] overflow-hidden rounded-2xl">
                   
                    <div className=" overflow-hidden ">
                        <table className="w-full">
                            <thead className="font-bold text-md bg-stone-200">
                                <tr>
                                    <th className="p-4">Id</th>
                                    <th className="p-4">Produto</th>
                                    <th className="p-4">Quantidade</th>
                                    <th className="p-4">Detalhes do produto</th>
                                </tr>
                            </thead>

                            <tbody>
                                {produtos.map((produto, index) => (
                                    <LinhaProduto
                                        key={produto.id}
                                        produto={produto}
                                        par={index % 2 === 0}
                                    />
                                ))}
                            </tbody>
                        </table>

                        {produtos.length === 0 &&
                            <h1 className="w-full py-5 text-center">Nenhum produto encontrada!</h1>
                        }
                    </div>
                </div>
            </div>
        
            <Modal 
                aberto={modalAberto} 
                fechar={() => setModalAberto(false)}
                atualizarCatalogo = {() => carregarCatalogo()}
            />
        </>
    )
}

export default TabelaProdutos