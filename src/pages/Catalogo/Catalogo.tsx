import Header from "../../components/Header.tsx"
import TabelaProdutos from "./components/TabelaProdutos" // Ensure this import points to the .tsx file

const Catalogo = () => {

    return(
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full ">
            <Header/>
            <div className="  mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
                <h1 className="font-semibold text-4xl">Catálogo da empresa</h1>
                <TabelaProdutos/>
            </div>
        </div>
    )
}

export default Catalogo
