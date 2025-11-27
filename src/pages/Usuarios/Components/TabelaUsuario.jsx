import { useEffect, useState } from "react";
import LinhaTabelaUsuario from "./LinhaTabelaUsuario";
import {listarUsuariosEmpresa} from "../../../service/usuarioService"
import { useParams } from "react-router-dom";

const TabelaUsuario = () => {
    
    const [usuarios, setUsuarios] = useState([])
    const { empresaId } = useParams(); 

    const carregarUsuarios = async () => {
            try {
                const res = await listarUsuariosEmpresa(empresaId); 
                setUsuarios(res.data);             
            } catch (err) {
            
            }
        };
    
        useEffect(() => {
            carregarUsuarios();
        }, []);

    return(
        <div className="relative">
            <div 
                onClick={() => setModalAberto(true)} 
                className=" text-sm z-10 absolute right-[-16px] top-[-50px] bg-white mr-4 w-[15%] text-center text-[#A8201A] border-2  font-bold cursor-pointer hover:bg-[#A8201A] hover:text-white border-[#A8201A]  p-4 rounded-xl rounded-br-none">
                    ADICIONAR USUÁRIO
            </div>
            <div className="rounded-xl overflow-hidden  border-2 border-[#A8201A] py-10 bg-white">
                <table className="w-full">
                    <thead className="font-semibold text-md bg-stone-200">
                        <tr>
                            <th className="p-4">Id</th>
                            <th className="p-4">Usuário</th>
                            <th className="p-4">E-mail</th>
                            <th className="p-4">Ações</th>
                            <th className="p-4">Detalhes do usuário</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <LinhaTabelaUsuario
                                key={usuario.id}
                                usuario={usuario}
                                par={index % 2 === 0}
                                recarregarUsuarios={carregarUsuarios}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TabelaUsuario