import { MapPinned, Star } from "lucide-react";
import cozinheiro from "../../../assets/cozinheiro.png";
import JonPork from "../../../assets/JonPork.jpg";
import { useNavigate } from "react-router-dom";


const ParteInicial = () =>{
    const navigate = useNavigate()

    return (
        <div className="flex gap-[50px] relative">
            <div className="space-y-5 w-4/5">
                <div className="text-4xl flex gap-5 font-semibold">
                    <h1 className="text-white bg-gradient-to-t from-orange-500 to-[#A8201A] rounded-xl py-1 px-2 rotate-[-11deg]">N°1</h1>
                     <h1>Em produtos cárneos!</h1>
                </div>
                <h2 className="text-4xl font-semibold">
                    Faça seus pedidos do jeito certo — rápido, fácil e sem erros.
                </h2>
                <p className="text-xl">
                    Monte pedidos personalizados, veja preços, consulte disponibilidade e acompanhe todas as etapas do seu pedido em um só lugar.               
                </p>
    
                <div onClick={() => navigate("/pedir")} className="font-semibold w-[130px] cursor-pointer hover:bg-red-900 flex justify-center items-center gap-1 text-md text-white mb-[30px] bg-[#A8201A]  rounded-full px-2 py-2">
                    <p>Peça agora!</p>
                </div>           
            </div>

            <div className="w-2/3 rounded-3xl rounded-br-none rounded-tr-none bg-orange-500 relative overflow-hidden">
                <img src={cozinheiro} alt="cozinheiro" className="h-full object-cover  absolute bottom-0 "/>
            </div>

            <div className="bg-white rounded-2xl w-[200px] h-[50px] flex justify-between items-center absolute right-[-80px] bottom-[20px]">
                <img src={JonPork} alt="Jon-Pork" className="ml-2 rounded-full object-cover h-[80%] "/>
                <div className="mr-[20px]">
                    <h1 className="text-md font-bold">Jon Pork</h1>
                    <div className="flex text-sm items-center gap-2">
                        <Star size={14} fill="black"/>
                        <h2>9.9</h2>
                        <p>"Excelente!"</p>
                    </div>
                </div>
            </div>

            <div className="font-bold cursor-pointer hover:bg-stone-400 bg-white rounded-2xl w-[130px] h-[40px] flex justify-around items-center absolute right-[440px] top-[10px]">
                <MapPinned color="#DD7B04" size={20}/>
                <h1>Localização</h1>
            </div>
        </div>
    )
}

export default ParteInicial