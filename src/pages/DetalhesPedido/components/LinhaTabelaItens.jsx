const LinhaTabelaItens = ({produto, par}) => {

    return(
        <tr className={`${par? "bg-white" : "bg-stone-100"} text-centertext-md p-[30px]`}>
            <td className="p-6">{produto?.id}</td>
            <td className="p-6">{produto?.nome}</td>
            <td className="p-6">{produto?.quantidade}</td>
            <td className="p-6">{produto?.unidade_medida}</td>
        </tr>
    )
}

export default LinhaTabelaItens