import LinhaTabelaEmpresaPedir from "./LinhaTabelaEmpresaPedir";

const TabelaEmpresaPedir = () => {
    const empresas = [
    {
        id: 1,
        nome: "Açougue Boi Forte",
        cnpj: "12.345.678/0001-90"
    },
    {
        id: 2,
        nome: "Premium Carnes RS",
        cnpj: "45.987.321/0001-12"
    },
    {
        id: 3,
        nome: "Frigorífico São Carlos",
        cnpj: "33.112.569/0001-44"
    },
    {
        id: 4,
        nome: "Carnes do Vale",
        cnpj: "09.876.543/0001-00"
    },
    {
        id: 5,
        nome: "Casa de Carne União",
        cnpj: "77.654.321/0001-55"
    },
    {
        id: 6,
        nome: "Butcher House",
        cnpj: "28.999.113/0001-81"
    },
    {
        id: 7,
        nome: "Frigorífico Mata Sul",
        cnpj: "66.200.458/0001-07"
    },
    {
        id: 8,
        nome: "Carne & Cia",
        cnpj: "81.540.777/0001-33"
    }
    ];

    return(
        <div className="rounded-xl overflow-hidden  border-2 border-[#A8201A] text-start">
            <table className="w-full">
                <thead className="font-semibold text-md bg-stone-200 text-start">
                    <tr>
                        <th className="p-4 text-start">Id</th>
                        <th className="p-4 text-start">Empresa</th>
                        <th className="p-4 text-start">Cnpj</th>
                        <th className="p-4 text-start">Selecionar</th>
                    </tr>
                </thead>

                <tbody>
                    {empresas.map((empresa, index) => (
                        <LinhaTabelaEmpresaPedir
                            key={empresa.id}
                            empresa={empresa}
                            par={index % 2 === 0}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TabelaEmpresaPedir