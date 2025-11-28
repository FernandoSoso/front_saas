import {useEffect, useState} from "react";
import {useServices}         from "../../../hooks/useServices.ts";
import { Empresa } from "../../../models/empresa.model.ts";
import EmpresaCard from "./EmpresaCard.tsx"; // Import the new EmpresaCard component

const ListaEmpresas = () => { // Renamed from TabelaEmpresas
    const [empresas, setEmpresas] = useState<Empresa[]> ([]);

    const {empresaService} = useServices ();

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const res = await empresaService.getEmpresas();
                setEmpresas(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchEmpresas().then();
    }, [empresaService]);


    return (
        <div className="space-y-[50px]">
            <h1 className="font-semibold text-4xl text-gray-800">Empresas Parceiras</h1> {/* Styled title */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Grid layout for cards */}
                {empresas.length > 0 ? (
                    empresas.map ((empresa: Empresa) => (
                        <EmpresaCard
                            key={empresa.uuid}
                            empresa={empresa}
                        />
                    ))
                ) : (
                    <h1 className="w-full py-5 text-center text-xl text-gray-600 col-span-full">Nenhuma empresa encontrada!</h1>
                )}
            </div>
        </div>
    )
}

export default ListaEmpresas
