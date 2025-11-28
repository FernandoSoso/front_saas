import Header from "../../components/Header.tsx"
import TabelaEmpresaPedir from "./components/TabelaEmpresaPedir.tsx"

const SelecionarEmpresaPraPedir = () => {
    return(
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full ">
            <Header/>
            <div className="  mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
                <h1 className="font-semibold text-4xl">Selecione a empresa da qual deseja pedir</h1>
                <TabelaEmpresaPedir />
            </div>
        </div>
    )
}

export default SelecionarEmpresaPraPedir
