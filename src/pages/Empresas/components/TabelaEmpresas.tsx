import {useEffect, useState} from "react";
import LinhaTabelaEmpresas   from "./LinhaTabelaEmpresas";
import {useServices}         from "../../../hooks/useServices.ts";
import { Empresa } from "../../../models/empresa.model.ts";

const TabelaEmpresas = () => {
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
        <div className="rounded-xl overflow-hidden  border-2 border-[#A8201A] text-start">
            <table className="w-full">
                <thead className="font-semibold text-md bg-stone-200 text-start">
                <tr>
                    <th className="p-4 text-start">Empresa</th>
                    <th className="p-4 text-start">Cnpj</th>
                    <th className="p-4 text-start">Descrição</th>
                    <th className="p-4 text-start">Pedido Mínimo</th> {/* Added column */}
                    <th className="p-4 text-start">Cidade</th> {/* Added column */}
                    <th className="p-4 text-start">Catálogo</th>
                </tr>
                </thead>

                <tbody>
                {empresas.map ((empresa: Empresa, index: number) => (
                    <LinhaTabelaEmpresas
                        key={empresa.uuid}
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
