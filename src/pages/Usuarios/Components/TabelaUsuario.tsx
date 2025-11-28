import { useEffect, useState } from "react";
import LinhaTabelaUsuario      from "./LinhaTabelaUsuario";
import { useParams }           from "react-router-dom";
import { useServices } from "../../../hooks/useServices";
import { Usuario } from "../../../models/usuario.model";
import AddUsuarioModal from "./AddUsuarioModal";
import { useAuth } from "../../../contexts/AuthContext";

const TabelaUsuario = () => {
    
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const { empresaId: paramEmpresaId } = useParams<{ empresaId: string }>();
    const [modalAberto, setModalAberto] = useState(false); // Declared modalAberto state

    const { isAuthenticated, empresaUuid: authEmpresaUuid } = useAuth();
    const currentEmpresaUuid = isAuthenticated ? authEmpresaUuid : paramEmpresaId;

    const { usuarioService } = useServices();

    const carregarUsuarios = async () => {
        if (!currentEmpresaUuid) {
            console.warn("UUID da empresa não disponível para carregar usuários.");
            setUsuarios([]);
            return;
        }
        try {
            const res = await usuarioService.getUsuariosByEmpresaUuid(currentEmpresaUuid);
            setUsuarios(res.data);             
        } catch (err) {
            console.error("Erro ao carregar usuários:", err);
            setUsuarios([]);
        }
    };
    
    useEffect(() => {
        carregarUsuarios();
    }, [currentEmpresaUuid, usuarioService, isAuthenticated]);

    return(
        <div className="relative">
            {isAuthenticated && currentEmpresaUuid === authEmpresaUuid && (
                <div 
                    onClick={() => setModalAberto(true)} 
                    className=" text-sm z-10 absolute right-[-16px] top-[-50px] bg-white mr-4 w-[15%] text-center text-[#A8201A] border-2  font-bold cursor-pointer hover:bg-[#A8201A] hover:text-white border-[#A8201A]  p-4 rounded-xl rounded-br-none">
                        ADICIONAR USUÁRIO
                </div>
            )}
            <div className="rounded-xl overflow-hidden  border-2 border-[#A8201A] py-10 bg-white">
                <table className="w-full">
                    <thead className="font-bold text-md bg-stone-200">
                        <tr>
                            <th className="p-4">Usuário</th>
                            <th className="p-4">E-mail</th>
                            <th className="p-4">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((usuario: Usuario, index: number) => (
                            <LinhaTabelaUsuario
                                key={usuario.uuid}
                                usuario={usuario}
                                par={index % 2 === 0}
                                showDelete={usuarios.length > 1}
                                recarregarUsuarios={carregarUsuarios}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {usuarios.length === 0 &&
                <h1 className="w-full py-5 text-center">Nenhum usuário encontrado!</h1>
            }

            <AddUsuarioModal 
                aberto={modalAberto} 
                fechar={() => setModalAberto(false)}
                atualizarUsuarios={carregarUsuarios}
                empresaUuid={currentEmpresaUuid}
            />
        </div>
    )
}

export default TabelaUsuario
