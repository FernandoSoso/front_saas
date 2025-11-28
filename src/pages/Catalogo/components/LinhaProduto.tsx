import { useNavigate } from "react-router-dom";
import { Produto } from "../../../models/produto.model";
import { useServices } from "../../../hooks/useServices";

interface LinhaProdutoProps {
    produto: Produto;
    par: boolean;
    atualizarCatalogo: () => void;
}

const LinhaProduto = ({produto, par, atualizarCatalogo}: LinhaProdutoProps) =>{
    const navigate = useNavigate();
    const { produtoService } = useServices();

    const handleDelete = async () => {
        if (produto.uuid && window.confirm(`Tem certeza que deseja deletar o produto ${produto.nome}?`)) {
            try {
                await produtoService.deleteProduto(produto.uuid);
                alert("Produto deletado com sucesso!");
                atualizarCatalogo();
            } catch (error) {
                console.error("Erro ao deletar produto:", error);
                alert("Erro ao deletar produto.");
            }
        }
    };

    return(
        <tr className={`${par? "bg-white" : "bg-stone-100"} text-center text-md p-[30px]`}>
            <td className="p-6">{produto.nome}</td>
            <td className="p-6">R$ {produto.valor?.toFixed(2)}</td> {/* Added Valor */}
            <td className="p-6">{produto.quantidade} {produto.unidade_medida}</td>
            <td className="p-6">{produto.descricao || 'Sem descrição'}</td> {/* Added Descrição */}
            <td className="p-6 flex justify-center space-x-4">
                <p onClick={() => navigate(`/produto/${produto.uuid}`)} className="hover:font-extrabold hover:text-black hover:border-black cursor-pointer text-blue-900 border-2 font-bold border-blue-900 p-3 rounded-fullw-fit">Detalhes</p>
                <p onClick={handleDelete} className="hover:font-extrabold hover:text-white hover:bg-red-700 cursor-pointer text-red-600 border-2 font-bold border-red-600 p-3 rounded-full w-fit">Deletar</p>
            </td>
        </tr>
    )
}

export default LinhaProduto;
