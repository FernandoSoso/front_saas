import { useState } from "react";
import fundo from "../../assets/fundo.png";
import logo_sem_fundo from "../../assets/logo_sem_fundo.png";

const LoginCadastro = () => {
    const [aberto, setAberto] = useState(1)

    return (
        <div 
            className="w-screen h-screen bg-cover relative flex  justify-end overflow-hidden"
            style={{ backgroundImage: `url(${fundo})`}}    
        >
            <img src={logo_sem_fundo} alt="logo" className="absolute top-5 left-5 "/>
            <div className="text-md font-semibold flex flex-col justify-center">
                <div onClick={() => setAberto(1)} className={` rounded-2xl rounded-r-none p-3 ${aberto === 1? "bg-[#FEF7EA] text-black" : "cursor-pointer text-white hover:bg-black/30"}`}>
                    <h1 className="ml-2">Login</h1>
                </div>
                <div onClick={() => setAberto(2)}  className={`rounded-2xl rounded-r-none p-3 ${aberto === 2? "bg-[#FEF7EA] text-black" : "cursor-pointer text-white  hover:bg-black/30"}`}>
                    <h1 className="ml-2 ">Cadastro</h1>
                </div>
            </div>

            <div className="relative bg-[#FEF7EA] h-screen w-2/5 flex flex-col overflow-hidden justify-center items-start">
                <div 
                    className={
                        `${aberto === 2 ? "translate-y-0 " : "translate-y-[200%]"} absolute transform transition-all duration-300 ease-in-out
                            flex flex-col justify-center items-center w-full`
                    }>
                    <h1 className="text-2xl font-semibold mb-3">Cadastre-se</h1>
                    <h2 className="text-md mb-8">Crie sua conta e use todos os recursos da plataforma</h2>
                    <form action="" className="flex flex-col font-bold w-[60%]">
                        
                        <input type="hidden" name="tipo" value="cadastro" />
                        
                        <label htmlFor="" className="ml-3 mb-3">Nome completo</label>
                        <input type="text" name="nome" className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black"/>

                        <label htmlFor="" className="ml-3 mb-3">E-mail</label>
                        <input type="text" className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black" name="email"/>
                    
                        <label htmlFor="" className="ml-3 mb-3">Senha</label>
                        <input type="password" className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black" name="senha"/>
                    
                        <button type="submit" className="text-white bg-[#A8201A] p-3 rounded-full mt-6 cursor-pointer hover:bg-[#470d0a]">Cadastrar</button>
                    </form>
                    <div className="flex justify-start mt-3 space-x-2">
                        <p>Já tem uma conta?</p>
                        <p onClick={() => setAberto(1)} className="text-[#A8201A] cursor-pointer hover:underline">Acesse por aqui</p>
                    </div>
                </div>

                <div 
                    className={
                        `${aberto === 1 ? "translate-y-0 " : "translate-y-[-200%]"} absolute transform transition-all duration-300 ease-in-out
                            flex flex-col justify-center items-center w-full`
                    }>
                    <h1 className="text-2xl font-semibold mb-3">Acesse sua conta</h1>
                    <h2 className="text-md mb-8">Conecte-se e  monte o seu pedido</h2>
                    <form action="" className="flex flex-col font-bold w-[60%]">
        
                        <input type="hidden" name="tipo" value="login" />

                        <label htmlFor="" className="ml-3 mb-3">E-mail</label>
                        <input type="text" className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black" name="email"/>
                    
                        <label htmlFor="" className="ml-3 mb-3">Senha</label>
                        <input type="password" className="mb-4 rounded-xl select-none px-4 py-3 bg-white shadow border border-black" name="senha"/>
                    
                        <button type="submit" className="text-white bg-[#A8201A] p-3 rounded-full mt-6 cursor-pointer hover:bg-[#470d0a]">Entrar</button>
                    </form>
                    <div className="flex justify-start mt-3 space-x-2">
                        <p>Ainda não tem uma conta?</p>
                        <p onClick={() => setAberto(2)} className="text-[#A8201A] cursor-pointer hover:underline">Cadastre-se</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginCadastro