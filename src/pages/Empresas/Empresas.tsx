import Header from "../../components/Header.tsx"
import ListaEmpresas from "./components/ListaEmpresas.tsx" // Updated import

const Empresas = () => {

    return(
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full ">
            <Header/>
            <div className="  mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
                {/* Removed h1 here as it's now inside ListaEmpresas */}
                <ListaEmpresas />
            </div>
        </div>
    )
}

export default Empresas
