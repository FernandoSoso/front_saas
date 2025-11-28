import { useNavigate } from "react-router-dom";
import { useServices } from "../../../hooks/useServices";
import { Usuario } from "../../../models/usuario.model";

interface LinhaTabelaUsuarioProps {
    usuario: Usuario;
    par: boolean;
    recarregarUsuarios: () => void;
    showDelete: boolean;
}

const LinhaTabelaUsuario = ({usuario, par, recarregarUsuarios, showDelete}: LinhaTabelaUsuarioProps) => {
    const navigate = useNavigate();
    const { usuarioService } = useServices();

    const handleDelete = async () => {
        if (usuario.uuid && window.confirm(`Tem certeza que deseja deletar o usuário ${usuario.nome}?`)) {
            try {
                await usuarioService.deleteUsuario(usuario.uuid);
                alert("Usuário deletado com sucesso!");
                recarregarUsuarios();
            } catch (error) {
                console.error("Erro ao deletar usuário:", error);
                alert("Erro ao deletar usuário.");
            }
        }
    };

    return (
        <tr className={`${par? "bg-white" : "bg-stone-100"} text-center text-md p-[30px]`}>
            {/* Removed UUID column as per Point 3 */}
            <td className="p-6">{usuario.nome}</td>
            <td className="p-6">{usuario.email}</td>
            <td className="p-6 flex justify-center space-x-4">

                {showDelete ? <p
                    onClick={handleDelete}
                    className=" hover:bg-[#5c1911] cursor-pointer text-white font-bold bg-[#AF493E] rounded-full h-10 flex items-center justify-center w-[70%]">
                        Deletar usuário
                </p> : <p>sem ações</p>}
            </td>
        </tr>
    )
}

export default LinhaTabelaUsuario
