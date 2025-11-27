import Header from "../../components/Header";
import TabelaUsuario from "./Components/TabelaUsuario";

const Usuarios = () => {
    return(
        <div className="bg-[#FEF7EA] w-full min-h-screen h-full ">
            <Header/>
            <div className="  mx-[100px] mt-[50px] space-y-[50px] pb-[40px]">
                <h1 className="font-semibold text-4xl">Usuários</h1>
                <TabelaUsuario />
            </div>
        </div>
    )
}

export default Usuarios;