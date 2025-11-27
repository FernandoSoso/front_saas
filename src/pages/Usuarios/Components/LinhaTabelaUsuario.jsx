import {inativarUsuario} from "../../../service/usuarioService"

const LinhaTabelaUsuario = ({usuario, par, recarregarUsuarios}) => {


    return (
        <tr className={`${par? "bg-white" : "bg-stone-100"} text-centertext-md p-[30px]`}>
            <td className="p-6">{usuario.id}</td>
            <td className="p-6">{usuario.nome}</td>
            <td className="p-6">{usuario.email}</td>
            <td className="p-6 ">
                <p 
                    onClick={()=> {
                        inativarUsuario(usuario?.id)
                        recarregarUsuarios()
                    }}
                    className=" hover:bg-[#5c1911] cursor-pointer text-white font-bold bg-[#AF493E] rounded-full h-10 flex items-center justify-center">
                        Inativar usuário
                </p>
            </td>
            <td className="p-6 "><p className="mx-auto hover:font-extrabold hover:text-black hover:border-black cursor-pointer text-blue-900 border-2 font-bold border-blue-900 text-center h-10 rounded-full w-[70%] flex justify-center items-center">Ver detalhes</p></td>
        </tr>
    )
}

export default LinhaTabelaUsuario