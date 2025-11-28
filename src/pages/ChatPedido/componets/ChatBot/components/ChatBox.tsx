import { useState } from "react";
import { toast } from "sonner";
import * as React from "react";

interface ChatBoxProps {
    onEnviarMensagem: (mensagem: string) => void;
    disabled: boolean;
}

const ChatBox = ({ onEnviarMensagem, disabled }: ChatBoxProps) => {
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!mensagem.trim()) return;

        try {
            onEnviarMensagem(mensagem);
        } catch (error) {
            toast.error("Falha ao enviar mensagem. Tente novamente.");
            console.error("Falha ao enviar mensagem:", error);
            // Aqui você pode exibir uma notificação de erro para o usuário
        } finally {
            setMensagem("");
        }
    }

    return(
        <div className=" rounded-full bg-white p-4 shadow-xl mb-6 mx-3">
            <form className="flex space-x-3" onSubmit={handleSubmit}>
                <input 
                    placeholder="Digite sua mensagem..." 
                    className="outline-none flex-1 px-5 py-3bg-[#FEF7EA] placeholder:text-stone-500"
                    value={mensagem}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setMensagem(e.target.value)}}
                    disabled={disabled}
                />
                <button 
                    type="submit"
                    disabled={disabled}
                    className="cursor-pointer hover:bg-[#50100c] px-8 py-3 text-xl bg-[#A8201A] rounded-3xl text-white disabled:opacity-50 disabled:cursor-not-allowed">Enviar</button>
            </form>
        </div>
    )
}

export default ChatBox
