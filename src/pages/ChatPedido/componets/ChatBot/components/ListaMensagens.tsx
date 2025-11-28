import {Mensagem} from "../../../../../models/mensagem.model.ts";
import {useEffect, useRef} from "react";

type Props = {
    mensagens: Mensagem[],
}

const ListaMensagens = ({mensagens}: Props) => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        scrollToBottom();
    }, [mensagens]);

    const isBot = (mensagem: Mensagem) => mensagem.role === 'model';

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mensagens.map((msg, index) => (
                <div key={index} className={`flex ${isBot(msg) ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-xs lg:max-w-md px-5 py-4 rounded-2xl shadow-2xl flex gap-2 flex-col ${isBot(msg) ? "bg-amber-600 font-semibold text-white rounded-bl-none" :
                        "bg-white text-black rounded-br-none"} ${msg['errored'] ? 'bg-red-300 text-red-600' : ''}
                `}>
                        <p className="text-sm whitespace-pre-line w-fit">{msg.content}</p>
                        {msg['loading'] && (
                            <div className="flex justify-end">
                                <div className=" rounded-bl-none rounded-2xl">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-[#A8201A] rounded-full animate-pulse"></div>
                                        <div
                                            className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse delay-100"></div>
                                        <div
                                            className="w-1.5 h-1.5 bg-[#A8201A] rounded-full animate-pulse delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef}/>
        </div>
    )
}

export default ListaMensagens
