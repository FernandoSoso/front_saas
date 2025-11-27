import LinhaTabelaItens from "./LinhaTabelaItens"

const TabelaItensPedido = ({produtos}) => {
    return(
        <div className="rounded-md overflow-hidden border-2 border-[#A8201A]">
          <table className="w-full">
            <thead className="font-bold text-md bg-stone-200">
                <tr>
                    <th className="p-4">Id</th>
                    <th className="p-4">Produto</th>
                    <th className="p-4">Quantidade</th>
                    <th className="p-4">Unidade medida</th>
                </tr>
            </thead>

             <tbody>
                {produtos.map((produto, index) => (
                    <LinhaTabelaItens
                        key={produto.id}
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