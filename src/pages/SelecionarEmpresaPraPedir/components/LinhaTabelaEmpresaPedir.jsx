import { useNavigate } from "react-router-dom"

const LinhaTabelaEmpresaPedir = ({empresa, par}) => {
    const navigate = useNavigate()

    return (
        <tr className={`${par? "bg-white" : "bg-stone-100"} text-start text-md p-[30px]`}>
            <td className="p-6 text-start">{empresa.id}</td>
            <td className="p-6 text-start">{empresa.nome}</td>
            <td className="p-6 text-start">{empresa.cnpj}</td>
            <td onClick={() => navigate(`/${empresa.id}/chat-pedido`)} className="p-6 flex justify-start items-start"><p className="  hover:text-black hover:border-black cursor-pointer text-blue-900 border-2 font-bold border-blue-900 text-center h-10 rounded-full w-[70%] flex justify-center items-center">Selecionar</p></td>
        </tr>
    )
}

export default LinhaTabelaEmpresaPedir