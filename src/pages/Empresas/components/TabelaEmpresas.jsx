import { useEffect, useState } from "react";
import LinhaTabelaEmpresas from "./LinhaTabelaEmpresas";
import { listarEmpresas } from "../../../service/empresaService";

const TabelaEmpresas = () => {

    const [empresas, setEmpresas] = useState([])

    useEffect(() => {
        const carregar = async () => {
        try {
            const res = await listarEmpresas(); 
            setEmpresas(res.data);             
        } catch (err) {
        
        }
    };

        carregar();
    }, []);

    return(
        <div className="rounded-xl overflow-hidden  border-2 border-[#A8201A] text-start">
            <table className="w-full">
                <thead className="font-semibold text-md bg-stone-200 text-start">
                    <tr>
                        <th className="p-4 text-start">Id</th>
                        <th className="p-4 text-start">Empresa</th>
                        <th className="p-4 text-start">Cnpj</th>
                        <th className="p-4 text-start">Catálogo</th>
                    </tr>
                </thead>

                <tbody>
                    {empresas.map((empresa, index) => (
                        <LinhaTabelaEmpresas
                            key={empresa.id}
                            empresa={empresa}
                            par={index % 2 === 0}
                        />
                    ))}
                </tbody>
            </table>

            {empresas.length === 0 &&
             
                <h1 className="w-full py-5 text-center">Nenhuma empresa encontrada!</h1>

            }

        </div>
    )
}

export default TabelaEmpresas