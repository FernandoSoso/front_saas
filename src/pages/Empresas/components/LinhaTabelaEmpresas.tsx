import { useNavigate } from "react-router-dom"
import { Empresa } from "../../../models/empresa.model";

interface LinhaTabelaEmpresasProps {
    empresa: Empresa;
    par: boolean;
}

const LinhaTabelaEmpresas = ({empresa, par}: LinhaTabelaEmpresasProps) => {
    const navigate = useNavigate()

    return (
        <tr className={`${par? "bg-white" : "bg-stone-100"} text-start text-md p-[30px]`}>
            <td className="p-6 text-start">{empresa.nome}</td>
            <td className="p-6 text-start">{empresa.cnpj}</td>
            <td className="p-6 text-start">{empresa.descricao || "sem descrição"}</td>
            <td className="p-6 text-start">R$ {empresa.pedido_minimo?.toFixed(2) || '0.00'}</td> {/* Added Pedido Mínimo */}
            <td className="p-6 text-start">{empresa.endereco?.cidade || 'N/A'}</td> {/* Added Cidade */}
            <td onClick={() => navigate(`/${empresa.uuid}/catalogo`)} className="p-6 flex justify-start items-start">
                <p className="  hover:text-black hover:border-black cursor-pointer text-blue-900 border-2 font-bold border-blue-900 text-center h-10 rounded-full w-[70%] flex justify-center items-center">
                    Ver catálogo
                </p>
            </td>
        </tr>
    )
}

export default LinhaTabelaEmpresas
