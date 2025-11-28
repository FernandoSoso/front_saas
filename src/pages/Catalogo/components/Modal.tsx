import {X}                from "lucide-react";
import {useState}         from "react";
import {useServices}      from "../../../hooks/useServices.ts";
import { ProdutoCreateDTO } from "../../../models/produto-create.model.ts";

interface ModalProps {
    aberto: boolean;
    fechar: () => void;
    atualizarCatalogo: () => void;
    empresaUuid: string | undefined;
}

const Modal = ({aberto, fechar, atualizarCatalogo, empresaUuid}: ModalProps) => {
    const { produtoService } = useServices();

    const [form, setForm] = useState<ProdutoCreateDTO>({
        nome: "",
        quantidade: 0,
        valor: 0,
        unidade_medida: "",
        empresa_uuid: empresaUuid || "",
        descricao: "",
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
            await produtoService.createProduto({ ...form, empresa_uuid: empresaUuid });
            alert("Produto cadastrado com sucesso!");
            atualizarCatalogo ();
            fechar ();
        } catch (err) {
            console.error("Erro ao cadastrar produto:", err);
            alert("Erro ao cadastrar produto.");
            fechar ();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50" onClick={fechar}>
            <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] relative space-y-8" onClick={(e) => e.stopPropagation()}>
                <div className="">
                    <button
                        className="absolute top-2 right-3 text-xl font-bold hover:bg-stone-500 cursor-pointer p-2  rounded-full"
                        onClick={fechar}
                    >
                        <X size={20}/>
                    </button>
                    <h1 className="w-full text-center text-xl font-semibold">Cadastrar novo produto</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col">

                        <label htmlFor="nome" className="ml-3 mb-3">Nome</label>
                        <input onChange={handleChange} type="text" name="nome" id="nome" value={form.nome}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"
                               placeholder="Picanha Premium" required/>

                        <label htmlFor="valor" className="ml-3 mb-3">Preço (R$)</label>
                        <input onChange={handleChange} type="number" name="valor" id="valor" value={form.valor}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"
                               placeholder="89.90" required/>

                        <label htmlFor="quantidade" className="ml-3 mb-3">Quantidade</label>
                        <input onChange={handleChange} type="number" name="quantidade" id="quantidade" value={form.quantidade}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"
                               placeholder="100.0" required/>

                        <label htmlFor="unidade_medida" className="ml-3 mb-3">Unidade de medida</label>
                        <input onChange={handleChange} type="text" name="unidade_medida" id="unidade_medida" value={form.unidade_medida}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"
                               placeholder="kg" required/>

                        <label htmlFor="descricao" className="ml-3 mb-3">Descrição (Opcional)</label>
                        <textarea onChange={handleChange} name="descricao" id="descricao" value={form.descricao || ''}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"
                               placeholder="Corte nobre de picanha, ideal para churrasco."/>


                        <button type="submit"
                                className="text-white bg-[#A8201A] p-3 rounded-full mt-6 cursor-pointer hover:bg-[#470d0a]">Cadastrar
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
