import Header from "../../components/Header.tsx"
import TabelaPedidos from "./components/TabelaPedidos" // Ensure this import points to the .tsx file

const Pedidos = () => {

    return(
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full ">
            <Header/>
            <div className="  mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
                <h1 className="font-semibold text-4xl">Pedidos</h1>
                <TabelaPedidos />
            </div>
        </div>
    )
}

export default Pedidos
