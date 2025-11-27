import { X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {cadastrarProduto} from "../../../service/empresaService"



const Modal = ({ aberto, fechar, atualizarCatalogo }) => {
  if (!aberto) return null;

  const { empresaId } = useParams(); 

  const [form, setForm] = useState({
    nome: "",
    quantidade: "",
    valor: "",
    unidade_medida: "",
    empresa_id : empresaId
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await cadastrarProduto(empresaId, form);

      await atualizarCatalogo();

      fechar();
    } catch (err) {
      console.log(err);
      fechar()
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] relative space-y-8">
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

            <label htmlFor="" className="ml-3 mb-3">Nome</label>
            <input onChange={handleChange}  type="text" name="nome" className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

            <label htmlFor="" className="ml-3 mb-3">Quantidade</label>
            <input onChange={handleChange} type="number" name="quantidade" className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

            <label htmlFor="" className="ml-3 mb-3">Preço (R$)</label>
            <input onChange={handleChange} type="number" name="valor" className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

            <label htmlFor="" className="ml-3 mb-3">Unidade de medida</label>
            <input onChange={handleChange} type="text" name="unidade_medida" className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>


            <button type="submit" className="text-white bg-[#A8201A] p-3 rounded-full mt-6 cursor-pointer hover:bg-[#470d0a]">Cadastrar</button>
                    
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
