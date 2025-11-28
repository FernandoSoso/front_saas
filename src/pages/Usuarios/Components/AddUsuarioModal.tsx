import {X}                from "lucide-react";
import {useState}         from "react";
import {useServices}      from "../../../hooks/useServices.ts";
import { UsuarioCreateDTO } from "../../../models/usuario-create.model.ts";

interface AddUsuarioModalProps {
    aberto: boolean;
    fechar: () => void;
    atualizarUsuarios: () => void;
    empresaUuid: string | undefined;
}

const AddUsuarioModal = ({aberto, fechar, atualizarUsuarios, empresaUuid}: AddUsuarioModalProps) => {
    const { usuarioService } = useServices();

    const [form, setForm] = useState<UsuarioCreateDTO>({
        nome: "",
        email: "",
        senha: "",
        empresa_uuid: empresaUuid || "",
    });

    if (!aberto) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault ();

        if (!empresaUuid) {
            console.error("UUID da empresa não fornecido.");
            return;
        }

        try {
            await usuarioService.createUsuario({ ...form, empresa_uuid: empresaUuid });
            alert("Usuário cadastrado com sucesso!");
            atualizarUsuarios ();
            fechar ();
        } catch (err) {
            console.error("Erro ao cadastrar usuário:", err);
            alert("Erro ao cadastrar usuário.");
            fechar ()
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50" onClick={fechar}> {/* Added onClick to backdrop */}
            <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] relative space-y-8" onClick={(e) => e.stopPropagation()}> {/* Added stopPropagation to modal content */}
                <div className="">
                    <button
                        className="absolute top-2 right-3 text-xl font-bold hover:bg-stone-500 cursor-pointer p-2  rounded-full"
                        onClick={fechar}
                    >
                        <X size={20}/>
                    </button>
                    <h1 className="w-full text-center text-xl font-semibold">Cadastrar novo usuário</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col">

                        <label htmlFor="nome" className="ml-3 mb-3">Nome</label>
                        <input onChange={handleChange} type="text" name="nome" id="nome" value={form.nome}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

                        <label htmlFor="email" className="ml-3 mb-3">E-mail</label>
                        <input onChange={handleChange} type="email" name="email" id="email" value={form.email}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

                        <label htmlFor="senha" className="ml-3 mb-3">Senha</label>
                        <input onChange={handleChange} type="password" name="senha" id="senha" value={form.senha}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

                        <button type="submit"
                                className="text-white bg-[#A8201A] p-3 rounded-full mt-6 cursor-pointer hover:bg-[#470d0a]">Cadastrar
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUsuarioModal;
