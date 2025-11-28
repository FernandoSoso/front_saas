import {X}           from "lucide-react";
import {useState, useEffect}    from "react";
import { useServices } from "../../../hooks/useServices";
import { Produto } from "../../../models/produto.model";
import { ProdutoUpdateDTO } from "../../../models/produto-update.model";

interface EditModalProps {
    aberto: boolean;
    fechar: () => void;
    produto: Produto;
    recarregarProduto: () => void;
}

const EditModal = ({aberto, fechar, produto, recarregarProduto}: EditModalProps) => {
    const { produtoService } = useServices();

    const [form, setForm] = useState<ProdutoUpdateDTO>({
        nome: produto.nome,
        quantidade: produto.quantidade,
        valor: produto.valor,
        unidade_medida: produto.unidade_medida,
        descricao: produto.descricao,
    });

    useEffect(() => {
        setForm({
            nome: produto.nome,
            quantidade: produto.quantidade,
            valor: produto.valor,
            unidade_medida: produto.unidade_medida,
            descricao: produto.descricao,
        });
    }, [produto]);

    if (!aberto) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault ();

        if (!produto.uuid) {
            console.error("UUID do produto não fornecido para atualização.");
            return;
        }

        try {
            await produtoService.updateProduto(produto.uuid, form);
            alert("Produto atualizado com sucesso!");
            await recarregarProduto ();
            fechar ();
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
            alert("Erro ao atualizar produto.");
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
                    <h1 className="w-full text-center text-xl font-semibold">Editar produto</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="flex flex-col">

                        <label htmlFor="nome" className="ml-3 mb-3">Nome</label>
                        <input onChange={handleChange} value={form.nome || ''} type="text" name="nome" id="nome"
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

                        <label htmlFor="quantidade" className="ml-3 mb-3">Quantidade</label>
                        <input onChange={handleChange} value={form.quantidade || ''} type="number" name="quantidade" id="quantidade"
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

                        <label htmlFor="valor" className="ml-3 mb-3">Preço (R$)</label>
                        <input onChange={handleChange} value={form.valor || ''} type="number" name="valor" id="valor"
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

                        <label htmlFor="unidade_medida" className="ml-3 mb-3">Unidade de medida</label>
                        <input onChange={handleChange} value={form.unidade_medida || ''} type="text" name="unidade_medida" id="unidade_medida"
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

                        <label htmlFor="descricao" className="ml-3 mb-3">Descrição (Opcional)</label>
                        <textarea onChange={handleChange} name="descricao" id="descricao" value={form.descricao || ''}
                               className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>


                        <button type="submit"
                                className="text-white bg-[#A8201A] p-3 rounded-full mt-6 cursor-pointer hover:bg-[#470d0a]">Editar
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
