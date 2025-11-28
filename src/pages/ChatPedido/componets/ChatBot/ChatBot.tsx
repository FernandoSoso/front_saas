import {useState, useEffect} from "react"
import ListaMensagens from "./components/ListaMensagens.tsx"
import ChatBox from "./components/ChatBox"
import {toast} from "sonner";
import {useServices} from "../../../../hooks/useServices.ts";
import {Mensagem, MensagemRequestDTO, MensagemRole} from "../../../../models/mensagem.model.ts";
import {Pedido} from "../../../../models/pedido.model.ts";

interface ChatBotProps {
    pedido?: Pedido;
    onReceivePedido: (pedido?: Pedido) => void;
    empresaUuid?: string;
    initialMessage?: string; // New prop for initial message
}

const ChatBot = ({pedido, onReceivePedido, empresaUuid, initialMessage}: ChatBotProps) => {
    const [loading, setLoading] = useState(false);

    const [mensagens, setMensagens] = useState<Mensagem[]>([
        {
            content: initialMessage,
            role: MensagemRole.MODEL
        },
    ]);

    const {mensagemService} = useServices();

    const onEnviarMensagem = async (pergunta: string) => {
        if (loading) return;

        const userMessage: Mensagem = {
            content: pergunta,
            role: MensagemRole.USER
        };

        setMensagens(prev => [...prev, userMessage]);
        setLoading(true);

        const chatHistorySemErros = mensagens.filter(msg => !msg?.['errored']);
        const updatedChatHistory = [...chatHistorySemErros, userMessage];

        try {
            const msgRequest: MensagemRequestDTO = {
                empresa_uuid: empresaUuid,
                pedido_uuid: pedido?.uuid,
                chat_history: updatedChatHistory
            };

            const response = await mensagemService.enviarMensagem(msgRequest);

            if (response?.status === 200) {
                const modelResponse: Mensagem = {
                    role: MensagemRole.MODEL,
                    content: response.data?.response_text ?? ''
                }

                setMensagens(prev => [...prev.slice(0, -1), userMessage, modelResponse]);

                onReceivePedido(response.data.pedido)
            } else {
                throw new Error(`API Error: ${response.status}`);
            }
        } catch (e) {
            console.error(e)
            toast.error("Falha ao enviar mensagem. Tente novamente.");

            setMensagens(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                newMessages[newMessages.length - 1] = { ...lastMessage, errored: true, content: "Erro ao enviar mensagem." } as Mensagem; // Afirmação de tipo para permitir a propriedade 'errored'
                return newMessages;
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" overflow-hidden h-[500px] flex flex-col">
            <ListaMensagens mensagens={mensagens}/>
            <ChatBox disabled={loading} onEnviarMensagem={onEnviarMensagem}/>
        </div>
    )
}

export default ChatBot
