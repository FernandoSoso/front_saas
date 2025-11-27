import { useState } from "react"
import ListaMensagens from "./components/ListaMensagens"
import ChatBox from "./components/ChatBox"


const ChatBot = () => {

    const [loading, setLoading] = useState(false);


    //Dps tem que ver certinho a mensagem q vai ser a inicial
    const [mensagens, setMensagens] = useState([
        {
            id: 1,
            text: "Bom dia quer alguma coisa",
            remetente: "bot"
        },
    ])

    const onEnviarMensagem = async (pergunta) =>{
        const novaMsgUser = {
            id: Date.now(),
            text: pergunta,
            remetente : "user"
        }

        setMensagens(prev => [...prev, novaMsgUser]);
        setLoading(true)

        try{
        
            setMensagens(prev => [...prev, novaMsgUser]);
        
        } catch(err){
            console.error(err)
            const novaMsgUser = {
                id: Date.now(),
                text: "Falha ao enviar, tente novamente.",
                remetente : "bot"
            }

            setMensagens(prev => [...prev, novaMsgUser]);

        } finally{
            setLoading(false)
        }
    }

    return(
        
            <div className=" overflow-hidden h-[500px] flex flex-col">
                <ListaMensagens mensagens={mensagens} loading={loading}/>
                <ChatBox desabilitado={loading} onEnviarMensagem={onEnviarMensagem}/>
            </div>
    
    )
}

export default ChatBot