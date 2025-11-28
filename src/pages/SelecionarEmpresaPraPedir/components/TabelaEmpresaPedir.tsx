import {useEffect, useState} from "react";
import {useServices} from "../../../hooks/useServices.ts";
import {Empresa} from "../../../models/empresa.model.ts";
import {Building, ChevronRight} from "lucide-react";
import {useNavigate} from "react-router-dom";

const TabelaEmpresaPedir = () => {
    const [empresas, setEmpresas] = useState<Empresa[]>([])
    const navigate = useNavigate()

    const {empresaService} = useServices();

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const res = await empresaService.getEmpresas();
                setEmpresas(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchEmpresas().then();
    }, [empresaService]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {empresas.map((empresa) => (
                <div
                    key={empresa.uuid}
                    className="bg-white rounded-xl border border-stone-200 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                    <div className="p-6 flex-grow">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-orange-100 p-3 rounded-full">
                                <Building className="text-red-500" size={24}/>
                            </div>
                            <h3 className="text-2xl font-bold text-stone-800">{empresa.nome}</h3>
                        </div>
                        <p className="text-stone-500">CNPJ: {empresa.cnpj}</p>
                    </div>
                    <button
                        onClick={() => navigate(`/chat-pedido/${empresa.uuid}?isConsulta=false`)}
                        className="bg-red-500 cursor-pointer text-white font-bold py-3 px-6 rounded-b-xl hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        Fazer Pedido <ChevronRight size={20}/>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TabelaEmpresaPedir
