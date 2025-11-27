import { useState } from "react"

const ChatBox = ({onEnviarMensagem, desabilitado}) =>{
    const [mensagem, setMensagem] = useState("")
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        onEnviarMensagem(mensagem);
        setMensagem("");
    }

    return(
        <div className=" rounded-full bg-white p-4 shadow-xl mb-6 mx-3">
            <form className="flex space-x-3" onSubmit={handleSubmit}>
                <input 
                    placeholder="Digite sua mensagem..." 
                    className="outline-none flex-1 px-5 py-3bg-[#FEF7EA] placeholder:text-stone-500"
                    value={mensagem}
                    onChange={(e) => {setMensagem(e.target.value)}}
                    disabled={desabilitado}
                />
                <button 
                    type="submit"
                    disabled={desabilitado} 
                    className="cursor-pointer hover:bg-[#50100c] px-8 py-3 text-xl bg-[#A8201A] rounded-3xl text-white disabled:opacity-50 disabled:cursor-not-allowed">Enviar</button>
            </form>
        </div>
    )
}

export default ChatBox