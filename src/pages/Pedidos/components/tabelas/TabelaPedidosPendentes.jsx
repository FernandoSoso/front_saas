import LinhaPedidoPendente from "../linhas/LinhaPedidosPendentes"

const TabelaPedidosPendentes = ({pedidos, recarregarPedidos}) => {
    return(
      <div className="rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="font-bold text-md bg-stone-200">
                <tr>
                    <th className="p-4">Id</th>
                    <th className="p-4">Usuário</th>
                    <th className="p-4">Produtos</th>
                    <th className="p-4">Ações</th>
                    <th className="p-4">Detalhes do pedidos</th>
                </tr>
            </thead>

             <tbody>
                {pedidos.map((pedido, index) => (
                    <LinhaPedidoPendente
                        key={pedido.id}
                        pedido={pedido}
                        par={index % 2 === 0}
                        recarregarPedidos={recarregarPedidos}
                    />
                ))}
            </tbody>
        </table>
      </div>
    )
}

export default TabelaPedidosPendentes