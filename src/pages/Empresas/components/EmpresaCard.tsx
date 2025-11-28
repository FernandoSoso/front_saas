import React from 'react';
import { Empresa } from '../../../models/empresa.model';
import { useNavigate } from 'react-router-dom';

interface EmpresaCardProps {
  empresa: Empresa;
}

const EmpresaCard: React.FC<EmpresaCardProps> = ({ empresa }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#A8201A] mb-2">{empresa.nome}</h2>
        <p className="text-gray-700 mb-1"><strong>CNPJ:</strong> {empresa.cnpj}</p>
        <p className="text-gray-700 mb-1"><strong>Descrição:</strong> {empresa.descricao || "sem descrição"}</p>
        <p className="text-gray-700 mb-1"><strong>Pedido Mínimo:</strong> R$ {empresa.pedido_minimo?.toFixed(2) || '0.00'}</p>
        <p className="text-gray-700 mb-4"><strong>Localização:</strong> {empresa.endereco?.cidade || 'N/A'} - {empresa.endereco?.estado || 'N/A'}</p>
        
        <button
          onClick={() => navigate(`/${empresa.uuid}/catalogo`)}
          className="w-full bg-red-900 text-white font-bold py-3 px-4 rounded-full cursor-pointer hover:bg-red-700 transition-colors duration-300"
        >
          Ver Catálogo
        </button>
      </div>
    </div>
  );
};

export default EmpresaCard;
