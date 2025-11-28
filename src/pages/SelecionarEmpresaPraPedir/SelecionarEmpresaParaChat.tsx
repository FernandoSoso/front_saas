import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useServices } from '../../hooks/useServices';
import { Empresa } from '../../models/empresa.model';
import { useNavigate } from 'react-router-dom';

interface EmpresaChatCardProps {
  empresa: Empresa;
  onSelect: (uuid: string) => void;
}

const EmpresaChatCard: React.FC<EmpresaChatCardProps> = ({ empresa, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => empresa.uuid && onSelect(empresa.uuid)}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#A8201A] mb-2">{empresa.nome}</h2>
        <p className="text-gray-700 mb-1"><strong>CNPJ:</strong> {empresa.cnpj}</p>
        <p className="text-gray-700 mb-4"><strong>Descrição:</strong> {empresa.descricao || "sem descrição"}</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click from firing again
            empresa.uuid && onSelect(empresa.uuid);
          }}
          className="w-full bg-blue-900 text-white font-bold py-3 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300"
        >
          Acompanhar Pedido
        </button>
      </div>
    </div>
  );
};

const SelecionarEmpresaParaChat = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { empresaService } = useServices();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const res = await empresaService.getEmpresas();
        setEmpresas(res.data);
      } catch (err) {
        console.error("Erro ao carregar empresas:", err);
        setError("Não foi possível carregar as empresas.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresas();
  }, [empresaService]);

  const handleSelectEmpresa = (uuid: string) => {
    navigate(`/chat-pedido/${uuid}?isConsulta=true`);
  };

  if (loading) {
    return (
      <div className="bg-[#FEF7EA] w-full min-h-screen h-full">
        <Header />
        <div className="mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
          <h1 className="font-semibold text-4xl">Carregando Empresas...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FEF7EA] w-full min-h-screen h-full">
        <Header />
        <div className="mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
          <h1 className="font-semibold text-4xl text-red-600">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FEF7EA] w-full min-h-screen h-full">
      <Header />
      <div className="mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
        <h1 className="font-semibold text-4xl text-gray-800">Selecione a Empresa para Acompanhar o Pedido</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {empresas.length > 0 ? (
            empresas.map((empresa) => (
              <EmpresaChatCard key={empresa.uuid} empresa={empresa} onSelect={handleSelectEmpresa} />
            ))
          ) : (
            <h1 className="w-full py-5 text-center text-xl text-gray-600 col-span-full">Nenhuma empresa encontrada!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelecionarEmpresaParaChat;
