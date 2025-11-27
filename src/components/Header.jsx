import { useNavigate } from "react-router-dom"
import { ShoppingCart } from "lucide-react";
import logo from "../assets/logo.png";

const Header = () =>{
    const navigate = useNavigate();

    return(
        <header className="bg-stone-700 w-full h-[150px] relative top-0 flex items-end">
            <div className=" ml-[40px] bg-[#FEF7EA] w-[150px] h-[150px] rounded-full absolute flex justify-center items-center bottom-[-20px]">
                <div className="bg-[#A8201A] w-[110px] h-[110px] rounded-full text-center items-center flex justify-center">
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className="w-1/6 text-center"></div>
            <div className="flex gap-10 text-2xl text-white mb-[40px] w-4/6 justify-center">
                <p onClick={() => navigate("/")} className="hover:underline cursor-pointer">Página inicial</p>
                <p onClick={() => navigate("/pedir")} className="hover:underline cursor-pointer">Peça online</p>
                <p onClick={() => navigate("/usuarios")} className="hover:underline cursor-pointer">Usuários</p>
                <p onClick={() => navigate("/1/catalogo")} className="hover:underline cursor-pointer">Catálogo da empresa</p>
            </div>
            <div className="w-1/6  flex justify-end items-center">
                <div onClick={() => navigate("/login")} className="cursor-pointer px-5 hover:bg-red-900 flex justify-center items-center gap-1 text-2xl text-white mb-[30px] mr-[40px] bg-[#A8201A]  rounded-full px-2 py-2">
                    <p>Login</p>
                </div>
            </div>
        </header>
    )
}

export default Header