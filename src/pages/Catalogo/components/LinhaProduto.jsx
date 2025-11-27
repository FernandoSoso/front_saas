import { useNavigate } from "react-router-dom";

const LinhaProduto = ({produto, par}) =>{
    const navigate = useNavigate()

    return(
        <tr className={`${par? "bg-white" : "bg-stone-100"} text-center text-md p-[30px]`}>
            <td className="p-6">{produto.id}</td>
            <td className="p-6">{produto.nome}</td>
            <td className="p-6">{produto.quantidade}</td>
            <td className="p-6 flex justify-center">
                <p onClick={() => navigate(`/produto/${produto.id}`)} className="hover:font-extrabold hover:text-black hover:border-black cursor-pointer text-blue-900 border-2 font-bold border-blue-900 p-3 rounded-full w-[40%]">Detalhes</p>
            </td>
        </tr>
    )
}

export default LinhaProduto;