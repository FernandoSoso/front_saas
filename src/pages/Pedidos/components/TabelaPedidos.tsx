import { useEffect, useState } from "react"
import TabelaPedidosConcluidos from "./tabelas/TabelaPedidosConcluidos"
import TabelaPedidosPendentes from "./tabelas/TabelaPedidosPendentes"
import { useServices } from "../../../hooks/useServices";
import { Pedido } from "../../../models/pedido.model";
// import { StatusPedidoEnum } from "../../../models/status-pedido.enum"; // Removed import
import { useAuth } from "../../../contexts/AuthContext";

const TabelaPedidos = () => {
    const [aberto, setAberto] = useState(1) 
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    const { isAuthenticated, empresaUuid } = useAuth();
    const { pedidoService } = useServices();

    const carregarPedidos = async () => {
        if (!isAuthenticated || !empresaUuid) {
            console.warn("Usuário não autenticado ou UUID da empresa não disponível. Não é possível carregar pedidos.");
            setPedidos([]);
            return;
        }
        try {
            const res = await pedidoService.getPedidosByEmpresaUuid(empresaUuid);
            setPedidos(res.data);             
        } catch (err) {
            console.error("Erro ao carregar pedidos:", err);
            setPedidos([]);
        }
    };

    useEffect(() =>{
        carregarPedidos();
    }, [pedidoService, isAuthenticated, empresaUuid]);

    // Updated filtering logic to use string literals
    const pendentes = pedidos.filter(p => p.status !== "CONCLUIDO" && p.status !== "CANCELADO");
    const concluidos = pedidos.filter(p => p.status === "CONCLUIDO");

    return (
        <div className="relative">
            <div className="flex font-extrabold text-xl  ml-6 ">
                <div 
                    onClick={() => setAberto(1)} 
                    className={`${aberto === 1? "bg-white  p-4 border-2 border-b-0 z-30" : "cursor-pointer hover:bg-stone-400 bg-stone-200 translate-y-[5px] z-10"} relative translate-y-[2px] border-[#A8201A]  p-4 rounded-xl rounded-b-none`}>
                        PENDENTES
                </div>
                <div 
                    onClick={() => setAberto(2)} 
                    className={`${aberto === 2? "bg-white translate-y-0 border-2  border-b-0 z-30" : "cursor-pointer hover:bg-stone-400 bg-stone-200 translate-y-[5px] z-10"} relative translate-y-[2px] border-[#A8201A] p-4 rounded-xl rounded-b-none`}>
                        CONCLUÍDOS
                </div>
            </div>
            <div className="relative rounded-xl overflow-hidden border-2 border-[#A8201A] bg-white p-3 z-20">
                {aberto === 1?  
                    <TabelaPedidosPendentes 
                        pedidos={pendentes}
                        recarregarPedidos={carregarPedidos}
                    /> : 
                    <TabelaPedidosConcluidos 
                        pedidos={concluidos}
                        recarregarPedidos={carregarPedidos}    
                    />
                }

                {(
                    (pendentes.length === 0 && aberto === 1) ||
                    (concluidos.length === 0 && aberto === 2)
                ) && (
                    <h1 className="w-full py-5 text-center">Nenhum pedido encontrado!</h1>
                )}

            </div>
        </div>
    )
}

export default TabelaPedidos
