import {ProdutoPedidoResponseDTO} from "../../../models/produto-pedido.model.ts";

interface LinhaTabelaItensProps {
    produto: ProdutoPedidoResponseDTO;
    par: boolean;
}

const LinhaTabelaItens = ({produto, par}: LinhaTabelaItensProps) => {

    return(
        <tr className={`${par? "bg-white" : "bg-stone-100"} text-center text-md p-[30px]`}>
            {/* Removed UUID column as per Point 3 */}
            <td className="p-6">{produto?.nome}</td>
            <td className="p-6">{produto?.quantidade_pedida}</td>
            <td className="p-6">{produto?.unidade_medida}</td>
            <td className="p-6">{produto?.valor?.toFixed(2)}</td>
        </tr>
    )
}

export default LinhaTabelaItens
