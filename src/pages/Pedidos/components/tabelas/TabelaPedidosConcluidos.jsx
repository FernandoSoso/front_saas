import LinhaPedidoConcluido from "../linhas/LinhaPedidoConcluido";


const TabelaPedidosConcluidos = ({pedidos}) => {

    return(
      <div className="rounded-md overflow-hidden">
        <table className="w-full">
            <thead className="font-semibold text-md bg-stone-200">
                <tr>
                    <th className="p-4">Id</th>
                    <th className="p-4">Usuário</th>
                    <th className="p-4">Produtos</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Detalhes do pedidos</th>
                </tr>
            </thead>

            <tbody>
                {pedidos.map((pedido, index) => (
                    <LinhaPedidoConcluido
                        key={pedido.id}
                        pedido={pedido}
                        par={index % 2 === 0}
                    />
                ))}
            </tbody>
        </table>
      </div>
    )
} 

export default TabelaPedidosConcluidos;