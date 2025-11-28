import LinhaTabelaItens from "./LinhaTabelaItens"
import {ProdutoPedidoResponseDTO} from "../../../models/produto-pedido.model.ts";

interface TabelaItensPedidoProps {
    produtos: ProdutoPedidoResponseDTO[] | undefined;
}

const TabelaItensPedido = ({produtos}: TabelaItensPedidoProps) => {
    if (!produtos) {
        return <h1 className="w-full py-5 text-center">Nenhum item encontrado para este pedido!</h1>;
    }

    return(
        <div className="rounded-md overflow-hidden border-2 border-[#A8201A]">
          <table className="w-full">
            <thead className="font-bold text-md bg-stone-200">
                <tr>
                    {/* Removed UUID column header as per Point 3 */}
                    <th className="p-4">Produto</th>
                    <th className="p-4">Quantidade Pedida</th>
                    <th className="p-4">Unidade medida</th>
                    <th className="p-4">Valor Unitário</th>
                </tr>
            </thead>

             <tbody>
                {produtos.map((produto: ProdutoPedidoResponseDTO, index: number) => (
                    <LinhaTabelaItens
                        key={produto.uuid}
                        produto={produto}
                        par={index % 2 === 0}
                    />
                ))}
            </tbody>
        </table>
      </div>
    )
}

export default TabelaItensPedido
